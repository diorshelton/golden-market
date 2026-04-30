import type { InventoryItem } from "../../services/api/inventory";
import styles from "./InventoryCard.module.css";

interface Props {
  item: InventoryItem;
}

const InventoryCard = ({ item }: Props) => {
  const isImageUrl =
    item.product.image_url?.startsWith("http") ||
    item.product.image_url?.startsWith("/");

  return (
    <div className={styles.card}>
      <div className={styles.imageArea}>
        {isImageUrl ? (
          <img src={item.product.image_url!} alt={item.product.name} />
        ) : (
          <span>{item.product.image_url || "📦"}</span>
        )}
        <span className={styles.qtyBadge}>×{item.quantity}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{item.product.name}</h3>
        <p className={styles.description}>{item.product.description}</p>

        <div className={styles.valueRow}>
          <div>
            <p className={styles.valueLabel}>Unit Value</p>
            <p className={styles.valueAmount}>{item.product.price} coins</p>
          </div>
          <div className={styles.totalValueGroup}>
            <p className={styles.valueLabel}>Total Value</p>
            <p className={styles.totalValue}>
              {(item.product.price * item.quantity).toLocaleString()} coins
            </p>
          </div>
        </div>

        <p className={styles.acquired}>
          Acquired:{" "}
          {new Date(item.acquired_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default InventoryCard;
