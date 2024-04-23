import { useEffect, useState } from "react";
import "./DataContainer_Evaluacion.css";

const DataContainer = ({ data }) => {
  return (
    <div className="survey-container">
      {data.length > 0 ? (
        data.map((evaluacion, index) => (
          <div className="data-container_evaluacion" key={index}>
            <div className="survey-title">
              <p>{evaluacion.primaryValue}</p>
            </div>
            <div className="survey-options">
              <div className="survey-info">
                <p>{evaluacion.secondaryValue}</p>
              </div>
              
              <div className="survey-status">
              </div>
              <div className="survey-actions">
                {evaluacion.hasPrimary && (
                  <button
                    className="primary-button_evaluacion"
                    onClick={evaluacion.onPrimaryAction}
                  >
                    {evaluacion.primaryAction}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No tiene evaluaciones pendientes.</p>
      )}
    </div>
  );
};

export default DataContainer;