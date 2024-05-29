import React, { useState } from "react";
import "./CrearCompetencias.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import competenciasApi from "../../api/competencias.api";
import { useNavigate } from "react-router-dom";

function App() {
  const [competencia, setCompetencia] = useState({
    nombre_competencia: "",
    descripcion: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompetencia((prevCompetencia) => ({
      ...prevCompetencia,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await competenciasApi.postCompetenciaRequest(competencia);

    if (data !== null) {
      if (data.status === 200) {
        console.log(data.data.message);

        navigate("/competencias");
      }
    }
  };

  return (
    <div className="competences-container">
      <Navbar />
      <h1 className="tituloComp">
        <b>Crear Competencia</b>
      </h1>
      <form className="competences-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre_competencia">
          <b>Nombre de Competencia:</b>
        </label>
        <input
          type="text"
          id="nombre_competencia"
          name="nombre_competencia"
          value={competencia.nombre_competencia}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="descripcion">
          <b>Descripción:</b>
        </label>
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
