import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CrearEvaluacion.css";
import CompetenciaContainer from "../../components/CompetenciaContainer/CompetenciaContainer";

const CrearEvaluacion = () => {
    const [puestos, setPuestos] = useState([]);
    const [competencias, setCompetencias] = useState([]);
    const [competenciasAgregadas, setCompetenciasAgregadas] = useState([]);
    const [comportamientos, setComportamientos] = useState([]);
    const [searchSuccess, setSearchSucces] = useState(false);
    //Datos Evaluacion
    const [perfilPuesto, setPerfilPuesto] = useState('');
    const [idPerfilPuesto, setIdPerfilPuesto] = useState('');

    //Datos competencia
    const [idCompetencia, setIdCompetencia] = useState([]);
    const [nombreCompetencia, setNombreCompetencia] = useState([]);

    const handleGetPuestos = () => {
        axios.get('http://localhost:4000/data/obtener-puestos')
            .then((response) => {
                setPuestos(response.data.data);
            })
            .catch((error) => {
                console.log(error.response.data.data);
            })
    };

    const handleGetCompetencias = () => {
        axios.get('http://localhost:4000/data/obtener-competencias')
            .then((response) => {
                setCompetencias(response.data.data);
                setSearchSucces(true);
            })
            .catch((error) => {
                console.log(error.response.data.data);
                setSearchSucces(false);
            })
    };

    const handleAddCompetencia = () => {
        const competencia = {
            id_competencia: idCompetencia,
            nombre_competencia: nombreCompetencia
        };
        setCompetenciasAgregadas((estadoAnterior) => [...estadoAnterior, competencia]);
    };

    const handleCreateEvaluacion = () => {
        const evaluacion = {
            id_perfil_puesto: idPerfilPuesto,
            nombre_perfil: perfilPuesto,
        };
        console.log(evaluacion);
    };

    const handleDeleteCompetencia = (idCompetencia) => {   
        const nuevasCompetencias = competenciasAgregadas.filter(
            (competencia) => competencia.id_competencia !== idCompetencia
        );
        setCompetenciasAgregadas(nuevasCompetencias);
    };

    const handleGetInfo = (idCompetencia) => {
        axios.get(`http://localhost:4000/data/obtener-comportamientos?idCompetencia=${idCompetencia}`)
            .then((response) => {
                setComportamientos(response.data.data);
            })
            .catch((error) => {

            })
    };

    useEffect(() => {
        handleGetPuestos();
    }, []);

    return(
        <div className="create-evaluation">
            <h2>Crear Evaluacion</h2>
            <div className="filter">
                <label>Filtro</label>
                <div>
                    <select>
                        <option>Seleccionar tipo de evaluación</option>
                        <option>Potencial</option>
                        <option>Competencias</option>
                    </select>
                </div>
                <div>
                    <input placeholder="Nombre de evaluación"/>
                </div>
                <div>
                    <input type="date"/>
                </div>
                <button>Crear</button>
            </div>

            {searchSuccess && (
                <div className="form">
                <div>
                    <h4>{perfilPuesto}</h4>
                </div>
                
                

                <div className="competencias-container">
                    <h4>Competencias a Evaluar</h4>
                    {competencias.length > 0 ? (
                        <div>
                            {competencias.map((competencia, index) => (
                                <CompetenciaContainer
                                    nombreCompetencia={competencia.nombre_competencia}
                                    onInfo={() => handleGetInfo(competencia.id_competencia)}
                                    onDelete={() => handleDeleteCompetencia(competencia.id_competencia)}
                                    comportamientos={comportamientos}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No ha agregado competencias.</p>
                    )}
                </div>
                <div>
                    <button onClick={handleCreateEvaluacion}>Aceptar</button>
                </div>
            </div>
            )}     
        </div>
    );
};

export default CrearEvaluacion;