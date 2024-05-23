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
    const [errorMessages, setErrorMessages] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [addEmployee, setAddEmployee] = useState(false);
    const [user, setUser] = useState([]);
    const [modifyOpen, setModifyopen] = useState(false);
    const [employee, setEmployee] = useState('');
    const [bosses, setBosses] = useState([]);
    const [boss, setBoss] = useState('');
    const [hasBoss, setHasBoss] = useState(false);
    const [selectedBoss, setSelectedBoss] = useState('');
    const [email, setEmail] = useState('');

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
            setShowBossPopu(true);
            
        })
        .catch((error) => {
            setErrorMessages(error.response.data.details);
        })
    }

    const handleSetBoss = (employeeId, bossId) => {
        axios.post('http://localhost:4000/update/asignar-jefe', {employeeId: employeeId, bossId: bossId})
        .then((response) => {
            console.log(response.data.details);
            setMessage(response.data.details);
            setSucces(response.data.success);
        })
        .catch((error) => {
            setErrorMessages(error.response.data.details);
        })
    };

    const handleCloseUpdate = () => {
        setModifyopen(false);
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

    useEffect(() => {
        handleGetEmployees();
        handleGetBosses();
    }, []);
    
    return(
        <div className="administrar-empleados">
            <Navbar/>
            <h2 ><b>Administrar Empleados</b></h2>
            <br></br>
            <div className="search-options">
                <div>
                <label>Filtro</label>
                <select>
                    
                </select>
                    {/* <select onChange={(e) => setIdPuesto(e.target.value)}>
                        <option selected disabled hidden>Seleccionar perfil...</option>
                        {puestos.length > 0 ? (
                            puestos.map((puesto) => (
                                <option key={puesto.id_perfil_puesto} value={puesto.id_perfil_puesto}>{puesto.nombre_perfil}</option>
                            ))
                        ) : (
                            <option>No hay datos.</option>
                        )}
                    </select> */}
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
                            <th> </th> {/* Agregamos esta columna para las acciones */}
                            <th>ID Empleado</th>
                            <th>Nombre Empleado</th>
                            <th>ID Jefe</th>
                            <th>Departamento</th>
                            <th>Puesto</th>
                            <th>Pais</th>
                        </tr>
                    </thead>
                        <tbody>
                            {empleados.length > 0 ? (
                                empleados.map((empleado) => (
                                    <tr key={empleado.id_empleado}>
                                        <td>
                                            <input
                                            type="checkbox"
                                            name="eliminar"
                                            // checked={filasMarcadas.includes(index)}
                                            onClick={() => setShowPopup2(true)}
                                            />
                                        </td>
                                        <td>{empleado.id_empleado}</td>
                                        <td>{empleado.primer_nombre}{' '}{empleado.segundo_nombre}{' '}{empleado.primer_apellido}{' '}{empleado.segundo_apellido}</td>
                                        <td>{empleado.id_jefe}</td>
                                        <td>{empleado.nombre_departamento}</td>
                                        <td>{empleado.nombre_perfil}</td>
                                        <td>{empleado.id_pais}</td>
                                        
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
                            <label>{employee.primer_nombre} {employee.primer_apellido}</label>
                        </div>
                        <div className="boss-info">
                            {hasBoss ? (
                                <div>
                                    <h3><b>Jefe</b></h3>
                                    <label>{boss.primer_nombre} {boss.primer_apellido}</label>
                                    <div>
                                        <button>
                                            <Link to ='/modificar-empleado'>
                                            Modificar
                                            </Link></button>
                                        <button>Eliminar</button>
                                    </div>
                                </div>
                                
                            ) : (
                                <div>
                                    <h3><b>Jefe</b></h3>
                                    <label>Asignar jefe: </label>
                                    <select onChange={(e) => setSelectedBoss(e.target.value)}>
                                        <option selected disabled hidden>Seleccionar...</option>
                                        {bosses.length > 0 ? (
                                            bosses.map((boss) => (
                                                <option value={boss[0].id_empleado}>{boss[0].primer_nombre} {boss[0].primer_apellido}</option>
                                            ))                                           
                                        ) : (
                                            <option>No hay datos</option>
                                        )}
                                    </select>
                                    <button type="button" onClick={() => handleSetBoss(employee.id_empleado, selectedBoss)}>Aceptar</button>
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
                    
                    <button className = "buttonModificarEmpleado" onClick={() => setShowPopupModificar(true)} >Modificar </button>
                    
                        
                        <button>Eliminar</button>
                        <button onClick={handleClosePopup}>Cerrar</button>
                    
                    </div>
                </div>
            )} 

            {showPopupModificar && (
                <div className="popups">
                     
                    <div >
                        <ModificarEmpleadoPopUp/>                        
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