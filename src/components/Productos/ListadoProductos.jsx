import React from 'react'
import './productos.css'

const ListadoProductos = ({ productos, categoria }) => {
  return (
    <div className='contenedor_cards'>

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