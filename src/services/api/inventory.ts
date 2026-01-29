import apiClient from "./client";

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	image_url: string;
	category: string;
	is_available: boolean;
	last_restock: string;
	created_at: string;
	updated_at: string;
}

export interface InventoryItem {
	user_id: string;
	product_id: string;
	quantity: number;
	acquired_at: string;
	updated_at: string;
	product: Product;
}

export const inventoryService = {
	// Get user's inventory
	getInventory: async (): Promise<InventoryItem[]> => {
		const response = await apiClient.get<InventoryItem[]>("/inventory");
		return response.data;
	},
};
