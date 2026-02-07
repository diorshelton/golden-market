import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { orderService, type Order } from "../services/api/orders";
import { ROUTES } from "../constants";

const OrderConfirmation = () => {
	const { id } = useParams<{ id: string }>();
	const [order, setOrder] = useState<Order | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (id) {
			fetchOrder();
		}
	}, [id]);

	const fetchOrder = async () => {
		if (!id) return;

		try {
			setLoading(true);
			setError(null);
			const data = await orderService.getOrderById(id);
			setOrder(data);
		} catch (err) {
			console.error("Failed to fetch order:", err);
			setError("Failed to load order details.");
		} finally {
			setLoading(false);
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
				<div className="text-white text-2xl">Loading order...</div>
			</div>
		);
	}

	if (error || !order) {
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
					<div className="text-6xl mb-4">😕</div>
					<h3 className="text-2xl font-bold mb-2" style={{ color: "#3434a5" }}>
						Order not found
					</h3>
					<p className="text-gray-500 mb-6">{error || "Unable to find this order."}</p>
					<Link
						to={ROUTES.ORDERS}
						className="inline-block px-6 py-3 rounded-lg font-bold text-white transition-all transform hover:scale-105"
						style={{ background: "#3434a5" }}
					>
						View All Orders
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
			<div className="max-w-3xl mx-auto">
				{/* Success Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-3 mb-4">
						<div
							className="inline-block p-4 rounded-full"
							style={{
								backgroundImage:
									"linear-gradient(135deg, #41876a 0%, #2d5a47 100%)",
							}}
						>
							<svg
								className="w-12 h-12 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
					</div>
					<h1
						className="text-4xl font-bold text-transparent bg-clip-text mb-2"
						style={{
							backgroundImage:
								"linear-gradient(135deg, #f59f00 0%, #ffffff 100%)",
						}}
					>
						Order Confirmed!
					</h1>
					<p className="text-white text-opacity-90 text-lg">
						Thank you for your purchase
					</p>
				</div>

				{/* Order Details Card */}
				<div
					className="rounded-2xl p-8 backdrop-blur-lg mb-6"
					style={{
						background: "rgba(255, 255, 255, 0.95)",
						boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
					}}
				>
					{/* Order Info */}
					<div className="flex justify-between items-start mb-6 pb-6 border-b" style={{ borderColor: "#41876a20" }}>
						<div>
							<p className="text-gray-500 text-sm">Order Number</p>
							<p className="font-bold text-lg" style={{ color: "#3434a5" }}>
								{order.order_number}
							</p>
						</div>
						<div className="text-right">
							<p className="text-gray-500 text-sm">Order Date</p>
							<p className="font-semibold" style={{ color: "#3434a5" }}>
								{new Date(order.created_at).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</p>
						</div>
					</div>

					{/* Order Items */}
					<h3 className="font-bold text-lg mb-4" style={{ color: "#3434a5" }}>
						Items Purchased
					</h3>
					<div className="space-y-4 mb-6">
						{order.items.map((item) => (
							<div
								key={item.id}
								className="flex justify-between items-center py-3 border-b last:border-b-0"
								style={{ borderColor: "#41876a20" }}
							>
								<div className="flex-1">
									<p className="font-semibold" style={{ color: "#3434a5" }}>
										{item.product_name}
									</p>
									<p className="text-sm text-gray-500">
										{item.price_per_unit} coins x {item.quantity}
									</p>
								</div>
								<div className="font-bold" style={{ color: "#3434a5" }}>
									{item.subtotal} coins
								</div>
							</div>
						))}
					</div>

					{/* Total */}
					<div
						className="flex justify-between items-center pt-4 border-t-2"
						style={{ borderColor: "#41876a40" }}
					>
						<span className="text-xl font-bold" style={{ color: "#3434a5" }}>
							Total Paid
						</span>
						<span className="text-2xl font-bold" style={{ color: "#3434a5" }}>
							{order.total_amount} coins
						</span>
					</div>
				</div>

				{/* Info Card */}
				<div
					className="rounded-2xl p-6 backdrop-blur-lg mb-6"
					style={{
						background: "rgba(255, 255, 255, 0.95)",
						boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
					}}
				>
					<div className="flex items-start gap-4">
						<div
							className="p-2 rounded-lg"
							style={{ background: "#41876a20" }}
						>
							<svg
								className="w-6 h-6"
								style={{ color: "#41876a" }}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div>
							<h4 className="font-semibold mb-1" style={{ color: "#3434a5" }}>
								Items Added to Inventory
							</h4>
							<p className="text-gray-600 text-sm">
								Your purchased items have been added to your inventory. You can view and manage them anytime.
							</p>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4">
					<Link
						to={ROUTES.INVENTORY}
						className="flex-1 py-4 rounded-lg font-bold text-white text-center transition-all transform hover:scale-105"
						style={{ background: "#3434a5" }}
					>
						VIEW INVENTORY
					</Link>
					<Link
						to={ROUTES.ORDERS}
						className="flex-1 py-4 rounded-lg font-bold text-center transition-all border-2 bg-white"
						style={{ borderColor: "#41876a", color: "#41876a" }}
					>
						VIEW ALL ORDERS
					</Link>
					<Link
						to={ROUTES.HOME}
						className="flex-1 py-4 rounded-lg font-bold text-center transition-all border-2 bg-white"
						style={{ borderColor: "#3434a5", color: "#3434a5" }}
					>
						CONTINUE SHOPPING
					</Link>
				</div>
			</div>
		</div>
	);
};

export default OrderConfirmation;
