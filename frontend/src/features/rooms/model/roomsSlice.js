import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { roomsApi } from '../../../shared/api';

export const fetchRoomsThunk = createAsyncThunk(
	'rooms/list',
	async ({ status } = {}, { rejectWithValue }) => {
		try {
			return await roomsApi.list({ status });
		} catch (e) {
			return rejectWithValue({ status: e.status, message: e.message });
		}
	},
);

export const fetchRoomDetailsThunk = createAsyncThunk(
	'rooms/details',
	async (roomId, { rejectWithValue }) => {
		try {
			return await roomsApi.details(roomId);
		} catch (e) {
			return rejectWithValue({ status: e.status, message: e.message });
		}
	},
);

const roomsSlice = createSlice({
	name: 'rooms',
	initialState: {
		items: [],
		current: null,
		status: 'idle',
		error: null,
	},
	reducers: {
		clearCurrentRoom(state) {
			state.current = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRoomsThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchRoomsThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload.items;
			})
			.addCase(fetchRoomsThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || { message: 'Unknown error' };
			})

			.addCase(fetchRoomDetailsThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchRoomDetailsThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.current = action.payload.room;
			})
			.addCase(fetchRoomDetailsThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || { message: 'Unknown error' };
			});
	},
});

export const { clearCurrentRoom } = roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;

export const selectRooms = (s) => s.rooms.items;
export const selectRoomsStatus = (s) => s.rooms.status;
export const selectRoomsError = (s) => s.rooms.error;
export const selectCurrentRoom = (s) => s.rooms.current;
