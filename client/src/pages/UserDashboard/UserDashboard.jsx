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

    return (
        <div className="dashboard-container">
            <Navbar/>
            
            
            <img src={nav} alt="Encabezado" className="header-image" />
            <img src={avatar} alt="avatar" className="avatar-image" />

            <div className="unknown-box">
            <td>{employeeData.primer_nombre} {employeeData.primer_apellido}</td>
            </div>

            <div className="ranking">
            Ranking
            </div>
            <div className="ranking-box">
            {employeeData.ranking}
            </div>

            <div className="Potential-Assessment-box">
            Evaluación de Potencial
            <td style={{ backgroundColor: 'white', color:'black' }}>Este empleado no sirve</td>
            </div>
            

            <div className="Performance_Assessment-box">
            Evaluación de Desempeño 
            <td style={{ backgroundColor: 'white', color:'black' }}>Este empleado no sirve</td>
            </div>

            <div className="Competencies_Assessment-box">
            Evaluación de Competencias
            <td style={{ backgroundColor: 'white', color:'black' }}>Este empleado no sirve</td>
            </div>

            <div className="CultureWorkClimateSurvey-box">
            Culture & Work Climate Survey
            </div>

            <div className="info-table">
                <table>
                    <tbody>
                        <tr>
                        <th colSpan="3" className="title">Información</th>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{employeeData.primer_nombre} {employeeData.primer_apellido}</td>
                        </tr>
                        <tr>
                            <td>Position</td>
                            <td>{employeeData.perfilPuesto}</td>
                        </tr>
                        <tr>
                            <td>Facility / Area</td>
                            <td>Acme Facility – Organizational Development</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="career-table">
                <table>
                    <tbody>
                        <tr>
                            <th colSpan="2" className="title">Carrera</th>
                        </tr>
                        <tr>
                            <td className="column1">2016</td>
                            <td>OD Coordinator</td>
                        </tr>
                        <tr>
                            <td className="column1">2019</td>
                            <td>OD Superintendent</td>
                        </tr>
                        <tr>
                            <td className="column1">2021</td>
                            <td>OD Manager</td>
                        </tr>
                        <tr>
                            <td className="column1">2023</td>
                            <td>OD Country Manager</td>
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
<div></div>
            </div>
            

        
    );
};

export default UserDashboard;