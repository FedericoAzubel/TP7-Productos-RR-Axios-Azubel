import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Layout/Layout.css";

const Buscador = ({ isOpen, onClose }) => {
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultadosProductos, setResultadosProductos] = useState([]);
  const [resultadosCategorias, setResultadosCategorias] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products/categories");
        const primeras9 = res.data.slice(0, 9);
        setCategorias([{ name: 'Destacados', slug: 'destacados' }, ...primeras9]);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    obtenerCategorias();
  }, []);

  useEffect(() => {
    const fetchBusqueda = async () => {
      if (!busqueda.trim()) {
        setResultadosProductos([]);
        setResultadosCategorias([]);
        return;
      }

      try {
        // Buscar productos relacionados
        const res = await axios.get(`https://dummyjson.com/products/search?q=${busqueda}`);
        setResultadosProductos(res.data.products.slice(0, 5));

        // Buscar categorías relacionadas localmente
        const texto = busqueda.toLowerCase();
        const categoriasFiltradas = categorias.filter(c =>
          c.name.toLowerCase().includes(texto)
        );
        setResultadosCategorias(categoriasFiltradas);
      } catch (error) {
        console.error("Error en búsqueda:", error);
        setResultadosProductos([]);
        setResultadosCategorias([]);
      }
    };

    const delay = setTimeout(fetchBusqueda, 300); // Debounce
    return () => clearTimeout(delay);
  }, [busqueda, categorias]);

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
                {resultadosProductos.length > 0 ? (
                  resultadosProductos.map(prod => (
                    <li key={prod.id}>
                      <Link
                        to={`/producto/${prod.id}`}
                        className="elementList"
                        onClick={onClose}
                      >
                        {prod.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="sinResultados">No se encontraron productos.</li>
                )}
              </ul>
            </div>

            <div className="resultadoProdCont">
              <p className="prodsRelacionados">Categorías relacionadas</p>
              <ul className="listaPrelacionados">
                {resultadosCategorias.length > 0 ? (
                  resultadosCategorias.map((cat, i) => (
                    <li key={i}>
                      <Link
                        to={`/resultadoBusqueda?categoria=${encodeURIComponent(cat.slug)}`}
                        className="elementList"
                        onClick={onClose}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="sinResultados">No se encontraron categorías.</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buscador;