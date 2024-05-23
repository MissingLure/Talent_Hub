import Navbar from "../../components/Navbar/Navbar.jsx";
import { Link } from 'react-router-dom';
import UserDashboard from '../UserDashboard/UserDashboard.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/hanes-logo.png';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './PerfilPuesto.css';

const PerfilDePuesto = () => {
    const [habilidades, setHabilidades] = useState([]);
    const [perfil, setPerfil] = useState('');
    const [habilidad, setHabilidad] = useState('');

    const handleAgregarHabilidad = () => {
        if (habilidad && !habilidades.includes(habilidad)) {
            setHabilidades([...habilidades, habilidad]);
            setHabilidad('');
        }
    };

    const handleEliminarHabilidad = (index) => {
        setHabilidades(habilidades.filter((_, i) => i !== index));
    };

    const handleAceptar = () => {
        // Lógica para manejar la aceptación de cambios
        console.log('Perfil:', perfil);
        console.log('Habilidades:', habilidades);
    };

    return (
        <div>
            <Navbar />
            <div className="perfil-de-puesto">
                <div className="contenedor-perfil">
                    <h2 className="titulo-perfil">Admin. Perfil de Puesto</h2>
                    <div className="formulario-perfil">
                        <div className="input-wrapper">
                            <label htmlFor="perfil">Perfil de Puesto</label>
                            <select id="perfil" value={perfil} onChange={(e) => setPerfil(e.target.value)}>
                                <option value="">Perfil</option>
                                {/* Añade opciones según sea necesario */}
                            </select>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="habilidad">Habilidades</label>
                            <select id="habilidad" value={habilidad} onChange={(e) => setHabilidad(e.target.value)}>
                                <option value="">Habilidades</option>
                                {/* Añade opciones según sea necesario */}
                            </select>
                            <button type="button" onClick={handleAgregarHabilidad}>Agregar</button>
                        </div>
                        <div className="seleccion-habilidades">
                            <h3>Selección:</h3>
                            <table className="tabla-habilidades">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Habilidades</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {habilidades.map((hab, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{hab}</td>
                                            <td>
                                                <span
                                                    className="accion-borrar"
                                                    onClick={() => handleEliminarHabilidad(index)}
                                                >
                                                    &#10060;
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button className="boton-aceptar" onClick={handleAceptar}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilDePuesto;
