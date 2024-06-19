import { useEffect, useState } from "react";
import axios from "axios";
import "./EvaluarPotencial.css";
import gridBoxApi from "../../api/gridBox.api";
import Modal from "react-modal";
import PropTypes from "prop-types";


const EvaluarPotencial = ({ selectedEmployeeInfo, cancel, save }) => {
    const [nota, setNota] = useState('');
    const fechaActual = new Date;
    const fecha = new Date(fechaActual.getFullYear() - 18, fechaActual.getMonth(), fechaActual.getDate());
    const fechaActualFormateada = fechaActual.toISOString().split('T')[0];

    const handleSubmit = async () => {
      const data={
      id_empleado:selectedEmployeeInfo.id_empleado,
      resultado: nota,
      Fecha_limite: fechaActualFormateada,
      }
      console.log(data);
        axios.post('http://localhost:4000/evaluaciones-potenciales/',data).then((response) => {
          if (response.data.success) {
            //console.log(response.data);
            setResponseMessage(response.data.details);
            setErrorMessages([]);
            setSuccess(true);
        } else {
            setResponseMessage(response.data.details);
            setErrorMessages([]);
            setSuccess(false);
            alert('Hubo un error al ingresar la evaluacion.');
        }
      })
      .catch((error) => {
          console.log(error);
      })
      //actualizar grid-box
      console.log(selectedEmployeeInfo.id_empleado);
      const resGridBox = await gridBoxApi.updateGridBoxRequest(
        selectedEmployeeInfo.id_empleado,
        { resultado_evaluacion_potencial: nota }
      );
      console.log(resGridBox);
        cancel();
      };

    return (
        <div className="evaluar-potencial-popup">
          <div className="contenido-empleado">
            <h3 className="titulo-empleado">Asignar Nota  {selectedEmployeeInfo.primer_nombre}</h3>
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
    //selectedEmployeeInfo: PropTypes.object.isRequired,
    cancel: PropTypes.func.isRequired,
  };

export default EvaluarPotencial;