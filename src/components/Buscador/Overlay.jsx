import React from "react";
import PropTypes from "prop-types";
import '../Layout/Layout.css'

const Overlay = ({ searchOpen, closeSearch }) => {
  return (
    <div
      className={`overlay ${searchOpen ? "active" : ""}`}
      onClick={closeSearch}
    ></div>
  );
};

export default Overlay;

Overlay.propTypes = {
  searchOpen: PropTypes.bool,
  closeSearch: PropTypes.func,
};
