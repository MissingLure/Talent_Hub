import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/*const CrearPreguntas = () => {
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
    axios.get('http://localhost/data/obtener-competencias')
    .then((response) => {
        setCompetencias(response.data.data);
        console.log(response.data.data);
    })
    .catch((error) => {
        console.log(error);
    })
  };

  const handleObtenerHabilidades = () => {
    axios.get('http://localhost/data/obtener-habilidades')
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
        <div>
      <h2 className="tituloCrearEncuesta">Crear Encuesta</h2>
      <div>
        <br></br>
        <br></br>
        <label>
          Competencia:
          <select value={competencia} onChange={(e) => setCompetencia(e.target.value)}>
            <option value="">Seleccione...</option>
            {competencias.map((opcion, index) => (
              <option key={index} value={opcion}>{opcion}</option>
            ))}
          </select>
        </label>
        <label>
          Habilidad:
          <select value={habilidad} onChange={(e) => setHabilidad(e.target.value)}>
            <option value="">Seleccione...</option>
            {habilidades.map((opcion, index) => (
              <option key={index} value={opcion}>{opcion}</option>
            ))}
          </select>
        </label>
        <label>
          Comportamiento:
          <select value={comportamiento} onChange={(e) => setComportamiento(e.target.value)}>
            <option value="">Seleccione...</option>
            {opcionesComportamiento.map((opcion, index) => (
              <option key={index} value={opcion}>{opcion}</option>
            ))}
          </select>
        </label>
        <label>
          Pregunta:
          <input
            type="text"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            placeholder="Ingrese la pregunta"
          />
        </label>
        
        <button onClick={handleAgregarFila}>Agregar a la tabla</button>
      </div>
      <Link to="/encuestas">
        <button className="botonVolverMenuEncuesta">Volver al Menu de Encuestas</button>
      </Link>
      <br></br>
      <table>
        <thead>
          <tr>
            <th >Eliminar</th>
            <th>Competencia</th>
            <th>Habilidad</th>
            <th>Comportamiento</th>
            <th>Pregunta</th>
          </tr>
        </thead>
        <tbody>
          {filasTabla.map((fila, index) => (
              <tr key={index}>
                <td className="CeldaEliminar">
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
      <br></br>
      <button className="botonEliminarFilas" onClick={handleEliminarFilasMarcadas}>Eliminar Filas Marcadas</button>
      
    </div>
    
  );
};*/

const CrearEncuesta = () => {
  return(
    <div className="crear-encuesta">

    </div>
  )
};
export default CrearEncuesta;