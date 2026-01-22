import { apiClient } from './apiClient';

export const authApi = {
	register(payload) {
		return apiClient({ method: 'POST', url: '/api/auth/register', body: payload });
	},
	login(payload) {
		return apiClient({ method: 'POST', url: '/api/auth/login', body: payload });
	},
	me(token) {
		return apiClient({ method: 'GET', url: '/api/auth/me', token });
	},
};
