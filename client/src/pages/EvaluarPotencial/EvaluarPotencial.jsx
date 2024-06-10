import { useEffect, useState } from "react";
import axios from "axios";
import "./EvaluarPotencial.css";
import Modal from "react-modal";
import PropTypes from "prop-types";


const EvaluarPotencial = ({ selectedEmployee, cancel, save }) => {
    const [nota, setNota] = useState('');

    const handleSubmit = () => {
        save(employee, nota);
        cancel();
      };

    return (
        <div className="evaluar-potencial-popup">
          <div className="contenido-empleado">
            <h3 className="titulo-empleado">Asignar Nota  {selectedEmployee}</h3>
            <div className="formulario-container-empleado">
              <div className="input-wrapper-empleado">
                <label htmlFor="nota">Nota</label>
                <input
                  type="number"
                  id="nota"
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
              <div className="button-wrapper-empleado">
                <button onClick={handleSubmit}>Guardar</button>
                <button onClick={cancel}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      );

}

EvaluarPotencial.propTypes = {
    //selectedEmployee: PropTypes.object.isRequired,
    cancel: PropTypes.func.isRequired,
  };

export default EvaluarPotencial;