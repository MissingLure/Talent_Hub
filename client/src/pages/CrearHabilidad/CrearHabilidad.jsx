import React, { useState, useEffect } from "react";
import "./CrearHabilidad.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import competenciasApi from "../../api/competencias.api";
import habilidadesApi from "../../api/competencias.habilidades.api";
import { useNavigate } from "react-router-dom";

const CrearHabilidad = () => {
  const [habilidad, setHabilidad] = useState({
    nombre_habilidad: "",
    comportamiento_habilidad: "",
  });

  const navigate = useNavigate();

  const [competencias, setCompetencias] = useState([]);

  const [competencia, setCompetencia] = useState("");

  const validarCampos = () => {
    if (habilidad.nombre_habilidad === "") {
      alert("El campo de nombre de habilidad no puede estar vacío");
      return false;
    }
    if (habilidad.comportamiento_habilidad === "") {
      alert("El campo de comportamiento de habilidad no puede estar vacío");
      return false;
    }
    if (competencia === "") {
      alert("El campo de competencia no puede estar vacío");
      return false;
    }
    return true;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHabilidad((prevHabilidad) => ({ ...prevHabilidad, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validarCampos()) {
      const newHabiliddad = {
        id_competencia: competencia,
        nombre_habilidad: habilidad.nombre_habilidad,
        comportamiento_habilidad: habilidad.comportamiento_habilidad,
      };

      console.log(newHabiliddad)
      const result = await habilidadesApi.postCompetenciaHabilidadRequest(newHabiliddad);

      if (result !== null) {
        if (result.status === 200) {
          alert("Habilidad creada correctamente");
          navigate("/habilidades");
        }
      } else {
        alert("Error al crear habilidad");
      }
    }
  };

  const handleObtenerCompetencias = async () => {
    const result = await competenciasApi.getCompetenciasRequest();

    if (result !== null) {
      if (result.status === 200) {
        setCompetencias(result.data.data);
      }
    }
  };

  useEffect(() => {
    handleObtenerCompetencias();
  }, []);

  return (
    <div className="ability-container">
      <Navbar />
      <h1 className="tituloHabi">
        <b>Crear Habilidad</b>
      </h1>
      <form className="ability-form" onSubmit={handleSubmit}>
        <label htmlFor="Competencia">
          <b>Competencia:</b>
        </label>

        <select
          onChange={(e) => {
            setCompetencia(e.target.value);
          }}
        >
          <option hidden disabled selected value="">
            Seleccione competencia...
          </option>
          {competencias.map((competencia, index) => (
            <option key={index} value={competencia.id_competencia}>
              {competencia.nombre_competencia}
            </option>
          ))}
        </select>

        <label htmlFor="nombre">
          <b>Nombre de Habilidad:</b>
        </label>
        <input
          type="text"
          id="nombre_habilidad"
          name="nombre_habilidad"
          value={habilidad.nombre_habilidad}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="Comportamiento">
          <b>Comportamiento:</b>
        </label>
        <textarea
          id="comportamiento_habilidad"
          name="comportamiento_habilidad"
          value={habilidad.comportamiento_habilidad}
          onChange={handleInputChange}
          rows="4"
          required
        ></textarea>

        <div> </div>

        <button type="submit">Crear Habilidad</button>
        <Link className="ability-container" to="/habilidades">
          <button type="submit"> Regresar </button>
        </Link>
      </form>
    </div>
  );
};

export default CrearHabilidad;
