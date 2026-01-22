import { apiClient } from './apiClient';

export const adminApi = {
	statuses(token) {
		return apiClient({ method: 'GET', url: '/api/admin/rooms/statuses', token });
	},
	setRoomStatus(roomId, status, token) {
		return apiClient({
			method: 'PATCH',
			url: `/api/admin/rooms/${roomId}/status`,
			body: { status },
			token,
		});
	},
};
