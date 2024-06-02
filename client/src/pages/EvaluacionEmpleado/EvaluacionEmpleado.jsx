import axios from 'axios';
import { useEffect, useState } from 'react';
import PreguntaContainer from '../../components/PreguntaContainer/PreguntaContainer';
import './EvaluacionEmpleado.css';
import Navbar from '../../components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';

const EvaluacionEmpleado = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [empleado, setEmpleado] = useState(null);
  const [total, setTotal] = useState(0);
  const [notaDesempeno, setNotaDesempeno] = useState('');
  const [logrosDestacados, setLogrosDestacados] = useState('');
  const [isEditingNota, setIsEditingNota] = useState(false);
  const [isEditingLogros, setIsEditingLogros] = useState(false);
  const [desempeno, setDesempeno] = useState(0);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idEmpleadoParam = searchParams.get('id_empleado');

  const data = { idEmpleado: idEmpleadoParam };

  const handleGetQuestions = () => {
    axios.get('http://localhost:4000/data/obtener-preguntas')
      .then((response) => {
        setPreguntas(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.data);
      });
  };

  const handleObtenerEncuesta = (idPuesto) => {
    axios.post('http://localhost:4000/data/obtener-evaluacion', { idPuesto })
      .then((response) => {
        if (response.data.success) {
          setEvaluacion(response.data.data);
          console.log(response.data.data);
        } else {
          setEvaluacion([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetEmpleado = () => {
    axios.post('http://localhost:4000/data/obtener-empleado', data)
      .then(response => {
        setEmpleado(response.data.data[0]);
        handleObtenerEncuesta(response.data.data[0].id_perfil_puesto);
      })
      .catch(error => {
        console.error('Error al obtener el empleado:', error);
      });
  };

  useEffect(() => {
    handleGetEmpleado();
    handleGetQuestions();
  }, []);

  useEffect(() => {
    if (empleado) {
      const metasAsignadas = 4; // Aquí deberías usar los datos reales del empleado
      const metasLogradas = 3; // Aquí deberías usar los datos reales del empleado
      setDesempeno((metasLogradas / metasAsignadas) * 100);
    }
  }, [empleado]);

  const handleTotalChange = (index, newTotal) => {
    const newTotals = [...preguntas.map((_, idx) => idx === index ? newTotal : 0)];
    setTotal(newTotals.reduce((acc, curr) => acc + curr, 0));
  };

  const toggleEditingNota = () => {
    setIsEditingNota(!isEditingNota);
  };

  const toggleEditingLogros = () => {
    setIsEditingLogros(!isEditingLogros);
  };

  return (
    <div>
      <Navbar />
      <div className="evaluacion-container">
        <div className="profile-section">
          <img src='../../images/hanes-logo.png' className="profile-pic" />
          <h2 className="nombre-empleado">Nombre</h2>
          <div className="metas-estimadas">
            <p>Metas Estimadas</p>
            <h3>4</h3>
          </div>
          <div className="metas-asignadas">
            <p>Metas Asignadas</p>
            <h3>4</h3>
          </div>
          <div className="metas-logradas">
            <p>Metas Logradas</p>
            <h3>3</h3>
          </div>
          <div className="desempeno">
            <p>Desempeño</p>
            <h3>{desempeno}%</h3>
          </div>
        </div>
        <div className="metas-section">
          <h2>Metas</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Metas</th>
                <th>Estado</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Meta1</td>
                <td>Logrado</td>
                <td>( )</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Meta2</td>
                <td>Fallido</td>
                <td>( )</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Meta3</td>
                <td>Logrado</td>
                <td>( )</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Meta4</td>
                <td>Logrado</td>
                <td>( )</td>
              </tr>
            </tbody>
          </table>
          <div className="nota-desempeno">
            <h3>Nota de Desempeño:</h3>
            {isEditingNota ? (
              <div>
                <textarea
                  value={notaDesempeno}
                  onChange={(e) => setNotaDesempeno(e.target.value)}
                />
                <button onClick={toggleEditingNota}>Guardar Nota</button>
              </div>
            ) : (
              <div>
                <p>{notaDesempeno}</p>
                <button onClick={toggleEditingNota}>Editar Nota</button>
              </div>
            )}
          </div>
          <div className="logros-destacados">
            <h3>Logros Destacados:</h3>
            {isEditingLogros ? (
              <div>
                <textarea
                  value={logrosDestacados}
                  onChange={(e) => setLogrosDestacados(e.target.value)}
                />
                <button onClick={toggleEditingLogros}>Guardar Logros</button>
              </div>
            ) : (
              <div>
                <p>{logrosDestacados}</p>
                <button onClick={toggleEditingLogros}>Editar Logros</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluacionEmpleado;
