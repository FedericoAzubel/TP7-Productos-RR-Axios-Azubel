import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListadoProductos from '../Productos/ListadoProductos';
import '../Layout/Layout.css';
import { fetchCategories, fetchProducts, searchProducts } from '../../lib/api';
import type { Product } from '../../types/product';

type Category = { name: string; slug: string }

const ResultadoBusqueda: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoriaSlug = searchParams.get("categoria");
  const busqueda = searchParams.get("busqueda");

  const [productos, setProductos] = useState<Product[]>([]);
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [titulo, setTitulo] = useState("Resultados");

  useEffect(() => {
    fetchCategories()
      .then(setCategorias)
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  useEffect(() => {
    const obtenerResultados = async () => {
      try {
        if (busqueda) {
          const res = await searchProducts(busqueda)
          setProductos(res);
          setTitulo(
            res.length > 0
              ? `Resultados para: "${busqueda}"`
              : `No se encontraron resultados para: "${busqueda}"`
          );
        } else if (categoriaSlug) {
          const prods = await fetchProducts(categoriaSlug)
          setProductos(prods);

          const categoriaEncontrada = categorias.find(c => c.slug === categoriaSlug);
          const nombreAMostrar = categoriaEncontrada ? categoriaEncontrada.name : categoriaSlug;

          setTitulo(
            prods.length > 0
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



