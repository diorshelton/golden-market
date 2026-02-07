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

export const productService = {
	getProducts: async (): Promise<Product[]> => {
		const response = await apiClient.get<Product[]>("/products");
		return response.data ?? [];
	},

	getProduct: async (id: string): Promise<Product> => {
		const response = await apiClient.get<Product>(`/products/${id}`);
		return response.data;
	},
};
