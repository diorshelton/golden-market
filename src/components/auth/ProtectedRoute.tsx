import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth();

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
					<p style={{ color: "#3434a5" }}>Loading...</p>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to={ROUTES.LOGIN} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
