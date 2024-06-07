import './App.css';
import Login from './pages/Login/Login';
import CrearEmpleado from './pages/CrearEmpleado/CrearEmpleado';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdministarEmpleados from './pages/AdministrarEmpleados/AdministrarEmpleados';
import AdministarUsuarios from './pages/AdministrarUsuarios/AdministrarUsuarios';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import EvaluacionesEmpleado from './pages/EvaluacionesEmpleado/EvaluacionesEmpleado';
import EvaluacionEmpleado from './pages/EvaluacionEmpleado/EvaluacionEmpleado';
import CrearCompetencias from './pages/CrearCompetencias/CrearCompetencias';
import AdministrarPreguntas from './pages/AdministrarPreguntas/AdminPreguntas';
import BibliotecaCompetencias from './pages/BibliotecaCompetencias/BibliotecaCompetencias';
import Inicio from './pages/Inicio/Inicio';
import BoxGrid from './pages/BoxGrid/BoxGrid';
import AsignarEvaluacion from './pages/AsignarEvaluacion/AsignarEvaluacion';
import AdministrarEncuestas from './pages/AdministrarEncuestas/AministrarEncuestas'
import CrearEncuestas from './pages/Encuesta/Encuesta';
import EncuestasEmpleado from './pages/Encuestas/Encuestas';
import CoreCompetences from './pages/CoreCompetences/CoreCompetences';
import PotencialCompetences from './pages/PotentialCompetiences/PotencialCompetiences';
import EvaluarCompetencia from './pages/EvaluarCompetencia/EvaluarCompetencia';
// import MostrarInfo from './pages/MostrarInfo/MostrarInfo';
// import VerPreguntas from './pages/VerPreguntas/Preguntas';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/user-dashboard' element={<UserDashboard/>}/>
          
          {/* <Route path='/mostrar-info' element={<MostrarInfo/>}/> */}
          {/* <Route path='/ver-preguntas' element={<VerPreguntas/>}/> */}
          <Route path='/administrar-empleados' element={<AdministarEmpleados/>}/>
          <Route path='/administrar-usuarios' element={<AdministarUsuarios/>}/>
          <Route path='/crear-empleado' element={<CrearEmpleado/>}/>
          <Route path='/evaluaciones-empleado' element={<EvaluacionesEmpleado/>}/>
          <Route path='/evaluacion-empleado' element={<EvaluacionEmpleado/>}/>
          <Route path='/crear-competencias' element={<CrearCompetencias/>}/>
          <Route path='/administrar-preguntas' element={<AdministrarPreguntas/>}/>
          <Route path='/competencias' element={<BibliotecaCompetencias/>}/>
          <Route path='/administrar-encuestas/core-competences-general' element={<CoreCompetences/>}/>
          <Route path='/administrar-encuestas/potential-competiences-general' element={<PotencialCompetences/>}/>
          <Route path='/evaluar-competencia/:idEmpleado' element={<EvaluarCompetencia/>}/>
          <Route path='/inicio' element={<Inicio/>}/>
          <Route path='/box-grid' element={<BoxGrid/>}/>
          <Route path='/administrar-encuestas'element={<AdministrarEncuestas/>}/>
          <Route path='/crear-encuestas'element={<CrearEncuestas/>}/>
          <Route path='/encuestas-empleado'element={<EncuestasEmpleado/>}/>
          <Route path='/asignar-evaluacion' element={<AsignarEvaluacion/>}/>
          <Route path='*' element={<h1>Pagina No Encontrada</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

/*
<Route path='/mostrar-info' element={<MostrarInfo/>}/>
*/

export default App;