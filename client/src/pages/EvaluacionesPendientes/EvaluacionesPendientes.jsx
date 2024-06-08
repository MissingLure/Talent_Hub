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

  /*Aqui se encarga de cargar los datos al cosito de evaluaciones y chequiaria si son del user que le tocan */
  const handleGetEvaluacion = (id) => {
    axios
      .get("http://localhost:4000/evaluaciones-competencias/evaluaciones-pendientes")
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
      <h2><b>Evaluaciones Pendientes</b></h2>
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
                      <input type="checkbox" name="realizar" />
                    </td>
                    <td>{evaluacion.nombre}</td>
                    <td>{new Date(evaluacion.fechaCaducidad).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No tiene evaluaciones pendientes.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div>
            <button className="button-realizar-evaluacion">
              <Link to="/user-dashboard" style={{ color: 'white', textDecoration: 'none' }}>Realizar</Link>
            </button>
            <button className="button-realizar-evaluacion" onClick={handleClick}>
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluacionesPendientes;