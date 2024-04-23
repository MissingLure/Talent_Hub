import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./AdministrarEmpleados.css"
import axios from "axios";
import DataContainer from "../../components/DataContainer/DataContainer";
import CrearEmpleado from "../CrearEmpleado/CrearEmpleado";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "react-modal";

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

    const [showPopup, setShowPopup] = useState(false);
    const [showBossPopup, setShowBossPopu] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSucces] = useState(false);

    const handleClosePopup = () => {
        setShowPopup(false);
        setShowBossPopu(false);
        setSelectedBoss('');
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
        setSucces(false);
        setShowBossPopu(false);
    };

    const acceptMessage = () =>{
        setSuccess(true);
    }

    useEffect(() => {
        handleGetEmployees();
        handleGetBosses();
    }, []);
    
    return(
        <div className="administrar-empleados">
            <Navbar/>
            <h2 ><b>EMPLEADOS</b></h2>
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
                        <div key={empleado.id_empleado}>
                            <DataContainer
                                primaryValue={empleado.primer_nombre}
                                secondaryValue={empleado.primer_apellido}
                                hasPrimary={true}
                                primaryAction={"Información"}
                                hasSecondary={true}
                                secondaryAction={"Modificar"}
                                onPrimaryAction={() => handleInformationClick(empleado.id_empleado, empleado.id_jefe)}
                                hasTertitary={true}
                                tertiaryAction={"Eliminar"}
                            />
                        </div>
                    ))
                ) : (
                    <p>No hay datos.</p>
                )}
            </div>
            </div>

            <div className="add-button">
                <button onClick={() => setShowPopup(true)}>
                    Crear Empleado
                </button>
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
                        
                        <div>
                            <button onClick={handleClosePopup}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
            
            {showPopup && (
                <div className="popup">
                    <div className="add-employee-popup-content">
                        <CrearEmpleado
                        open={addEmployee}
                        cancel={() => setAddEmployee(false)}
                    /> 
                        <button onClick={handleClosePopup}>Cerrar</button>
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