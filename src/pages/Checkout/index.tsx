import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartService, type CartItemDetail } from "../../services/api/cart";
import { orderService } from "../../services/api/orders";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants";
import PageHeader from "../../components/common/PageHeader";
import BalanceCard from "../../components/common/BalanceCard";
import EmptyState from "../../components/common/EmptyState";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [cartItems, setCartItems] = useState<CartItemDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cartService.getCart();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setError("Failed to load cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const insufficientBalance = Boolean(user && user.coins < total);

  const handlePlaceOrder = async () => {
    if (processing || cartItems.length === 0) return;

    setProcessing(true);
    setError(null);

    try {
      const order = await orderService.createOrder();

      try {
        await refreshUser();
      } catch (err) {
        console.error("Failed to refresh user balance:", err);
        // non-critical — order succeeded, balance will update on next load
      }

      navigate(`/orders/${order.id}/confirmation`);
    } catch (err: unknown) {
      console.error("Failed to create order:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : (err as { response?: { data?: string } })?.response?.data ||
            "Failed to place order. Please try again.";
      setError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.stateWrap}>
        <p className={styles.stateMessage}>Loading checkout…</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <PageHeader title="Checkout" />
          <EmptyState
            icon="🛒"
            title="Your cart is empty"
            message="Add some items before checking out!"
            action={{ text: "Browse Products", to: ROUTES.HOME }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <PageHeader
          title="Checkout"
          subtitle="Review your order and complete your purchase"
        />

        {error && (
          <div className={styles.errorBanner} role="alert">
            {error}
          </div>
        )}

        <div className={styles.layout}>
          {/* Order Items */}
          <div className={styles.itemsCard}>
            <h2 className={styles.sectionTitle}>
              Order Items ({cartItems.length})
            </h2>

            <ul className={styles.itemList}>
              {cartItems.map((item, index) => {
                const isImageUrl =
                  item.product.image_url?.startsWith("http") ||
                  item.product.image_url?.startsWith("/");

                return (
                  <li
                    key={item.cart_item_id}
                    className={`${styles.itemRow} ${index === cartItems.length - 1 ? styles.itemRowLast : ""}`}
                  >
                    <div className={styles.itemImage}>
                      {isImageUrl ? (
                        <img src={item.product.image_url!} alt={item.product.name} />
                      ) : (
                        <span>{item.product.image_url || "📦"}</span>
                      )}
                    </div>

                    <div className={styles.itemDetails}>
                      <span className={styles.itemName}>{item.product.name}</span>
                      <span className={styles.itemUnit}>
                        {item.product.price} coins × {item.quantity}
                      </span>
                    </div>

                    <span className={styles.itemSubtotal}>{item.subtotal} coins</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Order Summary */}
          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalAmount}>{total} coins</span>
            </div>

            <BalanceCard />

            {insufficientBalance && (
              <p className={styles.balanceWarning}>
                Insufficient balance to complete this order.
              </p>
            )}

            <button
              className={styles.placeOrderBtn}
              onClick={handlePlaceOrder}
              disabled={processing || insufficientBalance}
            >
              {processing ? (
                <span className={styles.spinner}>
                  <svg className={styles.spinnerIcon} viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4"
                      className={styles.spinnerTrack}
                    />
                    <path
                      fill="currentColor"
                      className={styles.spinnerHead}
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing…
                </span>
              ) : (
                "Place Order"
              )}
            </button>

            <Link to={ROUTES.CART} className={styles.backLink}>
              Back to Cart
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
