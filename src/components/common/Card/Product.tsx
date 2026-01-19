import { useCart } from "../../../hooks/useCart";
import type { Product } from "../../../services/api/cart"

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const { addToCart, isAdding } = useCart();

	const handleAddToCart = async () => {
		const result = await addToCart(product.id, 1);

		if (result.success) {
			// Show success message (you can use a toast notification library)
			alert(`${product.name} added to cart!`);
		} else {
			// Show error message
			alert(result.error || "Failed to add to cart");
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-4">
			{/* Product Image */}
			<div className="w-full h-48 bg-gray-200 rounded-lg mb-4">
				{product.image_url ? (
					<img
						src={product.image_url}
						alt={product.name}
						className="w-full h-full object-cover rounded-lg"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-4xl">
						📦
					</div>
				)}
			</div>

			{/* Product Info */}
			<h3 className="text-lg font-bold mb-2">{product.name}</h3>
			<p className="text-sm text-gray-600 mb-4 line-clamp-2">
				{product.description}
			</p>

			<div className="flex items-center justify-between">
				<div>
					<div className="text-xl font-bold text-blue-600">
						{product.price} coins
					</div>
					<div className="text-xs text-gray-500">
						{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
					</div>
				</div>

				<button
					onClick={handleAddToCart}
					disabled={isAdding || product.stock === 0}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
				>
					{isAdding ? "Adding..." : "Add to Cart"}
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
