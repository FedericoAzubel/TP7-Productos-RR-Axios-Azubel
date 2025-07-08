import React from "react";
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
