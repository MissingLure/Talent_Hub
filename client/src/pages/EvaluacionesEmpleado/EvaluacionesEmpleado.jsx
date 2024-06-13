import Navbar from "../../components/Navbar/Navbar.jsx";
import { Link } from "react-router-dom";
import "./EvaluacionesEmpleado.css";
import UserDashboard from "../UserDashboard/UserDashboard.jsx";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import EvaluarPotencial from "../EvaluarPotencial/EvaluarPotencial.jsx";

const nombresEmpleados = [

  'Josue De Jesus',
  'María García',
  'Pedro Martínez',
  'Ana López',
  'Juan Rodríguez',


  'Laura Fernández',
  'Carlos González',
  'Sofía Pérez',
  'Diego Sánchez',
  'Valentina Ramirez',


  'Luisa Torres',
  'Andrés Hernández',
  'Lucía Díaz',
  'Martín Castro',
  'Isabela Vargas',
  'Emilio Ruiz',
  'Camila Moreno',
  'David Silva',
  'Renata Navarro',
  'Gabriel Molina',
];



const EvaluacionesEmpleado = () => {
  const accessToken = localStorage.getItem("accessToken");
  const decoded = jwtDecode(accessToken);
  //console.log("Decoded role:", decoded.rol);
  const employeeData = JSON.parse(localStorage.getItem("employeeData"));
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState();

  const coreCompetence = nombresEmpleados.slice(0, 5);
  const performanceMeasurement = nombresEmpleados.slice(5, 10);
  const corePotential = nombresEmpleados.slice(10);
  const [empleados, setEmpleados] = useState([]);

  const [potencialPopUp, setPotencialPopUp] = useState(false);
  const [notaPotencial, setNotaPotencial] = useState("");

  const handlePotencialPopupOpen = (employee) => {
  // setSelectedEmployee(employee);
    setPotencialPopUp(true);
  };

  const handlePotencialPopupClose = () => {
    setPotencialPopUp(false);
    setNotaPotencial("");
  };

  const handlePopup = (nombre, empleado) => {
    setSelectedEmployee(nombre);
    setSelectedEmployeeInfo(empleado);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleSaveNotaPotencial = (employee, nota) => {
    // Implement the logic to save the grade, e.g., make an API call to save the grade
   // console.log(`Saving grade for ${employee.primer_nombre} ${employee.primer_apellido}: ${nota}`);
  };

  const handleGetEmployees = (bossId) => {
    axios
      .post("http://localhost:4000/data/obtener-empleados-por-jefe", {
        bossId: bossId,
      })
      .then((response) => {
     //   console.log(response.data.data);
        setEmpleados(response.data.data);
      })
      .catch((error) => {
     //   console.log(error.response.data.data);
      });
  };

  const handleAction = (action) => {
      setShowPopup(false);
      if (action === 'Dashboard') {
        navigate(`/user-dashboard?id_empleado=${selectedEmployeeInfo.id_empleado}`); 
      } else if (action === 'Evaluar') {
        console.log("Hmmmm")
        navigate(`/evaluar-competencia?id_empleado=${selectedEmployeeInfo.id_empleado}`);
      }
  };

  useEffect(() => {
    if (decoded.rol == 1) {
      handleGetEmployees(employeeData.id_empleado);
    }
  }, []);

  const [toggle, setToggle] = useState(1);
  function updateToggle(id) {
    setToggle(id);
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="Empleados-TITULO">Evaluacion Empleado</div>
      <div className="col-6 tab p-5">
        {decoded.rol == 0 && (
          <ul>
            <li onClick={() => updateToggle(1)}>Core Competence</li>
            <li onClick={() => updateToggle(2)}>Performance Measurement</li>
            <li onClick={() => updateToggle(3)}>Core Potential</li>
          </ul>
        )}
        <div
          className={
            decoded.rol == 0 && toggle == 1 ? "show-content" : "content"
          }
        >
          <div className="row">
            <div className="column">
              <h2>Core Competence</h2>
              <div className="competencia-container">
                {coreCompetence.map((nombre, index) => (
                  <div key={index} className="competencia-card">
                    <button onClick={() => handlePopup(nombre)}>
                      {nombre}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            decoded.rol == 0 && toggle == 2 ? "show-content" : "content"
          }
        >
          <div className="row">
            <div className="column">
              <h2>Performance Measurement</h2>
              <div className="competencia-container">
                {performanceMeasurement.map((nombre, index) => (
                  <div key={index} className="competencia-card">
                    <button onClick={() => handlePopup(nombre)}>
                      {nombre}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            decoded.rol == 0 && toggle == 3 ? "show-content" : "content"
          }
        >
          <div className="row">
            <div className="column">
              <h2>Core Potential</h2>
              <div className="competencia-container">
                {corePotential.map((nombre, index) => (
                  <div key={index} className="competencia-card">
                    <button onClick={() => handlePopup(nombre)}>
                      {nombre}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {decoded.rol == 1 && (
          <div className="Prueba">
            Prueba
            <div className="competencia-container">
              {empleados.length > 0 ? (
                empleados.map((empleado, index) => (
                  <div key={index} className="competencia-card">
                    <button
                      onClick={() =>
                        handlePopup(empleado.primer_nombre, empleado)
                      }
                    >
                      {empleado.primer_nombre} {empleado.primer_apellido}
                    </button>
                  </div>
                ))
              ) : (
                <p>No tiene empleados bajo su cargo</p>
              )}
            </div>
          </div>
        )}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Acciones para {selectedEmployee}</h3>
              <button onClick={() => handleAction("Dashboard")}>
                Dashboard
              </button>
              <button onClick={() => handleAction("Evaluar")}>
                Evaluar Competencia
              </button>
              <button onClick={handlePotencialPopupOpen}>
                Evaluar Potencial
              </button>
              <button onClick={handlePopupClose}>Cerrar</button>
            </div>
          </div>
        )}
      </div>

      {potencialPopUp && (
        <div>
          <div>
            
            <EvaluarPotencial
              selectedEmployee={selectedEmployee}
              cancel={handlePotencialPopupClose}
              save = {handleSaveNotaPotencial}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluacionesEmpleado;
