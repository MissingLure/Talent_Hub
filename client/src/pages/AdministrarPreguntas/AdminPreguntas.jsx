import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionContainer from "../../components/QuestionContainer/QuestionContainer";
import "./AdminPreguntas.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const AdminPreguntas = () => {
    const [errorMessages, setErrorMessages] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [puestos, setPuestos] = useState([]);
    const [idPuesto, setIdPuesto] = useState('');
    const [habilidades, setHabilidades] = useState([]);
    const [habilidadesPuesto, setHabilidadesPuesto] = useState([]);

    const [evaluacion, setEvaluacion] = useState([]);
    const [idHabilidad, setIdHabilidad] = useState('');
    const [nombreHabilidad, setNombreHabilidad] = useState('');

    const [showAdminPositions, setShowAdminPositions] = useState(false);
    const [showCrearPreguntas, setShowCrearPreguntas] = useState(false);

    //para Asignar Evaluacion
    const handleGetPuestos = () => {
        axios.get('http://localhost:4000/data/obtener-puestos')
            .then((response) => {
                setPuestos(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleGetHabilidades = () => {
        axios.get('http://localhost:4000/competencias/')
        .then((response) => {
            setHabilidades(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const handleGetQuestions = () => {
        axios.get('http://localhost:4000/data/obtener-preguntas-competencias')
        .then((response) => {
            console.log(response.data.data);
            setQuestions(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })   
    };

    const handleAgregarHabilidad = () => {
        setErrorMessages([]);
        let errors = [];
        if (idPuesto == '') {
            errors.push('Debe seleccionar un perfil de puesto.');
            let error = 'Debe seleccionar un perfil de puesto.';
            setErrorMessages([...errorMessages, error]);
        }
        if (idHabilidad == '') {
            let error = 'Debe seleccionar una habilidad.';
            setErrorMessages([...errorMessages, error]);
        }
        if (errorMessages.length) {

        } else {
            let habilidad = { idHabilidad: idHabilidad, nombreHabilidad: nombreHabilidad };
            setHabilidadesPuesto([...habilidadesPuesto, habilidad]);
        }
    };

    const handleAsignarHabilidades = () => {
        const errors = [];
        if(habilidadesPuesto.length == 0) {
            let error = 'Debe seleccionar al menos una habilidad.';
            errors.push(error);
        }

        if(errors.length > 0) {
            setErrorMessages(errors);
        } else {
            axios.post('http://localhost:4000/create/asignar-habilidades', {idPuesto: idPuesto, habilidades: habilidadesPuesto})
            .then((response) => {
                console.log(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    const handleObtenerEncuesta = () => {
        axios.get('http://localhost:4000/entrevistas-competencia/obtener-por-id-entrevistas-competencia/:id_perfil_puesto', {idPuesto: idPuesto})
        .then((response) => {
            console.log(response.data.data);
            if(response.data.success) {
                setEvaluacion(response.data.data);
            } else {
                setEvaluacion([]);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleAssignPositionsOpen = () => {
        setShowAdminPositions(true);
    }

    const handleAssignPositionsClose = () => {
        setShowAdminPositions(false);
        setHabilidadesPuesto([]);
        setErrorMessages([]);
        setIdPuesto('');
        setIdHabilidad('');
        setNombreHabilidad('');
    }
    
    const handleCrearPreguntaOpen = ()=>{
        setShowCrearPreguntas(true);
    }

    const handleCrearPreguntaClose = () =>{
        setShowCrearPreguntas(false);
    }

    useEffect(() => {
        handleGetPuestos();
        handleGetHabilidades();
    }, []);
    

    return(
        <div className="questions-admin-container">
            <Navbar/>
            <h2>Administrar Evaluaciones</h2>
            <h4>Visualiza todas las evaluaciones hecha por los empleados. </h4>
            <h4>Dividida en Perfil De Puesto, Competencia, Desempeño y Potencial.</h4>
            <div className="evaluations-actions">
                <button>
                <Link to ="/administrar-encuestas/core-competences-general">
                    Evaluacion Competencia
                </Link>
                </button>
                <button>
                <Link to ="/administrar-encuestas/potential-competiences-general">
                    Evaluacion Potencial
                </Link>
                </button>
                <button>
                <Link to ="/notas_desempeno">
                    Evaluacion Desempeño
                </Link>
                </button>
                
            </div>

            <div className="search-options">
                <div>
                    <label>Filtro</label>
                    <select onChange={(e) => setIdPuesto(e.target.value)}>
                        <option selected disabled hidden>Seleccionar perfil...</option>
                        {puestos.length > 0 ? (
                            puestos.map((puesto) => (
                                <option key={puesto.id_perfil_puesto} value={puesto.id_perfil_puesto}>{puesto.nombre_perfil}</option>
                            ))
                        ) : (
                            <option>No hay datos.</option>
                        )}
                    </select>
                    <button onClick={handleObtenerEncuesta}>Buscar</button>
                </div>
            </div>
            
            <div className="questions-container">
                {evaluacion.length > 0 ? (
                    <div>
                        {evaluacion.map((question, index) => (
                            <div key={index}>
                                <p>{question[0].comportamiento}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No hay evaluaciones disponibles.</div>
                )}
            </div>

            {showAdminPositions && (
                <div className="popup">
                    <div className="popup-content">
                    <div>
                    <h4><b>Administrar Perfil de Puesto</b></h4>
                    <select  onChange={(e) => setIdPuesto(e.target.value)}>
                        <option selected disabled hidden>Seleccionar perfil de puesto...</option>
                        {puestos.length > 0 ? (
                            puestos.map((puesto) => (
                                <option key={puesto.id_perfil_puesto} value={puesto.id_perfil_puesto}>{puesto.nombre_perfil}</option>
                            ))
                        ) : (
                            <option>No hay datos.</option>
                        )}
                    </select>
                </div>

                <div>
                    <select onChange={(e) => {
                        let selectedIndex = e.target.value;
                        setIdHabilidad(habilidades[selectedIndex].id_habilidad);
                        setNombreHabilidad(habilidades[selectedIndex].nombre_habilidad);
                    }}>
                        <option selected disabled hidden>Seleccionar habilidad...</option>
                        {habilidades.length > 0 ? (
                            habilidades.map((habilidad, index) => (
                                <option key={index} value={index}>{habilidad.nombre_habilidad}</option>
                            ))
                        ) : (
                            <option>No hay datos.</option>
                        )}
                    </select>
                    <button type="button" onClick={() => handleAgregarHabilidad()}>Agregar</button>
                </div>


                <div>
                    {errorMessages.length > 0 ? (
                        errorMessages.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))
                    ) : (
                        <p></p> 
                    )}
                </div>

                            
                        <div className="habilidads-container">
                            {habilidadesPuesto.length > 0 ? (
                                habilidadesPuesto.map((habilidad, index) => (
                                    <div className="habilidad-container" key={index}>
                                        <div>
                                            <p>{habilidad.nombreHabilidad}</p>
                                        </div>
                                        <div>
                                            <button className="delete-button">Eliminar</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No hay habilidades seleccionadas.</p>
                            )}
                        </div>

                        <div className='actions'>
                            <button onClick={handleAssignPositionsClose}>Cancelar</button>
                            <button onClick={handleAsignarHabilidades}>Aceptar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminPreguntas;