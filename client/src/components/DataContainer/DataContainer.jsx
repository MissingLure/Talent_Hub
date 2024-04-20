import { useEffect, useState } from "react";
import "./DataContainer.css";

const EpleadoContainer = ({ primaryValue, secondaryValue, primarySubValue, secondarySubValue, primaryAction, secondaryAction, tertiaryAction, onPrimaryAction, onSecondaryAction, onTertiaryAtion,hasPrimary, hasSecondary, hasTertitary}) => {
return(
        <div className="data-container">
            <div className="info">
                <p>{primaryValue} {secondaryValue}</p>
                <p>{primarySubValue}</p>
                <p>{secondarySubValue}</p>
            </div>
            <div className="actions">
                {hasPrimary && (
                    <button className="primary-button" onClick={onPrimaryAction}>{primaryAction}</button>
                )}
                {hasSecondary && (
                    <button className="secondary-button" onClick={onSecondaryAction}>{secondaryAction}</button>
                )}
                {hasTertitary && (
                    <button className="tertiary-button">{tertiaryAction}</button>
                )}            
            </div>
        </div>
    );
};

export default EpleadoContainer;