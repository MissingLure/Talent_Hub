import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./AdministrarEmpleados.css"
import axios from "axios";
import inform from '../../images/info.png';
import search from '../../images/search.png';
import add from '../../images/add.png';
import CrearEmpleado from "../CrearEmpleado/CrearEmpleado";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "react-modal";
import ModificarEmpleadoPopUp from "../ModificarEmpleados/ModificarEmpleadoPopUp";


const AdministarEmpleados = () => {
    //demas
    const [errorMessages, setErrorMessages] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [addEmployee, setAddEmployee] = useState(false);
    const [user, setUser] = useState([]);
    const [modifyOpen, setModifyopen] = useState(false);
    const [employee, setEmployee] = useState('');
    const [bosses, setBosses] = useState([]);
    const [boss, setBoss] = useState('');
    const [hasBoss, setHasBoss] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [selectedBoss, setSelectedBoss] = useState('');
    const [email, setEmail] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

     //User data
     const [users, setUsers] = useState(''); 
     const [employees, setEmployees] = useState('');
 
     //Informacion usuario
     const [numeroIdentidad, setNumeroIdentidad] = useState('');
     const [idEmpleado, setIdEmpleado] = useState('')
     const [correo, setCorreo] = useState('');
     const [contrasena, setContrasena] = useState('');
     const [rol, setRol] = useState('');
     const [usuarios, setUsuarios] = useState([]);

    //popups
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopupModificar, setShowPopupModificar] = useState(false);
    const [showBossPopup, setShowBossPopu] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSucces] = useState(false);

    const handleClosePopup = () => {
        setShowPopup2(false);
        setShowPopup(false);
        setShowPopupModificar(false);
        setShowBossPopu(false);
        setSelectedBoss('');
    }

    const handleBuscar = ()=>{
        const data ={
            email : email,
        };
        axios.post('http://localhost:4000/user/get-user', data)
            .then((response) => {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('employeeData', JSON.stringify(response.data.data));
                setErrorMessages([]);
                setMessage("Usuario encontrado");
            })
            .catch((error) => {
                console.log(error.response.data);
                setErrorMessages(error.response.data.details);
            })
    }

    const handleCloseUser1 = () => {
        setShowAddUserPopup(false);
    }


    const handleGetEmployees = () => {
        axios.get('http://localhost:4000/data/obtener-empleados')
        .then((response) => {
            setEmpleados(response.data.data);
        })
        .catch((error) => {
            console.log(error.response.data.data);
        })
    };

    const handleGetEmployee = (idEmpleado) => {
        axios.post('http://localhost:4000/data/obtener-empleado', {idEmpleado: idEmpleado})
        .then((response) => {
            setEmployee(response.data.data[0]);
        })
        .catch((error) => {
            console.log(error.response.data.data);
        })
    };

    const handleGetBosses = () => {
        axios.get('http://localhost:4000/data/obtener-jefes')
        .then((response) => {
            setBosses(response.data.data);
        })
        .catch((error) => {
            console.log(error.response.data.data);
        })
    };

    const handleModifyEmployeeClick = (empleado) => {
        setSelectedEmployee(empleado);
        setShowPopupModificar(true);
    };
    
    const handleGetBoss = (employeeId) => {
        axios.post('http://localhost:4000/data/obtener-jefe-por-empleado', {employeeId: employeeId})
        .then((response) => {
            if (response.data.success) {
                setHasBoss(true);
                setMessage('');
            } else {
                setHasBoss(false);
                setMessage(response.data.details);
            }
            setBoss(response.data.data);
            
        })
        .catch((error) => {
            setErrorMessages(error.response.data.details);
        })
    }

    const handleSetBoss = (employeeId, bossId) => {

        console.log(employeeId, bossId);

        axios.post('http://localhost:4000/update/asignar-jefe', {employeeId: employeeId, bossId: bossId})
        .then((response) => {
           
            setMessage("Se ha asignado el jefe con exito!");
            setSucces(true);
            handleGetEmployees();
        })
        .catch((error) => {
            setErrorMessages(error.response.data.details);
        })
    };

    const handleCloseUpdate = () => {
        setModifyopen(false);
    };

    const handleInfo=()=>{
        setShowBossPopu(true);
        setShowPopup2(false);
    }

    const handleGetUsuarios = () => {
        axios.get('http://localhost:4000/data/obtener-usuario')
        .then((response) => {
            setUsuarios(response.data.data);
            // setUserExists(true);
        })
        .catch((error) => {
            setErrorMessages(error.response.data.data);
            // setUserExists(false);
        })
    };

    const handleDeleteEmployee = async (id_empleado) => {
        try {
            const response = await axios.delete(`http://localhost:4000/user/delete-employee/${id_empleado}`);
            console.log('Empleado eliminado exitosamente:', response.data);
        } catch (error) {
            console.error('Hubo un error eliminando el empleado!', error);
        }
    };
    
    const handleDeleteUser = async (id_usuario) => {
        try {
            const response = await axios.delete(`http://localhost:4000/user/delete-user/${id_usuario}`);
            console.log('Usuario eliminado exitosamente:', response.data);
        } catch (error) {
            console.error('Hubo un error eliminando el usuario!', error);
        }
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
            correo: correo,
            contrasena: contrasena,
        };

        const userAlreadyExists = usuarios.some(user => user.correo === selectedEmployee.correo);
        if (userAlreadyExists) {
            setErrorMessages(prev => [...prev, 'El usuario ya existe.']);
            setUserExists(true);
            alert('Usuario ya existe. Revisa la seccion de Usuario!')
            return;
        }
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
    const handleInformationClick = (employeeId, bossId) => {
        handleGetEmployee(employeeId);
        handleGetBoss(bossId);
    };

    const closeMessage = () => {
        setSucces(false); // Corregido el nombre de la función a setSucces
        setShowBossPopu(false);
    };
    

    const acceptMessage = () =>{
        setSucces(true);
    }

    const handleSelectEmployee = (employee) => {
        setSelectedEmployee(employee);
        setShowPopup2(true);
        // setShowAddUserPopup(true);
    };

    useEffect(() => {
        handleGetEmployees();
        handleGetBosses();
        handleGetUsuarios();
    }, []);
    
    return(
        <div className="administrar-empleados">
            <Navbar/>
            <h2> Administrar Empleados</h2>
            <h4>Manten el orden de tus empleados activos.</h4>
            <br></br>
            <div className="search-options">
                <div>
                <label>Filtro</label>
                <select>
                    
                </select>
                    <input placeholder = "Buscar..." />
                    <button className="search-button" onClick={handleBuscar}>
                        Buscar
                        </button>
                   
                    <button className="add-button"onClick={() => setShowPopup(true)}>
                    Crear
                    </button>
                    
                </div>
            </div>
            
            <div className="bodys-container">
            {/* <div className="list-container"> */}
                <div className="container3">
                <table>
                    <thead>
                        <tr>
                            
                            <th>ID Empleado</th>
                            <th>Nombre Empleado</th>
                            <th>ID Jefe</th>
                            <th>Departamento</th>
                            <th>Puesto</th>
                            <th>Pais</th>
                            <th> </th> 
                        </tr>
                    </thead>
                        <tbody>
                            {empleados.length > 0 ? (
                                empleados.map((empleado) => (
                                    <tr key={empleado.id_empleado}>
                                        
                                        <td>{empleado.id_empleado}</td>
                                        <td>{empleado.primer_nombre}{' '}{empleado.segundo_nombre}{' '}{empleado.primer_apellido}{' '}{empleado.segundo_apellido}</td>
                                        <td>{empleado.id_jefe}</td>
                                        <td>{empleado.nombre_departamento}</td>
                                        <td>{empleado.nombre_perfil}</td>
                                        <td>{empleado.id_pais}</td>
                                        <td className='butne'>
                                        <button onClick={() => handleSelectEmployee(empleado)}><img src={inform} /></button>
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
</div>
            </div>

            
            {showBossPopup && (
                <div className="popup">
                    <div className="information-popup-content">
                        <div className="employee-info">
                            <h3><b>Empleado</b></h3>
                            <label>{selectedEmployee.primer_nombre} {selectedEmployee.primer_apellido}</label>
                        </div>
                        <div className="boss-info">
                            {hasBoss ? (
                                <div>
                                    <h3><b>Jefe</b></h3>
                                    <label>{boss.primer_nombre} {boss.primer_apellido}</label>
                                </div>
                                
                            ) : (
                                <div>
                                    <h3><b>Jefe</b></h3>
                                    <label>Asignar jefe: </label>
                                    <select onChange={(e) => setSelectedBoss(e.target.value)}>
                                        <option selected disabled hidden>Seleccionar...</option>
                                        {bosses.length > 0 ? (
                                            bosses.map((boss) => (
                                                <option key={boss[0].id_empleado} value={boss[0].id_empleado}>
                                                    {boss[0].primer_nombre} {boss[0].primer_apellido}
                                                </option>
                                            ))
                                        ) : (
                                            <option>No hay datos</option>
                                        )}
                                    </select>
                                    <button type="button" onClick={() => handleSetBoss(selectedEmployee.id_empleado, selectedBoss)}>Aceptar</button>
                                    <p>{message}</p>
                                </div>
                            )}
                        </div>
                        
                        {/* <div>
                            <button onClick={handleClosePopup}>Modificar</button>
                            <button onClick={handleClosePopup}>Eliminar</button>
                        </div> */}
                        <div>
                            <button onClick={handleClosePopup}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
            
            {showPopup && (
                <div className="popups">
                     <button onClick={handleClosePopup}>X</button>
                    <div >
                        <CrearEmpleado
                        open={addEmployee}
                        cancel={() => setAddEmployee(false)}
                    /> 
                       
                    </div>
                </div>
            )}
 
            {showPopup2 &&(
                <div className="popups">
                    <div className="popups2-content">
                    <h3>Acciones con Empleado</h3>
                    <br></br>
                    <button onClick={() => handleModifyEmployeeClick(selectedEmployee)}>Modificar Empleado</button>
                    <button onClick={()=> handleInfo(true)}>Información Jefe</button>
                    <button >Eliminar Empleado</button>
                    <button onClick={handleClosePopup}>Cerrar</button>
                    
                    </div>
                </div>
            )} 

            {showPopupModificar && (
                <div className="popups">
                    {/* <button onClick={handleClosePopup}>X</button> */}
                    <div>
                        <ModificarEmpleadoPopUp
                            employee={selectedEmployee}
                            cancel={() => setShowPopupModificar(false)}
                        />                        
                    </div>
                </div>
            )}

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

            <div>
                <Modal
                    className="message-modal"
                    overlayClassName="overlay"
                    isOpen={success}
                    onRequestClose={closeMessage}
                    contentLabel="Popup de Mensaje"
                >
                    <p>{message}</p>
                    <button onClick={closeMessage}>Aceptar</button>
                </Modal>
            </div>
        </div>
    );
};

export default AdministarEmpleados;