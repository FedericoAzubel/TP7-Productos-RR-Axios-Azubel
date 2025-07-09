import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Layout/Layout.css";

const Buscador = ({ isOpen, onClose }) => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultadosProductos, setResultadosProductos] = useState([]);
  const [resultadosCategorias, setResultadosCategorias] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCategorias = async () => {
      const res = await axios.get("https://dummyjson.com/products/categories");
      const primeras9 = res.data.slice(0, 9);
      setCategorias([{ name: 'Destacados', slug: 'destacados' }, ...primeras9]);
    };
    obtenerCategorias();
  }, []);

  useEffect(() => {
    const obtenerProductos = async () => {
      const res = await axios.get("https://dummyjson.com/products");
      setProductos(res.data.products);
    };
    obtenerProductos();
  }, []);

  useEffect(() => {
    const texto = busqueda.toLowerCase();
    setResultadosProductos(
      productos.filter(p => p.title.toLowerCase().includes(texto))
    );
    setResultadosCategorias(
      categorias.filter(c => c.name.toLowerCase().includes(texto))
    );
  }, [busqueda, productos, categorias]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && busqueda.trim()) {
      navigate(`/resultadoBusqueda?busqueda=${encodeURIComponent(busqueda)}`);
      onClose();
    }
  };

  return (
    <div className={`searchMenu ${isOpen ? "active" : ""}`}>
      <div className="searchContent">
        <div className="inputContainer">
          <button className="inputContainer_btn">
            <i className="bx bx-search"></i>
          </button>
          <input
            type="text"
            placeholder="Búsqueda"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="inputContainer_btn x" onClick={onClose}>
            <i className="bx bx-x"></i>
          </button>
        </div>

        {busqueda && (
          <div className="resultadosBusqueda">
            <div className="resultadoProdCont">
              <p className="prodsRelacionados">Productos relacionados</p>
              <ul className="listaPrelacionados">
                {resultadosProductos.slice(0, 5).map(prod => (
                  <li key={prod.id}>
                    <Link
                      to={`/producto/${prod.id}`}
                      className="elementList"
                      onClick={onClose}
                    >
                      {prod.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="resultadoProdCont">
              <p className="prodsRelacionados">Categorías relacionadas</p>
              <ul className="listaPrelacionados">
                {resultadosCategorias.map((cat, i) => (
                  <li key={i}>
                    <Link
                      to={`/resultadoBusqueda?categoria=${encodeURIComponent(cat.slug)}`}
                      className="elementList"
                      onClick={onClose}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buscador;