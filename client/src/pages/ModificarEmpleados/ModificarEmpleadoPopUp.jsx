import Navbar from "../../components/Navbar/Navbar.jsx";
import { Link } from 'react-router-dom';
import UserDashboard from '../UserDashboard/UserDashboard.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/hanes-logo.png';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './ModificarEmpleadoPopUp.css';

const ModificarEmpleadoPopUp = ({ onClose }) => {
    const handleBack = () => {
        onClose(); // Esta función cierra la ventana emergente al hacer clic en "Regresar"
    };

    const [puesto, setPuesto] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [jefe, setJefe] = useState('');

    const handlePuestoChange = (event) => {
        setPuesto(event.target.value);
    };

    const handleDepartamentoChange = (event) => {
        setDepartamento(event.target.value);
    };

    const handleJefeChange = (event) => {
        setJefe(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para guardar los cambios
    };

    return (
        <div className="modificar-empleado-popup">
            <div className="contenido-empleado">
                <div className="formulario-container-empleado">
                    <h2 className="titulo-empleado">Modificar Empleado</h2>
                    <form onSubmit={handleSubmit} className="formulario-empleado">
                        <div className="input-wrapper-empleado">
                            <label htmlFor="puesto">Puesto:</label>
                            <input type="text" id="puesto" value={puesto} onChange={handlePuestoChange} placeholder="Puesto" />
                        </div>
                        <div className="input-wrapper-empleado">
                            <label htmlFor="departamento">Departamento:</label>
                            <input type="text" id="departamento" value={departamento} onChange={handleDepartamentoChange} placeholder="Departamento" />
                        </div>
                        <div className="input-wrapper-empleado">
                            <label htmlFor="jefe">Jefe:</label>
                            <input type="text" id="jefe" value={jefe} onChange={handleJefeChange} placeholder="Jefe" />
                        </div>
                        <div className="button-wrapper-empleado">
                            <button type="submit">Guardar cambios</button>
                            <button type="button" onClick={handleBack}>Regresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModificarEmpleadoPopUp;