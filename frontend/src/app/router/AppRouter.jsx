import { Routes, Route, Navigate } from 'react-router-dom';

import { RoomsListPage } from '../../pages/RoomsListPage/RoomsListPage';
import { RoomDetailsPage } from '../../pages/RoomDetailsPage/RoomDetailsPage';
import { MyBookingsPage } from '../../pages/MyBookingsPage/MyBookingsPage';
import { AdminPage } from '../../pages/AdminPage/AdminPage';
import { AuthLoginPage } from '../../pages/AuthLoginPage/AuthLoginPage';
import { AuthRegisterPage } from '../../pages/AuthRegisterPage/AuthRegisterPage';

export function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/rooms" replace />} />
			<Route path="/rooms" element={<RoomsListPage />} />
			<Route path="/rooms/:id" element={<RoomDetailsPage />} />

			<Route path="/my-bookings" element={<MyBookingsPage />} />
			<Route path="/admin" element={<AdminPage />} />

			<Route path="/login" element={<AuthLoginPage />} />
			<Route path="/register" element={<AuthRegisterPage />} />

			<Route path="*" element={<div>404</div>} />
		</Routes>
	);
}
