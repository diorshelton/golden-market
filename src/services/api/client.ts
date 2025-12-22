import axios from 'axios';
import type { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add token to every request
apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("access_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Handle token refresh on 401 errors
apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem("refreshToken");
				const { data } = await axios.post(
					`${
						import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1"
					}/auth/refresh`,
					{ refresh_token: refreshToken }
				);

				localStorage.setItem("accessToken", data.access_token);
				originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

				return apiClient(originalRequest);
			} catch (refreshError) {
				localStorage.clear();
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default apiClient;
