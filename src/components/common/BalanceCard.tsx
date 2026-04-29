import { useAuth } from "../../hooks/useAuth";
import styles from "./BalanceCard.module.css";

const BalanceCard = () => {
  const { user } = useAuth();

  return (
    <div className={styles.card}>
      <span className={styles.label}>Your Balance</span>
      <span className={styles.amount}>
        {user?.coins?.toLocaleString() ?? 0} coins
      </span>
    </div>
  );
};

export default BalanceCard;
