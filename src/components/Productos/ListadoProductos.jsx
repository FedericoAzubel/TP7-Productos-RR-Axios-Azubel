import React from 'react'
import './productos.css'
import { Link } from "react-router-dom";

const ListadoProductos = ({ productos }) => {
  return (
    <div className='contenedor_cards'>
      {
        productos.map(producto => (
          <Link to={`/producto/${producto.id}`} key={producto.id} className='card'>
            <p className='card_name'>{producto.title}</p>
            <img src={producto.images[0]} className='card_img'></img>
            <p className='card_price'>${producto.price}</p>
          </Link>

        ))
      }
    </div>
    // <div className='productos_cont2'>
    //   <h2>{categoria === 'destacados' ? 'Destacados' : categoria}</h2>
    //   <div className="productos_grid">
    //     {productos.map(producto => (
    //       <div key={producto.id} className="producto_card">
    //         <img src={producto.thumbnail} alt={producto.title} />
    //         <h3>{producto.title}</h3>
    //         <p>{producto.price}$</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  )
}

export default ListadoProductos