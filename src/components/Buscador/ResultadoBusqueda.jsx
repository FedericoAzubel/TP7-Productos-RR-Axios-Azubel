import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ListadoProductos from '../Productos/ListadoProductos';
import '../Layout/Layout.css';

const ResultadoBusqueda = () => {
  const [searchParams] = useSearchParams();
  const categoriaSlug = searchParams.get("categoria");
  const busqueda = searchParams.get("busqueda");

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [titulo, setTitulo] = useState("Resultados");

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
    const obtenerResultados = async () => {
      try {
        let res;
        if (busqueda) {
          res = await axios.get(`https://dummyjson.com/products/search?q=${busqueda}`);
          setProductos(res.data.products);
          setTitulo(
            res.data.products.length > 0
              ? `Resultados para: "${busqueda}"`
              : `No se encontraron resultados para: "${busqueda}"`
          );
        } else if (categoriaSlug) {
          res = await axios.get(`https://dummyjson.com/products/category/${categoriaSlug}`);
          setProductos(res.data.products);

          const categoriaEncontrada = categorias.find(c => c.slug === categoriaSlug);
          const nombreAMostrar = categoriaEncontrada ? categoriaEncontrada.name : categoriaSlug;

          setTitulo(
            res.data.products.length > 0
              ? `${nombreAMostrar}`
              : `No se encontraron productos en la categoría: ${nombreAMostrar}`
          );
        } else {
          setProductos([]);
          setTitulo("No se ingresó una búsqueda válida");
        }
      } catch (error) {
        console.error("Error al obtener resultados:", error);
        setTitulo("Hubo un error al buscar los productos");
        setProductos([]);
      }
    };

    obtenerResultados();
  }, [categoriaSlug, busqueda, categorias]);

  return (
    <div className="productosContainer">
      <div className="categorias_cont">
        <div className="categorias_contSub">
          <h1>{titulo}</h1>
        </div>
      </div>
      <div className="prod_cont2">
        {productos.length > 0 ? (
          <ListadoProductos productos={productos} />
        ) : (
          <p style={{ padding: '1rem', color: '#555' }}>No hay productos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default ResultadoBusqueda;