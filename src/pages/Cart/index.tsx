import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartService, type CartItemDetail } from "../../services/api/cart";
import { ROUTES } from "../../constants";
import CartItemCard from "./CartItemCard";
import BalanceCard from "../../components/common/BalanceCard";
import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";
import styles from "./Cart.module.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);
  const [itemErrors, setItemErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setPageError(null);
      const data = await cartService.getCart();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setPageError("Failed to load cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const setItemError = (cartItemId: string, message: string) => {
    setItemErrors((prev) => ({ ...prev, [cartItemId]: message }));
  };

  const clearItemError = (cartItemId: string) => {
    setItemErrors((prev) => {
      const next = { ...prev };
      delete next[cartItemId];
      return next;
    });
  };

  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(cartItemId);
      return;
    }

    clearItemError(cartItemId);

    // Optimistic update
    setCartItems((items) =>
      items.map((item) =>
        item.cart_item_id === cartItemId
          ? { ...item, quantity: newQuantity, subtotal: item.product.price * newQuantity }
          : item,
      ),
    );

    try {
      await cartService.updateCartItem(cartItemId, newQuantity);
    } catch (err) {
      console.error("Failed to update quantity:", err);
      setItemError(cartItemId, "Failed to update quantity.");
      fetchCart();
    }
  };

  const removeItem = async (cartItemId: string) => {
    clearItemError(cartItemId);

    // Optimistic update
    setCartItems((items) => items.filter((item) => item.cart_item_id !== cartItemId));

    try {
      await cartService.removeFromCart(cartItemId);
    } catch (err) {
      console.error("Failed to remove item:", err);
      setItemError(cartItemId, "Failed to remove item.");
      fetchCart();
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  if (loading) {
    return (
      <div className={styles.stateWrap}>
        <p className={styles.stateMessage}>Loading cart…</p>
      </div>
    );
  }

  if (pageError) {
    return (
      <div className={styles.stateWrap}>
        <p className={styles.errorText}>{pageError}</p>
        <button className={styles.retryButton} onClick={fetchCart}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <PageHeader
          title="Your Cart"
          subtitle={`${cartItems.length} ${cartItems.length === 1 ? "item" : "items"} in your basket`}
        />

        <div className={styles.layout}>
          {/* Cart Items */}
          <div className={styles.items}>
            {cartItems.length === 0 ? (
              <EmptyState
                icon="🛒"
                title="Your cart is empty"
                message="Add some items from the market!"
                action={{ label: "Browse Products", to: ROUTES.HOME }}
              />
            ) : (
              cartItems.map((item) => (
                <CartItemCard
                  key={item.cart_item_id}
                  item={item}
                  error={itemErrors[item.cart_item_id] ?? null}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))
            )}
          </div>

          {/* Order Summary */}
          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalAmount}>{total} coins</span>
            </div>

            <BalanceCard />

            <button
              className={styles.checkoutBtn}
              onClick={() => navigate(ROUTES.CHECKOUT)}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>

            <Link to={ROUTES.HOME} className={styles.continueLink}>
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
