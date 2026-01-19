import { useState } from "react";
import { cartService } from "../services/api/cart";

export const useCart = () => {
	const [isAdding, setIsAdding] = useState(false);

	const addToCart = async (productId: string, quantity: number = 1) => {
		try {
			setIsAdding(true);
			await cartService.addToCart(productId, quantity);
			return { success: true };
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error("Failed to add to cart:", error);
			const message =
				error.response?.data?.message ||
				error.message ||
				"Failed to add item to cart";
			return { success: false, error: message };
		} finally {
			setIsAdding(false);
		}
	};

	return {
		addToCart,
		isAdding,
	};
};
