import type { CartItemDetail } from "../../services/api/cart";
import QuantityControl from "./QuantityControl";
import styles from "./CartItemCard.module.css";

interface Props {
  item: CartItemDetail;
  error: string | null;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemove: (cartItemId: string) => void;
}

const CartItemCard = ({ item, error, onUpdateQuantity, onRemove }: Props) => {
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
      </div>

      <div className={styles.details}>
        <h3 className={styles.name}>{item.product.name}</h3>
        <p className={styles.description}>{item.product.description}</p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.footer}>
          <QuantityControl
            quantity={item.quantity}
            max={item.product.stock}
            onDecrement={() => onUpdateQuantity(item.cart_item_id, item.quantity - 1)}
            onIncrement={() => onUpdateQuantity(item.cart_item_id, item.quantity + 1)}
          />

          <div className={styles.priceGroup}>
            <span className={styles.subtotal}>{item.subtotal} coins</span>
            <span className={styles.unitPrice}>
              {item.product.price} × {item.quantity}
            </span>
          </div>

          <button
            className={styles.removeBtn}
            onClick={() => onRemove(item.cart_item_id)}
            aria-label="Remove item"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
