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
  const [selectPuesto, setSelectPuesto] = useState('');
  const [puesto, setPuesto] = useState([]);
  const [responseMessage, setResponseMessage] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const opcionesLenguaje = ["Español", "Inglés"];
  const [data, setData] = useState([]);
  const [Busqueda, SetBusqueda] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [counter, setCounter] = useState(1);

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
    handleGetPuestos();
  }, []);

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

  const handleGetPreguntas = () =>{
    axios.get('http://localhost:4000/data/obtener-preguntas')
    .then((response) => {
      setQuestions(response.data.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  };

  const handleGetPuestos = () => {
    axios.get('http://localhost:4000/data/obtener-puestos')
      .then((response) => {
        setPuesto(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
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
      <div className="container">
        <h2 className="tituloCrearEncuesta"><b>Crear Encuesta</b> </h2>
        <h4>Crea las encuestas para un puesto de trabajo especifico.</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAgregarPregunta();
          }}
        >
        </form>

        <div className="logins-form">
          <div>
            <label>Nombre de Encuesta:</label>
            <input placeholder="Ingrese nombre de encuesta" onChange={(e) => setNombreEncuesta(e.target.value)} />
          </div>
          <div>
            <label>Perfil de Puesto:</label>
            <select onChange={(e) => setSelectPuesto(e.target.value)}>
              <option hidden disabled selected>
                Seleccione el perfil de puesto...
              </option>
            </select>
          </div>
          <div>
            <label>Tipo de encuesta:</label>
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
            <input type="text" className="inputs" value={pregunta} onChange={(e) => setPregunta(e.target.value)} placeholder="Ingrese la pregunta" />
          </div>
          <br/>
          <div>
          <button className="Eliminars" onClick={handleEliminarFilasMarcadas}>
              Eliminar Preguntas
            </button>
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
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>

          <br />
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
    </div>
  );
};

export default Encuesta;