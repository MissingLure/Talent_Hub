import React from "react";
import "./QuestionContainer.css";

const QuestionContainer = ({competencia, habilidad, comportamiento, pregunta, onModify, onDelete}) => {
    return(
        <div className="question-container">
            <div className="content">
                <div>
                    <p>{comportamiento}</p>
                </div>
                <div>
                    <p>{pregunta}</p>
                </div>
            </div>
            
            <div className="actions">
                <button onClick={onModify} className="modify-button">Modificar</button>
                <button onClick={onDelete} className="delete-button">Eliminar</button>
            </div>
        </div>
    );
};

export default QuestionContainer;