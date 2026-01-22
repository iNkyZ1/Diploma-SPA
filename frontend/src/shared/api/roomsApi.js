import { apiClient } from './apiClient';

export const roomsApi = {
	list({ status } = {}) {
		const qs = status ? `?status=${encodeURIComponent(status)}` : '';
		return apiClient({ method: 'GET', url: `/api/rooms${qs}` });
	},
	details(roomId) {
		return apiClient({ method: 'GET', url: `/api/rooms/${roomId}` });
	},
};
