import axios from "axios";
import { useEffect, useState } from "react";
import PreguntaContainer from "../../components/PreguntaContainer/PreguntaContainer";
import "./EvaluacionEmpleado.css";
import { useLocation } from 'react-router-dom';
import DataContainer from "../../components/DataContainer/DataContainer";

const EvaluacionEmpleado = () => {

// Definir el objeto de datos que quieres enviar en el cuerpo de la solicitud
    const [preguntas, setPreguntas] = useState([]);
    const [empleado , setEmpleado] = useState('');
    const [tipoEvaluacion, setTipoEvaluacion] = useState('');
    const [evaluacion, setEvaluacion] = useState([]);
    const [idEmpleado, setIdEmpleado] = useState([]);
    

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idEmpleadoParam = searchParams.get('id_empleado');

    const data = {
        idEmpleado : idEmpleadoParam
    }

    
    
    const handlegetQuestions = () => {
        axios.get('http://localhost:4000/data/obtener-preguntas')
        .then((response) => {
            setPreguntas(response.data.data);
        })
        .catch((error) => {
            console.log(error.response.data.data);
        })
    };

    const handleObtenerEncuesta = (idPuesto) => {
        axios.post('http://localhost:4000/data/obtener-evaluacion', {idPuesto: idPuesto})
        .then((response) => {
            if(response.data.success) {
                setEvaluacion(response.data.data);
                console.log(response.data.data);
            } else {
                setEvaluacion([]);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleGetEmpleado = () => {
        axios.post('http://localhost:4000/data/obtener-empleado', data)
        .then(response => {
            setEmpleado(response.data.data[0]);
            handleObtenerEncuesta(response.data.data[0].id_perfil_puesto);
        })
        .catch(error => {
          // Manejar errores de la solicitud
          console.error('Error al obtener el empleado:', error);
        });
        
    }


    useEffect(() => {
        //console.log('ID del empleado:', idEmpleadoParam);
        handleGetEmpleado();
        handlegetQuestions();
    },[]);

    return(
        <div>
            {empleado && (
                <div className="employee-info">
                <div className="top-container">
                    <div className="data-title">
                        <label>Nombre:</label>
                    </div>
                    <div className="data-value">
                        <label>{empleado.primer_nombre} {empleado.primer_apellido}</label>
                    </div>
                    <div className="data-title">
                        <label>Posición:</label>
                    </div>
                    <div className="data-value">
                        <label>{empleado.id_perfil_puesto}</label>
                    </div>
                
                </div>
                <div className="bottom-container">
                    <div className="data-title">
                        <label>Departamento:</label>
                    </div>
                    <div className="data-value">
                        <label>{empleado.id_departamento}</label>
                    </div>
                    <div className="data-title">
                        <label>País:</label>
                    </div>
                    <div className="data-value">
                        <label>Honduras</label>
                    </div>
                </div>
            </div>
            )}
            <div className="questions-container">
                <div className="survey-type">
                    <div className="evaluation-title">
                        <h1>Tipo de Evaluacion</h1>
                    </div>
                    <div className="total-title">
                        <h2>Total</h2>
                    </div>
                </div>
                <div className="questions-list">
                    <div className="question-holder">
                        {preguntas.length > 0 ? (
                            preguntas.map((pregunta, index) => (
                                <PreguntaContainer
                                    key={index}
                                    title={pregunta.nombre_competencia}
                                    questions={pregunta.comportamientos}
                                />
                            ))
                        ) : (
                            <p>No hay preguntas disponibles</p>
                        )}
                    </div>
                </div>
                <div className="questions-list">
                    <div className="question-holder">
                        {evaluacion.length > 0 ? (
                            evaluacion.map((pregunta, index) => (
                                <p>{pregunta[0].comportamiento}</p>
                            ))
                        ) : (
                            <p>No hay preguntas disponibles</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="survey-actions">
                <button>Atrás</button>
                <button>Enviar</button>
            </div>
        </div>
    );

};

export default EvaluacionEmpleado;