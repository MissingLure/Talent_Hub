import logo from './logo.svg';
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
import CompetenciaHabilidad from './pages/CompetenciaHabilidad/CompetenciaHabilidad';
import AdministrarPreguntas from './pages/AdministrarPreguntas/AdminPreguntas';
import BibliotecaCompetencias from './pages/BibliotecaCompetencias/BibliotecaCompetencias';
import Inicio from './pages/Inicio/Inicio';
import AdministrarEncuestas from './pages/AdministrarEncuestas/AministrarEncuestas';
import BibliotecaHabilidades from './pages/BibliotecaHabilidades/BibliotecaHabilidades';
import CrearEncuestas from './pages/Encuesta/Encuesta';
import EncuestasEmpleado from './pages/Encuestas/Encuestas';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/user-dashboard' element={<UserDashboard/>}/>
          <Route path='/administrar-empleados' element={<AdministarEmpleados/>}/>
          <Route path='/administrar-usuarios' element={<AdministarUsuarios/>}/>
          <Route path='/crear-empleado' element={<CrearEmpleado/>}/>
          <Route path='/evaluaciones-empleado' element={<EvaluacionesEmpleado/>}/>
          <Route path='/evaluacion-empleado' element={<EvaluacionEmpleado/>}/>
          <Route path='/crear-competencias' element={<CrearCompetencias/>}/>\
          <Route path='/administrar-preguntas' element={<AdministrarPreguntas/>}/>
          <Route path='/competencia-habilidad' element={<CompetenciaHabilidad/>}/>
          <Route path='/competencias' element={<BibliotecaCompetencias/>}/>
          <Route path='/inicio' element={<Inicio/>}/>
          <Route path='/administrar-encuestas'element={<AdministrarEncuestas/>}/>
          <Route path='/habilidades'element={<BibliotecaHabilidades/>}/>
          <Route path='/crear-encuestas'element={<CrearEncuestas/>}/>
          <Route path='/encuestas-empleado'element={<EncuestasEmpleado/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;