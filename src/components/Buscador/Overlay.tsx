import React from "react";
import '../Layout/Layout.css'

type Props = { searchOpen?: boolean; closeSearch?: () => void }

const Overlay: React.FC<Props> = ({ searchOpen, closeSearch }) => {
  return (
    <div
      className={`overlay ${searchOpen ? "active" : ""}`}
      onClick={closeSearch}
    ></div>
  );
};

export default Overlay;



