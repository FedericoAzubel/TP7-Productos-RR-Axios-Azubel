import React, { useEffect, useState } from "react";
import "../components/Productos/productos.css";
import { Link } from "react-router-dom";
import ListadoProductos from "../components/Productos/ListadoProductos";
import { fetchCategories, fetchProducts } from "../lib/api";
import type { Product } from "../types/product";

type Category = { name: string; slug: string };

const Productos: React.FC = () => {
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState<string>("destacados");
  const [productos, setProductos] = useState<Product[]>([]);

  useEffect(() => {
    fetchCategories()
      .then(setCategorias)
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  useEffect(() => {
    fetchProducts(categoriaActiva)
      .then(setProductos)
      .catch((error) => console.error("Error al obtener productos:", error));
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


