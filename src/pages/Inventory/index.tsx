import { useState, useEffect } from "react";
import { inventoryService, type InventoryItem } from "../../services/api/inventory";
import { ROUTES } from "../../constants";
import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";
import StatCard from "../../components/common/StatCard";
import InventoryCard from "./InventoryCard";
import styles from "./Inventory.module.css";

const Inventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await inventoryService.getInventory();
      setInventory(data || []);
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
      setError("Failed to load inventory. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventory.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className={styles.stateWrap}>
        <p className={styles.stateMessage}>Loading inventory…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateWrap}>
        <p className={styles.errorText}>{error}</p>
        <button className={styles.retryButton} onClick={fetchInventory}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <PageHeader
          title="My Inventory"
          subtitle={`${totalItems} ${totalItems === 1 ? "item" : "items"} owned`}
        />

        {inventory.length === 0 ? (
          <EmptyState
            icon="📦"
            title="Your inventory is empty"
            message="Purchase items from the market to add them to your inventory!"
            action={{ text: "Browse Products", to: ROUTES.HOME }}
          />
        ) : (
          <>
            <div className={styles.statsGrid}>
              <StatCard label="Total Items" value={totalItems} />
              <StatCard label="Unique Products" value={inventory.length} />
              <StatCard
                label="Total Value"
                value={`${totalValue.toLocaleString()} coins`}
              />
            </div>

            <div className={styles.grid}>
              {inventory.map((item) => (
                <InventoryCard key={item.product_id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Inventory;
