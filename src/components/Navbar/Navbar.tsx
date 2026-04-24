import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES, APP_NAME } from "../../constants";
import UserInfo from "./UserInfo";
import MobileMenu from "./MobileMenu";
import PegasusIcon from "../common/PegasusIcon";
import styles from "./Navbar.module.css";

const navLinks = [
  { to: ROUTES.HOME, label: "Market" },
  { to: ROUTES.CART, label: "Cart" },
  { to: ROUTES.ORDERS, label: "Orders" },
  { to: ROUTES.INVENTORY, label: "Inventory" },
  { to: ROUTES.PROFILE, label: "Profile" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.row}>
          {/* Brand */}
          <NavLink to={ROUTES.HOME} className={styles.brand}>
            <div className={styles.navMark}>
              <PegasusIcon width={38} height={38} />
            </div>
            <span className={styles.wordmark}>{APP_NAME}</span>
          </NavLink>

          {/* Desktop nav links */}
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className={styles.actions}>
            {isAuthenticated && user ? (
              <UserInfo username={user.username} coins={user.coins} />
            ) : (
              <NavLink to={ROUTES.LOGIN} className={styles.signInPill}>
                Sign In
              </NavLink>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={styles.hamburger}
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
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
