import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import NavbarDesk from "../NavbarDesk/NavbarDesk";
import Footer from "../Footer/Footer";
import Buscador from "../Buscador/Buscador";
import Overlay from "../Buscador/Overlay";
import CartWidget from "../Carrito/CartWidget";

const Layout: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return (
    <div className="layout_container">
      <Buscador isOpen={searchOpen} onClose={closeSearch} />
      <Overlay searchOpen={searchOpen} closeSearch={closeSearch}/>
      <CartWidget isOpen={cartOpen} onClose={closeCart} />

      <NavbarDesk openSearch={openSearch} openCart={openCart} />
      <main className="mainContent">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;



