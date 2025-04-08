"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Interface do item no carrinho
interface CartItem {
  name: string;
  image: string;
  quantity: number;
  unit: string;
}

// Interface do contexto
interface CartContextType {
  cartItems: CartItem[];
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  addItemToCart: (item: CartItem) => void;
}

// Criar o contexto com valores iniciais
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setIsSidebarOpen(true); // Abre a sidebar ao adicionar item
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, isSidebarOpen, toggleSidebar, addItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para acessar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
