import React from "react";
import "../Layout/Layout.css";
import { Link } from "react-router-dom";

const NavbarDesk = () => {
  return (
    <div className="navbarDesk">
      <div className="navbar">
        <div className="navbarLeftSection">
          <Link to='/home' className="logo_container">
            <i class="bx bxs-balloon"></i>
            <h1>BalloonStore</h1>
          </Link>
          <nav>
            <Link to='/productos' className="navElement">
              <p>Shop</p>
            </Link>
            <Link to='/contacto' className="navElement">
              <p>Contacto</p>
            </Link>
          </nav>
        </div>

        <div className="userData">
          <Link className="userDataLink"><i class="bx bx-cart"></i></Link>
          <Link className="userDataLink"><i class="bx bx-user"></i></Link> 
        </div>
      </div>
    </div>
  );
};

export default NavbarDesk;
