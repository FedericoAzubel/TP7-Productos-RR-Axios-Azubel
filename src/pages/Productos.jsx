import React, { useEffect, useState } from "react";
import "../components/Productos/productos.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ListadoProductos from "../components/Productos/ListadoProductos";

const Productos = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("destacados");
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
        const url =
          categoriaActiva === "destacados"
            ? "https://dummyjson.com/products"
            : `https://dummyjson.com/products/category/${categoriaActiva}`;
        const res = await axios.get(url);
        setProductos(res.data.products);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, [categoriaActiva]);

  return (
    <div className="productosContainer">
      <div className="categorias_cont">
        <div className="categorias_contSub">
          <h1>
            Shop.{" "}
            <span style={{ color: "#888" }}>
              Todos los productos al alcance de tu mano
            </span>
          </h1>
          <div className="categorias">
            {categorias.map((cat, i) => (
              <button
                key={i}
                className={`cat ${categoriaActiva === cat.slug ? "activa" : ""}`}
                onClick={() => setCategoriaActiva(cat.slug)}
              >
                <p>{cat.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="prod_cont2">
        <ListadoProductos productos={productos} />
      </div>
      
    </div>
  );
};

export default Productos;
