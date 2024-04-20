import React, { useEffect, useState } from 'react';
import './BibliotecaHabilidades.css';
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios';

const competencias = [
  'Adaptabilidad',
  'Análisis de Datos de Producción',
  'Capacidad Analítica',
  'Comunicación',
  'Comunicación Asertiva',
  'Comunicación Efectiva',
  'Comunicación Interpersonal',
  'Control de Calidad',
  'Creatividad',
  'Cumplimiento de Metas de Producción',
  'Desarrollo de Equipos',
  'Desarrollo de Relaciones',
  'Desarrollo de Talento',
  'Desempeño Bajo Presión',
  'Eficiencia de Maquinaria',
  'Eficiencia en la Producción',
  'Empatía',
  'Enfoque en Resultados',
  'Estandarización de Procesos',
  'Ética Profesional',
  'Flexibilidad',
  'Gestión de Conflictos',
];

function BibliotecaHabilidades() {
    const [habilidades, setHabilidades] = useState([]);

    const handleHabilidades = () => {
        axios.get('http://localhost:4000/data/obtener-habilidades')
        .then((response) => {
            setHabilidades(response.data.data);
        })
        .catch((error) => {

        })
    };

    useEffect(() => {
        handleHabilidades();
    }, []);
  return (
    <div className="BibliotecaHabilidades">
      <Navbar/>
      <h1>Biblioteca de Habilidades</h1>

      <div className="habilidades-container">
        {habilidades.map((habilidad, index) => (
          <a key={index} value={habilidad.id_habilidad} className="habilidades-card">
            {habilidad.nombre_habilidad}
          </a>
        ))}
      </div>
    </div>
  );
}

export default BibliotecaHabilidades;