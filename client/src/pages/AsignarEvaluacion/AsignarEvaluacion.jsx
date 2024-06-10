import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionContainer from "../../components/QuestionContainer/QuestionContainer";
import "./AsignarEvaluacion.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import habilidadesApi from "../../api/competencias.habilidades.api";

const AsignarEvaluacion = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [puestos, setPuestos] = useState([]);
  const [idPuesto, setIdPuesto] = useState("");
  const [competencias, setCompetencias] = useState([]);
  const [competenciasPuesto, setCompetenciaPuesto] = useState([]);

  const [evaluacion, setEvaluacion] = useState([]);
  const [idCompetencia, setIdCompetencia] = useState("");
  const [nombreCompetencia, setNombreCompetencia] = useState("");

  const [showAdminPositions, setShowAdminPositions] = useState(false);
  const [showCrearPreguntas, setShowCrearPreguntas] = useState(false);

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

  const handleGetHabilidades = async () => {
    const result = await habilidadesApi.getCompetenciaHabilidadesRequest();

    if (result.status === 200) {
      setHabilidades(result.data.data);

      console.log(result);
    }
  };

  const handleGetQuestions = () => {
    axios
      .get("http://localhost:4000/data/obtener-preguntas-competencias")
      .then((response) => {
        console.log(response.data.data);
        setQuestions(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAsignarHabilidades = () => {
    const errors = [];
    if (habilidadesPuesto.length == 0) {
      let error = "Debe seleccionar al menos una habilidad.";
      errors.push(error);
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      axios
        .post("http://localhost:4000/create/asignar-habilidades", {
          idPuesto: idPuesto,
          competencias: competenciasPuesto,
        })
        .then((response) => {
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEliminarHabilidad = (index) => {
    const updatedCompetenciasPuesto = competenciasPuesto.filter((_, i) => i !== index);
    setCompetenciaPuesto(updatedCompetenciasPuesto);
  };

  const handleAgregarHabilidad = () => {
    setErrorMessages([]);
    let errors = [];
    if (idPuesto == "") {
      errors.push("Debe seleccionar un perfil de puesto.");
      let error = "Debe seleccionar un perfil de puesto.";
      setErrorMessages([...errorMessages, error]);
    }
    if (idHabilidad == "") {
      errors.push("Debe seleccionar una habilidad.");
      let error = "Debe seleccionar una habilidad.";
      setErrorMessages([...errorMessages, error]);
    }
    if (habilidades.length == 0) {
      errors.push("Debe seleccionar una habilidad.");
      let error = "Debe seleccionar una habilidad.";
      setErrorMessages([...errorMessages, error]);
    } else {
      let habilidad = {
        idCompetecnia: idCompetencia,
        nombreCompetencia: nombreCompetencia,
      };
      setCompetenciaPuesto([...competenciasPuesto, habilidad]);
    }
  };

  const handleAssignPositionsClose = () => {
    setErrorMessages([]);
    setIdPuesto("");
    setCompetenciaPuesto("");
  };

  useEffect(() => {
    handleGetPuestos();
    handleGetHabilidades();
  }, []);

  return (
    <div className="asign-container">
      <Navbar />
      <h2>
        <b>Administrar Perfil de Puesto</b>
      </h2>
      <div className="body-container">
        <div>
          <label>Perfil de Puesto</label>
        </div>
        <select onChange={(e) => setIdPuesto(e.target.value)}>
          <option selected disabled hidden>
            Seleccionar perfil de puesto...
          </option>
          {puestos.length > 0 ? (
            puestos.map((puesto) => (
              <option
                key={puesto.id_perfil_puesto}
                value={puesto.id_perfil_puesto}
              >
                {puesto.nombre_perfil}
              </option>
            ))
          ) : (
            <option>No hay datos.</option>
          )}
        </select>
        <div>
          <br />
          <div>
            <label>Habilidades</label>
          </div>
          <select
            onChange={(e) => {
              let selectedIndex = e.target.value;
              setIdCompetencia(competencias[selectedIndex].id_habilidad);
              setNombreCompetencia(competencias[selectedIndex].nombre_habilidad);
            }}
          >
            <option selected disabled hidden>
              Seleccionar habilidad...
            </option>
            {competencias.length > 0 ? (
              competencias.map((habilidad, index) => (
                <option key={index} value={index}>
                  {habilidad.nombre_competencia}
                </option>
              ))
            ) : (
              <option>No hay datos.</option>
            )}
          </select>
          <div>
            <button
              className="agregar-habilidad"
              onClick={() => handleAgregarHabilidad()}
            >
              Agregar
            </button>
          </div>
        </div>
        <br />

        <div>
          {errorMessages.length > 0 ? (
            errorMessages.map((error, index) => <p key={index}>{error}</p>)
          ) : (
            <p></p> // You might consider omitting this line since it renders an empty paragraph.
          )}
        </div>

        <div className="habilidads-container">
          {competenciasPuesto.length > 0 ? (
            competenciasPuesto.map((habi, index) => (
              <div className="habilidad-container" key={index}>
                <div>
                  <p>{habi.nombreCompetencia}</p>
                </div>
                <div>
                  <button 
                  className="delete-button"
                  onClick={() => handleEliminarHabilidad(index)}
                  >Eliminar</button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay habilidades seleccionadas.</p>
          )}
        </div>
        <br />
        <div>
          <button
            className="eliminar-habilidad"
            onClick={handleAssignPositionsClose}
          >
            Cancelar
          </button>
          <button className="finalizar" onClick={handleAsignarHabilidades}>
            Aceptar
          </button>
        </div>
        <br />
        <div>
          <Link className="asign-container" to="/administrar-preguntas">
            <button type="submit">Regresar</button>
          </Link>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default AsignarEvaluacion;
