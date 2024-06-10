import Navbar from "../../components/Navbar/Navbar.jsx";
import { Link } from 'react-router-dom';
import UserDashboard from '../UserDashboard/UserDashboard.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/hanes-logo.png';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './ModificarUsuarioPopUp.css';

const ModificarUsuarioPopUp = ({ onClose }) => {
    const handleBack = () => {
        onClose(); // Esta función cierra la ventana emergente al hacer clic en "Regresar"
    };

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
        // Lógica para guardar los cambios
    };

    return (
        <div className="modificar-usuario-popup">
            <div className="contenido-usuario">
                <div className="formulario-container-usuario">
                    <h2 className="titulo-usuario">Modificar Usuario</h2>
                    <form onSubmit={handleSubmit} className="formulario-usuario">
                        <div className="input-wrapper-usuario">
                            <label htmlFor="correo">Correo:</label>
                            <input type="email" id="correo" value={correo} onChange={handleCorreoChange} placeholder="Correo" />
                        </div>
                        <div className="input-wrapper-usuario">
                            <label htmlFor="id">ID:</label>
                            <input type="text" id="id" value={id} onChange={handleIdChange} placeholder="ID" />
                        </div>
                        <div className="input-wrapper-usuario">
                            <label htmlFor="rol">Rol:</label>
                            <input type="text" id="rol" value={rol} onChange={handleRolChange} placeholder="Rol" />
                        </div>
                        <div className="button-wrapper-usuario">
                            <button type="submit">Guardar cambios</button>
                            <button type="button" onClick={handleBack}>Regresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModificarUsuarioPopUp;