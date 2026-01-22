import { loadDb, saveDb, dbUtils } from './mockDb';

class ApiError extends Error {
	constructor(status, message, details) {
		super(message);
		this.status = status;
		this.details = details;
	}
}

function parseUrl(url) {
	const [path, queryString] = url.split('?');
	const query = {};
	if (queryString) {
		for (const part of queryString.split('&')) {
			const [k, v] = part.split('=');
			query[decodeURIComponent(k)] = decodeURIComponent(v ?? '');
		}
	}
	return { path, query };
}

function requireAuth(headers, db) {
	const auth = headers?.Authorization || headers?.authorization;
	if (!auth?.startsWith('Bearer ')) throw new ApiError(401, 'Unauthorized');
	const token = auth.slice('Bearer '.length);
	const userId = db.sessions[token];
	if (!userId) throw new ApiError(401, 'Invalid token');

	const user = db.users.find((u) => u.id === userId);
	if (!user) throw new ApiError(401, 'Invalid token');

	return { token, user };
}

function requireAdmin(user) {
	if (user.role !== 'admin') throw new ApiError(403, 'Forbidden');
}

export const mockServer = {
	handle({ method, url, body, headers }) {
		const { path, query } = parseUrl(url);
		const db = loadDb();

		if (method === 'POST' && path === '/api/auth/register') {
			const { login, password } = body ?? {};
			if (!login || !password)
				throw new ApiError(400, 'Validation error', {
					fields: ['login', 'password'],
				});

			const exists = db.users.some((u) => u.login === login);
			if (exists) throw new ApiError(409, 'Login already taken');

			const newUser = {
				id: dbUtils.randomId('u'),
				login,
				password,
				role: 'user',
				createdAt: dbUtils.nowIso(),
			};
			db.users.push(newUser);

			const token = dbUtils.randomId('t');
			db.sessions[token] = newUser.id;
			saveDb(db);

			return {
				token,
				user: { id: newUser.id, login: newUser.login, role: newUser.role },
			};
		}

		if (method === 'POST' && path === '/api/auth/login') {
			const { login, password } = body ?? {};
			if (!login || !password) throw new ApiError(400, 'Validation error');

			const user = db.users.find(
				(u) => u.login === login && u.password === password,
			);
			if (!user) throw new ApiError(401, 'Invalid credentials');

			const token = dbUtils.randomId('t');
			db.sessions[token] = user.id;
			saveDb(db);

			return { token, user: { id: user.id, login: user.login, role: user.role } };
		}

		if (method === 'GET' && path === '/api/auth/me') {
			const { user } = requireAuth(headers, db);
			return { id: user.id, login: user.login, role: user.role };
		}

		if (method === 'GET' && path === '/api/rooms') {
			const status = query.status;
			const items = status ? db.rooms.filter((r) => r.status === status) : db.rooms;
			return { items };
		}

		const roomDetailsMatch = path.match(/^\/api\/rooms\/([^/]+)$/);
		if (method === 'GET' && roomDetailsMatch) {
			const roomId = roomDetailsMatch[1];
			const room = db.rooms.find((r) => r.id === roomId);
			if (!room) throw new ApiError(404, 'Room not found');
			return { room };
		}

		if (method === 'GET' && path === '/api/bookings') {
			const { user } = requireAuth(headers, db);
			const items = db.bookings.filter((b) => b.userId === user.id);
			return { items };
		}

		if (method === 'POST' && path === '/api/bookings') {
			const { user } = requireAuth(headers, db);
			const { roomId, checkIn, checkOut, guests } = body ?? {};

			if (!roomId || !checkIn || !checkOut)
				throw new ApiError(400, 'Validation error');
			const room = db.rooms.find((r) => r.id === roomId);
			if (!room) throw new ApiError(404, 'Room not found');

			if (room.status !== 'available')
				throw new ApiError(409, 'Room is not available');

			const booking = {
				id: dbUtils.randomId('b'),
				userId: user.id,
				roomId,
				checkIn,
				checkOut,
				guests: Number(guests ?? 1),
				status: 'active',
				createdAt: dbUtils.nowIso(),
			};

			db.bookings.push(booking);
			room.status = 'reserved';

			saveDb(db);
			return { booking };
		}

		const bookingDeleteMatch = path.match(/^\/api\/bookings\/([^/]+)$/);
		if (method === 'DELETE' && bookingDeleteMatch) {
			const { user } = requireAuth(headers, db);
			const bookingId = bookingDeleteMatch[1];

			const booking = db.bookings.find((b) => b.id === bookingId);
			if (!booking) throw new ApiError(404, 'Booking not found');
			if (booking.userId !== user.id) throw new ApiError(403, 'Forbidden');

			db.bookings = db.bookings.filter((b) => b.id !== bookingId);

			const room = db.rooms.find((r) => r.id === booking.roomId);
			if (room) room.status = 'available';

			saveDb(db);
			return { ok: true };
		}

		if (method === 'GET' && path === '/api/admin/rooms/statuses') {
			const { user } = requireAuth(headers, db);
			requireAdmin(user);

			return {
				items: db.rooms.map((r) => ({
					roomId: r.id,
					number: r.number,
					status: r.status,
				})),
			};
		}

		const patchStatusMatch = path.match(/^\/api\/admin\/rooms\/([^/]+)\/status$/);
		if (method === 'PATCH' && patchStatusMatch) {
			const { user } = requireAuth(headers, db);
			requireAdmin(user);

			const roomId = patchStatusMatch[1];
			const { status } = body ?? {};
			if (!status || !['available', 'reserved'].includes(status)) {
				throw new ApiError(400, 'Invalid status');
			}

			const room = db.rooms.find((r) => r.id === roomId);
			if (!room) throw new ApiError(404, 'Room not found');

			room.status = status;
			saveDb(db);

			return { room };
		}

		throw new ApiError(404, 'Not found');
	},

	ApiError,
};
