import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants";
import UserInfo from "./UserInfo";

interface MobileMenuProps {
	isOpen: boolean;
	onClose: () => void;
	isAuthenticated: boolean;
	user: { username: string; coins: number } | null;
	onLogout: () => void;
}

const navLinks = [
	{ to: ROUTES.HOME, label: "Products" },
	{ to: ROUTES.CART, label: "Cart" },
	{ to: ROUTES.ORDERS, label: "Orders" },
	{ to: ROUTES.INVENTORY, label: "Inventory" },
];

const MobileMenu = ({
	isOpen,
	onClose,
	isAuthenticated,
	user,
	onLogout,
}: MobileMenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 md:hidden">
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/50" />

			{/* Menu panel */}
			<div
				ref={menuRef}
				className="absolute right-0 top-0 h-full w-72 p-6"
				style={{
					background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
				}}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
					aria-label="Close menu"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{/* User info */}
				{isAuthenticated && user && (
					<div className="mb-8 pt-8">
						<UserInfo username={user.username} coins={user.coins} />
					</div>
				)}

				{/* Nav links */}
				<nav className="flex flex-col gap-2">
					{navLinks.map((link) => (
						<NavLink
							key={link.to}
							to={link.to}
							onClick={onClose}
							className={({ isActive }) =>
								`px-4 py-3 rounded-lg font-medium transition-colors ${
									isActive
										? "bg-white/20 text-white"
										: "text-white/80 hover:bg-white/10 hover:text-white"
								}`
							}
						>
							{link.label}
						</NavLink>
					))}
				</nav>

				{/* Auth button */}
				<div className="mt-8">
					{isAuthenticated ? (
						<button
							onClick={() => {
								onLogout();
								onClose();
							}}
							className="w-full px-4 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
							style={{ background: "#7f0921" }}
						>
							Sign Out
						</button>
					) : (
						<NavLink
							to={ROUTES.LOGIN}
							onClick={onClose}
							className="block w-full px-4 py-3 rounded-lg text-white font-medium text-center hover:opacity-90 transition-opacity"
							style={{ background: "#3434a5" }}
						>
							Login
						</NavLink>
					)}
				</div>
			</div>
		</div>
	);
};

export default MobileMenu;
