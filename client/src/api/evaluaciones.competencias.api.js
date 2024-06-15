import axios from "axios";

const rutaBase = "http://localhost:4000/evaluaciones-competencias/";

const getEvaluacionCompetenciasRequest = async (idEvaluacion) => {
  try {
    const res = await axios.get(rutaBase + idEvaluacion);

    return res;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const getEvaluacionesCompetenciasRequest = async () => {
  try {
    const res = await axios.get(rutaBase);

    return res;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const getEvaluacionesPendientesRequest = async () => {
  try {
    const res = await axios.get(rutaBase + "evaluaciones-pendientes");

    return res;
  } catch (error) {
    console.log(error);

    return null;
  }
};
// Es importante que newEvaluacion sea un objeto con los atributos exactamente iguales
// a como estan en la base de datos

const postEvaluacionCompetenciaRequest = async (newEvaluacion) => {
  try {
    const res = await axios.post(rutaBase, newEvaluacion);

    return res;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const putEvaluacionCompetenciaRequest = async (idEvaluacion, values) => {
  try {
    const res = await axios.put(rutaBase + idEvaluacion, values);

    return res;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const deleteEvaluacionCompetenciaRequest = async (idEvaluacion) => {
  try {
    const res = await axios.delete(rutaBase + idEvaluacion);

    return res;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const getEvaluacionesCompetenciasByEmpleado = async (idEmpleado) => {
  try {
    const res = await axios.get(rutaBase + "by-empleado/" + idEmpleado);

    return res;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export default {
  getEvaluacionCompetenciasRequest,
  getEvaluacionesCompetenciasRequest,
  postEvaluacionCompetenciaRequest,
  putEvaluacionCompetenciaRequest,
  deleteEvaluacionCompetenciaRequest,
  getEvaluacionesCompetenciasByEmpleado,
  getEvaluacionesPendientesRequest,
};
