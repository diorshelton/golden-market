import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productService, type Product } from "../../services/api/products";
import { cartService } from "../../services/api/cart";
import { useAuth } from "../../hooks/useAuth";
import PegasusIcon from "../../components/common/PegasusIcon";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import styles from "./Marketplace.module.css";

const Marketplace = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [addingToCart, setAddingToCart] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const data = await productService.getProducts();
				setProducts(data);
			} catch (err) {
				setError("Failed to load products");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	const handleAddToCart = async (productId: string) => {
		if (!isAuthenticated) {
			navigate("/login");
			return;
		}
		const product = products.find((p) => p.id === productId);
		if (!product || product.stock === 0) return;

		setAddingToCart(productId);
		try {
			await cartService.addToCart(productId, 1);
		} catch (err) {
			console.error("Failed to add to cart:", err);
		} finally {
			setAddingToCart(null);
		}
	};

	const categories = ["All", ...new Set(products.map((p) => p.category))];

	const filteredProducts = products.filter((product) => {
		const matchesCategory =
			selectedCategory === "All" || product.category === selectedCategory;
		const matchesSearch =
			product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch && product.is_available;
	});

	return (
		<div>
			{/* Hero */}
			<section className={styles.hero}>
				<div className={styles.heroMark}>
					<PegasusIcon width={70} height={70} />
				</div>
				<h1 className={styles.heroTitle}>Welcome to Golden Market</h1>
				<p className={styles.heroSubtitle}>
					Discover legendary items and rare treasures from across the realm
				</p>
				<div className={styles.searchWrap}>
					<input
						type="text"
						placeholder="Search for items…"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className={styles.searchInput}
					/>
				</div>
			</section>

			{/* Main content */}
			<div className={styles.content}>
				{loading && (
					<p className={styles.stateMessage}>Loading products...</p>
				)}

				{error && (
					<div className={styles.errorMessage}>
						<p className={styles.errorText}>{error}</p>
						<button className={styles.retryButton} onClick={() => window.location.reload()}>
							Try Again
						</button>
					</div>
				)}

				{!loading && !error && (
					<>
						<CategoryFilter
							categories={categories}
							selectedCategory={selectedCategory}
							onSelect={setSelectedCategory}
						/>
						<div className={styles.grid}>
							{filteredProducts.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									onAddToCart={handleAddToCart}
									isAdding={addingToCart === product.id}
								/>
							))}
						</div>
						{filteredProducts.length === 0 && (
							<p className={styles.stateMessage}>No items found — try adjusting your search or filters.</p>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Marketplace;
