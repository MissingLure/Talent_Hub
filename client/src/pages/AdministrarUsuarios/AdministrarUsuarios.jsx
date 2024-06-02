import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './AdministrarUsuarios.css';
import axios from "axios";
import inform from '../../images/info.png';
import Modal from "react-modal";
import DataContainer from "../../components/DataContainer/DataContainer";
import Navbar from "../../components/Navbar/Navbar";
import ModificarUsuarioPopUp from "../ModificarUsuarios/ModificarUsuarioPopUp"


const AdministarUsuarios = () => {
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    const [showPopup2, setShowPopup2]=useState(false);
    const [showPopupModificar, setShowPopupModificar]=useState(false);
    const [infoOpen, setInfoOpen] = useState(false);



    const [puestos, setPuestos] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [userExists, setUserExists] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');

    //User data
    const [user, setUser] = useState(''); 
    const [employee, setEmployee] = useState('');

    //Informacion usuario
    const [numeroIdentidad, setNumeroIdentidad] = useState('');
    const [idEmpleado, setIdEmpleado] = useState('')
    const [correo, setCorreo] = useState('');
    const [contraseña, setContrasena] = useState('');
    const [rol, setRol] = useState('');


    const handleGetEmployee = (idEmpleado) => {
        axios.post('http://localhost:4000/data/obtener-empleado', { idEmpleado: idEmpleado })
            .then((response) => {
                const employeeData = response.data.data[0];
                setEmpleados(employeeData);
                // Filtrar empleados basados en los usuarios
                const filteredEmployees = employeeData.filter(employee => {
                    return !usuarios.find(usuario => usuario.id === employee.id);
                });
                // Aquí tienes el arreglo de empleados filtrados
                console.log(filteredEmployees);
            })
            .catch((error) => {
                console.log(error.response.data.data);
            });
    };
    
    const handleGetUsuarios = () => {
        axios.get('http://localhost:4000/data/obtener-usuario')
            .then((response) => {
                const usuariosData = response.data.data;
                setUsuarios(usuariosData);
                // setUserExists(true);
                // Llama a la función handleGetEmployee con los usuarios obtenidos
                handleGetEmployee(usuariosData.map(usuario => usuario.id));
            })
            .catch((error) => {
                setErrorMessages(error.response.data.data);
                // setUserExists(false);
            });
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

    const handleInfo=(user)=>{
        setShowPopup2(true);
        selectedUser(user);
    }
    const handleCloseUser1 = () => {
        setShowAddUserPopup(false);
    }
    const handleCloseUser = () => {
        setShowPopup2(false);
        // setShowAddUserPopup(false);
        // window.location.reload();
    };
  
    useEffect(() => {
        handleGetEmployee();
        handleGetUsuarios();
    }, []);


    return(
        <div className="administrar-usuarios">
            <Navbar/>
            <h2><b>Administrar Usuarios</b></h2>
            <h4>Manten orden de los empleados con acceso a la pagina web.</h4>
            <div className="search-options">
                <div>
                    <label>Filtro</label>
                    <select></select>
                    <input placeholder="Buscar..."/>
                    <button className="search-button">Buscar</button>
                    <button className="add-button"onClick={() => setShowAddUserPopup(true)}>
                    Crear
                    </button>
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
                                        <td>{users.id_usuario}</td>
                                        <td>{users.id_empleado}</td>
                                        <td>{users.correo}</td>
                                        <td>{users.rol}</td>
                                        <td>
                                           <button onClick={() => handleGetUser(users)}><img src={inform}/></button>
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
            </div>


            {showPopup2 &&(
                <div className="popups">
                    <div className="popups2-content">
                    <h3>Acciones con Usuario</h3>
                    <br></br>
                    <button onClick={()=> setShowPopupModificar(true)} >Modificar Usuario</button>
                    <button >Eliminar Usuario</button>
                    <button onClick={handleCloseUser}>Cerrar</button>
                    
                    </div>
                </div>
            )} 


            {showPopupModificar && (
                <div className="popups">
                    {/* <button onClick={handleClosePopup}>X</button> */}
                    <div>
                        <ModificarUsuarioPopUp
                            user={selectedUser}
                            cancel={() => setShowPopupModificar(false)}
                        />                        
                    </div>
                </div>
            )}

            
            {showAddUserPopup && (
                <div className="popup">
                <div className="popup-content">
                    {/* <h3><b><i>{employee.primer_nombre} {employee.primer_apellido}</i></b></h3> */}
                    <div className="modal-body">
                        {errorMessages.length > 0 ? (
                            <div className="create-user-form">
                                <div className="user-create-form">
                                    <h4><b>Crear Usuario</b></h4>
                                    <div>
                                    <select onChange={(e) => setEmployee(empleados.find(emp => emp.id_empleado === e.target.value))}>
                                        <option value="">Seleccionar empleado</option>
                                        {empleados.map((empleado) => (
                                            <option key={empleado.id_empleado} value={empleado.id_empleado}>
                                                {empleado.primer_nombre} {empleado.primer_apellido}
                                            </option>
                                        ))}
                                    </select>
                                    </div>
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
                {/* <Modal isOpen={infoOpen} className="create-user-modal">
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
                </Modal> */}
            </div>
        </div>
    );
};

export default AdministarUsuarios;