import React from "react";
import "./MostrarInfo.css";
import Navbar from "../../components/Navbar/Navbar";
import {useTable} from "react-table";
import fakeData from "./mock_data.json"
import fakeData2 from "./mock_employee_data.json"
//import { jwtDecode } from "jwt-decode";


const MostrarInfo = () => {

  const data = React.useMemo(() => fakeData, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Puesto",
        accessor: "puesto",
      },
      {
        Header: "Departamento",
        accessor: "departamento",
      },
      {
        Header: "Pais",
        accessor: "pais",
      },
      {
        Header: "Jefe",
        accessor: "jefe",
      },
    ],
    []
  );
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

    const data2 = React.useMemo(() => fakeData2, []);
    const columns2 = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id_Empleado",
      },
      {
        Header: "Correo",
        accessor: "correo",
      },
      {
        Header: "Password",
        accessor: "password",
      },
      {
        Header: "Rol",
        accessor: "rol",
      },
    ],
    []
  );

  const {
    getTableProps: getTableProps2,
    getTableBodyProps: getTableBodyProps2,
    headerGroups: headerGroups2,
    rows: rows2,
    prepareRow: prepareRow2,
  } = useTable({ columns: columns2, data: data2 });

  
  return (
    <div className="paginita">
      <Navbar />
        <br />
        <br />
        <br />
        <div>
        <div className="title">
          <h2>
          Lista de Empleados
          </h2>
        </div>
        </div>
        <br />
        <br />

        <div className="container2">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
         
        </table>

       
      </div>
        <br />
        <br />
        <br />
        <br />
        <div className="title">
          <h2>
          Usuarios
          </h2>
        </div>
        <br />
        <br />
        <br />    

        <div className="container2">
        <table {...getTableProps2()}>
          <thead>
            {headerGroups2.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps2()}>
            {rows2.map((row) => {
              prepareRow2(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>   
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />      
      
    </div>


  );
};

export default MostrarInfo;