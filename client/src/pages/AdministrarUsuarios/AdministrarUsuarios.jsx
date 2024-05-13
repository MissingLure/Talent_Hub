import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './AdministrarUsuarios.css';
import axios from "axios";
import inform from '../../images/info.png';
import Modal from "react-modal";
import DataContainer from "../../components/DataContainer/DataContainer";
import Navbar from "../../components/Navbar/Navbar";


const AdministarUsuarios = () => {
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [puestos, setPuestos] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [userExists, setUserExists] = useState(false);

    //User data
    const [user, setUser] = useState(''); 
    const [employee, setEmployee] = useState('');

    //Informacion usuario
    const [numeroIdentidad, setNumeroIdentidad] = useState('');
    const [idEmpleado, setIdEmpleado] = useState('')
    const [correo, setCorreo] = useState('');
    const [puesto, seerPuesto] = useState('');
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

    const handleGetUsuarios = () => {
        axios.get('http://localhost:4000/data/obtener-usuario')
        .then((response) => {
            setUsuarios(response.data.data);
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

    const getRoleName = (roleNumber) => {
        switch(roleNumber) {
            case 0:
                return 'Admin';
            case 1:
                return 'Jefe';
            case 2:
                return 'Empleado';
            // Agrega más casos según sea necesario
            default:
                return 'Unknown';
        }
    }
    

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
                alert("Usuario creado con exito");
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
        handleGetUsuarios();
    }, []);


    return(
        <div className="administrar-usuarios">
            <Navbar/>
            <h2><b>Administrar Usuarios</b></h2>
            <div className="search-options">
                <div>
                    <label>Filtro</label>
                    <select></select>
                    <input placeholder="Buscar..."/>
                    <button className="search-button">Buscar</button>
                </div>
            </div>
            <div className="bodys-container">
            {/* <div className="list-container"> */}
                <div className="container4">
                <table>
                    <thead>
                        <tr>
                            
                            <th>ID Usuario</th>
                            <th>ID Empleado</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                        <tbody>
                            {usuarios.length > 0 ? (
                                usuarios.map((users) => (
                                    <tr key={users.id_usuario}>

                                        {/* <td>
                                            <button onClick={() => handleInformationClick(empleado.id_empleado, empleado.id_jefe)}>
                                                Información
                                            </button>
                                        </td> */}
                                        <td>{users.id_usuario}</td>
                                        <td>{users.id_empleado}</td>
                                        <td>{users.correo}</td>
                                        <td>{getRoleName(users.rol)}</td>
                                        <td>
                                           <button onClick={() => {handleGetUser(users)}}>{<img src={inform}/>}</button>
                                        </td>

                                        
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No hay datos.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
    {/* </div> */}






{/* 
                
                <div className="list-container">
                    {empleados.length > 0 ? (
                        empleados.map((empleado) => (
                            <div key={empleado.id_empleado}>
                                <DataContainer
                                 primaryValue={empleado.primer_nombre}
                                 secondaryValue={empleado.primer_apellido}
                                 hasPrimary={true}
                                 primaryAction={<img src={inform}/>}

                                 onPrimaryAction={() => {handleGetUser(empleado)}}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No hay datos.</p>
                    )}
                </div> */}
            </div>


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
                                    <p>Puesto: {puestos}</p>
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