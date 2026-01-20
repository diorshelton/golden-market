interface HeaderProps {
	userInitials: string;
}

const Header = ({ userInitials }: HeaderProps) => {
	return (
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

				<div className="flex items-center gap-4">
					<button
						className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
						style={{ background: "#3434a5" }}
					>
						My Profile
					</button>
					<div
						className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-black cursor-pointer hover:scale-110 transition-transform"
						style={{
							background: "linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
							boxShadow: "0 0 20px rgba(245, 159, 0, 0.3)",
						}}
					>
						{userInitials}
					</div>
				</div>
			</div>
		</header>
	);
};
export default Header;
