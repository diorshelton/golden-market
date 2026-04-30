import type { Order } from "../../services/api/orders";
import styles from "./OrderCard.module.css";

interface Props {
  order: Order;
  isExpanded: boolean;
  onToggle: (orderId: string) => void;
}

const statusStyle: Record<string, string> = {
  completed: styles.statusCompleted,
  pending: styles.statusPending,
  failed: styles.statusFailed,
};

const OrderCard = ({ order, isExpanded, onToggle }: Props) => (
  <div className={styles.card}>
    <button className={styles.header} onClick={() => onToggle(order.id)}>
      <div className={styles.headerLeft}>
        <span className={styles.orderNumber}>{order.order_number}</span>
        <span className={styles.date}>
          {new Date(order.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className={styles.itemCount}>
          {order.items.length} {order.items.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className={styles.headerRight}>
        <span className={styles.total}>{order.total_amount} coins</span>
        <span className={`${styles.status} ${statusStyle[order.status] ?? styles.statusFailed}`}>
          {order.status.toUpperCase()}
        </span>
        <svg
          className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ""}`}
          width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>

    {isExpanded && (
      <div className={styles.details}>
        {order.items.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.itemRow} ${index === order.items.length - 1 ? styles.itemRowLast : ""}`}
          >
            <div className={styles.itemDetails}>
              <span className={styles.itemName}>{item.product_name}</span>
              <span className={styles.itemUnit}>
                {item.price_per_unit} coins × {item.quantity}
              </span>
            </div>
            <span className={styles.itemSubtotal}>{item.subtotal} coins</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default OrderCard;
