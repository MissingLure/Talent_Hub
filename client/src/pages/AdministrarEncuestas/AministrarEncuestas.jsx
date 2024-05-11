import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './AdministrarEncuestas.css'
import Navbar from "../../components/Navbar/Navbar";

const AdministrarEncuestas = () => {
  const opcionesCompetencia = ['Competencia 1', 'Competencia 2', 'Competencia 3'];
  const opcionesHabilidad = ['Habilidad 1', 'Habilidad 2', 'Habilidad 3'];
  const opcionesComportamiento = ['Comportamiento 1', 'Comportamiento 2', 'Comportamiento 3'];

  const [competencia, setCompetencia] = useState('');
  const [habilidad, setHabilidad] = useState('');
  const [comportamiento, setComportamiento] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [filasTabla, setFilasTabla] = useState([]);
  const [filasMarcadas, setFilasMarcadas] = useState([]);

  const [competencias, setCompetencias] = useState([]);
  const [habilidades, setHabilidades] = useState([]);

  const handleObtenerCompetencias = () => {
    axios.get('http://localhost:4000/data/obtener-competencias')
    .then((response) => {
        setCompetencias(response.data.data);
    })
    .catch((error) => {
        console.log(error);
    })
  };

  const handleObtenerHabilidades = () => {
    axios.get('http://localhost:4000/data/obtener-habilidades')
    .then((response) => {
        setHabilidades(response.data.data);
    })
    .catch((error) => {
        console.log(error);
    })
  };


  useEffect(() => {
    handleObtenerCompetencias();
    handleObtenerHabilidades();
  }, []);
  
  const handleAgregarFila = () => {
    if (competencia && habilidad && comportamiento && pregunta) {
      const nuevaFila = { competencia, habilidad, comportamiento, pregunta };
      setFilasTabla([...filasTabla, nuevaFila]);
      setCompetencia('');
      setHabilidad('');
      setComportamiento('');
      setPregunta('');
    } else {
      alert('Por favor, seleccione valores para todas las columnas');
    }
  };
  const handleMarcarFila = (index) => {
    const filasMarcadasCopy = [...filasMarcadas];
    if (filasMarcadasCopy.includes(index)) {
      filasMarcadasCopy.splice(filasMarcadasCopy.indexOf(index), 1);
    } else {
      filasMarcadasCopy.push(index);
    }
    setFilasMarcadas(filasMarcadasCopy);
  };

  const handleEliminarFilasMarcadas = () => {
    const filasNuevas = filasTabla.filter((fila, index) => !filasMarcadas.includes(index));
    setFilasTabla(filasNuevas);
    setFilasMarcadas([]);
  };
    return(
        <div className="admin-encuesta-container">
          <Navbar/>
          {/* <div className="volver">
            <Link to="/administrar-preguntas">
              <button className="botonVolverMenuEncuesta">Volver al Menu de Encuestas</button>
            </Link>
          </div> */}
      <h2><b>Crear Preguntas</b></h2>
      
      <div>
        <br></br>
        <label>Competencia:  </label>
          {competencias.length > 0 ? (
            <select onChange={(e) => setCompetencia(e.target.value)}>
              <option hidden disabled selected value="">Seleccione competencia...</option>
              {competencias.map((competencia, index) => (
                <option key={index} value={competencia.id_competencia}>{competencia.nombre_competencia}</option>
              ))}
            </select>
          ) : (
            <p>No hay datos.</p>
          )}
        <label>Habilidad: </label>
          {habilidades.length > 0 ? (
              <select onChange={(e) => setHabilidad(e.target.value)}>
                <option hidden disabled selected value="">Seleccione habilidad...</option>
                {habilidades.map((habilidad, index) => (
                  <option key={index} value={habilidad.id_habilidad}>{habilidad.nombre_habilidad}</option>
                ))}
              </select>
            ) : (
              <p>No hay datos.</p>
            )}
        <label>Comportamiento: </label>
        <select value={comportamiento} onChange={(e) => setComportamiento(e.target.value)}>
            <option value="">Seleccione...</option>
            {opcionesComportamiento.map((opcion, index) => (
              <option key={index} value={opcion}>{opcion}</option>
            ))}
          </select>
        <label>Pregunta: </label>
        <input
            type="text"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            placeholder="Ingrese la pregunta"
          />
        <div>
        <button className="botonEliminarFilas" onClick={handleEliminarFilasMarcadas}>Eliminar Filas Marcadas</button>
        <button onClick={handleAgregarFila}>Agregar a la tabla</button>

        </div>
      </div>
      
      <br></br>
      <div className="tabla-container">
      <table>
        <thead>
          <tr>
            <th >Select</th>
            <th>Competencia</th>
            <th>Habilidad</th>
            <th>Comportamiento</th>
            <th>Pregunta</th>
          </tr>
        </thead>
        <tbody>
          {filasTabla.map((fila, index) => (
              <tr key={index}>
                <td className="Eliminar">
                <input
                  type="checkbox"
                  name="eliminar"
                  checked={filasMarcadas.includes(index)}
                  onChange={() => handleMarcarFila(index)}
                />
                </td>
                <td>{fila.competencia}</td>
                <td>{fila.habilidad}</td>
                <td>{fila.comportamiento}</td>
                <td>{fila.pregunta}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <br></br>
      <div>
        {filasTabla.length > 0 ? (
          <button> Finalizar Encuesta</button>
        ) : (
          <p></p>
        )}
      </div>
    </div>
    
  );
};
export default AdministrarEncuestas;