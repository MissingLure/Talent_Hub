import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./AsignarEvaluacion.css";

const AsignarEvaluacion = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [puestos, setPuestos] = useState([]);
  const [id_perfil_puesto, setid_perfil_puesto] = useState("");
  const [competencias, setCompetencias] = useState([]);
  const [competenciasPuesto, setCompetenciasPuesto] = useState([]);

  const [idCompetencia, setIdCompetencia] = useState("");
  const [nombreCompetencia, setNombreCompetencia] = useState("");

  const handleGetPuestos = () => {
    axios
      .get("http://localhost:4000/data/obtener-puestos")
      .then((response) => {
        console.log("Puestos obtenidos:", response.data.data);
        setPuestos(response.data.data);
      })
      .catch((error) => {
        console.log("Error obteniendo puestos:", error);
      });
  };

  const handleObtenerCompetencias = () => {
    axios
      .get("http://localhost:4000/data/obtener-competencias")
      .then((response) => {
        console.log("Competencias obtenidas:", response.data.data);
        setCompetencias(response.data.data);
      })
      .catch((error) => {
        console.log("Error obteniendo competencias:", error);
      });
  };

  const handleGetCompetenciasPuesto = (id_perfil_puesto) => {
    if (!id_perfil_puesto) {
      console.error("ID perfil puesto es inválido:", id_perfil_puesto);
      return;
    }
    console.log("Obteniendo competencias para puesto ID:", id_perfil_puesto);
    axios
      .get(`http://localhost:4000/competencias-por-puesto/${id_perfil_puesto}`)
      .then((response) => {
        console.log("Competencias del puesto obtenidas:", response.data);
        if (Array.isArray(response.data)) {
          const formattedCompetencias = response.data.map((comp) => ({
            idCompetecnia: comp.id_competencia,
            nombreCompetencia: comp.nombre_competencia,
          }));
          setCompetenciasPuesto(formattedCompetencias);
        } else {
          setCompetenciasPuesto([]);
        }
      })
      .catch((error) => {
        console.log("Error obteniendo competencias del puesto:", error);
        setCompetenciasPuesto([]);
      });
  };

  const handleAsignarHabilidades = () => {
    axios
      .post("http://localhost:4000/competencias-por-puesto/", {
        id_perfil_puesto: id_perfil_puesto,
        competencias: idCompetencia,
      })
      .then((response) => {
        console.log("Competencias asignadas:", response.data);
        handleGetCompetenciasPuesto(id_perfil_puesto);
      })
      .catch((error) => {
        console.log("Error asignando competencias:", error);
      });
  };

  const handleEliminarHabilidad = (index) => {
    const competenciaAEliminar = competenciasPuesto[index];
    axios
      .delete(`http://localhost:4000/competencias-por-puesto/${id_perfil_puesto}`, {
        data: {
          id_perfil_puesto: id_perfil_puesto,
          id_competencia: competenciaAEliminar.idCompetecnia || competenciaAEliminar.id_competencia,
        },
      })
      .then((response) => {
        console.log("Competencia eliminada:", response.data);
        const updatedCompetenciasPuesto = competenciasPuesto.filter((_, i) => i !== index);
        setCompetenciasPuesto(updatedCompetenciasPuesto);
      })
      .catch((error) => {
        console.log("Error eliminando competencia:", error);
      });
};


  const handleAgregarHabilidad = () => {
    setErrorMessages([]);
    let errors = [];
    if (id_perfil_puesto === "") {
      errors.push("Debe seleccionar un perfil de puesto.");
    }
    if (idCompetencia === "") {
      errors.push("Debe seleccionar una competencia.");
    }
    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      if (competenciasPuesto.some((c) => c.idCompetecnia === idCompetencia || c.id_competencia === idCompetencia)) {
        errors.push("Esta competencia ya ha sido seleccionada.");
        setErrorMessages(errors);
        return;
      }

      let habilidad = {
        idCompetecnia: idCompetencia,
        nombreCompetencia: nombreCompetencia,
      };
      const updatedCompetenciasPuesto = [...competenciasPuesto, habilidad];
      setCompetenciasPuesto(updatedCompetenciasPuesto);
      handleAsignarHabilidades(); 
    }
  };

  const handleAssignPositionsClose = () => {
    setErrorMessages([]);
    setid_perfil_puesto("");
    setCompetenciasPuesto([]);
  };

  useEffect(() => {
    handleGetPuestos();
    handleObtenerCompetencias();
  }, []);

  useEffect(() => {
    if (id_perfil_puesto) {
      handleGetCompetenciasPuesto(id_perfil_puesto);
    }
  }, [id_perfil_puesto]);

  return (
    <div className="asign-container">
      <Navbar />
      <h2>Asignar Competencias</h2>
      <h4>Aplica las competencias necesarias que un puesto especifico debe cumplir.</h4>
      <div className="body-container">
        <div>
          <label>Perfil de Puesto:</label>
          <select value={id_perfil_puesto} onChange={(e) => setid_perfil_puesto(e.target.value)}>
            <option value="" disabled hidden>
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
          <label>Competencias:</label>
          <select
            value={idCompetencia}
            onChange={(e) => {
              let selectedIndex = e.target.value;
              setIdCompetencia(competencias[selectedIndex].id_competencia);
              setNombreCompetencia(competencias[selectedIndex].nombre_competencia);
            }}
          >
            <option value="" disabled hidden>
              Seleccionar competencia...
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
        </div>
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
          <p></p>
        )}
      </div>

      <div className="habilidads-container">
        {competenciasPuesto.length > 0 && (
          <>
            <h4>Competencias Seleccionadas:</h4>
            {competenciasPuesto.map((habi, index) => (
              <div className="habilidad-container" key={index}>
                <div>
                  <p>{habi.nombreCompetencia}</p>
                </div>
                <div>
                  <button
                    className="delete-button"
                    onClick={() => handleEliminarHabilidad(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        {competenciasPuesto.length === 0 && (
          <p>No hay competencias seleccionadas o existentes.</p>
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
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default AsignarEvaluacion;
