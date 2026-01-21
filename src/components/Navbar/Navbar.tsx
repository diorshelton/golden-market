import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES, APP_NAME } from "../../constants";
import UserInfo from "./UserInfo";
import MobileMenu from "./MobileMenu";

const navLinks = [
	{ to: ROUTES.HOME, label: "Products" },
	{ to: ROUTES.CART, label: "Cart" },
	{ to: ROUTES.ORDERS, label: "Orders" },
	{ to: ROUTES.INVENTORY, label: "Inventory" },
];

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { user, isAuthenticated, logout } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate(ROUTES.LOGIN);
	};

	// Don't render on auth pages
	if (
		location.pathname === ROUTES.LOGIN ||
		location.pathname === ROUTES.REGISTER
	) {
		return null;
	}

	return (
		<header
			className="border-b sticky top-0 z-40"
			style={{
				background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
				borderColor: "#41876a40",
			}}
		>
			<div className="max-w-7xl mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<NavLink to={ROUTES.HOME} className="flex items-center gap-3">
						<h1
							className="text-2xl font-bold text-transparent bg-clip-text"
							style={{
								backgroundImage:
									"linear-gradient(135deg, #f59f00 0%, #ffffff 100%)",
							}}
						>
							{APP_NAME}
						</h1>
					</NavLink>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-1">
						{navLinks.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								className={({ isActive }) =>
									`px-4 py-2 rounded-lg font-medium transition-colors ${
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

					{/* Desktop User Info / Auth */}
					<div className="hidden md:flex items-center gap-4">
						{isAuthenticated && user ? (
							<>
								<UserInfo username={user.username} coins={user.coins} />
								<button
									onClick={handleLogout}
									className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
									style={{ background: "#7f0921" }}
								>
									Sign Out
								</button>
							</>
						) : (
							<NavLink
								to={ROUTES.LOGIN}
								className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
								style={{ background: "#3434a5" }}
							>
								Login
							</NavLink>
						)}
					</div>

					{/* Mobile Hamburger */}
					<button
						onClick={() => setMobileMenuOpen(true)}
						className="md:hidden text-white hover:text-gray-300 transition-colors"
						aria-label="Open menu"
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
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<MobileMenu
				isOpen={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
				isAuthenticated={isAuthenticated}
				user={user}
				onLogout={handleLogout}
			/>
		</header>
	);
};

export default Navbar;
