import { useState, useEffect } from "react";
import { API_ENDPOINTS, apiClient } from "../config/api";
import { useNavigate } from "react-router-dom";

interface UserProfile {
	id: string;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	balance: number;
	created_at: string;
}

const ProfilePage = () => {
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		fetchProfile();
	}, []);

	const fetchProfile = async () => {
		try {
			const token = localStorage.getItem("access_token");
			if (!token) {
				// No token, redirect to login
				localStorage.removeItem("access_token");
				navigate("/login");
				return;
			}
			const data = await apiClient.get(API_ENDPOINTS.user.profile, token);
			setProfile(data);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			if (err.message && err.message.includes("401")) {
				// Token expired, try to refresh
				await handleTokenRefresh();
			} else {
				setError(err.message || "Failed to load profile");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleTokenRefresh = async () => {
		try {
			const response = await apiClient.post(API_ENDPOINTS.auth.refresh, {});
			localStorage.setItem("access_token", response.token);
			// Retry fetching profile
			await fetchProfile();
		} catch (err) {
			console.error(err)
			// Refresh failed, redirect to login
			localStorage.removeItem("access_token");
			navigate("/login");
		}
	};

	const handleLogout = async () => {
		try {
			await apiClient.post(API_ENDPOINTS.auth.logout, {});
		} catch (err) {
			console.error("Logout error:", err);
		} finally {
			// Clear local storage and redirect regardless of API result
			localStorage.removeItem("access_token");
			navigate("/login");
		}
	};

	if (loading) {
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

	if (error || !profile) {
		return (
			<div
				className="min-h-screen flex items-center justify-center"
				style={{ background: "#ded6d6" }}
			>
				<div className="text-center">
					<p className="text-red-600 mb-4">
						{error || "Failed to load profile"}
					</p>
					<button
						onClick={() => navigate("/login")}
						className="px-6 py-2 rounded-lg text-white font-medium"
						style={{ background: "#3434a5" }}
					>
						Go to Login
					</button>
				</div>
			</div>
		);
	}
	// Get initials for avatar
	const initials=
		`${profile.first_name[0] || ""}${profile.last_name[0] || ""}`.toUpperCase();

	return (
		<div className="min-h-screen" style={{ background: "#ded6d6" }}>
			{/* Header/Banner */}
			<header
				className="border-b"
				style={{
					background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
					border: "1px solid #41876a40",
				}}
			>
				<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<h1
							className="text-2xl font-bold text-transparent bg-clip-text"
							style={{
								backgroundImage:
									"linear-gradient(135deg, #f59f00 0%, #ffffff 100%)",
							}}
						>
							Golden Market
						</h1>
					</div>

					<div
						className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-black cursor-pointer hover:scale-110 transition-transform"
						style={{
							background: "linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
							boxShadow: "0 0 20px rgba(245, 159, 0, 0.3)",
						}}
						title={`${profile.first_name} ${profile.last_name}`}
					>
						{initials}
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 py-8">
				{/* Welcome Banner */}
				<div
					className="rounded-2xl p-10 mb-8 relative overflow-hidden"
					style={{
						background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
					}}
				>
					<h2 className="text-3xl font-bold mb-1" style={{ color: "#ded6d6" }}>
						Welcome back, {profile.first_name}!
					</h2>
					<p className="text-white text-opacity-80">
						Member since {new Date(profile.created_at).toLocaleDateString()}
					</p>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-3 gap-6 mb-8">
					<div
						className="rounded-xl p-6"
						style={{
							background: "#3434a5",
							border: "1px solid rgba(65, 135, 106, 0.251)",
						}}
					>
						<p className="text-white-300 text-sm mb-2">Coin Balance</p>
						<p className="text-3xl font-bold" style={{ color: "#ded6d6" }}>
							{profile.balance}
						</p>
					</div>
					<div
						className="rounded-xl p-6"
						style={{
							background: "#3434a5",
							border: "1px solid rgba(65, 135, 106, 0.251)",
						}}
					>
						<p className="text-white-400 text-sm mb-2">Orders</p>
						<p className="text-3xl font-bold" style={{ color: "#ded6d6" }}>
							0
						</p>
						<p className="text-xs text-white-500 mt-1">Coming soon</p>
					</div>
					<div
						className="rounded-xl p-6"
						style={{
							background: "#3434a5",
							border: "1px solid rgba(65, 135, 106, 0.251)",
						}}
					>
						<p className="text-white-400 text-sm mb-2">Items</p>
						<p className="text-3xl font-bold" style={{ color: "#ded6d6" }}>
							0
						</p>
						<p className="text-xs text-white-500 mt-1">Coming soon</p>
					</div>
				</div>

				{/* Profile Details */}
				<div
					className="rounded-xl p-8"
					style={{
						background:
							"linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)",
						border: "1px solid rgba(65, 135, 106, 0.251)",
					}}
				>
					<h3 className="text-2xl font-bold mb-6" style={{ color: "#ded6d6" }}>
						Profile Information
					</h3>
					<div className="grid grid-cols-2 gap-6 text-gray-300">
						<div>
							<p className="text-sm text-white-500 mb-1">Username</p>
							<p className="text-lg">@{profile.username}</p>
						</div>
						<div>
							<p className="text-sm text-white-500 mb-1">User ID</p>
							<p className="text-lg text-xs">{profile.id}</p>
						</div>
						<div>
							<p className="text-sm text-white-500 mb-1">Full Name</p>
							<p className="text-lg">
								{profile.first_name} {profile.last_name}
							</p>
						</div>
						<div>
							<p className="text-sm text-white-500 mb-1">Email</p>
							<p className="text-lg">{profile.email}</p>
						</div>
					</div>
					<div className="mt-8 flex gap-4">
						<button
							onClick={handleLogout}
							className="px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
							style={{ background: "#7f0921" }}
						>
							Logout
						</button>
						<button
							className="px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
							style={{ background: "#3434a5" }}
						>
							Edit Profile
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
