import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validators } from "../utils/validators";
import { ROUTES } from "../constants";
import logo from "../assets/pegasus.svg";

const Login: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({
		email: "",
		password: "",
		general: "",
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
		// Clear error for this field when user types
		setErrors({
			...errors,
			[name]: "",
			general: "",
		});
	};

	const validateForm = (): boolean => {
		const emailError = validators.email(formData.email);
		const passwordError = validators.password(formData.password);

		setErrors({
			email: emailError || "",
			password: passwordError || "",
			general: "",
		});

		return !emailError && !passwordError;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);
		setErrors({ email: "", password: "", general: "" });

		try {
			await login(formData.email, formData.password);
			navigate(ROUTES.PROFILE);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setErrors({
				...errors,
				general: err.response?.data?.error || "Login failed. Please try again.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div
				className="min-h-screen flex items-center justify-center p-4"
				style={{
					background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
				}}
			>
				<div className="w-full max-w-md">
					{/* Logo/Brand */}
					<div className="text-center mb-8">
						<div
							className="inline-block p-0 rounded-full mb-0"
							style={{
								backgroundImage:
									"linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
							}}
						>
							<img className="w-52 h-52" src={logo} />
						</div>
						<h1
							className="text-4xl font-bold text-transparent bg-clip-text mb-4"
							style={{
								backgroundImage:
									"linear-gradient(135deg, #f59f00 0%, #ffffff 100%)",
							}}
						>
							Golden Market
						</h1>
						<p className="text-white text-opacity-90">
							Welcome back! Sign in to continue
						</p>
					</div>

					{/* Login Card */}
					<div
						className="rounded-2xl p-8 backdrop-blur-lg"
						style={{
							background: "rgba(255, 255, 255, 0.95)",
							boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
						}}
					>
						{errors.general && (
							<div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
								{errors.general}
							</div>
						)}
						<form className="space-y-6" onSubmit={handleSubmit}>
							{/* Email */}
							<div>
								<label
									className="block text-sm font-semibold mb-2"
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
									className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-current transition-colors
								text-white placeholder-gray-500"
									style={{
										borderColor: errors.email ? "#ef4444" : "#41876a40",
										color: "#3434a5",
									}}
								/>
								{errors.email && (
									<p className="mt-1 text-sm text-red-600">{errors.email}</p>
								)}
							</div>

							{/* Password */}
							<div>
								<label
									className="block text-sm font-semibold mb-2"
									style={{ color: "#3434a5" }}
								>
									PASSWORD
								</label>
								<div className="relative">
									<input
										type={showPassword ? "text" : "password"}
										name="password"
										value={formData.password}
										onChange={handleChange}
										placeholder="enter password"
										className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-current transition-colors pr-12
									text-white placeholder-gray-500"
										style={{
											borderColor: errors.password ? "#ef4444" : "#41876a40",
											color: "#3434a5",
										}}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
										style={{ color: "#3434a5" }}
									>
										{showPassword ? (
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
												/>
											</svg>
										) : (
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
												/>
											</svg>
										)}
									</button>
								</div>
								{errors.password && (
									<p className="mt-1 text-sm text-red-600">{errors.password}</p>
								)}
							</div>

							{/* Remember & Forgot */}
							<div className="flex items-center justify-between text-sm">
								<label className="flex items-center cursor-pointer">
									<input
										type="checkbox"
										className="mr-2 w-4 h-4 rounded"
										style={{ accentColor: "#41876a" }}
									/>
									<span style={{ color: "#3434a5" }}>Remember me</span>
								</label>
								<a
									href="#"
									className="font-medium hover:underline"
									style={{ color: "#41876a" }}
								>
									Forgot password?
								</a>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={loading}
								className="w-full py-3 rounded-lg font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
								style={{
									background: "#3434a5",
								}}
							>
								{loading ? "SIGNING IN..." : "SIGN IN"}
							</button>

							{/* Divider */}
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div
										className="w-full border-t"
										style={{ borderColor: "#41876a20" }}
									/>
								</div>
							</div>
						</form>

						{/* Sign Up Link */}
						<div className="mt-6 text-center text-sm">
							<span className="text-gray-500">Don't have an account? </span>
							<Link
								to={ROUTES.REGISTER}
								className="font-semibold hover:underline"
								style={{ color: "#41876a" }}
							>
								Sign up for free
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;