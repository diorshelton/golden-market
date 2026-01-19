import { useState, useEffect } from "react";
import logo from "../assets/pegasus.svg";
import { productService, type Product } from "../services/api/products";
import { cartService } from "../services/api/cart";

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

const MarketProto = () => {
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
			{/* Hero Section */}
			<div
				className="py-16 px-4"
				style={{
					background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
				}}
			>
				{/* Logo section */}
				<div className="text-center mb-8">
					<div
						className="inline-block p-0 rounded-full mb-0"
						style={{
							backgroundImage:
								"linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
						}}
					>
						<img className="w-52 h-52" src={logo} />
					</div>
				</div>
				<div className="max-w-7xl mx-auto text-center">
					<h2
						className="text-5xl font-bold mb-4 text-transparent bg-clip-text"
						style={{
							backgroundImage:
								"linear-gradient(135deg, #f59f00 0%, #ffffff 100%)",
						}}
					>
						Welcome to Golden Market
					</h2>
					<p className="text-white text-xl mb-8 text-opacity-90">
						Discover legendary items and rare treasures
					</p>

					{/* Search Bar */}
					<div className="max-w-2xl mx-auto">
						<input
							type="text"
							placeholder="Search for items..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full px-6 py-4 rounded-xl border-2 focus:outline-none focus:border-current placeholder-gray-500 text-lg "
							style={{
								borderColor: "#41876a40",
								background: "#ffff",
							}}
						/>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 py-8">
				{/* Loading State */}
				{loading && (
					<div className="text-center py-16">
						<p className="text-2xl text-gray-500">Loading products...</p>
					</div>
				)}

				{/* Error State */}
				{error && (
					<div className="text-center py-16">
						<p className="text-2xl text-red-500 mb-4">{error}</p>
						<button
							onClick={() => window.location.reload()}
							className="px-4 py-2 bg-gray-200 rounded-lg"
						>
							Try Again
						</button>
					</div>
				)}

				{/* Category Filters */}
				{!loading && !error && (
					<div className="mb-8">
						<div className="flex gap-3 flex-wrap justify-center">
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className="px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
									style={{
										background:
											selectedCategory === category
												? "#3434a5"
												: "rgba(52, 52, 165, 0.1)",
										color: selectedCategory === category ? "white" : "#3434a5",
										border: `2px solid ${
											selectedCategory === category ? "#3434a5" : "#41876a40"
										}`,
									}}
								>
									{category}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Products Grid */}
				{!loading && !error && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{filteredProducts.map((product) => (
							<div
								key={product.id}
								className="rounded-xl p-6 backdrop-blur-lg transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer"
								style={{
									background: "rgba(255, 255, 255, 0.95)",
									boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
									border: "1px solid rgba(65, 135, 106, 0.2)",
								}}
							>
								{/* Product Image */}
								<div
									className="mb-4 rounded-lg overflow-hidden h-40 flex items-center justify-center"
									style={{
										background:
											"linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
									}}
								>
									{product.image_url?.startsWith("http") || product.image_url?.startsWith("/") ? (
										<img
											src={product.image_url}
											alt={product.name}
											className="w-full h-full object-cover"
										/>
									) : (
										<span className="text-6xl">
											{product.image_url || categoryIcons[product.category] || "📦"}
										</span>
									)}
								</div>

								{/* Product Info */}
								<div>
									<div className="flex items-start justify-between mb-2">
										<h3
											className="text-lg font-bold"
											style={{ color: "#3434a5" }}
										>
											{product.name}
										</h3>
										<span
											className="text-xs px-2 py-1 rounded-full"
											style={{
												background: "rgba(65, 135, 106, 0.2)",
												color: "#41876a",
											}}
										>
											{product.category}
										</span>
									</div>

									<p className="text-gray-600 text-sm mb-3">
										{product.description}
									</p>

									<p className="text-xs text-gray-500 mb-4">
										{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
									</p>

									{/* Price and Buy Button */}
									<div className="flex items-center justify-between">
										<div>
											<p className="text-xs text-gray-500">Price</p>
											<p
												className="text-2xl font-bold"
												style={{
													background:
														"linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
													WebkitBackgroundClip: "text",
													WebkitTextFillColor: "transparent",
													backgroundClip: "text",
												}}
											>
												{product.price}
											</p>
										</div>
										<button
											onClick={() => handleAddToCart(product.id)}
											disabled={addingToCart === product.id || product.stock === 0}
											className="px-4 py-2 rounded-lg font-semibold text-white transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
											style={{
												background:
													"linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
												boxShadow: "0 4px 12px rgba(245, 159, 0, 0.3)",
											}}
										>
											{addingToCart === product.id ? "Adding..." : "Add to Cart"}
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* No Results */}
				{!loading && !error && filteredProducts.length === 0 && (
					<div className="text-center py-16">
						<p className="text-2xl text-gray-500 mb-4">No items found</p>
						<p className="text-gray-400">
							Try adjusting your search or filters
						</p>
					</div>
				)}
			</div>

			{/* Footer */}
			<footer className="mt-16 py-8 text-center text-gray-600">
				<p>© 2025 Golden Market. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default MarketProto;
