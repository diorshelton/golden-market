const RegisterPage = () => (
	<div
		className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
		style={{ background: "#0a0a0a" }}
	>
		<div
			className="absolute inset-0 opacity-30"
			style={{
				background:
					"radial-gradient(circle at 80% 20%, #3434a5 0%, transparent 50%), radial-gradient(circle at 20% 80%, #7f0921 0%, transparent 50%)",
			}}
		></div>

		<div className="w-full max-w-2xl relative z-10">
			<div className="text-center mb-8">
				<h1
					className="text-4xl font-bold mb-2 text-transparent bg-clip-text"
					style={{
						backgroundImage:
							"linear-gradient(135deg, #f59f00 0%, #ffffff 50%, #f59f00 100%)",
					}}
				>
					Join Golden Market
				</h1>
				<p className="text-gray-400">Become a premium member today</p>
			</div>

			<div
				className="rounded-2xl p-8 backdrop-blur-xl"
				style={{
					background:
						"linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)",
					border: "1px solid rgba(245, 159, 0, 0.2)",
					boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
				}}
			>
				<form className="space-y-5">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								className="block text-sm font-semibold mb-2 tracking-wide"
								style={{ color: "#f59f00" }}
							>
								FIRST NAME
							</label>
							<input
								type="text"
								placeholder="John"
								className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500"
								style={{
									background: "rgba(0, 0, 0, 0.5)",
									border: "1px solid rgba(245, 159, 0, 0.3)",
								}}
							/>
						</div>
						<div>
							<label
								className="block text-sm font-semibold mb-2 tracking-wide"
								style={{ color: "#f59f00" }}
							>
								LAST NAME
							</label>
							<input
								type="text"
								placeholder="Doe"
								className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500"
								style={{
									background: "rgba(0, 0, 0, 0.5)",
									border: "1px solid rgba(245, 159, 0, 0.3)",
								}}
							/>
						</div>
					</div>

					<div>
						<label
							className="block text-sm font-semibold mb-2 tracking-wide"
							style={{ color: "#f59f00" }}
						>
							USERNAME
						</label>
						<input
							type="text"
							placeholder="johndoe"
							className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500"
							style={{
								background: "rgba(0, 0, 0, 0.5)",
								border: "1px solid rgba(245, 159, 0, 0.3)",
							}}
						/>
					</div>

					<div>
						<label
							className="block text-sm font-semibold mb-2 tracking-wide"
							style={{ color: "#f59f00" }}
						>
							EMAIL
						</label>
						<input
							type="email"
							placeholder="john@example.com"
							className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500"
							style={{
								background: "rgba(0, 0, 0, 0.5)",
								border: "1px solid rgba(245, 159, 0, 0.3)",
							}}
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								className="block text-sm font-semibold mb-2 tracking-wide"
								style={{ color: "#f59f00" }}
							>
								PASSWORD
							</label>
							<input
								type="password"
								placeholder="Min. 8 characters"
								className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500"
								style={{
									background: "rgba(0, 0, 0, 0.5)",
									border: "1px solid rgba(245, 159, 0, 0.3)",
								}}
							/>
						</div>
						<div>
							<label
								className="block text-sm font-semibold mb-2 tracking-wide"
								style={{ color: "#f59f00" }}
							>
								CONFIRM
							</label>
							<input
								type="password"
								placeholder="Re-enter"
								className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500"
								style={{
									background: "rgba(0, 0, 0, 0.5)",
									border: "1px solid rgba(245, 159, 0, 0.3)",
								}}
							/>
						</div>
					</div>

					<button
						type="submit"
						className="w-full py-4 rounded-xl font-bold text-black tracking-wide"
						style={{
							background: "linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
							boxShadow: "0 10px 40px rgba(245, 159, 0, 0.3)",
						}}
					>
						CREATE ACCOUNT
					</button>
				</form>

				<div className="mt-6 text-center text-sm">
					<span className="text-gray-500">Already a member? </span>
					<button
						className="font-semibold"
						style={{ color: "#f59f00" }}
					>
						Sign in
					</button>
				</div>
			</div>
		</div>
	</div>
);

export default RegisterPage