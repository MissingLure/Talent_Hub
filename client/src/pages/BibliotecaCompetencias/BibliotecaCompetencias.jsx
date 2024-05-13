import React, { useEffect, useState } from "react";
import "./BibliotecaCompetencias.css";
import axios from "axios";
import Modal from "react-modal";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import competenciasApi from "../../api/competencias.api";
import competenciaHabilidadesApi from "../../api/competencias.habilidades.api";

const BibliotecaCompetencias = () => {
  const [competencias, setCompetencias] = useState([]);
  const [competencia, setCompetencia] = useState("");
  const [detalles, setDetalles] = useState([]);
  const [showInformation, setShowInformation] = useState(false);

  const [showPopup, setSHowPopup] = useState(false);
  const [showAssignPositions, setShowAssignPositions] = useState(false);

  const [puestos, setPuestos] = useState();

  const handleCompetencias = async () => {
    const { succes, data } = await competenciasApi.getCompetenciasRequest();

    if (succes) console.log("Se obtuvieron los datos");

    setCompetencias(data);
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
    setSHowPopup(false);
  };

  const handleGetCompetencia = async (idCompetencia) => {
    const { succes, data } = await competenciasApi.getCompetenciaRequest(
      idCompetencia
    );

    if (succes) console.log("Obtuvo competencia");

    const resHabilidades =
      await competenciaHabilidadesApi.getCompetenciaHabilidadesByCompetencia(
        idCompetencia
      );

    let dataHabilidades = [];

    if (resHabilidades) dataHabilidades = resHabilidades.data;

    setCompetencia(data.nombre_competencia);
    setDetalles(dataHabilidades);
    setShowInformation(true);
    setSHowPopup(true);
  };

  const handleAssignPositionsOpen = () => {
    setShowAssignPositions(true);
  };

  const handleCloseInformation = () => {
    setShowInformation(false);
  };

  useEffect(() => {
    handleCompetencias();
  }, []);

  return (
    <div className="biblioteca-competencias">
      <Navbar />
      <h1>
        <b>Biblioteca De Competencias</b>
      </h1>
      <div>
        <Link className="biblioteca-competencias" to="/crear-competencias">
          <button type="submit">Crear Competencias</button>
        </Link>
      </div>
      <div className="competencias-container">
        {competencias.map((competencia, index) => (
          <a
            className="competencia-card"
            key={index}
            value={competencia.id_competencia}
            onClick={() => handleGetCompetencia(competencia.id_competencia)}
          >
            {competencia.nombre_competencia}
          </a>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="information-container">
              <h2>{competencia.nombre_competencia}</h2>

              {detalles.length > 0 ? (
                detalles.map((detalle, index) => (
                  <div key={index}>
                    {" "}
                    {}
                    <div className="information">
                      <h4>{detalle.comportamiento_habilidad}</h4>
                      <p>{detalle.pregunta_habilidad}</p>
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
};

export default BibliotecaCompetencias;
