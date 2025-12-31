const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

export const API_ENDPOINTS = {
	auth: {
		register: `${API_BASE_URL}/auth/register`,
		login: `${API_BASE_URL}/auth/login`,
		refresh: `${API_BASE_URL}/auth/refresh`,
		logout: `${API_BASE_URL}/auth/logout`,
	},
	user: {
		profile: `${API_BASE_URL}/profile`,
	},
};
// Additional endpoints as needed

export const apiClient = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async post(url: string, data: any) {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			credentials: "include",
			body: new URLSearchParams(data),
		});

		if (!response.ok) {
			const error = await response.text();
			throw new Error(error || `HTTP${response.status}: Request failed`);
    }

    return response.json();
	},

	async get(url: string, token?: string) {
		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};

		// Use provided token or get from localStorage
		const authToken = token || localStorage.getItem("accessToken");
		if (authToken) {
			headers["Authorization"] = `Bearer ${authToken}`;
		}

		const response = await fetch(url, {
			method: 'GET',
			headers,
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error(`HTTP${response.status}: Request failed`);
		}

		return response.json();
	},
};
