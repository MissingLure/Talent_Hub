import React, { useState } from 'react';
import './CrearHabilidad.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

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
    <div className="ability-container">
      <Navbar/>
      <h1 className="tituloHabi"><b>Crear Habilidad</b></h1>
      <form className='ability-form' onSubmit={handleSubmit}>
        <label htmlFor="nombre"><b>Nombre de Habilidad:</b></label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={habilidad.nombre}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="descripcion"><b>Descripción:</b></label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={habilidad.descripcion}
          onChange={handleInputChange}
          rows="4"
          required
        ></textarea>

        <div> </div>
      

        <button type="submit" >Crear Habilidad</button>
        <Link className="ability-container" to="/habilidades">
          <button type="submit"> Regresar </button>
        </Link>
      </form>
    </div>
  );
};

export default CrearHabilidad;
