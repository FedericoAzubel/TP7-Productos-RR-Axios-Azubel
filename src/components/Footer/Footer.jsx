import React, { useEffect, useState } from "react";
import '../Layout/Layout.css'
import axios from "axios";


const Footer = () => {
    const [categorias, setCategorias] = useState([]);
  
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

  return (
    <div className='footerCont'>
        <div className='footer'>
            <div className='footerSection borderLeft'>
              <p className='footerSection_name'>Productos y Servicios</p>
              {categorias.map((cat, i) => (
              <p key={i} className='footerSection_element'>
                {cat.name}
              </p>
            ))}
            </div>
            <div className='footerSection'>
              <p className='footerSection_name'>Shop</p>
              <p className='footerSection_element'>Ofertas</p>
              <p className='footerSection_element'>Buscar locales</p>
              <p className='footerSection_element'>Botón de arrepentimiento</p>
              <p className='footerSection_element'>Preguntas frecuentes</p>
              <p className='footerSection_element'>Explorar</p>
            </div>
            <div className='footerSection'>
              <p className='footerSection_name'>Soporte</p>
              <p className='footerSection_element'>Whatsapp</p>
              <p className='footerSection_element'>E-mail</p>
              <p className='footerSection_element'>Chat Online</p>
              <p className='footerSection_element'>Self-Service</p>
            </div>
            <div className='footerSection'>
              <p className='footerSection_name'>Acerca de nosotros</p>
              <p className='footerSection_element'>Compromiso ambiental</p>
              <p className='footerSection_element'>Seguridad y privacidad</p>
              <p className='footerSection_element'>Accesibilidad universal</p>
              <p className='footerSection_element'>Diversidad · Equidad · Inclusión</p>
              <p className='footerSection_element'>Educación comunitaria</p>
              <p className='footerSection_element'>Responsabilidad empresarial</p> 
            </div>
        </div>
        <p className='copy'>Copyright© 2025 BalloonStore. Todo los derechos reservados</p>
    </div>
  )
}

export default Footer
