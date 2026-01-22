import { storageKeys } from '../../lib/storage';

function nowIso() {
	return new Date().toISOString();
}

function randomId(prefix) {
	return `${prefix}_${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
}

function seedRooms() {
	return Array.from({ length: 20 }, (_, i) => {
		const number = i + 1;

		const imgIndex = ((number - 1) % 3) + 1;
		const image = `/images/rooms/room${imgIndex}.webp`;
		const gallery = [
			'/images/rooms/room1.webp',
			'/images/rooms/room2.webp',
			'/images/rooms/room3.webp',
		];

		return {
			id: `r${number}`,
			number,
			title: `Номер #${number}`,
			description:
				'Уютный номер с базовыми удобствами для комфортного отдыха. Подходит для 1–2 гостей.',
			price: 3000 + number * 250,
			status: number <= 2 ? 'reserved' : 'available',
			image,
			gallery,
			amenities: ['Wi-Fi', 'TV', 'Душ', 'Полотенца'],
		};
	});
}

function seedUsers() {
	return [
		{
			id: 'u1',
			login: 'admin',
			password: 'admin123',
			role: 'admin',
			createdAt: nowIso(),
		},
		{
			id: 'u2',
			login: 'user',
			password: 'user123',
			role: 'user',
			createdAt: nowIso(),
		},
	];
}

function createInitialDb() {
	return {
		rooms: seedRooms(),
		users: seedUsers(),
		bookings: [],
		sessions: {},
	};
}

export function loadDb() {
	const raw = localStorage.getItem(storageKeys.MOCK_DB);
	if (!raw) return createInitialDb();

	try {
		const parsed = JSON.parse(raw);
		if (!parsed.rooms || !parsed.users || !parsed.bookings || !parsed.sessions) {
			return createInitialDb();
		}
		return parsed;
	} catch {
		return createInitialDb();
	}
}

export function saveDb(db) {
	localStorage.setItem(storageKeys.MOCK_DB, JSON.stringify(db));
}

export function resetDb() {
	const db = createInitialDb();
	saveDb(db);
	return db;
}

export const dbUtils = {
	nowIso,
	randomId,
};
