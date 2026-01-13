import { useState, useEffect } from "react";
import { userService, authService } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants";
import { useNavigate } from "react-router-dom";
interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		checkAuth();
	}, []);

	const authContext = useAuth()
	console.log(authContext)
	const checkAuth = async () => {
		const token = localStorage.getItem("accessToken");

		if (!token) {
			navigate(ROUTES.LOGIN);
			setIsLoading(false);
			return;
		}

		try {
			//  Try to fetch profile to verify token
			await userService.getProfile();
			setIsAuthenticated(true);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			// Only try to refresh token if it's a 401 (unauthorized) error
			if (err.message && err.message.includes("401")) {
				try {
					const refreshToken = localStorage.getItem("refreshToken") || "";
					const response = await authService.refresh(refreshToken);
					localStorage.setItem("accessToken", response.token);
					setIsAuthenticated(true);
				} catch (refreshError) {
					console.error("Token refresh failed:", refreshError);
					//  Refresh failed, redirect to login
					localStorage.removeItem("accessToken");
					navigate("/login");
				}
			} else {
				// For non-401 errors, just fail and redirect
				console.error("Auth check failed:", err);
				localStorage.removeItem("accessToken");
				navigate("/login");
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
