import React from "react";
import { Link } from "react-router-dom";

const CompraExitosa: React.FC = () => {
  return (
    <div className="successPage">
      <div className="successCard">
        <div className="successIcon">✓</div>
        <h1 className="successTitle">¡Gracias por tu compra!</h1>
        <p className="successText">Te enviamos un correo con los detalles del pedido.</p>
        <div className="successActions">
          <Link to="/home" className="primaryBtn">Volver al inicio</Link>
          <Link to="/productos" className="secondaryBtn">Seguir comprando</Link>
        </div>
      </div>
    </div>
  );
};

export default CompraExitosa;



