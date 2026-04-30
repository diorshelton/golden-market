import { useState, useEffect } from "react";
import { orderService, type Order } from "../../services/api/orders";
import { ROUTES } from "../../constants";
import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";
import OrderCard from "./OrderCard";
import styles from "./Orders.module.css";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getOrders();
      setOrders(data || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className={styles.stateWrap}>
        <p className={styles.stateMessage}>Loading orders…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateWrap}>
        <p className={styles.errorText}>{error}</p>
        <button className={styles.retryButton} onClick={fetchOrders}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <PageHeader
          title="Order History"
          subtitle={`${orders.length} ${orders.length === 1 ? "order" : "orders"} placed`}
        />

        {orders.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No orders yet"
            message="Start shopping to see your order history here!"
            action={{ text: "Browse Products", to: ROUTES.HOME }}
          />
        ) : (
          <div className={styles.list}>
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={expandedOrder === order.id}
                onToggle={toggleOrderExpand}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
