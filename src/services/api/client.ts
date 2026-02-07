import axios from "axios";
import type { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

// In-memory token store (not accessible via XSS unlike localStorage)
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
	accessToken = token;
};

export const getAccessToken = () => accessToken;

// Attach in-memory token to every request
apiClient.interceptors.request.use((config) => {
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
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
				const { data } = await axios.post(
					`${
						import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1"
					}/auth/refresh`,
					{},
					{ withCredentials: true }
				);

				accessToken = data.token;
				originalRequest.headers.Authorization = `Bearer ${data.token}`;

				return apiClient(originalRequest);
			} catch (refreshError) {
				accessToken = null;
				localStorage.removeItem("user");
				window.location.href = `${import.meta.env.BASE_URL}login`;
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default apiClient;
