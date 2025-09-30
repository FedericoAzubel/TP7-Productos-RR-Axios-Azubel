import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Layout/Layout.css";
import { fetchCategories, searchProducts } from "../../lib/api";
import type { Product } from "../../types/product";

type Category = { name: string; slug: string }
type Props = { isOpen?: boolean; onClose: () => void }

const Buscador: React.FC<Props> = ({ isOpen, onClose }) => {
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultadosProductos, setResultadosProductos] = useState<Product[]>([]);
  const [resultadosCategorias, setResultadosCategorias] = useState<Category[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories()
      .then(setCategorias)
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  useEffect(() => {
    const fetchBusqueda = async () => {
      if (!busqueda.trim()) {
        setResultadosProductos([]);
        setResultadosCategorias([]);
        return;
      }

      try {
        const prods = await searchProducts(busqueda);
        setResultadosProductos(prods.slice(0, 5));

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

    const delay = setTimeout(fetchBusqueda, 300);
    return () => clearTimeout(delay);
  }, [busqueda, categorias]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
                    <li key={String(prod.id)}>
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



