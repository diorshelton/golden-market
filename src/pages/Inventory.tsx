import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { inventoryService, type InventoryItem } from "../services/api/inventory";
import { ROUTES } from "../constants";

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
			<div
				className="min-h-screen p-4 py-8 flex items-center justify-center"
				style={{
					background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
				}}
			>
				<div className="text-white text-2xl">Loading inventory...</div>
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
						onClick={fetchInventory}
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
			<div className="max-w-6xl mx-auto">
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
									d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
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
							My Inventory
						</h1>
					</div>
					<p className="text-white text-opacity-90">
						{totalItems} {totalItems === 1 ? "item" : "items"} owned
					</p>
				</div>

				{/* Stats Cards */}
				{inventory.length > 0 && (
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
						<div
							className="rounded-xl p-4 backdrop-blur-lg text-center"
							style={{
								background: "rgba(255, 255, 255, 0.95)",
								boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
							}}
						>
							<p className="text-gray-500 text-sm">Total Items</p>
							<p className="text-2xl font-bold" style={{ color: "#3434a5" }}>
								{totalItems}
							</p>
						</div>
						<div
							className="rounded-xl p-4 backdrop-blur-lg text-center"
							style={{
								background: "rgba(255, 255, 255, 0.95)",
								boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
							}}
						>
							<p className="text-gray-500 text-sm">Unique Products</p>
							<p className="text-2xl font-bold" style={{ color: "#3434a5" }}>
								{inventory.length}
							</p>
						</div>
						<div
							className="rounded-xl p-4 backdrop-blur-lg text-center col-span-2 md:col-span-1"
							style={{
								background: "rgba(255, 255, 255, 0.95)",
								boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
							}}
						>
							<p className="text-gray-500 text-sm">Total Value</p>
							<p className="text-2xl font-bold" style={{ color: "#3434a5" }}>
								{totalValue.toLocaleString()} coins
							</p>
						</div>
					</div>
				)}

				{/* Inventory Grid */}
				{inventory.length === 0 ? (
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
							Your inventory is empty
						</h3>
						<p className="text-gray-500 mb-6">
							Purchase items from the market to add them to your inventory!
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
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{inventory.map((item) => (
							<div
								key={item.product_id}
								className="rounded-2xl backdrop-blur-lg overflow-hidden group hover:scale-105 transition-transform"
								style={{
									background: "rgba(255, 255, 255, 0.95)",
									boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
								}}
							>
								{/* Product Image */}
								<div
									className="h-40 flex items-center justify-center text-6xl relative"
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

									{/* Quantity Badge */}
									<div
										className="absolute top-3 right-3 px-3 py-1 rounded-full font-bold text-white"
										style={{
											background:
												"linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
										}}
									>
										x{item.quantity}
									</div>
								</div>

								{/* Product Details */}
								<div className="p-5">
									<h3
										className="font-bold text-lg mb-1"
										style={{ color: "#3434a5" }}
									>
										{item.product.name}
									</h3>
									<p className="text-gray-500 text-sm mb-3 line-clamp-2">
										{item.product.description}
									</p>

									<div className="flex justify-between items-center">
										<div>
											<p className="text-gray-400 text-xs">Unit Value</p>
											<p
												className="font-semibold"
												style={{ color: "#3434a5" }}
											>
												{item.product.price} coins
											</p>
										</div>
										<div className="text-right">
											<p className="text-gray-400 text-xs">Total Value</p>
											<p
												className="font-bold text-lg"
												style={{ color: "#41876a" }}
											>
												{(item.product.price * item.quantity).toLocaleString()}{" "}
												coins
											</p>
										</div>
									</div>

									<div
										className="mt-4 pt-3 border-t text-xs text-gray-400"
										style={{ borderColor: "#41876a20" }}
									>
										Acquired:{" "}
										{new Date(item.acquired_at).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Inventory;
