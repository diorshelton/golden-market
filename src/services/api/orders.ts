import apiClient from "./client";

export interface OrderItem {
	id: string;
	order_id: string;
	product_id: string;
	product_name: string;
	quantity: number;
	price_per_unit: number;
	subtotal: number;
	created_at: string;
}

export interface Order {
	id: string;
	user_id: string;
	order_number: string;
	total_amount: number;
	status: "pending" | "completed" | "cancelled";
	created_at: string;
	updated_at: string;
	items: OrderItem[];
}

export const orderService = {
	// Create a new order (checkout)
	createOrder: async (): Promise<Order> => {
		const response = await apiClient.post<Order>("/orders");
		return response.data;
	},

	// Get all orders for the current user
	getOrders: async (): Promise<Order[]> => {
		const response = await apiClient.get<Order[]>("/orders");
		return response.data;
	},

	// Get a specific order by ID
	getOrderById: async (orderId: string): Promise<Order> => {
		const response = await apiClient.get<Order>(`/orders/${orderId}`);
		return response.data;
	},
};
