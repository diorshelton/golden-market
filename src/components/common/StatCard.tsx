import styles from "./StatCard.module.css";

interface Props {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: Props) => (
  <div className={styles.card}>
    <p className={styles.label}>{label}</p>
    <p className={styles.value}>{value}</p>
  </div>
);

export default StatCard;
