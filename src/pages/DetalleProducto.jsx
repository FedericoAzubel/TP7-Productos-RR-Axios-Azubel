import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../components/DetalleProducto/Detalle.css'
import { useCart } from '../context/CartContext';

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProducto(res.data);
      } catch (error) {
        console.error('Error al obtener producto:', error);
      }
    };

    obtenerProducto();
  }, [id]);
  if (!producto) {
    return <p>Cargando producto...</p>;
  }
  const handleAdd = () => {
    addToCart(producto, quantity);
  };
  return (
    <div className='producto_container'>
      <div className="product_data">
        <h1 className='product_name'>
          {producto.title}
        </h1>
        <p className='product_price'>$ {producto.price}</p>
        <div className="description_cont">
          <p>{producto.description}</p>
        </div>
        <div className='qty_row'>
          <button aria-label='Disminuir' className='qtyBtn' onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <input
            className='qtyInput'
            type='number'
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.floor(Number(e.target.value) || 1)))}
          />
          <button aria-label='Aumentar' className='qtyBtn' onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>
        <button className='addToCartBtn' onClick={handleAdd}>Agregar al carrito</button>
      </div>
      <img src={producto.images[0]} className='product_img'></img>
    </div>
  )
}

export default DetalleProducto