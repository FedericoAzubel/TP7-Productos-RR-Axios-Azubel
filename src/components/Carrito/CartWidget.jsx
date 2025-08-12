import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import "./CartWidget.css";

const CartWidget = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getTotal, increaseQuantity, decreaseQuantity, setItemQuantity } = useCart();

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose?.();
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleContinue = () => {
    onClose?.();
    navigate("/carrito");
  };

  return (
    <div className="cartWidgetOverlay" onClick={handleOverlayClick}>
      <aside className="cartWidget" onClick={handleContentClick} aria-modal="true" role="dialog">
        <header className="cartWidgetHeader">
          <h3>Tu carrito</h3>
          <button className="iconBtn" aria-label="Cerrar" onClick={onClose}>
            ×
          </button>
        </header>

        {cartItems.length === 0 ? (
          <div className="cartWidgetEmpty">
            <p>No hay productos en el carrito.</p>
            <Link to="/productos" className="primaryLink" onClick={onClose}>
              Ir a Shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="cartWidgetList">
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
            <footer className="cartWidgetFooter">
              <div className="cartWidgetTotal">
                <span>Total</span>
                <strong>${getTotal().toFixed(2)}</strong>
              </div>
              <button className="primaryBtn" onClick={handleContinue}>
                Seguir compra
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartWidget;


