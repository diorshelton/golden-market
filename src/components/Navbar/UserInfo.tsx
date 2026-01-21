interface UserInfoProps {
	username: string;
	coins: number;
}

const UserInfo = ({ username, coins }: UserInfoProps) => {
	const initials = username.slice(0, 2).toUpperCase();

	return (
		<div className="flex items-center gap-3">
			{/* Coin balance */}
			<div className="flex items-center gap-1 text-white">
				<span>💰</span>
				<span className="font-medium">{coins.toLocaleString()}</span>
			</div>

			{/* User avatar */}
			<div
				className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-black cursor-pointer hover:scale-110 transition-transform"
				style={{
					background: "linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
					boxShadow: "0 0 20px rgba(245, 159, 0, 0.3)",
				}}
				title={username}
			>
				{initials}
			</div>
		</div>
	);
};

export default UserInfo;
