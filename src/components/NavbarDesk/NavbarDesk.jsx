import React from "react";
import "../Layout/Layout.css";
import { Link } from "react-router-dom"


const NavbarDesk = () => {
  return (
    <div className="navbarDesk">
      <div className="navbar">
        <Link className="logo_container">
          <i class="bx bxs-balloon"></i>
          <h1>BalloonStore</h1>
        </Link>
        <nav>
            <Link className="navElement">
                <p>Shop</p>
            </Link>
            <Link className="navElement">
                <p>Contacto</p>
            </Link>
        </nav>
      </div>
    </div>
  );
};

export default NavbarDesk;
