import React from 'react'
import '../components/Home/home.css'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='home_container'>
      <div className='home_things'>
        <h1>BalloonStore</h1>
        <h2>Todos los productos que necesitas en un solo lugar</h2>
        <Link to='/productos'className='shopBtn'>Shop</Link>
      </div>
    </div>
  )
}

export default Home
