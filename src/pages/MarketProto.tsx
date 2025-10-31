import { useState } from "react";
import logo from "../assets/pegasus.svg";

// Mock product data - replace with API call later
const mockProducts = [
	{
		id: 1,
		name: "Golden Sword",
		description: "A legendary blade forged in dragon fire",
		price: 1500,
		vendor: "Blacksmith Guild",
		image: "⚔️",
		category: "Weapons",
	},
	{
		id: 2,
		name: "Health Potion",
		description: "Restores 100 HP instantly",
		price: 50,
		vendor: "Alchemy Shop",
		image: "🧪",
		category: "Potions",
	},
	{
		id: 3,
		name: "Magic Staff",
		description: "Increases spell power by 25%",
		price: 2000,
		vendor: "Wizard's Tower",
		image: "🪄",
		category: "Weapons",
	},
	{
		id: 4,
		name: "Dragon Scale Armor",
		description: "Legendary protection from the ancients",
		price: 3500,
		vendor: "Armory",
		image: "🛡️",
		category: "Armor",
	},
	{
		id: 5,
		name: "Speed Boots",
		description: "Move 50% faster in combat",
		price: 800,
		vendor: "Cobbler's Corner",
		image: "👢",
		category: "Armor",
	},
	{
		id: 6,
		name: "Mana Crystal",
		description: "Restores 200 MP over time",
		price: 120,
		vendor: "Crystal Cave",
		image: "💎",
		category: "Potions",
	},
	{
		id: 7,
		name: "Phoenix Feather",
		description: "Revive once per battle",
		price: 5000,
		vendor: "Rare Goods",
		image: "🪶",
		category: "Special",
	},
	{
		id: 8,
		name: "Invisibility Cloak",
		description: "Become unseen for 30 seconds",
		price: 2500,
		vendor: "Shadow Market",
		image: "🧥",
		category: "Armor",
	},
];

const categories = ["All", "Weapons", "Armor", "Potions", "Special"];

const MarketProto = () => {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredProducts = mockProducts.filter((product) => {
		const matchesCategory =
			selectedCategory === "All" || product.category === selectedCategory;
		const matchesSearch =
			product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<div>
			{/* Header */}
			<header
				className="border-b"
				style={{
					background: "linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
					border: "1px solid #41876a40",
				}}
			>
				<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<h1
							className="text-2xl font-bold text-transparent bg-clip-text"
							style={{
								backgroundImage:
									"linear-gradient(135deg, #f59f00 0%, #ffffff 100%)",
							}}
						>
							Golden Market
						</h1>
					</div>

					<div className="flex items-center gap-4">
						<button
							className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
							style={{ background: "#3434a5" }}
						>
							My Profile
						</button>
						<div
							className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-black cursor-pointer hover:scale-110 transition-transform"
							style={{
								background: "linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
								boxShadow: "0 0 20px rgba(245, 159, 0, 0.3)",
							}}
						>
							JD
						</div>
					</div>
				</div>
			</header>
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
				{/* Category Filters */}
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

				{/* Products Grid */}
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
							{/* Product Image/Icon */}
							<div
								className="text-6xl mb-4 text-center p-6 rounded-lg"
								style={{
									background:
										"linear-gradient(135deg, #3434a5 0%, #41876a 100%)",
								}}
							>
								{product.image}
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
									Sold by: {product.vendor}
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
										className="px-4 py-2 rounded-lg font-semibold text-white transition-all transform hover:scale-105 active:scale-95"
										style={{
											background:
												"linear-gradient(135deg, #f59f00 0%, #ba5411 100%)",
											boxShadow: "0 4px 12px rgba(245, 159, 0, 0.3)",
										}}
									>
										Buy
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* No Results */}
				{filteredProducts.length === 0 && (
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
