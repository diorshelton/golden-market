import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MarketProto from "./pages/MarketProto";

function App() {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<MarketProto />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
