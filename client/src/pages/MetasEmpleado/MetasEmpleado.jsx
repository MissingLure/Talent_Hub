import React, { useEffect, useState } from "react";
import "./MetasEmpleado.css";
import Navbar from "../../components/Navbar/Navbar";
import metasApi from '../../api/metas.api';

const MetasEmpleado = () => {
  const [metas, setMetas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [editMeta, setEditMeta] = useState(null);
  const employeeData = JSON.parse(localStorage.getItem("employeeData"));
  const id_empleado = employeeData.id_empleado;

  useEffect(() => {
    handleGetMetasPorEmpleado();
  }, []);

  const handleGetMetasPorEmpleado = async () => {
    try {
      const response = await metasApi.getMetasPorEmpleado(1000001);
      console.log("API Response:", response);

      const metasData = response.data || [];
      console.log("Metas Data:", metasData);
      setMetas(metasData);
    } catch (error) {
      console.error("Error fetching metas:", error);
    }
  };

  const handleEditClick = (meta) => {
    setModoEdicion(true);
    setEditMeta({ ...meta });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditMeta((prevMeta) => ({
      ...prevMeta,
      [name]: value,
    }));
  };

  const handleUpdateMeta = async () => {
    try {
      await metasApi.editarMeta(editMeta.id_metas_empleado_resultado, editMeta);
      setModoEdicion(false);
      setEditMeta(null);
      handleGetMetasPorEmpleado();
    } catch (error) {
      console.error("Error updating meta:", error);
    }
  };

  const handleCancelEdit = () => {
    setModoEdicion(false);
    setEditMeta(null);
  };

  const handleCrear = () => {
    // Función para manejar la creación de una nueva meta
  };

  const handleEliminar = () => {
    // Función para manejar la eliminación de una meta
  };

  const handleEntregar = () => {
    // Función para manejar la entrega de una meta
  };

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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {metas.length > 0 ? (
                metas.map((meta) => (
                  <tr key={meta.id_metas_empleado_resultado}>
                    <td>{meta.meta_titulo}</td>
                    <td>{meta.meta_descripcion}</td>
                    <td>{meta.meta_peso}</td>
                    <td>
                      <button onClick={() => handleEditClick(meta)}>Editar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No metas available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modoEdicion && editMeta && (
        <div className="edit-form">
          <h3>Editar Meta</h3>
          <label>
            Título:
            <input
              type="text"
              name="meta_titulo"
              value={editMeta.meta_titulo}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Descripción:
            <input
              type="text"
              name="meta_descripcion"
              value={editMeta.meta_descripcion}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Peso:
            <input
              type="number"
              name="meta_peso"
              value={editMeta.meta_peso}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleUpdateMeta}>Guardar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      )}

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
                <td>
                  <CustomSlider
                    defaultValue={0}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(value) => console.log(`Slider value: ${value}`)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="body-container-botones-meta">
        <button className="button-derecha" onClick={handleCrear}>
          Crear
        </button>
        <button className="button-derecha" onClick={() => setModoEdicion(!modoEdicion)}>
          {modoEdicion ? "Guardar" : "Editar"}
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
