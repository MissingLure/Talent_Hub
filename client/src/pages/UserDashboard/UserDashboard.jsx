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
    const [indice, setIndice] = useState(-1);
    const [result, setResult] = useState({});

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


    const IndiceCalc= async () => {
        
        if(gridBox.resultado_evaluacion_potencial !=null && gridBox.resultado_evaluacion_desempeño != null && gridBox.resultado_evaluacion_competencias != null){
            let tmp;
            let letraPot;
            if(gridBox.resultado_evaluacion_potencial >= 90*0.9){
                tmp = 0;
                letraPot = 'A';
            }else if( 90*0.65 <= gridBox.resultado_evaluacion_potencial && gridBox.resultado_evaluacion_potencial < 90*0.9 ){
                tmp = 3;
                letraPot = 'B';
            }else {
                tmp = 6;
                letraPot = 'C';
            }
            
            let tmp1;
            let letraComp;
            if(gridBox.resultado_evaluacion_competencias/268 >= 0.9){
                tmp1 = 3;
                letraComp = 'A';
            }else if( 0.7 <= gridBox.resultado_evaluacion_competencias/268 && gridBox.resultado_evaluacion_competencias/268 <0.9 ){
                tmp1 = 2;
                letraComp = 'B';
            }else {
                tmp1 = 1;
                letraComp = 'C';
            }

            let tmp2;
            let letraDes;
            if(gridBox.resultado_evaluacion_desempeño >= 151){
                tmp2 = 3;
                letraDes = 'A';
            }else if( 100 <= gridBox.resultado_evaluacion_desempeño && gridBox.resultado_evaluacion_desempeño < 151 ){
                tmp2 = 2;
                letraDes = 'B';
            }else {
                tmp2 = 1;
                letraDes = 'C';
            }
            
            //potencial esta inverso 1 2 3, en vez de 3 2 1
            const result = {
                letraPot,
                letraComp,
                letraDes,
            }

            setResult(result);
            setIndice(tmp + Math.floor((tmp1+tmp2)/2) -1);
        }
    }

    useEffect(() => {
        loadUser();
        IndiceCalc();
        
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
                <td className="info-box">{result.letraPot == null  ? "No se ha evaluado el Potencial" : result.letraPot }</td>
            </div>


            <div className="Performance_Assessment-box">
                Evaluación de Desempeño
                <td className="info-box">{result.letraDes == null ? "No se ha evaluado el Desempeño" : result.letraDes}</td>
            </div>

            <div className="Competencies_Assessment-box">
                Evaluación de Competencias
                <td className="info-box">{result.letraComp == null ? "No se han evaluado las Competencias" : result.letraComp}</td>
            </div>

            <div className="performance-grid">
                {items.map((item, index) => (
                    <div key={index} className="grid-item" 
                    //otro color para el background del grid 1c7120 o 525061 o 2A2942 o otro 991922
                    // 0 1 2
                    // 3 4 5
                    // 6 7 8
                    
                    style = {{backgroundColor:  indice == index ? "#CD1C2C" : "#991922" }}
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