import "./App.css";
import Login from "./pages/Login/Login";
import CrearEmpleado from "./pages/CrearEmpleado/CrearEmpleado";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdministarEmpleados from "./pages/AdministrarEmpleados/AdministrarEmpleados";
import AdministarUsuarios from "./pages/AdministrarUsuarios/AdministrarUsuarios";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import EvaluacionesEmpleado from "./pages/EvaluacionesEmpleado/EvaluacionesEmpleado";
import EvaluacionEmpleado from "./pages/EvaluacionEmpleado/EvaluacionEmpleado";
import EvaluacionPendientes from "./pages/EvaluacionesPendientes/EvaluacionesPendientes";
import CrearCompetencias from "./pages/CrearCompetencias/CrearCompetencias";
import CrearHabilidad from "./pages/CrearHabilidad/CrearHabilidad";
import CompetenciaHabilidad from "./pages/CompetenciaHabilidad/CompetenciaHabilidad";
import AdministrarPreguntas from "./pages/AdministrarPreguntas/AdminPreguntas";
import BibliotecaCompetencias from "./pages/BibliotecaCompetencias/BibliotecaCompetencias";
import BibliotecaHabilidades from "./pages/BibliotecaHabilidades/BibliotecaHabilidades";
import Inicio from "./pages/Inicio/Inicio";
import BoxGrid from "./pages/BoxGrid/BoxGrid";
import CoreCompetences from "./pages/CoreCompetences/CoreCompetences";
import PotencialCompetiences from "./pages/PotentialCompetiences/PotencialCompetiences";
import AsignarEvaluacion from "./pages/AsignarEvaluacion/AsignarEvaluacion";
import AdministrarEncuestas from "./pages/AdministrarEncuestas/AministrarEncuestas";
import CrearEncuestas from "./pages/Encuesta/Encuesta";
import EncuestasEmpleado from "./pages/Encuestas/Encuestas";
import ModificarEmpleadoPopUp from "./pages/ModificarEmpleados/ModificarEmpleadoPopUp";
import ModificarUsuarioPopUp from "./pages/ModificarUsuarios/ModificarUsuarioPopUp";
import MostrarInfo from "./pages/MostrarInfo/MostrarInfo";
import PerfilPuesto from "./pages/PerfilPuestos/PerfilPuesto";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/mostrar-info" element={<MostrarInfo />} />
          <Route
            path="/administrar-empleados"
            element={<AdministarEmpleados />}
          />
          <Route
            path="/administrar-usuarios"
            element={<AdministarUsuarios />}
          />
          <Route path="/crear-empleado" element={<CrearEmpleado />} />
          <Route
            path="/evaluaciones-empleado"
            element={<EvaluacionesEmpleado />}
          />
          <Route path="/evaluacion-empleado" element={<EvaluacionEmpleado />} />
          <Route
            path="/evaluaciones-pendientes"
            element={<EvaluacionPendientes />}
          />
          <Route path="/crear-competencias" element={<CrearCompetencias />} />\
          <Route path="/crear-habilidades" element={<CrearHabilidad />} />
          <Route
            path="/administrar-preguntas"
            element={<AdministrarPreguntas />}
          />
          <Route
            path="/competencia-habilidad"
            element={<CompetenciaHabilidad />}
          />
          <Route path="/competencias" element={<BibliotecaCompetencias />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route
            path="/core-competences-general"
            element={<CoreCompetences />}
          />
          <Route path="/box-grid" element={<BoxGrid />} />
          <Route
            path="potential-competiences-general"
            element={<PotencialCompetiences />}
          />
          <Route
            path="/administrar-encuestas"
            element={<AdministrarEncuestas />}
          />
          <Route path="/habilidades" element={<BibliotecaHabilidades />} />
          <Route path="/crear-encuestas" element={<CrearEncuestas />} />
          <Route path="/encuestas-empleado" element={<EncuestasEmpleado />} />
          <Route
            path="/modificar-empleadopopup"
            element={<ModificarEmpleadoPopUp />}
          />
          <Route
            path="/modificar-usuariopopup"
            element={<ModificarUsuarioPopUp />}
          />
          <Route path="/asignar-evaluacion" element={<AsignarEvaluacion />} />
          <Route path="/perfil-puesto" element={<PerfilPuesto />} />
        </Routes>
      </Router>
    </div>
  );
}

/*
<Route path='/mostrar-info' element={<MostrarInfo/>}/>
*/

export default App;
