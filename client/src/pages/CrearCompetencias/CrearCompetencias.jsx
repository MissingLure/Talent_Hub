import React, { useState } from 'react';
import './CrearCompetencias.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

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
    <div className="competences-container">
      <Navbar/>
      <h1 className="tituloComp"><b>Crear Competencia</b></h1>
      <form className='competences-form' onSubmit={handleSubmit}>
        <label htmlFor="nombre"><b>Nombre de Competencia:</b></label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={competencia.nombre}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="descripcion"><b>Descripción:</b></label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={competencia.descripcion}
          onChange={handleInputChange}
          rows="4"
          required
        ></textarea>

        <div> </div>
      

        <button type="submit">Crear Competencia</button>
        <Link className="competences-container" to="/competencias">
          <button type="submit"> Regresar </button>
        </Link>
      </form>
    </div>
  );
}

export default App;
