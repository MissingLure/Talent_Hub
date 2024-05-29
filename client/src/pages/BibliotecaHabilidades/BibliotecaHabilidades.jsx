import React, { useEffect, useState } from "react";
import "./BibliotecaHabilidades.css";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "react-modal";
import axios from "axios";
import competenciasHabilidadesApi from "../../api/competencias.habilidades.api";
import habilidadesPreguntasApi from "../../api/habilidades.preguntas.api";
import { Link } from "react-router-dom";

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
  const [habilidad, setHabilidad] = useState();
  const [preguntas, setPreguntas] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleHabilidades = async () => {
    const res =
      await competenciasHabilidadesApi.getCompetenciaHabilidadesRequest();

    if (res) {
      if (res.status === 200) {
        setHabilidades(res.data.data);
      } else setHabilidades([]);
    }
  };

  const handleGetPuestos = () => {
    axios
      .get("http://localhost:4000/data/obtener-puestos")
      .then((response) => {
        setPuestos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleGetHabilidad = async (idHabilidad) => {
    const res = await competenciasHabilidadesApi.getCompetenciaHabilidadRequest(
      idHabilidad
    );

    if (res) {
      if (res.status === 200) {
        setHabilidad(res.data.data);

        const resPreguntas =
          await habilidadesPreguntasApi.getHabilidadPreguntasRequest(
            idHabilidad
          );

        if (resPreguntas) {
          if (resPreguntas.status === 200) {
            setPreguntas(resPreguntas.data.data);
          }

          setShowPopup(true);
        } else {
          alert("Ocurrio un problema al obtener las preguntas.");
        }
      }
    } else {
      alert("Ocurrio un problema al obtener la habilidad.");
    }
  };

  useEffect(() => {
    handleHabilidades();
  }, []);

  return (
    <div className="BibliotecaHabilidades">
      <Navbar />

      <div className="container">
        <h1 className="tituloBib">
          <b>Biblioteca De Habilidades</b>
        </h1>
        <div>
          <Link className="BibliotecaHabilidades" to="/crear-habilidades">
            <button type="submit">Crear Habilidades</button>
          </Link>
        </div>
        <div className="habilidades-container">
          {habilidades.map((habilidad, index) => (
            <a
              className="habilidades-card"
              key={index}
              value={habilidad.id_habilidad}
              onClick={() =>
                handleGetHabilidad(habilidad.id_competencia_habilidad)
              }
            >
              {habilidad.nombre_habilidad}
            </a>
          ))}
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <div className="information-container">
                <h1>{habilidad.nombre_habilidad}</h1>

                <h3>{habilidad.comportamiento_habilidad}</h3>

                <h2>Preguntas</h2>

                {preguntas.length > 0 ? (
                  preguntas.map((pregunta, index) => (
                    <div key={index}>
                      {" "}
                      {}
                      <div className="information">
                        <h4>{pregunta.resumen}</h4>
                        <p>{pregunta.pregunta_habilidad}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No hay preguntas.</p>
                )}
              </div>
              <button onClick={handleClosePopup}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BibliotecaHabilidades;
