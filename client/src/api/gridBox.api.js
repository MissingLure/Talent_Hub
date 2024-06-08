import axios from "axios";

const updateGridBoxRequest = async (idEmpleado, data) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/gridbox/gridbox/${idEmpleado}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
    updateGridBoxRequest,
}