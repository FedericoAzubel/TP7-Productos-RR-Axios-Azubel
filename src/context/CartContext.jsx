import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

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

  const addToCart = (product, quantity) => {
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
      const normalized = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images?.[0] ?? product.thumbnail ?? "",
        quantity: qtyToAdd,
      };
      return [...prev, normalized];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId, step = 1) => {
    const stepValue = Number.isFinite(step) && step > 0 ? Math.floor(step) : 1;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + stepValue } : item
      )
    );
  };

  const decreaseQuantity = (productId, step = 1) => {
    const stepValue = Number.isFinite(step) && step > 0 ? Math.floor(step) : 1;
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - stepValue } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const setItemQuantity = (productId, quantity) => {
    const next = Number.isFinite(quantity) ? Math.floor(quantity) : 1;
    if (next <= 0) {
      // Remueve el item cuando la cantidad es 0 o menos
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

  const value = useMemo(
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

  //   Cuando se usa Context API, si el value que le pasas a <CartContext.Provider> cambia en cada render (aunque los datos sean iguales), React forzará que todos los componentes que usan el contexto se vuelvan a renderizar.
  //   useMemo evita eso porque mantiene la misma referencia en memoria si no cambió nada importante.

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

// Esto es un custom hook para acceder de manera mas segura a CartContext. Esto solo permite que los componentes englobados en CartContext puedan leer su contenido. Es simplemente para que el código este más limpio.

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
