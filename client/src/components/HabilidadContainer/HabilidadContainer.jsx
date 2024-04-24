import { useEffect, useState } from "react";
import "./HabilidadContainer.css";

const HabilidadContainer = ({indexValue, idHabilidad, nombreHabilidad, onInfo, onDelete, habilidades})=>{
    const [habilidadesList, setHabilidadesList]= useState([]);
    
    const handleSetHabilidades = ()=>{

    }

    useEffect(()=> {
        setHabilidadesList(habilidades);
    }, []);

    return (
        <div className="App">
            <div className="content-head">
                <div className="info">
                    <p>{nombreHabilidad}</p>
                </div>
                <div className="actions">
                    <button onClick={onInfo} className="info-button">Ver</button>
                    <button onClick={onInfo} className="delete-button">Eliminar</button>
                </div>
            </div>

            <div className="sub-info">
                {habilidades.length >0 ?(
                    <div>
                        {habilidades.map((habilidad) =>(
                            <p>{habilidad.habilidad}</p>
                        ))}
                    </div>
                ):(
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default HabilidadContainer;