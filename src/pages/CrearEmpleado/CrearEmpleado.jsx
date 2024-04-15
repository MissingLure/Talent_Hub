import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CrearEmpleado.css";
import Modal from "react-modal";

const CrearEmpleado = ({open, accept, cancel}) => {
    const [departamentos, setDepartamentos] = useState([]);
    const [puestos, setPuestos] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [responseMessage, setResponseMessage] = useState('')
    const [success, setSuccess] = useState(false);
    const fechaActual = new Date;
    const fecha = new Date(fechaActual.getFullYear() - 18, fechaActual.getMonth(), fechaActual.getDate());

    
    const fechaActualFormateada = fechaActual.toISOString().split('T')[0];
    
    const fechaNacimientoFormateada = fecha.toISOString().split('T')[0];
    //Informacion del empleado
    const [primerNombre, setPrimerNombre] = useState('');
    const [segundoNombre, setSegundoNombre] = useState('');
    const [primerApellido, setPrimerApellido] = useState('');
    const [segundoApellido, setSegundoApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [identidad, setIdentidad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(fechaNacimientoFormateada);
    const [fechaIngreso, setFechaIngreso] = useState(fechaActualFormateada);
    const [perfilPuesto, setPerfilPuesto] = useState('');
    const [departamento, setDepartamento] = useState('');

    const handleGetPuestos = () => {
        axios.get('http://localhost:4000/data/obtener-puestos')
            .then((response) => {
                setPuestos(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleGetDepartamentos = () => {
        axios.get('http://localhost:4000/data/obtener-departamentos ')
            .then((response) => {
                setDepartamentos(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleCrearEmpleado = () => {
        const empleado = {
            primerNombre: primerNombre,
            segundoNombre: segundoNombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            telefono: telefono,
            numeroIdentidad: identidad,
            direccion: direccion,
            correo: correo,
            fechaNacimiento: fechaNacimiento,
            idPerfilPuesto: perfilPuesto,
            idDepartamento: departamento, 
        };

        const closeMessage = () => {
            setPrimerNombre('');
            setSegundoNombre('');
            setPrimerApellido('');
            setSegundoApellido('');
            setTelefono('');
            setIdentidad('');
            setDireccion('');
            setCorreo('');
            setFechaNacimiento(fechaNacimientoFormateada);
            setFechaIngreso(fechaActualFormateada);
            setPerfilPuesto('');
            setDepartamento('');
            setSuccess(false);
        
            if (success) {
                window.location.reload();
            }
        }

        axios.post('http://localhost:4000/create/agregar-empleado', empleado)
            .then((response) => {
                if (response.data.success) {
                    setResponseMessage(response.data.details);
                    setErrorMessages([]);
                    setSuccess(true);
                } else {
                    setResponseMessage(response.data.details);
                    setErrorMessages([]);
                    setSuccess(false);
                }
            })
            .catch((error) => {
                setErrorMessages(error.response.data.details);
            })
    }

    const closeMessage = () => {
        setPrimerNombre('');
        setSegundoNombre('');
        setPrimerApellido('');
        setSegundoApellido('');
        setTelefono('');
        setIdentidad('');
        setDireccion('');
        setCorreo('');
        setFechaNacimiento(fechaNacimientoFormateada);
        setFechaIngreso(fechaActualFormateada);
        setPerfilPuesto('');
        setDepartamento('');
        setSuccess(false);
    
        if (success) {
            window.location.reload();
        }
    }

    useEffect(() => {
        handleGetPuestos();
        handleGetDepartamentos();
    }, []);

    return (
        <div className="main-container">
            <form>
                    <h4>Registro de Empleado</h4>
                    <div>
                        <input placeholder="Primer Nombre" onChange={(e) => setPrimerNombre(e.target.value)}/>
                    </div>
                    <div>
                        <input placeholder="Segundo Nombre" onChange={(e) => setSegundoNombre(e.target.value)}/>
                    </div>
                    <div>
                        <input placeholder="Primer Apellido" onChange={(e) => setPrimerApellido(e.target.value)}/>
                    </div>
                    <div>
                        <input placeholder="Segundo Apellido" onChange={(e) => setSegundoApellido(e.target.value)}/>
                    </div>
                    <div>
                        <input type="number" placeholder="Telefono" onChange={(e) => setTelefono(e.target.value)}/>
                    </div>
                    <div>
                        <input type="number" placeholder="Identidad" onChange={(e) => setIdentidad(e.target.value)}/>
                    </div>
                    <div>
                        <input placeholder="Dirección" onChange={(e) => setDireccion(e.target.value)}/>
                    </div>
                    <div>
                        <input placeholder="Correo" onChange={(e) => setCorreo(e.target.value)}/>
                    </div>
                    <div>
                        <label>Fecha de nacimiento</label>
                        <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/>
                    </div>
                    <div>
                        <select onChange={(e) => setPerfilPuesto(e.target.value)}>
                            <option selected disabled hidden>Seleccionar Puesto</option>
                            {puestos.map((puesto) => (
                                <option value={puesto.id_perfil_puesto}>{puesto.nombre_perfil}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select onChange={(e) => setDepartamento(e.target.value)}>
                            <option selected disabled hidden>Seleccionar departamento</option>
                            {departamentos.map((departamento) => (
                                <option value={departamento.id_departamento}>{departamento.nombre_departamento}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button type="button" onClick={handleCrearEmpleado}>Aceptar</button>
                    </div>
                    <div>
                        {errorMessages.length > 0 ? (
                            <div>
                                {errorMessages.map((message) => (
                                    <p>{message}</p>
                                ))}
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div>
                        <Modal
                            className="message-modal"
                            overlayClassName="overlay"
                            isOpen={success}
                            onRequestClose={closeMessage}
                            contentLabel="Popup de Mensaje"
                        >
                            <p>{responseMessage}</p>
                            <button onClick={closeMessage}>Aceptar</button>
                        </Modal>
                    </div>
            </form>
        </div>
    );
};

export default CrearEmpleado;