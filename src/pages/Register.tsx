import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validators } from "../utils/validators";
import { ROUTES } from "../constants";

const Register: React.FC = () => {
	const [formData, setFormData] = useState({
		username: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({
		username: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		general: "",
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { register } = useAuth();

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
		const usernameError = validators.username(formData.username);
		const firstNameError = !formData.firstName ? "First name is required" : "";
		const lastNameError = !formData.lastName ? "Last name is required" : "";
		const emailError = validators.email(formData.email);
		const passwordError = validators.password(formData.password);
		const confirmPasswordError = validators.confirmPassword(
			formData.password,
			formData.confirmPassword
		);

		setErrors({
			username: usernameError || "",
			firstName: firstNameError || "",
			lastName: lastNameError || "",
			email: emailError || "",
			password: passwordError || "",
			confirmPassword: confirmPasswordError || "",
			general: "",
		});

		return (
			!usernameError &&
			!firstNameError &&
			!lastNameError &&
			!emailError &&
			!passwordError &&
			!confirmPasswordError
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);
		setErrors({
			username: "",
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			general: "",
		});

		try {
			await register(
				formData.username,
				formData.firstName,
				formData.lastName,
				formData.email,
				formData.password,
				formData.confirmPassword
			);
			// User is automatically logged in after registration
			navigate(ROUTES.PROFILE);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setErrors({
				...errors,
				general:
					err.response?.data?.error || "Registration failed. Please try again.",
			});
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
					<p className="text-white text-opacity-90">Become a member today!</p>
				</div>

				{/* Register Card */}
				<div
					className="rounded-2xl p-8 backdrop-blur-xl"
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

					<form className="space-y-5" onSubmit={handleSubmit}>
						{/* Username */}
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
								className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-current placeholder-gray-500"
								style={{
									borderColor: errors.username ? "#ef4444" : "#41876a40",
									color: "#3434a5",
								}}
							/>
							{errors.username && (
								<p className="mt-1 text-sm text-red-600">{errors.username}</p>
							)}
						</div>

						{/* First and Last Name */}
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
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									placeholder="First name"
									className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-current placeholder-gray-500"
									style={{
										borderColor: errors.firstName ? "#ef4444" : "#41876a40",
										color: "#3434a5",
									}}
								/>
								{errors.firstName && (
									<p className="mt-1 text-sm text-red-600">
										{errors.firstName}
									</p>
								)}
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
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									placeholder="Last name"
									className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-current placeholder-gray-500"
									style={{
										borderColor: errors.lastName ? "#ef4444" : "#41876a40",
										color: "#3434a5",
									}}
								/>
								{errors.lastName && (
									<p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
								)}
							</div>
						</div>

						{/* Email */}
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
								className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none placeholder-gray-500"
								style={{
									borderColor: errors.email ? "#ef4444" : "#41876a40",
									color: "#3434a5",
								}}
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600">{errors.email}</p>
							)}
						</div>

						{/* Password Fields */}
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
									placeholder="Min. 8 characters"
									className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-current placeholder-gray-500"
									style={{
										borderColor: errors.password ? "#ef4444" : "#41876a40",
										color: "#3434a5",
									}}
								/>
								{errors.password && (
									<p className="mt-1 text-sm text-red-600">{errors.password}</p>
								)}
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
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleChange}
									placeholder="Re-enter Password"
									className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-current placeholder-gray-500"
									style={{
										borderColor: errors.confirmPassword
											? "#ef4444"
											: "#41876a40",
										color: "#3434a5",
									}}
								/>
								{errors.confirmPassword && (
									<p className="mt-1 text-sm text-red-600">
										{errors.confirmPassword}
									</p>
								)}
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-4 rounded-xl font-bold text-white tracking-wide transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
							style={{
								background: "#3434a5",
							}}
						>
							{loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
						</button>
					</form>

					<div className="mt-6 text-center text-sm">
						<span className="text-gray-500">Already a member? </span>
						<Link
							to={ROUTES.LOGIN}
							className="font-semibold hover:underline"
							style={{ color: "#41876a" }}
						>
							Sign in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
