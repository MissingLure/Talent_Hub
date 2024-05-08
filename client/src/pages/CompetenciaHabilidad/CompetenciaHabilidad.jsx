import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CompetenciaHabilidad.css";
import Navbar from "../../components/Navbar/Navbar";

const CompetenciaHabilidad = () => {
  const [filasTabla, setFilasTabla] = useState([]);
  const [filasMarcadas, setFilasMarcadas] = useState([]);
  const [preguntaEnviada, setPreguntaEnviada] = useState(false);
  const [competenciaEnviada, setCompetenciaEnviada] = useState(false);
  const [tipoEncuesta, setTipoEncuesta] = useState('');
  const [competencia, setCompetencia] = useState('');
  const [habilidad, setHabilidad] = useState('');
  const [comportamiento, setComportamiento] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [lenguaje, setLenguaje] = useState('');

  const [responseMessage, setResponseMessage] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  
  const [competencias, setCompetencias] = useState([]);
  const [habilidades, setHabilidades] = useState([]);

  const handleObtenerCompetencias = () => {
    axios.get('http://localhost:4000/data/obtener-competencias')
    .then((response) => {
        setCompetencias(response.data.data);
    })
    .catch((error) => {
        console.log(error);
    })
  };

  const handleObtenerHabilidades = () => {
    axios.get('http://localhost:4000/data/obtener-habilidades')
    .then((response) => {
        setHabilidades(response.data.data);
    })
    .catch((error) => {
        console.log(error);
    })
  };

  const handleAgregarPregunta = () => {
    const errorMessage = [];
    if (!tipoEncuesta) {
      errorMessage.push("El tipo de encuesta es obligatorio");
    }
    if (!competencia) {
      errorMessage.push("La competencia es obligatoria");
    }
    if (!habilidad) {
      errorMessage.push("La habilidad es obligatoria");
    }
    if (!comportamiento) {
      errorMessage.push("El comportamiento es obligatorio");
    }
    if (!pregunta) {
      errorMessage.push("La pregunta es obligatoria");
    }
    if (!lenguaje) {
      errorMessage.push("El lenguaje es obligatorio");
    }
  
   
    if (errorMessage.length > 0) {
      setErrorMessages(errorMessage);
      return;
    }
  
    
    const preguntaData = {
      idCompetencia: competencia,
      idHabilidad: habilidad,
      comportamiento: comportamiento,
      pregunta: pregunta,
      lenguaje: lenguaje,
      tipo: tipoEncuesta
    };
  
    axios.post('http://localhost:4000/create/crear-pregunta', preguntaData)
    .then((response) => {
      console.log(response.data.details);
      setResponseMessage(response.data.details);
      setPreguntaEnviada(true); // Marcar la pregunta como enviada
      alert("Preguntas añadidas con exito!");
    })
    .catch((error) => {
      setErrorMessages(error.response.data.details);
    });
  };

  useEffect(() => {
    handleObtenerCompetencias();
    handleObtenerHabilidades();
  }, []);

    return(
      <div className="create-questions">
        <Navbar/>
        <h2 className="tituloCrearEncuesta"><b>Crear Parametros de Evaluación</b></h2>
        <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAgregarPregunta();
      }}
      
    ></form>
        
        <div className="create-form">
        <div>
          <label>Tipo de evaluación</label>
        </div>
        <div>
          <select onChange={(e) => setTipoEncuesta(e.target.value)}>
            <option hidden disabled selected>Selecciones tipo de encuesta...</option>
            <option value="Competencia">Competencia</option>
          </select>
        </div>
        {competenciaEnviada && (
          <div>
            <p>La competencia ya fue enviada.</p>
          </div>
        )}
        <div>
          <label>
            Competencia
          </label>
        </div>
        <div>
          {competencias.length > 0 ? (
            <select onChange={(e) => setCompetencia(e.target.value)}>
              <option hidden disabled selected value="">Seleccione competencia...</option>
              {competencias.map((competencia, index) => (
                <option key={index} value={competencia.id_competencia}>{competencia.nombre_competencia}</option>
              ))}
            </select>
          ) : (
            <p>No hay datos.</p>
          )}
        </div>
        <div>
          <label>
            Habilidad
          </label>
        </div>
        <div>
          {habilidades.length > 0 ? (
              <select onChange={(e) => setHabilidad(e.target.value)}>
                <option hidden disabled selected value="">Seleccione habilidad...</option>
                {habilidades.map((habilidad, index) => (
                  <option key={index} value={habilidad.id_habilidad}>{habilidad.nombre_habilidad}</option>
                ))}
              </select>
            ) : (
              <p>No hay datos.</p>
            )}
        </div>
        <div>
          <label>
            Comportamiento
          </label>
        </div>
        <div>
          <input onChange={(e) => setComportamiento(e.target.value)} placeholder="Ingrese el comportamiento"/>

        </div>
        <div>
          <label>
            Pregunta: 
            
          </label>
        </div>
        <div>
        <input
              type="text"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              placeholder="Ingrese la pregunta"
            />
        </div>
        <div>
          <label>Lenguaje:
            
          </label>
        </div>
        <div>
        <select onChange={(e) => setLenguaje(e.target.value)}>
              <option hidden disabled selected>Seleccione lenguaje...</option>
              <option value="Español">Español</option>
              <option value="Inglés">Ingles</option>
            </select>
        </div>
       
        <div>
        <button type="submit" onClick={handleAgregarPregunta} disabled={preguntaEnviada}>
        Crear
      </button>
        </div>

        <div>
        <Link className="create-questions" to="/administrar-preguntas">
          <button type="submit">
            Regresar
          </button>
        </Link>
        </div>
                  
        
        <div>
          {errorMessages.length > 0 ? (
            <div className="error-message">
              {errorMessages.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          ) : (
            <p>{responseMessage}</p>
          )}
        </div>
      </div>

     <br/>
     <br/>

     <br/>
     <br/>
    </div>
  
    
    
  );
};
    export default CompetenciaHabilidad;