import axios from "axios";

const getEmpleadoById = async (idEmpleado) => {
  try {
    const response = await axios.post("http://localhost:4000/data/obtener-empleado", { idEmpleado });

    return response;

  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  getEmpleadoById,
};
