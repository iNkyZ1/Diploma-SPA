import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { adminApi } from '../../../shared/api';

export const fetchRoomStatusesThunk = createAsyncThunk(
	'admin/statuses',
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.token;
			return await adminApi.statuses(token);
		} catch (e) {
			return rejectWithValue({ status: e.status, message: e.message });
		}
	},
);

export const setRoomStatusThunk = createAsyncThunk(
	'admin/setStatus',
	async ({ roomId, status }, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.token;
			return await adminApi.setRoomStatus(roomId, status, token);
		} catch (e) {
			return rejectWithValue({ status: e.status, message: e.message });
		}
	},
);

const adminSlice = createSlice({
	name: 'admin',
	initialState: {
		items: [],
		status: 'idle',
		error: null,
		updatingId: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRoomStatusesThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchRoomStatusesThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload.items;
			})
			.addCase(fetchRoomStatusesThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || { message: 'Unknown error' };
			})

			.addCase(setRoomStatusThunk.pending, (state, action) => {
				state.updatingId = action.meta.arg.roomId;
				state.error = null;
			})
			.addCase(setRoomStatusThunk.fulfilled, (state, action) => {
				const updated = action.payload.room;
				const idx = state.items.findIndex((x) => x.roomId === updated.id);
				if (idx !== -1)
					state.items[idx] = { ...state.items[idx], status: updated.status };
				state.updatingId = null;
			})
			.addCase(setRoomStatusThunk.rejected, (state, action) => {
				state.updatingId = null;
				state.error = action.payload || { message: 'Unknown error' };
			});
	},
});

export const adminReducer = adminSlice.reducer;

export const selectAdminUpdatingId = (s) => s.admin.updatingId;
export const selectAdminStatuses = (s) => s.admin.items;
export const selectAdminStatus = (s) => s.admin.status;
export const selectAdminError = (s) => s.admin.error;
