import { Link } from "react-router-dom";
import styles from "./EmptyState.module.css";

interface Props {
  icon: string;
  title: string;
  message: string;
  action?: {
    label: string;
    to: string;
  };
}

const EmptyState = ({ icon, title, message, action }: Props) => (
  <div className={styles.card}>
    <span className={styles.icon}>{icon}</span>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.message}>{message}</p>
    {action && (
      <Link to={action.to} className={styles.action}>
        {action.label}
      </Link>
    )}
  </div>
);

export default EmptyState;
