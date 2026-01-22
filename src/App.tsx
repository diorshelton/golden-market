import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import { Navbar } from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/Profile";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MarketProto from "./pages/MarketProto";
import CartProto from "./pages/CartProto";

function App() {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<MarketProto />} />
					<Route path="/products" element={<MarketProto />} />
					<Route path="/cart" element={<CartProto />} />
					<Route
						path="/orders"
						element={
							<ProtectedRoute>
								<Orders />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/inventory"
						element={
							<ProtectedRoute>
								<Inventory />
							</ProtectedRoute>
						}
					/>
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
