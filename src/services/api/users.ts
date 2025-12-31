import apiClient from "./client";

interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  balance: number;
  inventory: string[];
  created_at: string;
}

export const userService = {
  getProfile: async () => {
    const response = await apiClient.get<User>('/profile');
    return response.data;
  }
};