import axios from "axios";

const rutaBase = "http://localhost:4000/competencias-habilidades/";

const getCompetenciaHabilidadesRequest = async () => {
  try {
    const res = await axios.get(rutaBase);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCompetenciaHabilidadesByCompetenciaRequest = async (
  id_compentencia
) => {
  try {
    const res = await axios.get(rutaBase + "by-competencia/" + id_compentencia);

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCompetenciaHabilidadRequest = async (idCompetenciaHabilidad) => {
  try {
    const res = await axios.get(rutaBase + idCompetenciaHabilidad);

    return res.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const postCompetenciaHabilidadRequest = async (newCompetenciaHabilidad) => {
  // IMPORTANTE: EL id de la habilidad se autogenera,

  // newCompetenciaHabilidad debe ser un objeto que contenga los mismos atributos
  // como estan en la base de datos

  /*
  Por ejemplo

  {
    id_competencia: value,
    nombre_habilidad: value,
    ...,
  }
  */

  try {
    const result = await axios.post(rutaBase, newCompetenciaHabilidad);

    return result.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const putCompetenciaHabilidadRequest = async (
  idCompetenciaHabilidad,
  values
) => {
  // Los values deben ser un objeto, que contenga los atributos identicos
  // a como estan en la base de datos

  /*
  Por ejemplo
  values = {
    nombre_habilidad: newValor,
    comportamiento_habilidad: newValor,
    etc
  }

  asi esta definido desde el controlador, si no es asi, lanzaria un error
  */

  try {
    const res = await axios.put(rutaBase + idCompetenciaHabilidad, values);

    return res.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const deleteCompetenciaHabilidadRequest = async (idCompetenciaHabilidad) => {
  try {
    const res = await axios.delete(rutaBase + idCompetenciaHabilidad);

    return res.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export default {
  getCompetenciaHabilidadesByCompetenciaRequest,
  getCompetenciaHabilidadesRequest,
  getCompetenciaHabilidadRequest,
  postCompetenciaHabilidadRequest,
  putCompetenciaHabilidadRequest,
  deleteCompetenciaHabilidadRequest,
};
