import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ModificarEmpleadoPopUp.css';
import PropTypes from 'prop-types';

const ModificarEmpleadoPopUp = ({ employee, cancel }) => {
    const [puesto, setPuesto] = useState(employee?.nombre_perfil ?? ''); // Establece un valor predeterminado si employee o su propiedad nombre_perfil es undefined
    const [departamento, setDepartamento] = useState(employee?.nombre_departamento ?? ''); // Establece un valor predeterminado si employee o su propiedad nombre_departamento es undefined
    const [jefe, setJefe] = useState(employee?.id_jefe ?? ''); // Establece un valor predeterminado si employee o su propiedad id_jefe es undefined
    const [telefono, setTelefono] = useState(employee?.telefono ?? ''); // Establece un valor predeterminado si employee o su propiedad telefono es undefined
    const [employeeid, setEmployeeID] = useState(employee?.id_empleado ?? ''); // Establece un valor predeterminado si employee o su propiedad id_empleado es undefined

    const [bosses, setBosses] = useState([]);
    const [puestos, setPuestos] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);


    useEffect(() => {
        if (employee) {
            setEmployeeID(employee.id_empleado);
            setPuesto(employee.id_perfil_puesto);
            setDepartamento(employee.id_departamento);
            setJefe(employee.id_jefe);
            setTelefono(employee.telefono);
        }
    }, [employee]);

    const handleGetPuestos = () => {
        axios.get('http://localhost:4000/data/obtener-puestos')
            .then((response) => {
                setPuestos(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleGetBosses = () => {
        axios.get('http://localhost:4000/data/obtener-jefes')
        .then((response) => {
            setBosses(response.data.data);
        })
        .catch((error) => {
            console.log(error.response.data.data);
        })
    };

    const handleGetDepartamentos = () => {
        axios.get('http://localhost:4000/data/obtener-departamentos ')
            .then((response) => {
                setDepartamentos(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handlePuestoChange = (event) => {
        setPuesto(event.target.value);
    };

    const handleTelefonoChange = (event) => {
        setTelefono(event.target.value);
    };

    const handleDepartamentoChange = (event) => {
        setDepartamento(event.target.value);
    };

    const handleJefeChange = (event) => {
        setJefe(event.target.value);
    };

    const handleSubmit = () => {
        const updatedEmployee = {
            employeeid: employeeid,
            telefono: telefono,
            idpuesto: puesto,
            iddepartamento: departamento,
            idjefe: jefe,
        };

        if (!employee || !employee.id_empleado) {
            console.error('Empleado no válido');
            alert('empleado problema')
            return;
        }
        
    
        axios.put(`http://localhost:4000/actualizar-empleado/${employeeid}`, updatedEmployee)
            .then((response) => {
                console.log('Empleado actualizado:', response.data);
                alert('Actualizado');
                cancel(); 
            })
            .catch((error) => {
                console.error('Error actualizando el empleado:', error);
                alert('Error al actualizar');
                // alert('Datos del empleado a actualizar:', departamento);

            });
    };
    

    useEffect(()=>{
        handleGetDepartamentos();
        handleGetPuestos(); 
        handleGetBosses();
    }, []);

    return (
        <div className="modificar-empleado-popup">
            <div className="contenido-empleado">
                <div className="formulario-container-empleado">
                    <h2 className="titulo-empleado">Modificar Empleado</h2>
                    <form className="formulario-empleado">
                        <div className="input-wrapper-empleado">
                            <label htmlFor="puesto">Puesto:</label>
                            <select defaultValue={puesto} onChange={handlePuestoChange}>
                                <option disabled hidden>{employee.nombre_perfil}</option>
                                {puestos.map((puesto) => (
                                    <option key={puesto.id_perfil_puesto} value={puesto.id_perfil_puesto}>
                                        {puesto.nombre_perfil}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className="input-wrapper-empleado">
                            <label htmlFor="departamento">Departamento:</label>
                            <select defaultValue={departamento} onChange={handleDepartamentoChange}>
                                <option disabled hidden>{employee.nombre_departamento}</option>
                                {departamentos.map((departamento) => (
                                    <option key={departamento.id_departamento} value={departamento.id_departamento}>
                                        {departamento.nombre_departamento}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className="input-wrapper-empleado">
                            <label htmlFor="jefe">Telefono:</label>
                            <input type="text" id="telefono" value={telefono} onChange={handleTelefonoChange} placeholder="Telefono" />
                        </div>
                        <div className="input-wrapper-empleado">
                            <label htmlFor="jefe">Jefe:</label>
                            <input type="text" id="jefe" value={jefe} onChange={handleJefeChange} placeholder="Jefe" />
                            {/* <select id='jefe' value={jefe} onChange={handleJefeChange}>
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
                            </select> */}
                        </div>
                        <div className="button-wrapper-empleado">
                            <button onClick={()=>handleSubmit()}>Guardar cambios</button>
                            <button type="button" onClick={cancel}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

ModificarEmpleadoPopUp.propTypes = {
    employee: PropTypes.object.isRequired, 
    cancel: PropTypes.func.isRequired,
};
export default ModificarEmpleadoPopUp;
