import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { orderService, type Order } from "../../services/api/orders";
import { ROUTES } from "../../constants";
import EmptyState from "../../components/common/EmptyState";
import styles from "./OrderConfirmation.module.css";

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getOrderById(id);
      setOrder(data);
    } catch (err) {
      console.error("Failed to fetch order:", err);
      setError("Failed to load order details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.stateWrap}>
        <p className={styles.stateMessage}>Loading order…</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <EmptyState
            icon="😕"
            title="Order not found"
            message={error || "Unable to find this order."}
            action={{ text: "View All Orders", to: ROUTES.ORDERS }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* Success header */}
        <div className={styles.successHeader}>
          <div className={styles.successIcon}>
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className={styles.successTitle}>Order Confirmed!</h1>
          <p className={styles.successSubtitle}>Thank you for your purchase</p>
        </div>

        {/* Order details card */}
        <div className={styles.card}>
          <div className={styles.orderMeta}>
            <div>
              <p className={styles.metaLabel}>Order Number</p>
              <p className={styles.metaValue}>{order.order_number}</p>
            </div>
            <div className={styles.metaRight}>
              <p className={styles.metaLabel}>Order Date</p>
              <p className={styles.metaValue}>
                {new Date(order.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <h3 className={styles.sectionTitle}>Items Purchased</h3>
          <ul className={styles.itemList}>
            {order.items.map((item, index) => (
              <li
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
              </li>
            ))}
          </ul>

          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total Paid</span>
            <span className={styles.totalAmount}>{order.total_amount} coins</span>
          </div>
        </div>

        {/* Info card */}
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className={styles.infoTitle}>Items Added to Inventory</h4>
            <p className={styles.infoText}>
              Your purchased items have been added to your inventory. You can view and manage them anytime.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Link to={ROUTES.INVENTORY} className={styles.primaryAction}>
            View Inventory
          </Link>
          <Link to={ROUTES.ORDERS} className={styles.secondaryAction}>
            View All Orders
          </Link>
          <Link to={ROUTES.HOME} className={styles.secondaryAction}>
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmation;
