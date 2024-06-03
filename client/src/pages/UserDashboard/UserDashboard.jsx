import React from "react";
import "./UserDashboard.css";
import nav from "../UserDashboard/ENCABEZADO.jpg";
import avatar from "../UserDashboard/avatar.png";
import Navbar from "../../components/Navbar/Navbar";
import { jwtDecode } from "jwt-decode";

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

    const accessToken = localStorage.getItem('accessToken');
    const decoded = jwtDecode(accessToken);
    const employeeData = JSON.parse(localStorage.getItem('employeeData'));
    const datos = JSON.parse(localStorage.getItem(''));

    return (
        <div className="dashboard-container">
            <Navbar/>
            
            
            <img src={nav} alt="Encabezado" className="header-image" />
            <img src={avatar} alt="avatar" className="avatar-image" />

            <div className="unknown-box">
            {employeeData.primer_nombre} {employeeData.primer_apellido}
            </div>

            <div className="ranking">
            Ranking
            </div>
            <div className="ranking-box">
            {employeeData.ranking}
            </div>

            <div className="Potential-Assessment-box">
            Evaluación de Potencial
            <td className="info-box">No se ha evaluado el Potencial</td>
            </div>
            

            <div className="Performance_Assessment-box">
            Evaluación de Desempeño 
            <td className="info-box">No se ha evaluado el Desempeño</td>
            </div>

            <div className="Competencies_Assessment-box">
            Evaluación de Competencias
            <td className="info-box">No se han evaluado las Competencias</td>
            </div>
{/* 
            <div className="CultureWorkClimateSurvey-box">
            Culture & Work Climate Survey
            </div> */}

            <div className="info-table">
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
            </div>
            
            <div className="performance-grid">
                {items.map((item, index) => (
                    <div key={index} className="grid-item">
                        {item}
                    </div>
                ))}
            </div>

            

            <div className="Recommendations">
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
</div>        
<br></br>
            </div>
            

        
    );
};

export default UserDashboard;