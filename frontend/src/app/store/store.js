import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../features/auth/model/authSlice';
import { roomsReducer } from '../../features/rooms/model/roomsSlice';
import { bookingsReducer } from '../../features/booking/model/bookingsSlice';
import { adminReducer } from '../../features/admin/model/adminSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		rooms: roomsReducer,
		bookings: bookingsReducer,
		admin: adminReducer,
	},
});
