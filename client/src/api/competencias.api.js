import axios from "axios";

const rutaBase = "http://localhost:4000/competencias/";

const getCompetenciasRequest = async () => {
  try {
    const res = await axios.get(rutaBase);

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCompetenciaRequest = async (idCompetencia) => {
  try {
    const res = await axios.get(rutaBase + idCompetencia);

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const postCompetenciaRequest = async (newCompetencia) => {
  try {
    const res = await axios.post(rutaBase, newCompetencia);

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const putCompetenciaRequest = async (idCompetencia, values) => {
  //IMPORTANTE
  /*
  los values debe ser un objeto los atributos que se quieren
  actualizar.

  Lo importante aqui es que el nombre de ese atributo debe ser igual
  al que aparece en la base de datos. Por ejemplo

  {
    nombre_competencia: value,
    descripcion: value,
    etc
  }

  Porque sino, podria lanzar un error durante su ejecucion
  */

  try {
    const res = await axios.put(rutaBase + idCompetencia, values);

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteCompetenciaRequest = async (idCompetencia) => {
  try {
    const res = await axios.delete(rutaBase + idCompetencia);

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  getCompetenciasRequest,
  getCompetenciaRequest,
  postCompetenciaRequest,
  putCompetenciaRequest,
  deleteCompetenciaRequest,
};
