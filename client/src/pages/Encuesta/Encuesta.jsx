import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Encuesta.css";
import DataTable from "react-data-table-component";
import Navbar from "../../components/Navbar/Navbar";

const Encuesta = () => {
  const [tipoEncuesta, setTipoEncuesta] = useState("");
  const [nombreEncuesta, setNombreEncuesta] = useState("");
  const [lenguaje, setLenguaje] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [responseMessage, setResponseMessage] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [competencias, setCompetencias] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const opcionesLenguaje = ["Español", "Inglés"];
  const [busquedaTexto, setBusquedaTexto] = useState("");
  const [data, setData] = useState([]);
  const [Busqueda, SetBusqueda] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [counter, setCounter] = useState(1);

  const handleCrearEncuesta = () => {
    console.log(preguntas);
  };

  const columns = [
    {
      name: "Pregunta",
      selector: (row) => row.Pregunta,
      sortable: true,
    },
    {
      name: "Lenguaje",
      selector: (row) => row.Lenguaje,
      sortable: true,
    },
  ];

  useEffect(() => {
    SetBusqueda(data);
  }, [data]);

  const handleAgregarFila = () => {
    if (pregunta && lenguaje) {
      const preguntasTemp = preguntas;
      preguntasTemp.push(pregunta);
      setPreguntas(preguntasTemp);

      setData([
        ...data,
        {
          index: counter,
          Pregunta: pregunta,
          Lenguaje: lenguaje,
        },
      ]);

      SetBusqueda([
        ...Busqueda,
        {
          Pregunta: pregunta,
          Lenguaje: lenguaje,
        },
      ]);

      setCounter(counter + 1);
      setPregunta("");
    } else {
      alert("Por favor, complete todos los campos");
    }
  };

  const handleFilter = (event) => {
    const Temporal = data.filter((row) => {
      return row.Pregunta.toLowerCase().includes(event.target.value.toLowerCase());
    });
    SetBusqueda(Temporal);
  };

  const handleSelectedRowsChange = ({ selectedRows }) => {
    const selectedIndexes = selectedRows.map((row) => row.index);
    setSelectedRows(selectedIndexes);
  };

  const handleEliminarFilasMarcadas = () => {
    const newData = data.filter((row) => !selectedRows.includes(row.index));
    setData(newData);
    setSelectedRows([]);
    setBusquedaTexto("");
  };

  const handleAgregarPregunta = () => {
    const encuestaData = {
      tipoEncuesta: tipoEncuesta,
      nombreEncuesta: nombreEncuesta,
      lenguaje: lenguaje,
      preguntas: preguntas,
    };
    
    axios.post("http://localhost:4000/create/crear-encuesta", encuestaData)
      .then((response) => {
        console.log(response.data.details);
        setResponseMessage(response.data.details);
      })
      .catch((error) => {
        setErrorMessages(error.response.data.details);
      });
  };

  return (
    <div className="create-questions">
      <Navbar />
      <h2 className="tituloCrearEncuesta"><b>Crear Encuesta</b> </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAgregarPregunta();
        }}
      >
      </form>

      <div className="logins-form">
        <div>
          <label>Nombre:</label>
        </div>
        <div>
          <input placeholder="Ingrese nombre de encuesta" onChange={(e) => setNombreEncuesta(e.target.value)} />
        </div>
        <div>
          <label>Tipo de encuesta</label>
        </div>
        <div>
          <select onChange={(e) => setTipoEncuesta(e.target.value)}>
            <option hidden disabled selected>
              Seleccione tipo de encuesta...
            </option>
            <option value="Clima Laboral">Clima Laboral</option>
            <option value="Cultura">Cultura</option>
          </select>
        </div>
        <div>
          <label>Lenguaje:</label>
        </div>
        <div>
          <select value={lenguaje} onChange={(e) => setLenguaje(e.target.value)}>
            <option value="">Seleccione un lenguaje...</option>
            {opcionesLenguaje.map((opcion, index) => (
              <option key={index} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Pregunta:</label>
        </div>
        <div>
          <input type="text" className="inputs" value={pregunta} onChange={(e) => setPregunta(e.target.value)} placeholder="Ingrese la pregunta" />
        </div>
        <div>
          <button className="Agregar" onClick={handleAgregarFila}>
            Agregar Pregunta
          </button>
        </div>  
        <div>
          <DataTable
            id="Data"
            columns={columns}
            data={Busqueda}
            selectableRows
            onSelectedRowsChange={handleSelectedRowsChange}
            fixedHeader
            // pagination
            style={{ width: '50%' }} 
          ></DataTable>
        </div>
        <br />
        <div>
          <button className="Eliminar" onClick={handleEliminarFilasMarcadas}>
            Eliminar Preguntas
          </button>
        </div>
        <br />
        {/* <br /> */}
        <div>
          <button className="Fin" onClick={handleAgregarPregunta}>
            Finalizar Encuesta
          </button>
        </div>
        <div>
          {errorMessages.length > 0 ? (
            <div className="error-message">
              {errorMessages.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          ) : (
            <p>{responseMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Encuesta;
