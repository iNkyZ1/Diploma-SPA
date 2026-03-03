export async function httpClient({ method, url, body, token }) {
	const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

	const headers = {
		'Content-Type': 'application/json',
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	const res = await fetch(`${baseUrl}${url}`, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});

	const isJson = res.headers.get('content-type')?.includes('application/json');
	const data = isJson ? await res.json() : null;

	if (!res.ok) {
		const err = new Error(data?.message || 'Request failed');
		err.status = res.status;
		err.details = data?.details;
		throw err;
	}

	return data;
}
