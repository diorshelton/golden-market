import apiClient from "./client";

interface RegisterData {
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	password_confirm: string;
}

interface LoginData {
	email: string;
	password: string;
}

interface LoginResponse {
	token: string;
}

interface RegisterResponse {
	id: string;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	message: string;
}

interface RefreshResponse {
	token: string;
}

export const authService = {
	register: async (userData: RegisterData) => {
		const response = await apiClient.post<RegisterResponse>(
			"/auth/register",
			userData
		);
		return response.data;
	},

	login: async (credentials: LoginData) => {
		const response = await apiClient.post<LoginResponse>(
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