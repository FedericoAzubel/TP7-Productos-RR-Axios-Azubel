import React from 'react'
import { Outlet } from "react-router-dom"
import './Layout.css'
import NavbarDesk from '../NavbarDesk/NavbarDesk'
import Footer from '../Footer/Footer'

const Layout = () => {
  return (
    <div className='layout_container'>
      <NavbarDesk/>
      <main className='mainContent'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
