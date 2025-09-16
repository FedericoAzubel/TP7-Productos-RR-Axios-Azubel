import React from "react";
import PropTypes from "prop-types";
import "../Layout/Layout.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const NavbarDesk = ( {openSearch, openCart} ) => {
  const { getItemsCount } = useCart();
  const itemsCount = getItemsCount();
  return (
    <div className="navbarDesk">
      <div className="navbar">
        <div className="navbarLeftSection">
          <Link to="/home" className="logo_container">
            <i class="bx bxs-balloon"></i>
            <h1>BalloonStore</h1>
          </Link>
          <nav>
            <Link to="/productos" className="navElement">
              <p>Shop</p>
            </Link>
            <Link to="/contacto" className="navElement">
              <p>Contacto</p>
            </Link>
          </nav>
        </div>

        <div className="userData">
          <button className="searchBtn" onClick={openSearch}>
            <i class="bx bx-search"></i>
            <p>Búsqueda</p>
          </button>
          <button className="userDataLink" onClick={openCart} aria-label="Ver carrito">
            <div className="cartIcon">
              <i class="bx bx-cart"></i>
              {itemsCount > 0 && <span className="cartCount">{itemsCount}</span>}
            </div>
          </button>
          <Link className="userDataLink">
            <i class="bx bx-user"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesk;

NavbarDesk.propTypes = {
  openSearch: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
};
