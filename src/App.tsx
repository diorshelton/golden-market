import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import MarketProto from "./pages/MarketProto";

function App() {
	return (
		<BrowserRouter>
			<Routes>
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
				<Route path="/" element={<MarketProto/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
