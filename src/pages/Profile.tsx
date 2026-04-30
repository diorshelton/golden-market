import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userService, authService } from "../services/api";
import { orderService } from "../services/api/orders";
import { inventoryService } from "../services/api/inventory";
import StatCard from "../components/common/StatCard";
import styles from "./Profile.module.css";

interface UserProfile {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  balance: number;
  created_at: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orderCount, setOrderCount] = useState<number | null>(null);
  const [itemCount, setItemCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profileData: UserProfile = await userService.getProfile() as UserProfile;
      setProfile(profileData);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to load profile");
      setLoading(false);
      return;
    }

    try {
      const [orders, inventory] = await Promise.all([
        orderService.getOrders(),
        inventoryService.getInventory(),
      ]);
      setOrderCount(orders.length);
      setItemCount(inventory.reduce((sum, item) => sum + item.quantity, 0));
    } catch (err) {
      console.error("Failed to load order/inventory counts:", err);
      // non-critical — profile loaded successfully, counts stay as null (—)
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className={styles.stateWrap}>
        <p className={styles.stateMessage}>Loading profile…</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className={styles.stateWrap}>
        <p className={styles.errorText}>{error || "Failed to load profile"}</p>
        <button className={styles.retryButton} onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* Welcome banner */}
        <div className={styles.banner}>
          <h2 className={styles.bannerTitle}>
            Welcome back, {profile.first_name}!
          </h2>
          <p className={styles.bannerSub}>
            Member since {new Date(profile.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <StatCard label="Coin Balance" value={profile.balance.toLocaleString()} />
          <StatCard label="Orders" value={orderCount ?? "—"} />
          <StatCard label="Items Owned" value={itemCount ?? "—"} />
        </div>

        {/* Profile details */}
        <div className={styles.detailsCard}>
          <h3 className={styles.detailsTitle}>Profile Information</h3>

          <div className={styles.detailsGrid}>
            <div className={styles.field}>
              <p className={styles.fieldLabel}>Username</p>
              <p className={styles.fieldValue}>@{profile.username}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.fieldLabel}>User ID</p>
              <p className={styles.fieldValueMono}>{profile.id}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.fieldLabel}>Full Name</p>
              <p className={styles.fieldValue}>{profile.first_name} {profile.last_name}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.fieldLabel}>Email</p>
              <p className={styles.fieldValue}>{profile.email}</p>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
