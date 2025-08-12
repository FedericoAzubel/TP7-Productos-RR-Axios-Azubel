import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/Carrito/CartItem";

const Carrito = () => {
  const { cartItems, removeFromCart, clearCart, getTotal, increaseQuantity, decreaseQuantity, setItemQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    clearCart();
    navigate("/compra-exitosa");
  };

  return (
    <div className="cartPage">
      <h1>Carrito</h1>
      {cartItems.length === 0 ? (
        <div className="cartEmpty">
          <p>No hay productos en el carrito.</p>
          <Link to="/productos" className="primaryLink">Ir a Shop</Link>
        </div>
      ) : (
        <>
          <ul className="cartList">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onSetQuantity={setItemQuantity}
              />
            ))}
          </ul>
          <div className="cartSummary">
            <button className="secondaryBtn" onClick={clearCart}>Vaciar carrito</button>
            <div className="cartTotalActions">
              <p className="cartTotal">Total: ${getTotal().toFixed(2)}</p>
              <button className="primaryBtn" onClick={handleCheckout}>Finalizar compra</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;