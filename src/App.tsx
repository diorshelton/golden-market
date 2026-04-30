import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/Profile";
import Orders from "./pages/Orders/index";
import Inventory from "./pages/Inventory";
import Checkout from "./pages/Checkout/index";
import OrderConfirmation from "./pages/OrderConfirmation/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Marketplace from "./pages/Marketplace";
import Cart from "./pages/Cart";

function App() {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<AuthProvider>
					<Layout>
					<Routes>
					<Route path="/" element={<Marketplace />} />
					<Route path="/products" element={<Marketplace />} />
					<Route path="/cart"
						element={
							<ProtectedRoute>
								<Cart />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/checkout"
						element={
							<ProtectedRoute>
								<Checkout />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/orders/:id/confirmation"
						element={
							<ProtectedRoute>
								<OrderConfirmation />
							</ProtectedRoute>
						}
					/>
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
				</Layout>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
