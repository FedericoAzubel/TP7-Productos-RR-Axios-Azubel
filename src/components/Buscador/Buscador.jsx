import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Layout/Layout.css";

const Buscador = ({ isOpen, onClose }) => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        const primeras9 = res.data.slice(0, 9); // total 10 con "destacados"
        setCategorias([{ name: 'Destacados', slug: 'destacados' }, ...primeras9]);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    obtenerCategorias();
  }, []);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const url = "https://dummyjson.com/products";
        const res = await axios.get(url);
        setProductos(res.data.products);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    obtenerProductos();
  }, []);


  return (
    <div className={`searchMenu ${isOpen ? "active" : ""}`}>
      <div className="searchContent">
        <div className="inputContainer">
          <button className="inputContainer_btn">
            <i class="bx bx-search"></i>
          </button>
          <input type="text" placeholder="Búsqueda" />
          <button className="inputContainer_btn x" onClick={onClose}>
            <i class="bx bx-x"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buscador;
