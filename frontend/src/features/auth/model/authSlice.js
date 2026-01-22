import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../../shared/api';
import { storageKeys } from '../../../shared/lib/storage';

function loadAuthFromStorage() {
	const token = localStorage.getItem(storageKeys.AUTH_TOKEN);
	const userRaw = localStorage.getItem(storageKeys.AUTH_USER);
	const user = userRaw ? JSON.parse(userRaw) : null;
	return { token: token || null, user };
}

function saveAuthToStorage(token, user) {
	localStorage.setItem(storageKeys.AUTH_TOKEN, token);
	localStorage.setItem(storageKeys.AUTH_USER, JSON.stringify(user));
}

function clearAuthStorage() {
	localStorage.removeItem(storageKeys.AUTH_TOKEN);
	localStorage.removeItem(storageKeys.AUTH_USER);
}

const initial = loadAuthFromStorage();

export const registerThunk = createAsyncThunk(
	'auth/register',
	async (payload, { rejectWithValue }) => {
		try {
			return await authApi.register(payload);
		} catch (e) {
			return rejectWithValue({
				status: e.status,
				message: e.message,
				details: e.details,
			});
		}
	},
);

export const loginThunk = createAsyncThunk(
	'auth/login',
	async (payload, { rejectWithValue }) => {
		try {
			return await authApi.login(payload);
		} catch (e) {
			return rejectWithValue({
				status: e.status,
				message: e.message,
				details: e.details,
			});
		}
	},
);

export const meThunk = createAsyncThunk(
	'auth/me',
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.token;
			if (!token) throw Object.assign(new Error('No token'), { status: 401 });
			return await authApi.me(token);
		} catch (e) {
			return rejectWithValue({ status: e.status, message: e.message });
		}
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: initial.token,
		user: initial.user,
		status: 'idle',
		error: null,
	},
	reducers: {
		logout(state) {
			state.token = null;
			state.user = null;
			state.status = 'idle';
			state.error = null;
			clearAuthStorage();
		},
	},
	extraReducers: (builder) => {
		const onPending = (state) => {
			state.status = 'loading';
			state.error = null;
		};
		const onRejected = (state, action) => {
			state.status = 'failed';
			state.error = action.payload || { message: 'Unknown error' };
		};

		builder
			.addCase(registerThunk.pending, onPending)
			.addCase(registerThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.token = action.payload.token;
				state.user = action.payload.user;
				saveAuthToStorage(action.payload.token, action.payload.user);
			})
			.addCase(registerThunk.rejected, onRejected)

			.addCase(loginThunk.pending, onPending)
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.token = action.payload.token;
				state.user = action.payload.user;
				saveAuthToStorage(action.payload.token, action.payload.user);
			})
			.addCase(loginThunk.rejected, onRejected)

			.addCase(meThunk.pending, onPending)
			.addCase(meThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
				if (state.token) saveAuthToStorage(state.token, action.payload);
			})
			.addCase(meThunk.rejected, (state, action) => {
				if (action.payload?.status === 401) {
					state.token = null;
					state.user = null;
					clearAuthStorage();
				}
				state.status = 'failed';
				state.error = action.payload || { message: 'Unknown error' };
			});
	},
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectAuth = (s) => s.auth;
export const selectToken = (s) => s.auth.token;
export const selectUser = (s) => s.auth.user;
export const selectIsAuthed = (s) => Boolean(s.auth.token);
export const selectIsAdmin = (s) => s.auth.user?.role === 'admin';
