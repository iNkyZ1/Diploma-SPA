import { mockServer } from './mock/mockServer';

function sleep(ms) {
	return new Promise((res) => setTimeout(res, ms));
}

export async function apiClient({ method, url, body, token }) {
	const delay = Number(import.meta.env.VITE_MOCK_DELAY ?? 350);
	const errorRate = Number(import.meta.env.VITE_MOCK_ERROR_RATE ?? 0);

	await sleep(delay);

	if (errorRate > 0 && Math.random() < errorRate) {
		const err = new Error('Network error');
		err.status = 0;
		throw err;
	}

	const headers = {};
	if (token) headers.Authorization = `Bearer ${token}`;

	try {
		return mockServer.handle({ method, url, body, headers });
	} catch (e) {
		const status = e.status ?? 500;
		const message = e.message ?? 'Server error';
		const details = e.details;

		const err = new Error(message);
		err.status = status;
		err.details = details;
		throw err;
	}
}
