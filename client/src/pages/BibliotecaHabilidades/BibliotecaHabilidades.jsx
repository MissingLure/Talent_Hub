import React, { useEffect, useState } from 'react';
import './BibliotecaHabilidades.css';
import Navbar from "../../components/Navbar/Navbar";
import Modal from 'react-modal';
import axios from 'axios';

// const habilidades = [
//   'Adaptabilidad',
//   'Análisis de Datos de Producción',
//   'Capacidad Analítica',
//   'Comunicación',
//   'Comunicación Asertiva',
//   'Comunicación Efectiva',
//   'Comunicación Interpersonal',
//   'Control de Calidad',
//   'Creatividad',
//   'Cumplimiento de Metas de Producción',
//   'Desarrollo de Equipos',
//   'Desarrollo de Relaciones',
//   'Desarrollo de Talento',
//   'Desempeño Bajo Presión',
//   'Eficiencia de Maquinaria',
//   'Eficiencia en la Producción',
//   'Empatía',
//   'Enfoque en Resultados',
//   'Estandarización de Procesos',
//   'Ética Profesional',
//   'Flexibilidad',
//   'Gestión de Conflictos',
// ];

const BibliotecaHabilidades = () => {
    const [habilidades, setHabilidades] = useState([]);
    const [habilidad, setHabilidad]= useState([]);
    const [detalles, setDetalles] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const handleHabilidades = () => {
        axios.get('http://localhost:4000/data/obtener-habilidades')
        .then((response) => {
            setHabilidades(response.data.data);
        })
        .catch((error) => {

        })
    };

    const handleGetPuestos = () => {
      axios.get('http://localhost:4000/data/obtener-puestos')
          .then((response) => {
              setPuestos(response.data.data);
          })
          .catch((error) => {
              console.log(error);
          })
    } 
  

    const handleClosePopup = () => {
      setShowPopup(false);
    };

    const handleGetHabilidad = (idHabilidad)=>{
      axios.post('http://localhost:4000/data/obtener-habilidades-por-id', {id_habilidad:idHabilidad})
      .then((response)=> {
        setHabilidades(response.data.data);
        setDetalles(response.data.data.detalles);
        setShowPopup(true);
      })
      .catch((error)=>{

      })
    }

    useEffect(() => {
        handleHabilidades();
    }, []);

  return (
    <div className="BibliotecaHabilidades">
      <Navbar/>
      <h2><b>Biblioteca De Habilidades</b></h2>

      <div className="habilidades-container">
        {habilidades.map((habilidad, index) => (
          <a className="habilidades-card" key={index} value={habilidad.id_habilidad} onClick={()=> handleGetHabilidad(habilidad.id_habilidad)}>
            {habilidad.nombre_habilidad}
          </a>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
          <div className='information-container'>
            <h2>{habilidad.nombre_habilidad}</h2>
            
              {detalles.length > 0 ? (
                detalles.map((detalle, index) => ( 
                  <div key={index}> {}
                    <div className='information'>
                      <h4>{detalle.comportamiento}</h4>
                      <p>{detalle.pregunta}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay datos.</p>
              )}

          </div>
            <button onClick={handleClosePopup}>Cerrar</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default BibliotecaHabilidades;