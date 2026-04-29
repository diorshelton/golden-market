import styles from "./QuantityControl.module.css";

interface Props {
  quantity: number;
  max: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

const QuantityControl = ({ quantity, max, onDecrement, onIncrement }: Props) => (
  <div className={styles.control}>
    <button
      className={styles.btn}
      onClick={onDecrement}
      aria-label="Decrease quantity"
    >
      −
    </button>
    <span className={styles.value}>{quantity}</span>
    <button
      className={styles.btn}
      onClick={onIncrement}
      disabled={quantity >= max}
      aria-label="Increase quantity"
    >
      +
    </button>
  </div>
);

export default QuantityControl;
