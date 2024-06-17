import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MetasEmpleado.css";
import inform from "../../images/info.png";
import search from "../../images/search.png";
import add from "../../images/add.png";
import Navbar from "../../components/Navbar/Navbar";

const MetasEmpleado = () => {
  const [metas, setMetas] = useState([]);
  const employeeData = JSON.parse(localStorage.getItem("employeeData"));
  const [id_persona, setId_persona] = useState(employeeData.id_user);
  const [editar, setEditar] = useState("Editar");
  const [modoEdicion, setModoEdicion] = useState(false);

  //tabla editable
  const [data, setData] = useState([
    { id: 1, nombre: "Meta 1", estado: "100%", peso: "25%" },
    { id: 2, nombre: "Meta 2", estado: "80%", peso: "50%" },
  ]);

  const [editMode, setEditMode] = useState({
    rowIndex: null,
    columnName: null,
  });

  const handleDoubleClick = (rowIndex, columnName) => {
    if (modoEdicion) {
      setEditMode({ rowIndex, columnName });
    }
  };

  const handleBlur = (e, rowIndex, columnName) => {
    const newData = [...data];
    newData[rowIndex][columnName] = e.target.textContent;
    setData(newData);
    setEditMode({ rowIndex: null, columnName: null });
  };

  const handleKeyPress = (e, rowIndex, columnName) => {
    if (e.key === "Enter") {
      handleBlur(e, rowIndex, columnName);
    }
  };

  useEffect(() => {
    handleGetMetas(id_persona);
  }, []);

  const handleGetMetas = (id) => {
    // Aquí realizarías la llamada a la API para obtener las metas del empleado
    // Ejemplo de llamada GET utilizando axios
    /*
    axios
      .get(`http://localhost:4000/metas-empleado/${id}`)
      .then((response) => {
        setMetas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching metas:", error);
      });
    */
  };

  /*Botones */
  const handleCrear = () => {
    // Función para manejar la creación de una nueva meta
  };

  const handleEditarClick = () => {
    setModoEdicion(!modoEdicion);
    setEditar(modoEdicion ? "Editar" : "Guardar");
  };

  const handleEliminar = () => {
    // Función para manejar la eliminación de una meta
  };

  const handleEntregar = () => {
    // Función para manejar la entrega de una meta
  };

  /*Slider */
  const CustomSlider = ({ min, max, step, defaultValue, onChange }) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event) => {
      const newValue = parseInt(event.target.value, 10);
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    };
    return (
      <div className="slider-container">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="slider"
          style={{ width: "80%" }}
        />
      </div>
    );
  };

  return (
    <div className="evaluaciones-pendientes">
      <Navbar />
      <h2>
        <b>Metas</b>
      </h2>
      <br />
      <div className="body-container-metas">
        <div className="container3-metas">
          <table>
            <thead>
              <tr>
                <th>Metas</th>
                <th>Estado</th>
                <th>Peso</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {data.map((meta, rowIndex) => (
                <tr key={meta.id}>
                  <td
                    onDoubleClick={() => handleDoubleClick(rowIndex, "nombre")}
                    contentEditable={
                      editMode.rowIndex === rowIndex &&
                      editMode.columnName === "nombre"
                    }
                    onBlur={(e) => handleBlur(e, rowIndex, "nombre")}
                    onKeyPress={(e) => handleKeyPress(e, rowIndex, "nombre")}
                    suppressContentEditableWarning={true}
                  >
                    {meta.nombre}
                  </td>
                  <td>{meta.estado}</td>
                  <td
                    onDoubleClick={() => handleDoubleClick(rowIndex, "peso")}
                    contentEditable={
                      editMode.rowIndex === rowIndex &&
                      editMode.columnName === "peso"
                    }
                    onBlur={(e) => handleBlur(e, rowIndex, "peso")}
                    onKeyPress={(e) => handleKeyPress(e, rowIndex, "peso")}
                    suppressContentEditableWarning={true}
                  >
                    {meta.peso}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="seleccion"
                      /* Aquí actualiza si ya completó la meta */
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="body-container-metas">
        <div className="container3-metas">
          <table>
            <thead>
              <tr>
                <th>Progreso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <CustomSlider
                  defaultValue={0}
                  min={0}
                  max={2}
                  step={1}
                  onChange={(value) => console.log(`Slider value: ${value}`)}
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="body-container-botones-meta">
        <button className="button-derecha" onClick={handleCrear}>
          Crear
        </button>
        <button className="button-derecha" onClick={handleEditarClick}>
          {editar}
        </button>
        <button className="button-eliminar" onClick={handleEliminar}>
          Eliminar
        </button>
        <button className="button-izquierda" onClick={handleEntregar}>
          Entregar
        </button>
      </div>
    </div>
  );
};

export default MetasEmpleado;
