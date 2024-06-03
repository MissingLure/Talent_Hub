import React, { useState, useEffect } from 'react';
//import { DataTable } from 'primereact/datatable';
//import { Column } from 'primereact/column';
//import { Button } from 'primereact/button';
//import 'primereact/resources/themes/saga-blue/theme.css';
//import 'primereact/resources/primereact.min.css';
//import 'primeicons/primeicons.css';


const CompetenciaHabilidadTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/obtener-competencia_habilidad');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error con la info:', error);
    }
  };

  const deleteRowClientSide = (id) => {
    setData(data.filter(row => row.id_competencia_habilidad !== id));
  };
  

  const deleteRow = async (rowData) => {
    try {
      const response = await fetch('http://localhost:5000/eliminar-comp-hab', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_competencia_habilidad: rowData.id_competencia_habilidad })
      });
  
      if (response.ok) {
        deleteRowClientSide(rowData.id_competencia_habilidad);
        console.log('Fila borrada.');
      } else {
        console.error('Fallo al borrar fila:', response.statusText);
      }
    } catch (error) {
      console.error('Error borrando fila:', error);
    }
  };
  

  const actionBodyTemplate = (rowData) => {
    return (
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteRow(rowData)} />
    );
  };

  return (
    <div>
      <br/><br/><br/>
      <DataTable value={data} className="tablita">
        <Column field="id_competencia_habilidad" header="ID Competencia Habilidad" />
        <Column field="id_competencia" header="ID Competencia" />
        <Column field="nombre_habilidad" header="Nombre Habilidad" />
        <Column field="comportamiento_habilidad" header="Comportamiento Habilidad" />
        <Column field="pregunta_habilidad" header="Pregunta Habilidad" />
        <Column body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default CompetenciaHabilidadTable;
