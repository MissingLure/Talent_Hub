import React from "react";
import "./UserDashboard.css";
import nav from "../UserDashboard/ENCABEZADO.jpg";
import avatar from "../UserDashboard/avatar.png";
import Navbar from "../../components/Navbar/Navbar";
import { jwtDecode } from "jwt-decode";
import { useLocation } from 'react-router-dom';
import dashboardApi from "../../api/dashboard.api";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

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

    let InformacioUser;
    let indice;
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
    }

    const cargarGridBox = async (userProp) => {
        try {
            const response = await dashboardApi.getResultadosEvaRequest(userProp.id_empleado);

            if (!response) {
                throw new Error("No se pudo cargar los resultados de la competencia");
            }

            if (response.status === 200) {
                InformacioUser = response.data;
                setGridBox(InformacioUser.data);
            }

        } catch (error) {
            console.log(error);
        }
        console.log()
        console.log(gridBox.length === 0 ? "No se ha evaluado el Potencial" : gridBox);
    }

    const loadUser = async () => {

        const searchParams = new URLSearchParams(location.search);
        const idEmpleadoParam = searchParams.get('id_empleado');

        const data = { id_empleado: idEmpleadoParam };

        if (data.id_empleado == null) {
            const userProp = JSON.parse(localStorage.getItem('employeeData'));

            cargarUsuario(userProp);
            cargarGridBox(userProp);
        } else {
            cargarUsuario(data);
            cargarGridBox(data);
        }

    }

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
                                <p>{user.primer_nombre} {user.segundo_nombre} {user.primer_apellido} {user.segundo_apellido}</p>
                            </div>
                        </div>
                        
                    </div>
                    <div className="right-column">
                        <div className="persona-info">
                        <p><strong>Puesto:</strong> {user.nombre_perfil}</p>
                        <p><strong>Departamento:</strong> {user.nombre_departamento}</p>
                        <p><strong>Fecha Ingreso:</strong> {user.fecha_ingreso}</p>
                        <p><strong>Pais:</strong> HONDURAS </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="Potential-Assessment-box">
                Evaluación de Potencial
                <td className="info-box">{gridBox.resultado_evaluacion_potencial == null ? "No se ha evaluado el Potencial" : gridBox.resultado_evaluacion_potencial}</td>
            </div>


            <div className="Performance_Assessment-box">
                Evaluación de Desempeño
                <td className="info-box">{gridBox.resultado_evaluacion_desempeño == null ? "No se ha evaluado el Desempeño" : gridBox.resultado_evaluacion_desempeño}</td>
            </div>

            <div className="Competencies_Assessment-box">
                Evaluación de Competencias
                <td className="info-box">{gridBox.resultado_evaluacion_competencias == null ? "No se han evaluado las Competencias" : gridBox.resultado_evaluacion_competencias}</td>
            </div>

            <div className="performance-grid">
                {items.map((item, index) => (
                    <div key={index} className="grid-item" 
                    //otro color para el background del grid 1c7120 o 525061 o 2A2942 o otro 991922
                    // 0 1 2
                    // 3 4 5
                    // 6 7 8
                    
                    style = {{backgroundColor:  ((gridBox.coory -1) *3 + gridBox.coorx -1) == index ? "#CD1C2C" : "#991922" }}
                    >
                        {item}
                        {8 == index ? '' : ''} 
                        
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