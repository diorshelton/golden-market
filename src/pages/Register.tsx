import { useState } from "react";
import { API_ENDPOINTS, apiClient } from "../config/api";

const Register: React.FC = () => {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
		password_confirm: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await apiClient.post(
				API_ENDPOINTS.auth.register,
				formData
			);
			console.log("Registration successful", response);
			//  Handle successful registration (e.g., redirect to login)
			window.location.href = "/login";
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
			style={{
				background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
			}}
		>
			<div className="w-full max-w-2xl relative z-10">
				<div className="text-center mb-8">
					<h1
						className="text-4xl font-bold text-transparent bg-clip-text"
						style={{
							backgroundImage:
								"linear-gradient(135deg, #f59f00 0%, #ffffff 100%)",
						}}
					>
						Join Golden Market
					</h1>
					<p className="text-white-text-opacity-90">Become a member today!</p>
				</div>

				{/* Register Card */}
				<div
					className="rounded-2xl p-8 backdrop-blur-xl"
					style={{
						background: "rgba(255, 255, 255, 0.95)",
						boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
					}}
				>
					{error && (
						<div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
							{error}
						</div>
					)}

					<form className="space-y-5" onSubmit={handleSubmit}>
						{/* FirstName */}
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									className="block text-sm font-semibold mb-2 tracking-wide"
									style={{ color: "#3434a5" }}
								>
									FIRST NAME
								</label>
								<input
									type="text"
									name="first_name"
									value={formData.first_name}
									onChange={handleChange}
									placeholder="First Name"
									required
									className="w-full px-4 py-3 rounded-xl
								border-2
								focus:outline-none
								focus:border-current
								placeholder-gray-500"
									style={{
										borderColor: "#41876a40",
										color: "#3434a5",
									}}
								/>
							</div>
							<div>
								<label
									className="block text-sm font-semibold mb-2 tracking-wide"
									style={{ color: "#3434a5" }}
								>
									LAST NAME
								</label>
								<input
									type="text"
									name="last_name"
									value={formData.last_name}
									onChange={handleChange}
									placeholder="Last Name"
									required
									className="w-full px-4 py-3 rounded-xl
								border-2
								focus:outline-none
								focus:border-current
								placeholder-gray-500"
									style={{
										borderColor: "rgba(65, 135, 106, 0.251)",
										color: "#3434a5",
									}}
								/>
							</div>
						</div>
						<div>
							<label
								className="block text-sm font-semibold mb-2 tracking-wide"
								style={{ color: "#3434a5" }}
							>
								USERNAME
							</label>
							<input
								type="text"
								name="username"
								value={formData.username}
								onChange={handleChange}
								placeholder="username"
								required
								minLength={3}
								maxLength={30}
								className="w-full px-4 py-3 rounded-xl
								border-2
								focus:outline-none
								focus:border-current
								placeholder-gray-500"
								style={{
									borderColor: "#41876a40",
									color: "#3434a5",
								}}
							/>
						</div>
						<div>
							<label
								className="block text-sm font-semibold mb-2 tracking-wide"
								style={{ color: "#3434a5" }}
							>
								EMAIL ADDRESS
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="you@example.com"
								required
								className="w-full px-4 py-3 rounded-xl text-white
							border-2
							focus:out-line-none
							placeholder-gray-500"
								style={{
									borderColor: "#41876a40",
									color: "#3434a5",
								}}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									className="block text-sm font-semibold mb-2 tracking-wide"
									style={{ color: "#3434a5" }}
								>
									PASSWORD
								</label>
								<input
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									required
									minLength={8}
									maxLength={64}
									placeholder="Min. 8 characters"
									className="w-full px-4 py-3 rounded-xl
								border-2
								focus:outline-none
								focus:-border-current
								text-white placeholder-gray-500"
									style={{
										borderColor: "#41876a40",
										color: "#3434a5",
									}}
								/>
							</div>
							<div>
								<label
									className="block text-sm font-semibold mb-2 tracking-wide"
									style={{ color: "#3434a5" }}
								>
									CONFIRM
								</label>
								<input
									type="password"
									name="password_confirm"
									value={formData.password_confirm}
									onChange={handleChange}
									required
									minLength={8}
									maxLength={64}
									placeholder="Re-enter Password"
									className="w-full px-4 py-3 rounded-xl
								border-2
								focus:outline-none
								focus:-border-current
								text-white placeholder-gray-500"
									style={{
										borderColor: "#41876a40",
										color: "#3434a5",
									}}
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-4 rounded-xl font-bold text-white tracking-wide
						transition-all transform hover:scale-105 active:scale-95
						"
							style={{
								background: "#3434a5",
							}}
						>
							{loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
						</button>
					</form>
					<div className="mt-6 text-center text-sm">
						<span className="text-gray-500">Already a member? </span>
						<a
							href="/login"
							className="font-semibold
						hover:underline
					"
							style={{ color: "#41876a" }}
						>
							Sign in
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
