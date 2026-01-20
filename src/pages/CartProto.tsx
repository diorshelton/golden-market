import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartService, type CartItemDetail } from "../services/api/cart";
import { ROUTES } from "../constants";

const Cart = () => {
	const [cartItems, setCartItems] = useState<CartItemDetail[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [checkoutLoading, setCheckoutLoading] = useState(false);

	// Fetch cart on mount
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

	const updateQuantity = async (cartItemId: string, newQuantity: number) => {
		if (newQuantity <= 0) {
			await removeItem(cartItemId);
			return;
		}

		try {
			// Optimistic update
			setCartItems((items) =>
				items.map((item) =>
					item.cart_item_id === cartItemId
						? {
								...item,
								quantity: newQuantity,
								subtotal: item.product.price * newQuantity,
							}
						: item,
				),
			);

			await cartService.updateCartItem(cartItemId, newQuantity);
		} catch (err) {
			console.error("Failed to update quantity:", err);
			// Revert on error
			fetchCart();
			alert("Failed to update quantity. Please try again.");
		}
	};

	const removeItem = async (cartItemId: string) => {
		try {
			// Optimistic update
			setCartItems((items) =>
				items.filter((item) => item.cart_item_id !== cartItemId),
			);

			await cartService.removeFromCart(cartItemId);
		} catch (err) {
			console.error("Failed to remove item:", err);
			// Revert on error
			fetchCart();
			alert("Failed to remove item. Please try again.");
		}
	};

	const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
	const tax = Math.round(subtotal * 0.08);
	const total = subtotal + tax;

	const handleCheckout = async () => {
		setCheckoutLoading(true);
		// Simulate API call - replace with actual checkout endpoint
		setTimeout(() => {
			alert("Checkout complete!");
			setCheckoutLoading(false);
		}, 1500);
	};

	// Loading state
	if (loading) {
		return (
			<div
				className="min-h-screen p-4 py-8 flex items-center justify-center"
				style={{
					background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
				}}
			>
				<div className="text-white text-2xl">Loading cart...</div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div
				className="min-h-screen p-4 py-8 flex items-center justify-center"
				style={{
					background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
				}}
			>
				<div className="text-center">
					<div className="text-white text-2xl mb-4">{error}</div>
					<button
						onClick={fetchCart}
						className="px-6 py-3 rounded-lg font-bold text-white transition-all transform hover:scale-105"
						style={{ background: "#3434a5" }}
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			className="min-h-screen p-4 py-8"
			style={{
				background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
			}}
		>
			<div className="max-w-5xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-3 mb-4">
						<div
							className="inline-block p-3 rounded-full"
							style={{
								backgroundImage:
									"linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
							}}
						>
							<svg
								className="w-8 h-8 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</div>
						<h1
							className="text-4xl font-bold text-transparent bg-clip-text"
							style={{
								backgroundImage:
									"linear-gradient(135deg, #f59f00 0%, #ffffff 100%)",
							}}
						>
							Your Cart
						</h1>
					</div>
					<p className="text-white text-opacity-90">
						{cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
						your basket
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-6">
					{/* Cart Items */}
					<div className="lg:col-span-2 space-y-4">
						{cartItems.length === 0 ? (
							<div
								className="rounded-2xl p-12 text-center backdrop-blur-lg"
								style={{
									background: "rgba(255, 255, 255, 0.95)",
									boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
								}}
							>
								<div className="text-6xl mb-4">🛒</div>
								<h3
									className="text-2xl font-bold mb-2"
									style={{ color: "#3434a5" }}
								>
									Your cart is empty
								</h3>
								<p className="text-gray-500 mb-6">
									Add some delicious items from our market!
								</p>
								<Link
									to={ROUTES.HOME}
									className="inline-block px-6 py-3 rounded-lg font-bold text-white transition-all transform hover:scale-105"
									style={{ background: "#3434a5" }}
								>
									Browse Products
								</Link>
							</div>
						) : (
							cartItems.map((item) => (
								<div
									key={item.cart_item_id}
									className="rounded-2xl p-6 backdrop-blur-lg"
									style={{
										background: "rgba(255, 255, 255, 0.95)",
										boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
									}}
								>
									<div className="flex gap-4">
										{/* Product Image */}
										<div
											className="w-24 h-24 rounded-lg flex items-center justify-center text-4xl flex-shrink-0 overflow-hidden"
											style={{
												background:
													"linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
											}}
										>
											{item.product.image_url?.startsWith("http") ||
											item.product.image_url?.startsWith("/") ? (
												<img
													src={item.product.image_url}
													alt={item.product.name}
													className="w-full h-full object-cover"
												/>
											) : (
												<span className="text-4xl">
													{item.product.image_url || "📦"}
												</span>
											)}
										</div>

										{/* Product Details */}
										<div className="flex-1 min-w-0">
											<h3
												className="font-bold text-lg mb-1"
												style={{ color: "#3434a5" }}
											>
												{item.product.name}
											</h3>
											<p className="text-sm text-gray-500 mb-3">
												{item.product.description}
											</p>

											<div className="flex items-center justify-between flex-wrap gap-3">
												{/* Quantity Controls */}
												<div className="flex items-center gap-2">
													<button
														onClick={() =>
															updateQuantity(
																item.cart_item_id,
																item.quantity - 1,
															)
														}
														className="w-8 h-8 rounded-lg font-bold transition-all hover:scale-110"
														style={{
															background:
																"linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
															color: "white",
														}}
													>
														−
													</button>
													<span
														className="w-12 text-center font-semibold"
														style={{ color: "#3434a5" }}
													>
														{item.quantity}
													</span>
													<button
														onClick={() =>
															updateQuantity(
																item.cart_item_id,
																item.quantity + 1,
															)
														}
														disabled={item.quantity >= item.product.stock}
														className="w-8 h-8 rounded-lg font-bold transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
														style={{
															background:
																"linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
															color: "white",
														}}
													>
														+
													</button>
												</div>

												{/* Price */}
												<div className="flex items-center gap-4">
													<div className="text-right">
														<div
															className="font-bold text-lg"
															style={{ color: "#3434a5" }}
														>
															{item.subtotal} coins
														</div>
														<div className="text-xs text-gray-500">
															{item.product.price} × {item.quantity}
														</div>
													</div>
													<button
														onClick={() => removeItem(item.cart_item_id)}
														className="text-red-500 hover:text-red-700 transition-colors"
														title="Remove item"
													>
														<svg
															className="w-5 h-5"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
															/>
														</svg>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							))
						)}
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div
							className="rounded-2xl p-6 backdrop-blur-lg sticky top-4"
							style={{
								background: "rgba(255, 255, 255, 0.95)",
								boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
							}}
						>
							<h2
								className="text-2xl font-bold mb-6"
								style={{ color: "#3434a5" }}
							>
								Order Summary
							</h2>

							<div className="space-y-3 mb-6">
								<div className="flex justify-between">
									<span className="text-gray-600">Subtotal</span>
									<span className="font-semibold" style={{ color: "#3434a5" }}>
										{subtotal} coins
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Market Fee (8%)</span>
									<span className="font-semibold" style={{ color: "#3434a5" }}>
										{tax} coins
									</span>
								</div>
								<div
									className="border-t-2 pt-3"
									style={{ borderColor: "#41876a40" }}
								>
									<div className="flex justify-between text-lg">
										<span className="font-bold" style={{ color: "#3434a5" }}>
											Total
										</span>
										<span className="font-bold" style={{ color: "#3434a5" }}>
											{total} coins
										</span>
									</div>
								</div>
							</div>

							{/* Balance Display */}
							<div
								className="rounded-lg p-4 mb-6"
								style={{
									background:
										"linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
								}}
							>
								<div className="flex items-center justify-between text-white">
									<span className="text-sm opacity-90">Your Balance</span>
									<span className="text-2xl font-bold">5,000 💰</span>
								</div>
							</div>

							{/* Checkout Button */}
							<button
								onClick={handleCheckout}
								disabled={checkoutLoading || cartItems.length === 0}
								className="w-full py-3 rounded-lg font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-3"
								style={{ background: "#3434a5" }}
							>
								{checkoutLoading ? "PROCESSING..." : "PROCEED TO CHECKOUT"}
							</button>

							<Link
								to={ROUTES.HOME}
								className="block w-full py-3 rounded-lg font-bold text-center transition-all border-2"
								style={{ borderColor: "#41876a", color: "#41876a" }}
							>
								CONTINUE SHOPPING
							</Link>

							{/* Trust Badges */}
							<div
								className="mt-6 pt-6 border-t-2"
								style={{ borderColor: "#41876a20" }}
							>
								<div className="text-xs text-gray-500 text-center space-y-2">
									<div className="flex items-center justify-center gap-2">
										<svg
											className="w-4 h-4"
											style={{ color: "#41876a" }}
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
												clipRule="evenodd"
											/>
										</svg>
										<span>Secure Checkout</span>
									</div>
									<div className="flex items-center justify-center gap-2">
										<svg
											className="w-4 h-4"
											style={{ color: "#41876a" }}
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
											<path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
										</svg>
										<span>Same-Day Delivery</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
