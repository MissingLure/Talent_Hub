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
      />      </div>
  );
}

export default Inicio;