import { apiClient as mockApiClient } from './mock/apiClientMock';
import { httpClient } from './http/httpClient';

export async function apiClient({ method, url, body, token }) {
	const mode = import.meta.env.VITE_API_MODE || 'mock';

	if (mode === 'real') {
		return httpClient({ method, url, body, token });
	}

	return mockApiClient({ method, url, body, token });
}
