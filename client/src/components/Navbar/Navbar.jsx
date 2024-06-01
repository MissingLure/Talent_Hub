import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Asegúrate de tener tu archivo de estilos CSS
import { jwtDecode } from "jwt-decode";
import logo from '../../images/hanes-logo.png';

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
        <li className='logo'>
          <Link to="/inicio">
          <img src={logo}/>
          </Link>
        
        </li>
        
        {(rol==1) &&(
          <li className="nav-item">
          <Link className='nav-item' to="/evaluaciones-empleado">Inicio</Link>
        </li> 
        )}
        {(rol == 0 || rol == 1) && (
        <li className="nav-item" onMouseEnter={() => handleDropdown('rendimiento')}>
          Rendimiento
          {dropdownOpen === "rendimiento" && (
            <ul className="dropdown">
              {rol == 0 && (
                <li onClick={handleClickSubOption}>
                  <Link className="nav-link" to="/crear-encuestas">
                    Crear Encuesta
                  </Link>
                  <Link className="nav-link" to="/administrar-preguntas">
                    Administrar Evaluaciones
                  </Link>
                  <Link className="nav-link" to="/box-grid">
                    9 Box Grid
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
          onMouseEnter={() => handleDropdown("encuestas")}>
          Competencias
          {dropdownOpen === "encuestas" && (
            <ul className="dropdown">
              {rol == 0 && (
                <li onClick={handleClickSubOption}>
                   <Link className="nav-link" to="/asignar-evaluacion">
                    Asignar Competencias
                  </Link>
                  <Link className="nav-link" to="/administrar-encuestas">
                    Crear Preguntas
                  </Link>
                  <Link className="nav-link" to="/competencias">
                    Biblioteca de Competencias
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
                  Administar Empleados
                </Link>
              </li>
              <li onClick={handleClickSubOption}>
                <Link className="nav-link" to="/administrar-usuarios">
                  Administrar Usuarios
                </Link>
              </li>
              {/* <li onClick={handleClickSubOption}>
                <Link className="nav-link" to="/ver-preguntas">
                  Ver Preguntas
                </Link>
              </li> */}

              
              
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
