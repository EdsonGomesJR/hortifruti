"use client";
import { create } from "zustand";

interface CartItem {
  name: string;
  image: string;
  quantity: number;
  measure: string;
  unit: string;
  price: number;
}

interface CartStore {
  cartItems: CartItem[];
  isSidebarOpen: boolean;
  editingItem: CartItem | null;
  toggleSidebar: () => void;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (name: string) => void;
  startEditingItem: (item: CartItem) => void;
  finishEditingItem: (item: CartItem) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  isSidebarOpen: false,
  editingItem: null,

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  addItemToCart: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
      isSidebarOpen: true,
    })),

  removeItemFromCart: (name) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.name !== name),
    })),

  startEditingItem: (item) => set({ editingItem: item }),

  finishEditingItem: (item) =>
    set((state) => ({
      editingItem: null,
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.name === item.name ? item : cartItem
      ),
    })),
}));
