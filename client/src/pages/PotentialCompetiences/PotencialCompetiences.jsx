import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import './PotencialCompetiences.css';
import { Link } from "react-router-dom";
import axios from 'axios';

const PotencialCompetiences = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeesAndEvaluations = async () => {
            try {
                
               
                const employeesResponse = await axios.get("http://localhost:4000/data/obtener-empleados");
                console.log('Employees response data:', employeesResponse.data);

                if (employeesResponse.data.success) {
                    const employeesData = employeesResponse.data.data;

                    
                    const fetchEvaluationsPromises = employeesData.map(async (employee) => {
                        try {


                            const evaluationResponse = await axios.get(`http://localhost:4000/evaluaciones-competencias/by-empleado/${employee.id_empleado}`);
                            console.log(`Evaluation response for employee ${employee.id_empleado}:`, evaluationResponse.data);

                            if (evaluationResponse.data.data && evaluationResponse.data.data.length > 0) {
                                const resultado = evaluationResponse.data.data[0].resultado;
                                return {
                                    ...employee,
                                    evaluation: resultado,
                                };
                            } else {
                                return {
                                    ...employee,
                                    evaluation: 'N/A',
                                };
                            }
                        } catch (error) {
                            if (error.response && error.response.status === 404) {
                                console.warn(`No evaluation found for employee ${employee.id_empleado}`);
                                return {
                                    ...employee,
                                    evaluation: 'N/A',
                                };
                            } else {
                                console.error(`Error fetching evaluation for employee ${employee.id_empleado}:`, error);
                                return {
                                    ...employee,
                                    evaluation: 'Error',
                                };
                            }
                        }
                    });

                    const employeesWithEvaluations = await Promise.all(fetchEvaluationsPromises);

                    const transformedData = employeesWithEvaluations.map((employee) => ({
                        id: employee.id_empleado,
                        name: `${employee.primer_nombre || ''} ${employee.segundo_nombre || ''} ${employee.primer_apellido || ''} ${employee.segundo_apellido || ''}`.trim(),
                        evaluation: employee.evaluation,
                    }));

                    console.log('Transformed data:', transformedData);

                    setEmployees(transformedData);
                } else {
                    console.error('Error en la respuesta del servidor');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeesAndEvaluations();
    }, []);

    return (
        <div className="potencial-survey-containers">
            <Navbar />
            <div className="potencial-top-buttons">
                <button className="potencial-botons">
                    <Link to='/administrar-preguntas'>
                        Regresar
                    </Link>
                </button>
            </div>
            <div className="potencial-top-containers">
                <h1>Potencial Competencies<br />Central Office</h1>
            </div>
            <div className="potencial-table-container">
                <table className="potencial-table">
                    <thead className="potencial-thead">
                        <tr>
                            <th className="potencial-th">Nombre del Empleado</th>
                            <th className="potencial-th">Resultado Desempeño</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td className="potencial-td" colSpan="2">Cargando...</td>
                            </tr>
                        ) : (
                            employees.length > 0 ? (
                                employees.map(employee => (
                                    <tr key={employee.id}>
                                        <td className="potencial-td">{employee.name}</td>
                                        <td className="potencial-td">{employee.evaluation}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="potencial-td" colSpan="2">No se encontraron empleados.</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default PotencialCompetiences;