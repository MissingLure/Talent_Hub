import Navbar from "../../components/Navbar/Navbar.jsx";
import { Link } from 'react-router-dom';
import UserDashboard from '../UserDashboard/UserDashboard.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/hanes-logo.png';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './ModificarUsuario.css';

const ModificarUsuario = () => {
  const [correo, setCorreo] = useState('');
  const [id, setId] = useState('');
  const [rol, setRol] = useState('');

  const handleCorreoChange = (event) => {
    setCorreo(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleRolChange = (event) => {
    setRol(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para guardar los cambios
  };

  const handleBack = () => {
    window.history.back(); // Función para regresar a la página anterior en el historial del navegador
  };

  return (
    <div className="ModificarUsuario">
      <Navbar />
      <div className="contenido">
        <div className="formulario-container">
          <div className="formulario">
            <img src={logo} alt="Logo" className="imagen" />
            <h2 className="titulo">Modificar Usuario</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <label htmlFor="correo">Correo:</label>
                <input type="email" id="correo" value={correo} onChange={handleCorreoChange} placeholder="joshua@gmail.com" />
              </div>
              <div className="input-wrapper">
                <label htmlFor="id">ID:</label>
                <input type="text" id="id" value={id} onChange={handleIdChange} placeholder="0512-1976-00244" />
              </div>
              <div className="input-wrapper">
                <label htmlFor="rol">Rol:</label>
                <input type="text" id="rol" value={rol} onChange={handleRolChange} placeholder="Empleado" />
              </div>
              <button type="submit">Guardar cambios</button>
            </form>
            <div className="button-container"> {/* Contenedor de los botones */}
              <button type="button" onClick={handleBack}>Regresar</button> {/* Botón de regresar */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModificarUsuario;