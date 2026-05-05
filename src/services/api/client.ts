import axios from "axios";
import type { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

// sessionStorage token store — survives page refresh, clears on tab close.
// Less secure than HttpOnly cookies (readable by JS) but necessary given
// the frontend and backend are on different domains (cross-origin cookie issues).
const TOKEN_KEY = "access_token";

export const setAccessToken = (token: string | null) => {
	if (token) {
		sessionStorage.setItem(TOKEN_KEY, token);
	} else {
		sessionStorage.removeItem(TOKEN_KEY);
	}
};

export const getAccessToken = () => sessionStorage.getItem(TOKEN_KEY);

// Attach token to every request
apiClient.interceptors.request.use((config) => {
	const token = getAccessToken();
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

		if (
  error.response?.status === 401 &&
  !originalRequest._retry &&
  !originalRequest.url?.includes("/auth/")
) {
			originalRequest._retry = true;

			try {
				const { data } = await axios.post(
					`${
						import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1"
					}/auth/refresh`,
					{},
					{ withCredentials: true }
				);

				setAccessToken(data.token);
				originalRequest.headers.Authorization = `Bearer ${data.token}`;

				return apiClient(originalRequest);
			} catch (refreshError) {
				setAccessToken(null);
				localStorage.removeItem("user");
				window.location.href = `${import.meta.env.BASE_URL}login`;
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default apiClient;
