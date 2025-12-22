import apiClient from './client'

interface RegisterData {
	username: string;
	email: string;
	password: string;
}

interface LoginData {
	email: string;
	password: string;
}

interface AuthResponse {
	access_token: string;
	refresh_token: string;
	user: {
		id: number;
		username: string;
		email: string;
		coins: number;
	};
}

interface RefreshResponse {
	access_token: string;
}

export const authService = {
	register: async (userData: RegisterData) => {
		const response = await apiClient.post<AuthResponse>(
			"/auth/register",
			userData
		);
		return response.data;
	},

	login: async (credentials: LoginData) => {
		const response = await apiClient.post<AuthResponse>(
			"/auth/login",
			credentials
		);
		return response.data;
	},

	refresh: async (refreshToken: string) => {
		const response = await apiClient.post<RefreshResponse>("/auth/refresh", {
			refresh_token: refreshToken,
		});
		return response.data;
	},

	logout: async () => {
		const response = await apiClient.post("/auth/logout");
		return response.data;
	},
};