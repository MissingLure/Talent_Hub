import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdministrarEncuestas.css"
import Navbar from "../../components/Navbar/Navbar";
import Tablita from "../../components/CrearPreguntas/CompetenciaHabilidadTable";
import habilidadesApi from "../../api/competencias.habilidades.api";
import competenciasApi from "../../api/competencias.api";
import habilidadesPreguntasApi from "../../api/habilidades.preguntas.api";

const AdministrarEncuestas = () => {
  const opcionesCompetencia = ['Competencia 1', 'Competencia 2', 'Competencia 3'];
  const opcionesHabilidad = ['Habilidad 1', 'Habilidad 2', 'Habilidad 3'];
  const opcionesComportamiento = ['Comportamiento 1', 'Comportamiento 2', 'Comportamiento 3'];

  const [competencia, setCompetencia] = useState(null);
  const [habilidad, setHabilidad] = useState(null);

  const [resumen, setResumen] = useState("");
  const [pregunta_habilidad, setPregunta] = useState("");

  const [filasTabla, setFilasTabla] = useState([]);
  const [filasMarcadas, setFilasMarcadas] = useState([]);

  const [competencias, setCompetencias] = useState([]);
  const [habilidades, setHabilidades] = useState([]);


  const handleObtenerCompetencias = async () => {
    const result = await competenciasApi.getCompetenciasRequest();

    if (result !== null) {
      if (result.status === 200) {
        setCompetencias(result.data.data);
      }
    }
  };

  const findCompetenciaById = (idCompetencia) => {
    return competencias.find(
      (competencia) => competencia.id_competencia === idCompetencia
    );
  };

  const findHabilidadById = (idHabilidad) => {
    return habilidades.find(
      (habilidad) => habilidad.id_competencia_habilidad === idHabilidad
    );
  };

  const handleObtenerHabilidades = async (idCompetencia) => {
    const result =
      await habilidadesApi.getCompetenciaHabilidadesByCompetenciaRequest(
        idCompetencia
      );

    if (result !== null) {
      if (result.status === 200) {
        setHabilidades(result.data.data);
      } else {
        setHabilidades([]);
      }
    }
  };


  useEffect(() => {
    handleObtenerCompetencias();
  }, []);
  
  const handleAgregarFila = () => {
    if (competencia && habilidad && resumen && pregunta_habilidad) {
      const nuevaFila = { competencia, habilidad, resumen, pregunta_habilidad };
      setFilasTabla([...filasTabla, nuevaFila]);
      setCompetencia(null);
      setHabilidad(null);
      setResumen("");
      setPregunta("");
    } else {
      alert("Por favor, seleccione valores para todas las columnas");
    }
  };
  const handleMarcarFila = (index) => {
    const filasMarcadasCopy = [...filasMarcadas];
    if (filasMarcadasCopy.includes(index)) {
      filasMarcadasCopy.splice(filasMarcadasCopy.indexOf(index), 1);
    } else {
      filasMarcadasCopy.push(index);
    }
    setFilasMarcadas(filasMarcadasCopy);
  };

  const handleEliminarFilasMarcadas = () => {
    const filasNuevas = filasTabla.filter(
      (fila, index) => !filasMarcadas.includes(index)
    );
    setFilasTabla(filasNuevas);
    setFilasMarcadas([]);
  };

  const handleFinalizarEncuesta = async () => {
    let paso = true;
    filasTabla.forEach(async (fila) => {
      const { resumen, pregunta_habilidad } = fila;

      const newPregunta = { resumen, pregunta_habilidad };

      const result = await habilidadesPreguntasApi.postHabilidadPreguntaRequest(
        fila.habilidad.id_competencia_habilidad,
        newPregunta
      );

      if (result !== null) {
        if (result.status === 200) {
        } else {
          alert(
            "Error al crear la pregunta " +
              pregunta_habilidad +
              "de la habilida " +
              fila.habilidad.nombre_habilidad
          );
          paso = false;
        }
      } else {
        alert(
          "Error al crear la pregunta " +
            pregunta_habilidad +
            " de la habilida " +
            fila.habilidad.nombre_habilidad
        );
        paso = false;
      }
    });

    setFilasTabla([]);
    if (paso) {
      alert("Preguntas creadas correctamente");
    }
  };
    return(
        <div className="admin-encuesta-container">
          <Navbar/>
          {/* <div className="volver">
            <Link to="/administrar-preguntas">
              <button className="botonVolverMenuEncuesta">Volver al Menu de Encuestas</button>
            </Link>
          </div> */}
      <h2><b>Crear Preguntas Para Competencias</b></h2>
      <br></br>
      <h4>Crea tus preguntas para competencias especificas.</h4>
      
      <div>
        <br></br>
        <label>Competencia: </label>
        {competencias.length > 0 ? (
          <select
            onChange={(e) => {
              const competenciafind = findCompetenciaById(e.target.value);
              setCompetencia(competenciafind);

              handleObtenerHabilidades(e.target.value);
            }}
          >
            <option
              hidden
              disabled
              selected={competencia ? false : true}
              value=""
            >
              Seleccione competencia...
            </option>
            {competencias.map((competencia, index) => (
              <option key={index} value={competencia.id_competencia}>
                {competencia.nombre_competencia}
              </option>
            ))}
          </select>
        ) : (
          <p>No hay datos.</p>
        )}

        <label>Habilidad: </label>
          {habilidades.length > 0 ? (
          <select
            onChange={(e) => {
              const habilidadF = findHabilidadById(e.target.value);

              setHabilidad(habilidadF);
            }}
          >
            <option hidden={true} selected={habilidad ? false : true} value="">
              Seleccione habilidad...
            </option>
            {habilidades.map((habilidad, index) => (
              <option key={index} value={habilidad.id_competencia_habilidad}>
                {habilidad.nombre_habilidad}
              </option>
            ))}
          </select>
        ) : (
          <select onChange={(e) => setHabilidad(e.target.value)}>
            <option hidden disabled selected value="">
              No hay habilidades disponibles
            </option>
          </select>
        )}
        <label>Resumen: </label>

        <input
          type="text"
          value={resumen}
          onChange={(e) => setResumen(e.target.value)}
          placeholder="Ingrese el resumen"
        />

        <label>Pregunta: </label>
        <input
            type="text"
            value={pregunta_habilidad}
            onChange={(e) => setPregunta(e.target.value)}
            placeholder="Ingrese la pregunta"
          />
        <div>
        <button
            className="botonEliminarFilas"
            onClick={handleEliminarFilasMarcadas}
          >
            Eliminar Filas Marcadas
          </button>
          <button onClick={handleAgregarFila}>Agregar a la tabla</button>

        </div>
      </div>
      
      <br></br>
      <div className="tabla-container">
            
            <Tablita/>

      </div>
      
      
      
     
     
    </div>
    
  );
};
export default AdministrarEncuestas;