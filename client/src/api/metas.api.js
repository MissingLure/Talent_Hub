import axios from 'axios';

const rutaBase = 'http://localhost:4000/meta-empleado-resultado';


const getAllMetas = async () => {
    try 
    {
        const res = await axios.get(rutaBase + '/obtener-metas-empleado-resultado')
        return res.data;
    } catch (err) 
    {
        console.log(err);
        return null; 
    }
};

const getMetasPorEmpleado = async (idEmpleado) => {
    try 
    {
        const res = await axios.get(`${rutaBase}/obtener-metas-empleado/${idEmpleado}`);
        return res;
    } catch (err)
    {
        console.log(err);
        return null;
    }
}

const editarMeta = async (idEmpleado, data) => {
    try 
    {
        const res = await axios.put(`${rutaBase}/actualizar-meta-empleado-resultado/${idEmpleado}`, data);
        return res;
    } catch (err) 
    {
        console.log(err); 
        return null; 
    }
}
export default {
    getAllMetas,
    getMetasPorEmpleado,
    editarMeta
}