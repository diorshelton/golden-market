import { useState } from "react";
import logo from "../assets/pegasus.svg";

// interface InputFieldProps {
// 	label: string;
// 	type: string;
// 	placeholder: string;
// 	value?: string;
// 	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

const Login: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	return (
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
						// style={{
						// 	background: "rgba(218, 184, 15, 0.95)",
						// 	boxShadow: "0 8px 32px rgba(19, 4, 4, 0.1)",
						// }}
						style={{
							backgroundImage:
								"linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
						}}
					>
						<img className="w-52 h-52" src={logo} />
					</div>
					<h1
						className="text-4xl font-bold text-transparent bg-clip-text"
						style={{
							backgroundImage:
								"linear-gradient(135deg, #f59f00 0%, #ffffff 100%)",
						}}
					>
						{" "}
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
					<form className="space-y-6">
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
								placeholder="you@example.com"
								className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-current transition-colors
								text-white placeholder-gray-500"
								style={{
									borderColor: "#41876a40",
									color: "#3434a5",
								}}
							/>
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
									placeholder="enter password"
									className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-current transition-colors pr-12
									text-white placeholder-gray-500
									"
									style={{
										borderColor: "#41876a40",
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
							className="w-full py-3 rounded-lg font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg"
							style={{
								background: "#3434a5",
							}}
						>
							SIGN IN
						</button>

						{/* Divider */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div
									className="w-full border-t"
									style={{ borderColor: "#41876a20" }}
								/>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="text-gray-500 px-2 ">Or continue with</span>
							</div>
						</div>

						{/* Social Login */}
						<div className="grid grid-cols-2 gap-3">
							<button
								type="button"
								className="flex items-center justify-center gap-2 py-3 rounded-lg border-2 font-medium transition-all hover:shadow-md"
								style={{
									borderColor: "#41876a40",
									color: "#3434a5",
								}}
							>
								<svg
									className="w-5 h-5"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										fill="#4285F4"
									/>
									<path
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										fill="#34A853"
									/>
									<path
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
										fill="#FBBC05"
									/>
									<path
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
										fill="#EA4335"
									/>
								</svg>
								Google
							</button>
							<button
								type="button"
								className="flex items-center justify-center gap-2 py-3 rounded-lg border-2 font-medium transition-all hover:shadow-md"
								style={{
									borderColor: "#41876a40",
									color: "#3434a5",
								}}
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
								</svg>
								GitHub
							</button>
						</div>
					</form>

					{/* Sign Up Link */}
					<div className="mt-6 text-center text-sm">
						<span className="text-gray-500">Don't have an account? </span>
						<button
							className="font-semibold hover:underline"
							style={{ color: "#41876a" }}
						>
							Sign up for free
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Login;
