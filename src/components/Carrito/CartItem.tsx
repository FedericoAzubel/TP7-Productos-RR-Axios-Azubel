import React from "react";

type Item = {
  id: number | string;
  title: string;
  price: number;
  image?: string;
  quantity: number;
}

type Props = {
  item: Item;
  onRemove: (id: number | string) => void;
  onIncrease?: (id: number | string) => void;
  onDecrease?: (id: number | string) => void;
  onSetQuantity?: (id: number | string, qty: number) => void;
}

const CartItem: React.FC<Props> = ({ item, onRemove, onIncrease, onDecrease, onSetQuantity }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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



