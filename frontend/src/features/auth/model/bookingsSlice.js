import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bookingsApi } from '../../../shared/api';

export const fetchBookingsThunk = createAsyncThunk(
	'bookings/list',
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.token;
			return await bookingsApi.list(token);
		} catch (e) {
			return rejectWithValue({ status: e.status, message: e.message });
		}
	},
);

export const createBookingThunk = createAsyncThunk(
	'bookings/create',
	async (payload, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.token;
			return await bookingsApi.create(payload, token);
		} catch (e) {
			return rejectWithValue({
				status: e.status,
				message: e.message,
				details: e.details,
			});
		}
	},
);

export const deleteBookingThunk = createAsyncThunk(
	'bookings/delete',
	async (bookingId, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.token;
			return await bookingsApi.remove(bookingId, token);
		} catch (e) {
			return rejectWithValue({ status: e.status, message: e.message });
		}
	},
);

const bookingsSlice = createSlice({
	name: 'bookings',
	initialState: {
		items: [],
		status: 'idle',
		error: null,
	},
	reducers: {
		clearBookings(state) {
			state.items = [];
			state.status = 'idle';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBookingsThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchBookingsThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload.items;
			})
			.addCase(fetchBookingsThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || { message: 'Unknown error' };
			})

			.addCase(createBookingThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(createBookingThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items.unshift(action.payload.booking);
			})
			.addCase(createBookingThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || { message: 'Unknown error' };
			})

			.addCase(deleteBookingThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(deleteBookingThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
			})
			.addCase(deleteBookingThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || { message: 'Unknown error' };
			});
	},
});

export const { clearBookings } = bookingsSlice.actions;
export const bookingsReducer = bookingsSlice.reducer;

export const selectBookings = (s) => s.bookings.items;
export const selectBookingsStatus = (s) => s.bookings.status;
export const selectBookingsError = (s) => s.bookings.error;
