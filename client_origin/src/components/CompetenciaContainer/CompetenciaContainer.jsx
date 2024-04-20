import { useEffect, useState } from "react";
import "./CompetenciaContainer.css";

const CompetenciaContainer = ({indexValue, idCompetencia, nombreCompetencia, onInfo, onDelete, comportamientos}) => {
    const [comportamientosList, setComportamientosList] = useState([]);

    const handleSetComportamientos = () => {
        
    };

    useEffect(() => {
        setComportamientosList(comportamientos);
    }, []);

    return(
        <div className="App">
            <div className="head-content">
                <div className="info">
                    <p>{nombreCompetencia}</p>
                </div>
                <div className="actions">
                    <button onClick={onInfo} className="info-button">Ver</button>
                    <button onClick={onDelete} className="delete-button">Eliminar</button>
                </div>
            </div>
            
            <div className="sub-info">
                {comportamientos.length > 0 ? (
                    <div>
                        {comportamientos.map((comportamiento) => (
                            <p>{comportamiento.comportamiento}</p>
                        ))}
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default CompetenciaContainer;