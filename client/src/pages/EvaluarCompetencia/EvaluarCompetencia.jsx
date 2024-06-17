import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import { useParams, useNavigate } from "react-router-dom";
import evalaucionesApi from "../../api/evaluaciones.competencias.api";
import empleadoApi from "../../api/empleado.api";
import ItemCompetencia from "../../components/EvaluacionCompetencia/ItemCompetencia";
import gridBoxApi from "../../api/gridBox.api";

function EvaluarCompetencia() {
  /*
    array Competencias
    {nombre: value}

    array Preguntas
    {resumen: value, pregunta_habilidad: value, competencia: value, resultado: value}
    */

  const params = useParams();
  const navigate = useNavigate();

  const [empleado, setEmpleado] = useState({});
  const [competencias, setCompetencias] = useState([]);
  const [preguntas, setPreguntas] = useState([]);

  const [isEvaluado, setIsEvaluado] = useState(false);
  const [resultado, setResultado] = useState();

  const validarPreguntas = () => {
    for (let i = 0; i < preguntas.length; i++) {
      if (preguntas[i].resultado === null) {
        return false;
      }
    }
    return true;
  };

  const estaEvaluado = (preguntas) => {
    for (let i = 0; i < preguntas.length; i++) {
      if (preguntas[i].resultado === null) {
        return false;
      }
    }
    return true;
  };

  const calcularResultado = (preguntas) => {
    let res = 0;
    let cont_1 = 0;
    let cont_2 = 0;

    const mejorNota = (preguntas.length + 1) * 2;

    preguntas.forEach((pregunta) => {
      if (pregunta.resultado === "1" || pregunta.resultado === 1) ++cont_1;

      if (pregunta.resultado === "2" || pregunta.resultado === 2) ++cont_2;
    });

    res = (cont_1 + cont_2 * 2) / mejorNota;

    return res.toFixed(1);
  };

  const handleChangePregunta = (id, value) => {
    const newPreguntas = preguntas.map((pregunta) => {
      if (pregunta.id_evaluacion_competencias === id) {
        return { ...pregunta, resultado: value };
      }
      return pregunta;
    });

    setPreguntas(newPreguntas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarPreguntas()) {
      alert("Por favor llene todos los campos");
      return;
    }

    preguntas.forEach(async (pregunta) => {
      const res = await evalaucionesApi.putEvaluacionCompetenciaRequest(
        pregunta.id_evaluacion_competencias,
        { resultado: pregunta.resultado }
      );

      if (!res || res.status < 200 || res.status >= 300) {
        alert("Error al guardar la evaluacion");
        return;
      }
    });

    const cal = calcularResultado(preguntas);

    console.log(cal);

    const resGridBox = await gridBoxApi.updateGridBoxRequest(
      params.idEmpleado,
      { resultado_evaluacion_competencias: cal }
    );

    if (!resGridBox || resGridBox.status < 200 || resGridBox.status >= 300) {
      alert("Error al guardar la evaluacion");
      return;
    }

    setResultado(cal);

    setIsEvaluado(true);

    alert("Evaluacion guardada con exito");
  };

  const renderItemInformacion = (label, value) => {
    return (
      <div className="flex  items-center">
        <label className="bg-[#333356] w-60 p-2 text-white rounded-sm rounded-l">
          {label}
        </label>
        <label className="bg-white p-2 w-60 rounded-r">{value}</label>
      </div>
    );
  };

  const loadEvaluacion = async (idEmpleado) => {
    try {
      const resEmpleado = await empleadoApi.getEmpleadoById(idEmpleado);

      if (
        !resEmpleado ||
        resEmpleado.status < 200 ||
        resEmpleado.status >= 300
      ) {
        navigate("/error404");
        return;
      }

      const emp = resEmpleado.data.data;

      setEmpleado(emp[0]);

      const resEvaluacion =
        await evalaucionesApi.getEvaluacionesCompetenciasByEmpleado(idEmpleado);

      if (
        !resEvaluacion ||
        resEvaluacion.status < 200 ||
        resEvaluacion.status >= 300
      ) {
        navigate("/error404");
        return;
      }

      const loadCompetencias = [];
      const preguntas = resEvaluacion.data.data;

      preguntas.forEach((pregunta) => {
        if (
          !loadCompetencias.find(
            (nombre_competencia) =>
              nombre_competencia === pregunta.nombre_competencia
          )
        )
          loadCompetencias.push(pregunta.nombre_competencia);
      });

      setCompetencias(loadCompetencias);
      setPreguntas(preguntas);

      setIsEvaluado(estaEvaluado(preguntas));

      if (estaEvaluado(preguntas)) {
        setResultado(calcularResultado(preguntas));
      }
    } catch (error) {
      console.log(error);
      navigate("/error404");
    }
  };

  const renderInformacionPersonal = () => {
    return (
      <div className="grid grid-cols-2 gap-8 mt-10">
        {renderItemInformacion("No. Identidad", empleado.numero_identidad)}
        {renderItemInformacion(
          "Nombre",
          empleado.primer_nombre +
            " " +
            empleado.segundo_nombre +
            " " +
            empleado.primer_apellido
        )}
        {renderItemInformacion("Posicion", empleado.nombre_perfil)}
        {renderItemInformacion("Departamento", empleado.nombre_departamento)}
      </div>
    );
  };

  const renderPreguntasCompetencias = () => {
    return competencias.map((competencia, i) => (
      <ItemCompetencia
        key={i}
        competencia={competencia}
        preguntas={preguntas.filter(
          (pregunta) => pregunta.nombre_competencia === competencia
        )}
        handleChange={handleChangePregunta}
        disabled={isEvaluado}
      />
    ));
  };

  useEffect(() => {
    const loadEmpleado = async () => {
      if (!params.idEmpleado || params.idEmpleado.length === 0) {
        navigate("/error404");
      }

      await loadEvaluacion(params.idEmpleado);
    };

    loadEmpleado();
  }, []);

  return (
    <div className="flex w-100 h-100 flex-col items-center bg-[#d8d8db]">
      <Navbar />

      <div>
        <h1 className="text-2xl font-bold mt-2 ">
          Evaluar Competencia De Empleado
        </h1>
      </div>

      {renderInformacionPersonal()}

      <h2 className="text-xl font-bold mt-20">Preguntas</h2>

      <div className="grid grid-cols-1 gap-8 mt-10 w-1/2">
        {renderPreguntasCompetencias()}
      </div>

      <div className="flex justify-center mt-10">
        {!isEvaluado ? (
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#333356] hover:bg-[#40406a] transition-all text-white px-4 py-2 hover:pl-3 hover:pb-3 rounded-md"
          >
            Guardar Evaluacion
          </button>
        ) : (
          <div className="bg-green-400 font-bold p-4 text-white rounded-md ">
            <p>Ya esta evaluado</p>
            <p className="text-green-700 font-bold hover:text-green-900 transition-colors cursor-pointer mt-4">
              Su resultado es: {resultado}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EvaluarCompetencia;