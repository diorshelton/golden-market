import { useState, useEffect } from "react";
import { authService, userService } from "../services/api";
import type { ReactNode } from "react";
import { AuthContext } from "../hooks/useAuth";

interface User {
	id: number;
	username: string;
	email: string;
	coins: number;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadUser = () => {
			const accessToken = localStorage.getItem("accessToken");
			const storedUser = localStorage.getItem("user");

			if (accessToken && storedUser) {
				try {
					setUser(JSON.parse(storedUser));
				} catch (error) {
					console.error("Failed to parse stored user:", error);
					localStorage.clear();
				}
			}
			setIsLoading(false);
		};

		loadUser();
	}, []);

	const login = async (email: string, password: string) => {
		const data = await authService.login({ email, password });
		localStorage.setItem("accessToken", data.token);

		// Fetch user profile after successful login
		try {
			const profile = await userService.getProfile();
			const userData = {
				id: parseInt(profile.id) || 0,
				username: profile.username,
				email: profile.email,
				coins: profile.balance,
			};
			localStorage.setItem("user", JSON.stringify(userData));
			setUser(userData);
		} catch (error) {
			console.error("Failed to fetch user profile:", error);
			// Clear token if we can't get user data
			localStorage.removeItem("accessToken");
			throw error;
		}
	};

	const register = async (
		username: string,
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		confirmPassword: string
	) => {
		await authService.register({
			username,
			first_name: firstName,
			last_name: lastName,
			email,
			password,
			password_confirm: confirmPassword,
		});
		// Note: Backend registration doesn't return token, user needs to login separately
		// Or we could call login after registration
		await login(email, password);
	};

	const logout = () => {
		authService.logout().catch(console.error);
		localStorage.clear();
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isLoading,
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
