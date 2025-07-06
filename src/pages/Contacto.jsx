import React from 'react'
import '../components/Contacto/Contacto.css'


const Contacto = () => {
  return (
    <div className='contacto_container'>
        <h1 className='msgAtencion'>¿Necesitas asistencia?</h1>
        <div className="card_ayuda">
            <h2 className='tipoAtencion'>Atención por WhatsApp</h2>
            <p>Asistencia para compras online y soporte técnico de productos.</p>
            <button>Contactar</button>
        </div>
        <div className="card_ayuda">
            <h2 className='tipoAtencion'>Atención por Mail</h2>
            <p>Asistencia general, técnica y para compras en línea.</p>
            <button>Contactar</button>
        </div>
        <div className="card_ayuda">
            <h2 className='tipoAtencion'>Atención Telefónica para compras Online</h2>
            <p>Asistencia exclusiva para Compras Online (asesoramiento, promociones, financiación, entregas y devoluciones).</p>
            <button>Contactar</button>
        </div>
        <div className="card_ayuda">
            <h2 className='tipoAtencion'>Atención Telefónica para Soporte Técnico</h2>
            <p>Asistencia exclusiva para Soporte Técnico para productos (reparaciones, guías rápidas y ayuda con mi producto)</p>
            <button>Contactar</button>
        </div>
    </div>
  )
}

export default Contacto