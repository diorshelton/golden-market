import apiClient from "./client";

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	image_url: string;
	category: string;
	last_restock: string;
	created_at: string;
	updated_at: string;
}

export interface CartItemDetail {
	cart_item_id: string;
	product: Product;
	quantity: number;
	subtotal: number;
}

export interface CartSummary {
	items: CartItemDetail[];
	total_items: number;
	total_price: number;
}

export const cartService = {
	// Get user's cart
	getCart: async () => {
		const response = await apiClient.get<CartSummary>("/cart");
		return response.data;
	},

	// Add item to cart
	addToCart: async (productId: string, quantity: number) => {
		const response = await apiClient.post("/cart/items", {
			product_id: productId,
			quantity,
		});
		return response.data;
	},

	// Update cart item quantity
	updateCartItem: async (cartItemId: string, quantity: number) => {
		const response = await apiClient.patch(`/cart/items/${cartItemId}`, {
			quantity,
		});
		return response.data;
	},

	// Remove item from cart
	removeFromCart: async (cartItemId: string) => {
		const response = await apiClient.delete(`/cart/items/${cartItemId}`);
		return response.data;
	},
};
