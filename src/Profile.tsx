const ProfilePage = () => {
	return (
		//background
		<div className="min-h-screen" style={{ background: "#ded6d6" }}>
			{/* banner */}
			<header
				className="border-b"
				style={{
					background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
					border: "1px solid #41876a40",
				}}
			>
				<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						{/* logo */}
						<div
							className="p-2 rounded-lg"
							style={
								{
									// background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
								}
							}
						></div>
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
						className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-black"
						style={{
							background: "linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
							boxShadow: "0 0 20px rgba(245, 159, 0, 0.3)",
						}}
					>
						JD
					</div>
				</div>
			</header>
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div
					className="rounded-2xl p-10 mb-8 relative overflow-hidden"
					style={{
						background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
					}}
				>
					<h2
						className="text-3xl font-bold  mb-1"
						style={{ color: "#ded6d6" }}
					>
						Welcome back, John!
					</h2>
				</div>
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
							2,450
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
							7
						</p>
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
							24
						</p>
					</div>
				</div>
				<div
					className="rounded-xl p-8"
					style={{
						background:
							"linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)",
						border: "1px solid rgba(65, 135, 106, 0.251)",
					}}
				>
					<h3 className="text-2xl font-bold mb-6" style={{ color: "#ded6d6" }}>
						Profile
					</h3>
					<div className="grid grid-cols-2 gap-6 text-gray-300">
						<div>
							<p className="text-sm text-white-500 mb-1">Name</p>
							<p className="text-lg">John Doe</p>
						</div>
						<div>
							<p className="text-sm text-white-500 mb-1">Email</p>
							<p className="text-lg">john@example.com</p>
						</div>
					</div>
					<button
						className="mt-8 px-6 py-2 rounded-lg text-white font-medium"
						style={{ background: "#7f0921" }}
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
