import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './AdministrarUsuarios.css';
import axios from "axios";
import Modal from "react-modal";
import DataContainer from "../../components/DataContainer/DataContainer";
import Navbar from "../../components/Navbar/Navbar";


const AdministarUsuarios = () => {
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [userExists, setUserExists] = useState(false);

    //User data
    const [user, setUser] = useState(''); 

    const [employee, setEmployee] = useState('');

    //Informacion usuario
    const [numeroIdentidad, setNumeroIdentidad] = useState('');
    const [idEmpleado, setIdEmpleado] = useState('')
    const [correo, setCorreo] = useState('');
    const [contraseña, setContrasena] = useState('');
    const [rol, setRol] = useState('');

    const handleGetEmployees = () => {
        axios.get('http://localhost:4000/data/obtener-empleados')
        .then((response) => {
            setEmpleados(response.data.data);
        })
        .catch((error) => {
            setErrorMessages(error.response.data.data);
        })
    };

    const handleGetUser = (empleado) => {
        setEmployee(empleado);
        axios.post('http://localhost:4000/user/get-employee-user', {employeeId: empleado.id_empleado})
        .then((response) => {
            if(response.data.success) {
                setUser(response.data.data);
                setErrorMessages([]);
            } else {
                setErrorMessages(response.data.details);
            }
            setUserExists(response.data.success);
        })
        .catch((error) => {
            setErrorMessages(error.response.data.details);
        })
        
        setShowAddUserPopup(true);
    };

    const handleCrearUsuario = () => {
        const userData = {
            idEmpleado: employee.id_empleado,
            rol: rol,
            correo: employee.correo,
            contrasena: contraseña,
        };
        axios.post('http://localhost:4000/create/crear-usuario', userData)
        .then((response) => {
            console.log(response.data.data)
            if (response.data.success) {
                setResponseMessage(response.data.details);
                setErrorMessages([]);
            } else {
                setErrorMessages(response.data.details);
            }
        })
        .catch((error) => {
            setErrorMessages(error.response.data.details);
        })

    };

    const closeForm = () => {
        setInfoOpen(false);
        setContrasena('')
        setRol('');
    };
    const handleCloseUser1 = () => {
        setShowAddUserPopup(false);
    }
    const handleCloseUser = () => {
        setShowAddUserPopup(false);
        window.location.reload();
    };
  
    useEffect(() => {
        handleGetEmployees();
    }, []);

    return(
        <div className="administrar-usuarios">
            <Navbar/>
            <h2><b>Administrar Usuarios</b></h2>
            <div className="search-options">
                <div>
                    <label>Filtro</label>
                    <select>
                        <option>Seleccionar</option>
                        <option>Toda</option>
                    </select>
                    <input placeholder="Buscar..."/>
                    <button className="search-button">Buscar</button>
                </div>
            </div>
            <div className="body-container">
                
                <div className="list-container">
                    {empleados.length > 0 ? (
                        empleados.map((empleado) => (
                            <div>
                                <DataContainer
                                    primaryValue={empleado.primer_nombre}
                                    secondaryValue={empleado.primer_apellido}
                                    onPrimaryAction={() => {handleGetUser(empleado)}}
                                    hasPrimary={true}
                                    primaryAction={"Ver Usuario"}
                                    hasSecondary={true}
                                    secondaryAction={"Modificar"}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No hay datos.</p>
                    )}
                </div>
            </div>
            <div>
            {showAddUserPopup && (
                <div className="popup">
                <div className="popup-content">
                    <h3><b><i>{employee.primer_nombre} {employee.primer_apellido}</i></b></h3>
                    <div className="modal-body">
                        {errorMessages.length > 0 ? (
                            <div className="create-user-form">
                                <div className="user-create-form">
                                    <h4><b>Crear Usuario</b></h4>
                                    <div>
                                        <select onChange={(e) => setRol(e.target.value)}>
                                            <option>Seleccionar rol</option>
                                            <option value={0}>Administrador</option>
                                            <option value={1}>Jefe</option>
                                            <option value={2}>Empleado</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input placeholder="Número de identidad" value={employee.numero_identidad}/>
                                    </div>
                                    <div>
                                        <input placeholder="Correo electronico" value={employee.correo}/>
                                    </div>
                                    
                                    <div>
                                    <input type="password" placeholder="Contraseña" onChange={(e) => setContrasena(e.target.value)}/>
                                    </div>
                                    <div>
                                    <button type="button" onClick={handleCrearUsuario}>Aceptar</button>  

                                    </div>
                                    
                                </div>
                                <div>
                                    {errorMessages.length > 0 ? (
                                        errorMessages.map((message) => (
                                            <p className="error-message">{message}</p>
                                        ))
                                    ) : (
                                        <p>{responseMessage}</p>
                                    )}
                                    
                                </div>
                            </div>
                        ) : (
                            <div>
                                {userExists && (
                            <div>
                                <h4>Información del usuario</h4>
                                <div className="information-container">
                                    <p>ID: {user.id_usuario}</p>
                                    <p>Correo: {user.correo}</p>
                                    <p>Rol: {user.rol}</p>
                                </div>
                                
                            </div>
                        )}
                            </div>
                        )}
                    </div>
                    <button onClick={handleCloseUser1}>Cerrar</button>
                </div>
                </div>
            )}
                <Modal isOpen={infoOpen} className="create-user-modal">
                    <div className="modal-body">
                        {errorMessages.length > 0 ? (
                            <div className="create-user-form">
                                <div className="user-create-form">
                                    <h4>Crear Usuario</h4>
                                    <div>
                                        <select onChange={(e) => setRol(e.target.value)}>
                                            <option>Seleccionar rol</option>
                                            <option value={0}>Administrador</option>
                                            <option value={1}>Jefe</option>
                                            <option value={2}>Empleado</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input placeholder="Número de identidad" value={employee.numero_identidad}/>
                                    </div>
                                    <div>
                                        <input placeholder="Correo electronico" value={employee.correo}/>
                                    </div>
                                    
                                    <div>
                                    <input type="password" placeholder="Contraseña" onChange={(e) => setContrasena(e.target.value)}/>
                                    </div>
                                    <div>
                                    <button type="button" onClick={handleCrearUsuario}>Aceptar</button>  

                                    </div>
                                    
                                </div>
                                <div>
                                    {errorMessages.length > 0 ? (
                                        errorMessages.map((message) => (
                                            <p className="error-message">{message}</p>
                                        ))
                                    ) : (
                                        <p>{responseMessage}</p>
                                    )}
                                    
                                </div>
                            </div>
                        ) : (
                            <div>
                                {userExists && (
                            <div>
                                <h4>Información del usuario</h4>
                                <div className="information-container">
                                    <p>ID: {user.id_usuario}</p>
                                    <p>Correo: {user.correo}</p>
                                    <p>Rol: {user.rol}</p>
                                </div>
                                
                            </div>
                        )}
                            </div>
                        )}
                        <div className="actions-container">

                            <button onClick={handleCloseUser}>Cerrar</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default AdministarUsuarios;