import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { orderService, type Order } from "../services/api/orders";
import { ROUTES } from "../constants";

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
			<div
				className="min-h-screen p-4 py-8 flex items-center justify-center"
				style={{
					background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
				}}
			>
				<div className="text-white text-2xl">Loading orders...</div>
			</div>
		);
	}

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
						onClick={fetchOrders}
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
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
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
							Order History
						</h1>
					</div>
					<p className="text-white text-opacity-90">
						{orders.length} {orders.length === 1 ? "order" : "orders"} placed
					</p>
				</div>

				{/* Orders List */}
				{orders.length === 0 ? (
					<div
						className="rounded-2xl p-12 text-center backdrop-blur-lg"
						style={{
							background: "rgba(255, 255, 255, 0.95)",
							boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
						}}
					>
						<div className="text-6xl mb-4">📦</div>
						<h3
							className="text-2xl font-bold mb-2"
							style={{ color: "#3434a5" }}
						>
							No orders yet
						</h3>
						<p className="text-gray-500 mb-6">
							Start shopping to see your order history here!
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
					<div className="space-y-4">
						{orders.map((order) => (
							<div
								key={order.id}
								className="rounded-2xl backdrop-blur-lg overflow-hidden"
								style={{
									background: "rgba(255, 255, 255, 0.95)",
									boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
								}}
							>
								{/* Order Header - Clickable */}
								<button
									onClick={() => toggleOrderExpand(order.id)}
									className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
								>
									<div className="flex justify-between items-start">
										<div>
											<p
												className="font-bold text-lg"
												style={{ color: "#3434a5" }}
											>
												{order.order_number}
											</p>
											<p className="text-gray-500 text-sm">
												{new Date(order.created_at).toLocaleDateString(
													"en-US",
													{
														year: "numeric",
														month: "long",
														day: "numeric",
													}
												)}
											</p>
										</div>
										<div className="text-right flex items-center gap-4">
											<div>
												<p
													className="font-bold text-lg"
													style={{ color: "#3434a5" }}
												>
													{order.total_amount} coins
												</p>
												<span
													className="inline-block px-2 py-1 rounded text-xs font-semibold"
													style={{
														background:
															order.status === "completed"
																? "#41876a20"
																: order.status === "pending"
																	? "#f59f0020"
																	: "#dc262620",
														color:
															order.status === "completed"
																? "#41876a"
																: order.status === "pending"
																	? "#ba5411"
																	: "#dc2626",
													}}
												>
													{order.status.toUpperCase()}
												</span>
											</div>
											<svg
												className={`w-5 h-5 transition-transform ${
													expandedOrder === order.id ? "rotate-180" : ""
												}`}
												style={{ color: "#3434a5" }}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</div>
									</div>
									<p className="text-gray-500 text-sm mt-2">
										{order.items.length}{" "}
										{order.items.length === 1 ? "item" : "items"}
									</p>
								</button>

								{/* Expanded Order Details */}
								{expandedOrder === order.id && (
									<div
										className="px-6 pb-6 border-t"
										style={{ borderColor: "#41876a20" }}
									>
										<div className="pt-4 space-y-3">
											{order.items.map((item) => (
												<div
													key={item.id}
													className="flex justify-between items-center py-2"
												>
													<div>
														<p
															className="font-medium"
															style={{ color: "#3434a5" }}
														>
															{item.product_name}
														</p>
														<p className="text-sm text-gray-500">
															{item.price_per_unit} coins x {item.quantity}
														</p>
													</div>
													<p
														className="font-semibold"
														style={{ color: "#3434a5" }}
													>
														{item.subtotal} coins
													</p>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Orders;
