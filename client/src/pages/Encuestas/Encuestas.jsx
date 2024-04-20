import { useEffect, useState } from "react";
import axios from "axios";
import DataContainer_Evaluacion from "../../components/DataContainer_Evaluacion/DataContainer_Evaluacion";
import "./Encuestas.css";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar/Navbar";



const Encuestas = () => {
    const [encuestasDisponibles, setEncuestasDisponibles] = useState([]);

    const navigate = useNavigate();

    const handleObtenerEncuestas = () => {
        axios.get('http://localhost:4000/data/obtener-encuestas')
            .then((response) => {
                setEncuestasDisponibles(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleVerEcuesta = () => {
        navigate('/evaluacion-empleado');
    }

    useEffect(() => {
        handleObtenerEncuestas();
    }, []);

    const encuestasData = encuestasDisponibles.map((encuesta, index) => ({
        primaryValue: encuesta.nombre_encuesta,
        secondaryValue: encuesta.tipo_encuesta,
        hasPrimary: true,
        primaryAction: "Realizar",
        onPrimaryAction: () => handleVerEcuesta(index),
      }));

    return(
        <div className="surveys-employee">
            <Navbar/>
            <div className="titulo_available">
                    <h2>Encuestas</h2>
            </div>
            <div className="surveys-container">
                <DataContainer_Evaluacion data={encuestasData} />
            </div>
            
        </div>
    );
};

export default Encuestas;