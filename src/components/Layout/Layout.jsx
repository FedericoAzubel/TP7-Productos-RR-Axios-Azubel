import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import NavbarDesk from "../NavbarDesk/NavbarDesk";
import Footer from "../Footer/Footer";
import Buscador from "../Buscador/Buscador";
import Overlay from "../Buscador/Overlay";

const Layout = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  return (
    <div className="layout_container">
      {/* Buscador y Overlay con control de visibilidad */}
      <Buscador isOpen={searchOpen} onClose={closeSearch} />
      <Overlay searchOpen={searchOpen} closeSearch={closeSearch}/>

      <NavbarDesk openSearch={openSearch} />
      <main className="mainContent">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
