import React from 'react'
import { Outlet } from "react-router-dom"
import './Layout.css'
import NavbarDesk from '../NavbarDesk/NavbarDesk'
import NavbarMobile from '../NavbarMobile/NavbarMobile'
import Footer from '../Footer/Footer'

const Layout = () => {
  return (
    <div className='layout_container'>
      <NavbarDesk/>
      <NavbarMobile/>
      <main className='mainContent'>
        wpdwjqdj
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
