import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { cartService, type CartItemDetail } from "../services/api/cart";
import { orderService } from "../services/api/orders";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants";

const Checkout = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
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

	const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
	const total = subtotal;

	const handlePlaceOrder = async () => {
		if (processing || cartItems.length === 0) return;

		setProcessing(true);
		setError(null);

		try {
			const order = await orderService.createOrder();
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
			<div
				className="min-h-screen p-4 py-8 flex items-center justify-center"
				style={{
					background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
				}}
			>
				<div className="text-white text-2xl">Loading checkout...</div>
			</div>
		);
	}

	if (cartItems.length === 0) {
		return (
			<div
				className="min-h-screen p-4 py-8 flex items-center justify-center"
				style={{
					background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
				}}
			>
				<div
					className="rounded-2xl p-12 text-center backdrop-blur-lg"
					style={{
						background: "rgba(255, 255, 255, 0.95)",
						boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
					}}
				>
					<div className="text-6xl mb-4">🛒</div>
					<h3 className="text-2xl font-bold mb-2" style={{ color: "#3434a5" }}>
						Your cart is empty
					</h3>
					<p className="text-gray-500 mb-6">
						Add some items before checking out!
					</p>
					<Link
						to={ROUTES.HOME}
						className="inline-block px-6 py-3 rounded-lg font-bold text-white transition-all transform hover:scale-105"
						style={{ background: "#3434a5" }}
					>
						Browse Products
					</Link>
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
			<div className="max-w-4xl mx-auto">
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
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
							Checkout
						</h1>
					</div>
					<p className="text-white text-opacity-90">
						Review your order and complete your purchase
					</p>
				</div>

				{/* Error Banner */}
				{error && (
					<div
						className="mb-6 p-4 rounded-lg bg-red-100 border border-red-300 text-red-700"
						role="alert"
					>
						{error}
					</div>
				)}

				<div className="grid lg:grid-cols-3 gap-6">
					{/* Order Items */}
					<div className="lg:col-span-2 space-y-4">
						<div
							className="rounded-2xl p-6 backdrop-blur-lg"
							style={{
								background: "rgba(255, 255, 255, 0.95)",
								boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
							}}
						>
							<h2
								className="text-xl font-bold mb-4"
								style={{ color: "#3434a5" }}
							>
								Order Items ({cartItems.length})
							</h2>

							<div className="space-y-4">
								{cartItems.map((item) => (
									<div
										key={item.cart_item_id}
										className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0"
										style={{ borderColor: "#41876a20" }}
									>
										<div
											className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden"
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
												<span>{item.product.image_url || "📦"}</span>
											)}
										</div>

										<div className="flex-1 min-w-0">
											<h3
												className="font-semibold"
												style={{ color: "#3434a5" }}
											>
												{item.product.name}
											</h3>
											<p className="text-sm text-gray-500">
												{item.product.price} coins x {item.quantity}
											</p>
										</div>

										<div className="text-right">
											<div
												className="font-bold"
												style={{ color: "#3434a5" }}
											>
												{item.subtotal} coins
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
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
									<span className="text-2xl font-bold">
										{user?.coins?.toLocaleString() || 0} coins
									</span>
								</div>
								{user && user.coins < total && (
									<div className="mt-2 text-white/80 text-sm">
										Insufficient balance
									</div>
								)}
							</div>

							{/* Place Order Button */}
							<button
								onClick={handlePlaceOrder}
								disabled={
									processing ||
									cartItems.length === 0 ||
									Boolean(user && user.coins < total)
								}
								className="w-full py-4 rounded-lg font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-3"
								style={{ background: "#3434a5" }}
							>
								{processing ? (
									<span className="flex items-center justify-center gap-2">
										<svg
											className="animate-spin h-5 w-5"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
												fill="none"
											/>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											/>
										</svg>
										PROCESSING...
									</span>
								) : (
									"PLACE ORDER"
								)}
							</button>

							<Link
								to={ROUTES.CART}
								className="block w-full py-3 rounded-lg font-bold text-center transition-all border-2"
								style={{ borderColor: "#41876a", color: "#41876a" }}
							>
								BACK TO CART
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
