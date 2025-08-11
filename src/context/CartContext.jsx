import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
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

  const addToCart = (product) => {
    if (!product || typeof product !== "object") return;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const normalized = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images?.[0] ?? product.thumbnail ?? "",
        quantity: 1,
      };
      return [...prev, normalized];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getItemsCount = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, clearCart, getTotal, getItemsCount }),
    [cartItems]
  );

  //   Cuando se usa Context API, si el value que le pasas a <CartContext.Provider> cambia en cada render (aunque los datos sean iguales), React forzará que todos los componentes que usan el contexto se vuelvan a renderizar.
  //   useMemo evita eso porque mantiene la misma referencia en memoria si no cambió nada importante.

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};


