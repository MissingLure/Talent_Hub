import { useEffect, useState } from "react";
import "./DataContainer.css";

const EpleadoContainer = ({ primaryValue, secondaryValue, primaryAction, onPrimaryAction, hasPrimary}) => {
return(
        <div className="data-container">
            <div className="info">
                <p>{primaryValue} {secondaryValue}</p>
            </div>
            <div className="actions">
                {hasPrimary && (
                    <button className="primary-button" onClick={onPrimaryAction}>{primaryAction}</button>
                )}          
            </div>
        </div>
    );
};

export default EpleadoContainer;