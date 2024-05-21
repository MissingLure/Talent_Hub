import axios from "axios";

const rutaBase = "http://localhost:4000/habilidades-preguntas/";

const getHabilidadPreguntasRequest = async (idHabilidad) => {
    /*
    Funcion que retonar un objeto que contiene un array de aquellas preguntas
    que estan relacionadas con la habilidad que se esta pasando como parametro
    */
  try {
    const res = await axios.get(rutaBase + idHabilidad);

    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const getHabilidadPreguntaRequest = async (idPregunta) => {
  try {
    const res = await axios.get(rutaBase + "pregunta/" + idPregunta);

    return res.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const postHabilidadPreguntaRequest = async (idHabilidad, newPregunta) => {
  /*
   Los valores de newPregunta deben ser un objeto con los atributos que forman
   un registro, exactamente igual como esta en la base de datos. 

   Los nombre de los atributos deben ser exactamente igual que en la base de datos.

   {resumen: value, habilidad_pregunta: value}

    Porque sino, podria lanzar un error durante su ejecucion

    El id de la habilidad es la que se va relacionar con la pregunta que se esta
    mandando a crear, por lo que es importante que se mande como parametro
   */
  try {
    const res = await axios.post(rutaBase + idHabilidad, newPregunta);

    return res.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const putHabilidadPreguntaRequest = async (idPregunta, values) => {
  try {
    const res = await axios.put(rutaBase + "pregunta/" + idPregunta, values);

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteHabilidadPreguntaRequest = async (idPregunta) => {
  try {
    const res = await axios.delete(rutaBase + "pregunta/" + idPregunta);

    return res.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export default {
    getHabilidadPreguntaRequest,
    getHabilidadPreguntasRequest,
    postHabilidadPreguntaRequest,
    putHabilidadPreguntaRequest,
    deleteHabilidadPreguntaRequest,

}