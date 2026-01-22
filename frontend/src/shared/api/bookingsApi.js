import { apiClient } from './apiClient';

export const bookingsApi = {
	list(token) {
		return apiClient({ method: 'GET', url: '/api/bookings', token });
	},
	create(payload, token) {
		return apiClient({ method: 'POST', url: '/api/bookings', body: payload, token });
	},
	remove(bookingId, token) {
		return apiClient({ method: 'DELETE', url: `/api/bookings/${bookingId}`, token });
	},
};
