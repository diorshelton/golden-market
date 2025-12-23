// src/utils/validators.ts
import { VALIDATION } from "../constants";

export const validators = {
	email: (email: string): string | null => {
		if (!email) {
			return "Email is required";
		}
		if (!VALIDATION.EMAIL_REGEX.test(email)) {
			return "Invalid email format";
		}
		return null;
	},

	username: (username: string): string | null => {
		if (!username) {
			return "Username is required";
		}
		if (username.length < VALIDATION.USERNAME_MIN_LENGTH) {
			return `Username must be at least ${VALIDATION.USERNAME_MIN_LENGTH} characters`;
		}
		if (username.length > VALIDATION.USERNAME_MAX_LENGTH) {
			return `Username must be no more than ${VALIDATION.USERNAME_MAX_LENGTH} characters`;
		}
		return null;
	},

	password: (password: string): string | null => {
		if (!password) {
			return "Password is required";
		}
		if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
			return `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`;
		}
		return null;
	},

	confirmPassword: (
		password: string,
		confirmPassword: string
	): string | null => {
		if (!confirmPassword) {
			return "Please confirm your password";
		}
		if (password !== confirmPassword) {
			return "Passwords do not match";
		}
		return null;
	},
};
