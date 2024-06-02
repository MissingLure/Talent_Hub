import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { DataTable } from 'primereact/datatable';
//import { Column } from 'primereact/column';
//import { InputText } from 'primereact/inputtext';
//import { FilterMatchMode } from 'primereact/api';
import './Vista.css';



const PreguntasTable = () => {

    const [filters, setFilters] =useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    })

    /*
    const [preguntas, setPreguntas] = useState([]);

    useEffect(() => {
        const obtenerPreguntas = async () => {
            try {
                const response = await axios.get('la api');
                setPreguntas(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        obtenerPreguntas();
    }, []);
    */
    
    const [globalFilter, setGlobalFilter] = useState('');

    const header = (
        <div style={{ textAlign: 'right'}}>
            
            <InputText onInput={(e) =>
                setFilters({
                    global: {value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
                })
            } placeholder="Buscar..." className="search-input"/>
            
        </div>
    );

   
    
    const preguntas = [
        { id: 1, pregunta: '¿Como te llmas?' },
        { id: 2, pregunta: '¿Cuantas habilidades comiste?' },
        { id: 3, pregunta: '¿Wue hiciste hoy?' },
        { id: 4, pregunta: '¿Como te llmas?' },
        { id: 5, pregunta: '¿Cuantas habilidades comiste?' },
        { id: 6, pregunta: '¿Wue hiciste hoy?' },
        { id: 7, pregunta: '¿Como te llmas?' },
        { id: 8, pregunta: '¿Cuantas habilidades comiste?' },
        { id: 9, pregunta: '¿Wue hiciste hoy?' },
        { id: 10, pregunta: '¿Como te llmas?' },
        { id: 11, pregunta: '¿Cuantas habilidades comiste?' },
        { id: 12, pregunta: '¿Wue hiciste hoy?' },
        { id: 13, pregunta: '¿Como te llmas?' },
        { id: 14, pregunta: '¿Cuantas habilidades comiste?' },
        { id: 15, pregunta: '¿Wue hiciste hoy?' },
        { id: 16, pregunta: '¿Como te llmas?' },
        { id: 17, pregunta: '¿Cuantas habilidades comiste?' },
        { id: 18, pregunta: '¿Wue hiciste hoy?' },
        
    ];



    return (
        
            <div className="tablita-container">
                <DataTable value={preguntas} className="tabla" scrollable stripedRows 
                showGridlines scrollHeight="500px" header={header} filters={filters}>
                    <Column field="pregunta" header="Preguntas"></Column>
                </DataTable>
            </div>
        
    
    );
};

export default PreguntasTable;
