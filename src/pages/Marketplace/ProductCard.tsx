import type { Product } from "../../services/api/products";
import styles from "./ProductCard.module.css";

const categoryIcons: Record<string, string> = {
	Weapons: "⚔️",
	Armor: "🛡️",
	Potions: "🧪",
	Special: "✨",
	Food: "🍖",
	Tools: "🔧",
	Magic: "🪄",
	Accessories: "💍",
};

interface ProductCardProps {
	product: Product;
	onAddToCart: (productId: string) => void;
	isAdding: boolean;
}

const ProductCard = ({ product, onAddToCart, isAdding }: ProductCardProps) => {
	const isOutOfStock = product.stock === 0;
	const isLowStock = product.stock > 0 && product.stock <= 3;

	return (
		<div className={styles.card}>
			{/* Image area */}
			<div className={styles.imageArea}>
				{product.image_url?.startsWith("http") || product.image_url?.startsWith("/") ? (
					<img src={product.image_url} alt={product.name} />
				) : (
					<span>{product.image_url || categoryIcons[product.category] || "📦"}</span>
				)}
			</div>

			{/* Body */}
			<div className={styles.body}>
				<div className={styles.header}>
					<h3 className={styles.name}>{product.name}</h3>
					<span className={styles.categoryBadge}>{product.category}</span>
				</div>

				<p className={styles.description}>{product.description}</p>

				{isLowStock && <p className={styles.stockLow}>Only {product.stock} left</p>}
				{isOutOfStock && <p className={styles.stockOut}>Out of stock</p>}

				<div className={styles.footer}>
					<div className={styles.priceRow}>
						<span className={`${styles.price}${isOutOfStock ? ` ${styles.muted}` : ""}`}>
							{product.price}
						</span>
						<span className={styles.priceUnit}>coins</span>
					</div>
					<button
						className={styles.addButton}
						onClick={() => onAddToCart(product.id)}
						disabled={isAdding || isOutOfStock}
					>
						{isAdding ? "Adding…" : "Add to Cart"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
