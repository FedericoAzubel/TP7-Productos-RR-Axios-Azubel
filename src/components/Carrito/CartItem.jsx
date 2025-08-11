import React from "react";

const CartItem = ({ item, onRemove }) => {
  return (
    <li className="cartItem">
      <div className="cartItemInfo">
        {item.image ? (
          <img src={item.image} alt={item.title} className="cartItemImg" />
        ) : null}
        <div className="cartItemText">
          <p className="cartItemTitle">{item.title}</p>
          <p className="cartItemPrice">${item.price} x {item.quantity}</p>
        </div>
      </div>
      <button className="removeBtn" onClick={() => onRemove(item.id)}>
        Quitar
      </button>
    </li>
  );
};

export default CartItem;


