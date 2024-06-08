import axios from "axios";

const rutaBase = "http://localhost:4000/dashboard/";

const getDashboardRequest = async () => {
    try {
        const res = await axios.get(rutaBase);

        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getEmpleadoRequest = async (id_empleado) => {
    try {
      const res = await axios.get(rutaBase + id_empleado);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
};

const getResultadosEvaRequest = async (id_empleado) => {
    try {
      const res = await axios.get(rutaBase + "grid/" +id_empleado);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
};

export default {
    getDashboardRequest,
    getEmpleadoRequest,
    getResultadosEvaRequest,
};  