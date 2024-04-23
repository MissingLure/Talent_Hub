import Navbar from "../../components/Navbar/Navbar.jsx";
import { Link } from 'react-router-dom';
import "./EvaluacionesEmpleado.css"
import UserDashboard from '../UserDashboard/UserDashboard.jsx';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
  const accessToken = localStorage.getItem('accessToken');
  const decoded = jwtDecode(accessToken);
  const employeeData = JSON.parse(localStorage.getItem('employeeData'));
  const navigate = useNavigate();
 
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState();

  const coreCompetence = nombresEmpleados.slice(0, 5);
  const performanceMeasurement = nombresEmpleados.slice(5, 10); 
  const corePotential = nombresEmpleados.slice(10); 
  const [empleados, setEmpleados] = useState([]);
 
  const handlePopup = (nombre, empleado) => {
    setSelectedEmployee(nombre);
    setSelectedEmployeeInfo(empleado);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleGetEmployees = (bossId) => {
    axios.post('http://localhost:4000/data/obtener-empleados-por-jefe', {bossId: bossId})
    .then((response) => {
      console.log(response.data.data);
      setEmpleados(response.data.data);
    })
    .catch((error) => {
      console.log(error.response.data.data);
    })
  };

  const handleAction = (action) => {
      setShowPopup(false);
      if (action === 'Dashboard') {
          navigate('/user-dashboard'); 
      } else if (action === 'Evaluar') {
        navigate(`/evaluacion-empleado?id_empleado=${selectedEmployeeInfo.id_empleado}`);
      }
  };

  useEffect(() => {
    if(decoded.rol == 1) {
      handleGetEmployees(employeeData.id_empleado);
    }
  }, []);
  
  return (
      <div className="Inicio">
          <Navbar />
          <div className="Empleados-TITULO">
              <h1>Empleados</h1>
              <div className="Empleados-container">
                  {decoded.rol == 0 && (
                      <div>
                          <h2>CORE COMPETENCE</h2>
                          <div className="competencia-container">
                              {coreCompetence.map((nombre, index) => (
                                  <div key={index} className="competencia-card">
                                      <button onClick={() => handlePopup(nombre)}>{nombre}</button>
                                  </div>
                              ))}
                          </div>
                          <h2>Performance Measurement</h2>
                          <div className="competencia-container">
                              {performanceMeasurement.map((nombre, index) => (
                                  <div key={index} className="competencia-card">
                                      <button onClick={() => handlePopup(nombre)}>{nombre}</button>
                                  </div>
                              ))}
                          </div>
                          <h2>CORE POTENTIAL</h2>
                          <div className="competencia-container">
                              {corePotential.map((nombre, index) => (
                                  <div key={index} className="competencia-card">
                                      <button onClick={() => handlePopup(nombre)}>{nombre}</button>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
                 
                   {decoded.rol == 1 && (
                          <div>
                            <h2>PRUEBA</h2>
                            <div className="competencia-container">
                              {empleados.map((empleado, index) => (
                                <div key={index} className="competencia-card">
                                  <button onClick={() => handlePopup(empleado.primer_nombre, empleado)}>
                                    {empleado.primer_nombre} {empleado.primer_apellido}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                   
                  {showPopup && (
                    <div className="popup">
                      <div className="popup-content">
                        <h3>Acciones para {selectedEmployee}</h3>
                        <button onClick={() => handleAction('Dashboard')}>Dashboard</button>
                        <button onClick={() => handleAction('Evaluar')}>Evaluar</button>
                        <button onClick={handlePopupClose}>Cerrar</button>
                      </div>
                    </div>
                  )}
            </div>
            </div>
            </div>
             );
            }

export default EvaluacionesEmpleado;