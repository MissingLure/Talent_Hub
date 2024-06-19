import React from "react";
import "./UserDashboard.css";
import nav from "../UserDashboard/ENCABEZADO.jpg";
import avatar from "../UserDashboard/avatar.png";
import Navbar from "../../components/Navbar/Navbar";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import dashboardApi from "../../api/dashboard.api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { i } from "@table-library/react-table-library/Cell-a4350b14";

const UserDashboard = () => {
  const items = [
    "UNREALIZED TALENT",
    "UP AND COMING TALENT",
    "TOP TALENT",
    "UNCONFIRMED TALENT",
    "CORE TALENT",
    "FUTURE STAR",
    "UNDER PERFORMER",
    "CONSISTENT PERFORMER",
    "TECHNICAL EXPERT",
  ];

  //const accessToken = localStorage.getItem('accessToken');
  //const decoded = jwtDecode(accessToken);
  //const employeeData = JSON.parse(localStorage.getItem('employeeData'));
  //const datos = JSON.parse(localStorage.getItem(''));

  const [user, setUser] = useState({});
  const [gridBox, setGridBox] = useState({});
  const [indice, setIndice] = useState(-1);
  const [result, setResult] = useState({});

  const navigate = useNavigate();

  let InformacioUser;
  const cargarUsuario = async (data) => {
    try {
      const response = await dashboardApi.getEmpleadoRequest(data.id_empleado);

      if (!response) {
        throw new Error("No se pudo cargar el Usuario");
      }

      if (response.status === 200) {
        InformacioUser = response.data;
        setUser(InformacioUser.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validarResultados = (res) => {
    if (
      res.resultado_evaluacion_potencial <= 1 &&
      res.resultado_evaluacion_desempeño <= 1 &&
      res.resultado_evaluacion_competencias <= 1
    ) {
      return true;
    } else {
      alert(
        "Resultados Invalidos, por favor, asegurese de que los resultados esten entre 0 y 1"
      );
      navigate("/inicio");
    }
  };

  const cargarGridBox = async (userProp) => {
    try {
      const response = await dashboardApi.getResultadosEvaRequest(
        userProp.id_empleado
      );

      if (!response) {
        throw new Error("No se pudo cargar los resultados de la competencia");
      }

      if (response.status === 200) {
        InformacioUser = response.data;

        if (validarResultados(InformacioUser.data))
          IndiceCalc(InformacioUser.data);

        // setGridBox(InformacioUser.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadUser = async () => {
    const searchParams = new URLSearchParams(location.search);
    const idEmpleadoParam = searchParams.get("id_empleado");

    const data = { id_empleado: idEmpleadoParam };

    if (data.id_empleado == null) {
      const userProp = JSON.parse(localStorage.getItem("employeeData"));

      await cargarUsuario(userProp);
      await cargarGridBox(userProp);
    } else {
      await cargarUsuario(data);
      await cargarGridBox(data);
    }
  };

  const IndiceCalc = (gridBox) => {
    let tmp;
    let letraPot = null;

    let tmp1;
    let letraComp = null;

    let tmp2;
    let letraDes = null;

    if (gridBox.resultado_evaluacion_potencial != null) {
      if (gridBox.resultado_evaluacion_potencial >= 0.9) {
        tmp = 0;
        letraPot = "A";
      } else if (
        0.65 <= gridBox.resultado_evaluacion_potencial &&
        gridBox.resultado_evaluacion_potencial < 0.9
      ) {
        tmp = 3;
        letraPot = "B";
      } else {
        tmp = 6;
        letraPot = "C";
      }
    }

    if (gridBox.resultado_evaluacion_desempeño != null) {
      if (gridBox.resultado_evaluacion_desempeño >= 0.755) {
        tmp2 = 3;
        letraDes = "A";
      } else if (
        0.5 <= gridBox.resultado_evaluacion_desempeño &&
        gridBox.resultado_evaluacion_desempeño < 0.755
      ) {
        tmp2 = 2;
        letraDes = "B";
      } else {
        tmp2 = 1;
        letraDes = "C";
      }

      //potencial esta inverso 1 2 3, en vez de 3 2 1
    }

    if (gridBox.resultado_evaluacion_competencias != null) {
      if (gridBox.resultado_evaluacion_competencias >= 0.9) {
        tmp1 = 3;
        letraComp = "A";
      } else if (
        0.7 <= gridBox.resultado_evaluacion_competencias &&
        gridBox.resultado_evaluacion_competencias < 0.9
      ) {
        tmp1 = 2;
        letraComp = "B";
      } else {
        tmp1 = 1;
        letraComp = "C";
      }
    }

    const result = {
      letraPot,
      letraComp,
      letraDes,
    };

    setResult(result);

    if (
      gridBox.resultado_evaluacion_potencial != null &&
      gridBox.resultado_evaluacion_desempeño != null &&
      gridBox.resultado_evaluacion_competencias != null
    ) {
      //pim
      setIndice(tmp + Math.floor((tmp1 + tmp2) / 2) - 1);
    }
    //setIndice(3);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />

      {/* 
            <div className="CultureWorkClimateSurvey-box">
            Culture & Work Climate Survey
            </div> */}

      {/* <div className="info-table">
                <table>
                    <tbody>
                        <tr>
                        <th colSpan="3" className="title">Información</th>
                        </tr>
                        <tr>
                            <td>Nombre</td>
                            <td>{employeeData.primer_nombre} {employeeData.segundo_nombre} {employeeData.primer_apellido} {employeeData.segundo_apellido}</td>
                        </tr>
                        <tr>
                            <td>Puesto</td>
                            <td>{employeeData.id_perfil_puesto}</td>
                        </tr>
                        <tr>
                            <td>Departamento</td>
                            <td>{employeeData.id_departamento}</td>
                        </tr>
                        <tr>
                            <td>Numero de Telefono</td>
                            <td>{employeeData.telefono}</td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
      <div className="info-container">
        <div className="profile">
          <div className="persona-info">
            <div className="left-column">
              <div className="headers">
                <p>
                  {user.primer_nombre} {user.segundo_nombre}{" "}
                  {user.primer_apellido} {user.segundo_apellido}
                </p>
              </div>
            </div>
          </div>
          <div className="right-column">
            <div className="persona-info">
              <p>
                <strong>Puesto:</strong> {user.nombre_perfil}
              </p>
              <p>
                <strong>Departamento:</strong> {user.nombre_departamento}
              </p>
              <p>
                <strong>Fecha Ingreso:</strong> {user.fecha_ingreso}
              </p>
              <p>
                <strong>Pais:</strong> HONDURAS{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="Potential-Assessment-box">
        Evaluación de Potencial
        <td className="info-box">
          {result.letraPot == null
            ? "No se ha evaluado el Potencial"
            : result.letraPot}
        </td>
      </div>

      <div className="Performance_Assessment-box">
        Evaluación de Desempeño
        <td className="info-box">
          {result.letraDes == null
            ? "No se ha evaluado el Desempeño"
            : result.letraDes}
        </td>
      </div>

      <div className="Competencies_Assessment-box">
        Evaluación de Competencias
        <td className="info-box">
          {result.letraComp == null
            ? "No se han evaluado las Competencias"
            : result.letraComp}
        </td>
      </div>

      <div className="performance-grid">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid-item"
            //otro color para el background del grid 1c7120 o 525061 o 2A2942 o otro 991922
            // 0 1 2
            // 3 4 5
            // 6 7 8

            style={{ backgroundColor: indice == index ? "#CD1C2C" : "#991922" }}
          >
            {item}
            {8 == index ? "" : ""}
          </div>
        ))}
      </div>
      {/* <div className="Recommendations">
                <table>
                    <tbody>
                        <tr>
                            <th colSpan="2" className="title">Recommendations</th>
                        </tr>
                        <tr>
                            <td className="column1">1.</td>
                            <td>Recommendation 1</td>
                        </tr>
                        <tr>
                            <td className="column1">2.</td>
                            <td>Recommendation 2</td>
                        </tr>
                        <tr>
                            <td className="column1">3.</td>
                            <td>Recommendation 3</td>
                        </tr>
                        <tr>
                            <td className="column1">4.</td>
                            <td>Recommendation 4</td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
      <br></br>
    </div>
  );
};

export default UserDashboard;
