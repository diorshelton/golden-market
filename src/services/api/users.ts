import apiClient from "./client";

interface User {
  id: number;
  username: string;
  email: string;
  coins: number;
  created_at: string;
}

export const userService = {
  getProfile: async () => {
    const response = await apiClient.get<User>('/profile');
    return response.data;
  }
};