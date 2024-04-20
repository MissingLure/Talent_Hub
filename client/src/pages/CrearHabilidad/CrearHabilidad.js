import React, { useState } from 'react';
import './CrearHabilidad.css';

const CrearHabilidad = () => {
  const [habilidad, setHabilidad] = useState({
    id: 'ID_AUTOMÁTICO',
    nombre: '',
    descripcion: '',
    peso: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHabilidad((prevHabilidad) => ({ ...prevHabilidad, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar datos al servidor
    console.log(habilidad);
  };

  return (
    <div className="data-viewer">
      <h2>Crear Habilidad</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID de Habilidad:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={habilidad.id}
          readOnly
        />

        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={habilidad.nombre}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={habilidad.descripcion}
          onChange={handleInputChange}
          rows="4"
          required
        ></textarea>

        <label htmlFor="peso">Peso:</label>
        <input
          type="text"
          id="peso"
          name="peso"
          value={habilidad.peso}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Crear Habilidad</button>
      </form>
    </div>
  );
};

export default CrearHabilidad;
