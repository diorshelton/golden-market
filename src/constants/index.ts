// src/constants/index.ts

// API Configuration
export const API_BASE_URL =
	import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

// Token Configuration
export const TOKEN_KEYS = {
	ACCESS: "accessToken",
	REFRESH: "refreshToken",
	USER: "user",
} as const;

// Route Paths
export const ROUTES = {
	HOME: "/",
	PRODUCTS: "/products",
	CART: "/cart",
	ORDERS: "/orders",
	INVENTORY: "/inventory",
	LOGIN: "/login",
	REGISTER: "/register",
	PROFILE: "/profile",
} as const;

// App Configuration
export const APP_NAME = "Golden Market";
export const APP_VERSION = "0.1.0";

// Validation Rules
export const VALIDATION = {
	USERNAME_MIN_LENGTH: 3,
	USERNAME_MAX_LENGTH: 20,
	PASSWORD_MIN_LENGTH: 8,
	EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;
