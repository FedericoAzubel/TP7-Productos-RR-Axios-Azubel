import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = {
  id: number | string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

type CartContextValue = {
  cartItems: CartItem[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (productId: number | string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemsCount: () => number;
  increaseQuantity: (productId: number | string, step?: number) => void;
  decreaseQuantity: (productId: number | string, step?: number) => void;
  setItemQuantity: (productId: number | string, quantity: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) as CartItem[] : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch {
      // ignore storage errors
    } 
  }, [cartItems]);

  const addToCart = (product: any, quantity: number) => {
    if (!product || typeof product !== "object") return;
    const qtyToAdd = Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      const normalized: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images?.[0] ?? product.thumbnail ?? "",
        quantity: qtyToAdd,
      };
      return [...prev, normalized];
    });
  };

  const removeFromCart = (productId: number | string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId: number | string, step = 1) => {
    const stepValue = Number.isFinite(step) && step > 0 ? Math.floor(step) : 1;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + stepValue } : item
      )
    );
  };

  const decreaseQuantity = (productId: number | string, step = 1) => {
    const stepValue = Number.isFinite(step) && step > 0 ? Math.floor(step) : 1;
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - stepValue } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const setItemQuantity = (productId: number | string, quantity: number) => {
    const next = Number.isFinite(quantity) ? Math.floor(quantity) : 1;
    if (next <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: next } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getItemsCount = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getTotal,
      getItemsCount,
      increaseQuantity,
      decreaseQuantity,
      setItemQuantity,
    }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};


