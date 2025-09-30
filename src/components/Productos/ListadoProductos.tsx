import React from 'react'
import './productos.css'
import { Link } from "react-router-dom";
import type { Product } from '../../types/product'

type Props = { productos: Product[] }

const ListadoProductos: React.FC<Props> = ({ productos }) => {
  return (
    <div className='contenedor_cards'>
      {
        productos.map(producto => (
          <Link to={`/producto/${producto.id}`} key={String(producto.id)} className='card'>
            <p className='card_name'>{producto.title}</p>
            <img src={producto.images[0]} className='card_img'></img>
            <p className='card_price'>${producto.price}</p>
          </Link>

        ))
      }
    </div>
  )
}

export default ListadoProductos


