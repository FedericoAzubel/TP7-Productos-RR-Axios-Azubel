import React from "react";
import PropTypes from "prop-types";

const CartItem = ({ item, onRemove, onIncrease, onDecrease, onSetQuantity }) => {
  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;
    onSetQuantity?.(item.id, value);
  };

  return (
    <li className="cartItem">
      <div className="cartItemInfo">
        {item.image ? (
          <img src={item.image} alt={item.title} className="cartItemImg" />
        ) : null}
        <div className="cartItemText">
          <p className="cartItemTitle">{item.title}</p>
          <p className="cartItemPrice">${item.price} x {item.quantity}</p>
          <div className="cartItemQty">
            <button aria-label="Disminuir" className="qtyBtn" onClick={() => onDecrease?.(item.id)}>-</button>
            <input
              className="qtyInput"
              type="number"
              min={1}
              value={item.quantity}
              onChange={handleChange}
            />
            <button aria-label="Aumentar" className="qtyBtn" onClick={() => onIncrease?.(item.id)}>+</button>
          </div>
        </div>
      </div>
      <button className="removeBtn" onClick={() => onRemove(item.id)}>
        Quitar
      </button>
    </li>
  );
};

export default CartItem;


CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
  onSetQuantity: PropTypes.func,
};

