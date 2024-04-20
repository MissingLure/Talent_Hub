import { useEffect, useState } from "react";
import "./EvaluacionContainer.css";
import { Link } from 'react-router-dom';


const EvaluacionContainer = ({name, type, date, status, onDo}) => {
    return(
        <div className="evaluation-container">
            <div className="head-content">
                <div className="info">
                    <p>Tipo: {type}</p>
                    <p>{name}</p>
                    <p>{date}</p>
                    <p>{status}</p>
                </div>
                <div className="actions">
                    <button onClick={onDo} className="info-button"><Link to="/evaluacion-empleado">Contestar</Link></button>
                </div>
            </div>
        </div>
    );
};

export default EvaluacionContainer;