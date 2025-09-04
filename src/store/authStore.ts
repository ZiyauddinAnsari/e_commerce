import { create } from "zustand";
import { User, AuthState } from "@/types";

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  token: null,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data - replace with actual API call
      const mockUser: User = {
        id: "1",
        email,
        name: "John Doe",
        firstName: "John",
        lastName: "Doe",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        phone: "+1 (555) 123-4567",
        addresses: [],
        preferences: {
          newsletter: true,
          notifications: true,
          theme: "system",
          currency: "USD",
          language: "en",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        token: "mock-jwt-token",
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (userData) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: "1",
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        addresses: [],
        preferences: {
          newsletter: true,
          notifications: true,
          theme: "system",
          currency: "USD",
          language: "en",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        token: "mock-jwt-token",
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      token: null,
    });
  },

  updateUser: (userData) => {
    const state = get();
    if (state.user) {
      set({
        user: { ...state.user, ...userData },
      });
    }
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },
}));
