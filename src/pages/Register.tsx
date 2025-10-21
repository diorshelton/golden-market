const Register: React.FC = () => (
	<div
		className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
		style={{
			background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
		}}
	>
		<div className="w-full max-w-2xl relative z-10">
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold text-white mb-2">
					Join Golden Market
				</h1>
				<p className="text-white-text-opacity-90">Become a member today</p>
			</div>

			{/* Register Card */}
			<div
				className="rounded-2xl p-8 backdrop-blur-xl"
				style={{
					background: "rgba(255, 255, 255, 0.95)",
					boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
				}}
			>
				<form className="space-y-5">
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
								placeholder="First Name"
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
								placeholder="Last Name"
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
							placeholder="Username"
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
							placeholder="you@example.com"
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
						className="w-full py-4 rounded-xl font-bold text-white tracking-wide
						transition-all transform hover:scale-105 active:scale-95
						"
						style={{
							background: "#3434a5",
						}}
					>
						CREATE ACCOUNT
					</button>
				</form>
				<div className="mt-6 text-center text-sm">
					<span className="text-gray-500">Already a member? </span>
					<button
						className="font-semibold
						hover:underline
					"
						style={{ color: "#41876a" }}
					>
						Sign in
					</button>
				</div>
			</div>
		</div>
	</div>
);

export default Register;
