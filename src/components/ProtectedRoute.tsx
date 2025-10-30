import { useState, useEffect } from "react";
import { API_ENDPOINTS, apiClient } from "../config/api";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		const token = localStorage.getItem("access_token");

		if (!token) {
			window.location.href = "/login";
			return;
		}

		try {
			//  Try to fetch profile to verify token
			await apiClient.get(API_ENDPOINTS.user.profile, token);
			setIsAuthenticated(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.message && err.message.includes("401"))
        console.error(err)
			// Try to refresh token
			try {
				const response = await apiClient.post(API_ENDPOINTS.auth.refresh, {});
				localStorage.setItem("access_token", response.token);
				setIsAuthenticated(true);
      } catch (refreshError) {
        console.error(refreshError)
				//  Refresh failed, redirect to login
				localStorage.removeItem("access_token");
				window.location.href = "/login";
			}
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div
				className="min-h-screen flex items-center justify-center"
				style={{ background: "#ded6d6" }}
			>
				<div className="text-center">
					<div
						className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
						style={{ borderColor: "#3434a5" }}
					></div>
					<p style={{ color: "#3434a5" }}>Authenticating...</p>
				</div>
			</div>
		);
	}
	return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
