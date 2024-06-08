import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EvaluacionesPendientes.css";
import inform from "../../images/info.png";
import search from "../../images/search.png";
import add from "../../images/add.png";
import Navbar from "../../components/Navbar/Navbar";

import Modal from "react-modal";

const EvaluacionesPendientes = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  JSON.parse(localStorage.getItem("employeeData"));
  const [id_persona, setId_persona] = useState(employeeData.id_user);

  useEffect(() => {
    handleGetEvaluacion(id_persona);
  }, []);

  const handleGetEvaluacion = (id) => {
    axios
      .get("http://localhost:4000/data//evaluaciones-pendientes")
      .then((response) => {
        setEvaluaciones(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.data);
      });
  };

  const handleClick = () => {
    navigate("/user-dashboard");
  };

  return (
    <div className="evaluaciones-pendientes">
      <Navbar />
      <h2>
        <b>Evaluaciones Pendientes</b>
      </h2>
      <br />
      <div className="body-container-evaluaciones">
        <div className="container3 evaluaciones">
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>Evaluación</th>
                <th>Fecha de Caducidad</th>
              </tr>
            </thead>
            <tbody>
              {evaluaciones.length > 0 ? (
                evaluaciones.map((evaluacion) => (
                  <tr key={evaluacion.id}>
                    <td>
                      <input
                        type="checkbox"
                        name="realizar"
                        // Add logic for checkbox handling if necessary
                      />
                    </td>
                    <td>{evaluacion.nombre}</td>
                    <td>
                      {new Date(evaluacion.fechaCaducidad).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay datos.</td>
                </tr>
              )}
            </tbody>
          </table>
          <button className="button-realizar-evaluacion">
            <Link to="/user-dashboard">Realizar</Link>
          </button>{" "}
          <button className="button-realizar-evaluacion" onClick={handleClick}>
            <Link to="/user-dashboard">Regresar</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluacionesPendientes;
