import Navbar from "../../components/Navbar/Navbar.jsx";
import { Link } from 'react-router-dom';
import "./Inicio.css"
import UserDashboard from '../UserDashboard/UserDashboard.jsx';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import logo from '../../images/Hanes-Landing-Page.jpg';
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

const Inicio = () => {
  const accessToken = localStorage.getItem('accessToken');
  const decoded = jwtDecode(accessToken);
  const employeeData = JSON.parse(localStorage.getItem('employeeData'));
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);

  const handleEmpleados=()=>{
    axios.get('http://localhost:4000/data/obtener-empleados')
    .then((response)=>{
      setEmployee(response.data.data);
    })
    .catch((error)=>{
      console.log(error.response.data.data);
    })
  };

  const handleGetEmployee = (idEmployee)=>{
    axios.post('http://localhost:4000/data/obtener-empleado', {idEmployee: idEmployee})
    .then((response) => {
      setEmployee(response.data.data);
  })
  .catch((error) => {
    console.log(error.response.data.data);
})
};
   
  return (
      <div className="Inicio">
          <Navbar />
          <img
        src={logo}
        alt="Logo"
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
          display: 'block',
        }}
      />      
      { <div className="Empleados-TITULO">
        <h2><b>Empleados</b></h2>
        <div className="Empleados-container">
          <div className="competencia-container">
            {employee.map((employee, index)=>(
              <a className="competencia-card" key={index} value ={employee.idEmployee} onClick={() => handleGetEmployee(employee.idEmployee)}>
                {employee.nombresEmpleados}
              </a>
            ))}
            </div>
      </div>
        </div> }
      

      </div>
  );
}

export default Inicio;