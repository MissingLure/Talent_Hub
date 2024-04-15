import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Asegúrate de tener tu archivo de estilos CSS
import { jwtDecode } from "jwt-decode";

const Navbar = ({roleValue}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [subDropdownOpen, setSubDropdownOpen] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const decoded = jwtDecode(accessToken);
  const rol = decoded.rol;
  const handleDropdown = (option) => {
    setDropdownOpen(option);
  };

  const handleSubDropdown = (option) => {
    setSubDropdownOpen(option);
  };

  const closeDropdowns = () => {
    setDropdownOpen(null);
    setSubDropdownOpen(null);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.navbar')) {
      closeDropdowns();
    }
  };

  const handleClickSubOption = () => {
    closeDropdowns();
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
            <Link className='nav-item' to="/inicio">Inicio</Link>
        </li>
        {(rol == 0 || rol == 1) && (
        <li className="nav-item" onMouseEnter={() => handleDropdown('rendimiento')}>
          Rendimiento
          {dropdownOpen === "rendimiento" && (
            <ul className="dropdown">
              {rol == 0 && (
                <li onClick={handleClickSubOption}>
                  <Link className="nav-link" to="/administrar-preguntas">
                    Administrar Evaluaciones
                  </Link>
                </li>
              )}
              {rol == 1 && (
                <li onClick={handleClickSubOption}>
                  <Link className="nav-link" to="/evaluaciones-empleado">
                    Evaluar Empleados
                  </Link>
                </li>
              )}
            </ul>
          )}
        </li>
        )}
        
        <li className="nav-item">
          <Link className='nav-item' to="/user-dashboard">Dashboard</Link>
        </li>
        
        {(rol == 0 ||  rol == 2) &&(
          <li
          className="nav-item"
          onMouseEnter={() => handleDropdown("encuestas")}
        >
          Encuestas
          {dropdownOpen === "encuestas" && (
            <ul className="dropdown">
              {rol == 0 && (
                <li onClick={handleClickSubOption}>
                  <Link className="nav-link" to="/crear-encuestas">
                    Crear Encuesta
                  </Link>
                </li>
              )}
              {rol == 1 && (
                <li onClick={handleClickSubOption}>
                <Link className="nav-link" to="/encuestas-empleado">
                  Encuestas Empleado
                </Link>
              </li>
              )}
              {rol == 2 && (
                <li onClick={handleClickSubOption}>
                <Link className="nav-link" to="/encuestas-empleado">
                  Encuestas
                </Link>
              </li>
              )}
            </ul>
          )}
        </li>
        )}
        
        {(rol == 0 || rol === 4) && (
          <li className="nav-item" onMouseEnter={() => handleDropdown("ajustes")}>
          Ajustes
          {dropdownOpen === "ajustes" && (
            <ul className="dropdown">
              <li onClick={handleClickSubOption}>
                <Link className="nav-link" to="/administrar-empleados">
                  Empleados
                </Link>
              </li>
              <li onClick={handleClickSubOption}>
                <Link className="nav-link" to="/administrar-usuarios">
                  Usuarios
                </Link>
              </li>
              <li onClick={handleClickSubOption}>
                <Link className="nav-link" to="/competencias">
                  Competencias
                </Link>
              </li>
              <li onClick={handleClickSubOption}>
                <Link className="nav-link" to="/habilidades">
                  Habilidades
                </Link>
              </li>
            </ul>
          )}
        </li>
        )}
        
        <li className="cerrar-sesion">
          <Link className='nav-item-logout' to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
