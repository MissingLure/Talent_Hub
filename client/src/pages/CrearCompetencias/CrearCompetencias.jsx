import React, { useState } from 'react';
import './CrearCompetencias.css';

function App() {
  const [competencia, setCompetencia] = useState({
    id_competencia: 'ID_GENERADO_AUTOMATICAMENTE',
    nombre: '',
    descripcion: '',
    peso: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompetencia((prevCompetencia) => ({
      ...prevCompetencia,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <h2>Crear Competencia</h2>
      <form className='competences-form' onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre de la Competencia:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={competencia.nombre}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={competencia.descripcion}
          onChange={handleInputChange}
          rows="4"
          required
        ></textarea>

        <label htmlFor="peso">Peso:</label>
        <input
          type="text"
          id="peso"
          name="peso"
          value={competencia.peso}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Crear Competencia</button>
      </form>
    </div>
  );
}

export default App;
