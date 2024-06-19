import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionContainer from "../../components/QuestionContainer/QuestionContainer";
import dashboardApi from "../../api/dashboard.api";
import "./BoxGrid.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { i } from "@table-library/react-table-library/Cell-a4350b14";
const BoxGrid = () => {
  const user = JSON.parse(localStorage.getItem("employeeData"));

  const [empleados, setEmpleados] = useState(null);

  const newItems = [
    { nombre: "UNREALIZED TALENT" },
    { nombre: "UNCONFIRMED TALENT" },
    { nombre: "UNDER PERFORMER" },
    { nombre: "UP AND COMING TALENT" },
    { nombre: "CORE TALENT" },
    { nombre: "CONSISTENT PERFORMER" },
    { nombre: "TOP TALENT" },
    { nombre: "FUTURE STAR" },
    { nombre: "TECHNICAL EXPERT" },
  ];

  const IndiceCalc = (gridBox) => {
    let tmp;

    let tmp1;

    let tmp2;

    if (gridBox.resultado_evaluacion_potencial != null) {
      if (gridBox.resultado_evaluacion_potencial >= 0.9) {
        tmp = 0;
      } else if (
        0.65 <= gridBox.resultado_evaluacion_potencial &&
        gridBox.resultado_evaluacion_potencial < 0.9
      ) {
        tmp = 3;
      } else {
        tmp = 6;
      }
    }

    if (gridBox.resultado_evaluacion_desempeño != null) {
      if (gridBox.resultado_evaluacion_desempeño >= 0.755) {
        tmp2 = 3;
      } else if (
        0.5 <= gridBox.resultado_evaluacion_desempeño &&
        gridBox.resultado_evaluacion_desempeño < 0.755
      ) {
        tmp2 = 2;
      } else {
        tmp2 = 1;
      }

      //potencial esta inverso 1 2 3, en vez de 3 2 1
    }

    if (gridBox.resultado_evaluacion_competencias != null) {
      if (gridBox.resultado_evaluacion_competencias >= 0.9) {
        tmp1 = 3;
      } else if (
        0.7 <= gridBox.resultado_evaluacion_competencias &&
        gridBox.resultado_evaluacion_competencias < 0.9
      ) {
        tmp1 = 2;
      } else {
        tmp1 = 1;
      }
    }

    if (
      gridBox.resultado_evaluacion_potencial != null &&
      gridBox.resultado_evaluacion_desempeño != null &&
      gridBox.resultado_evaluacion_competencias != null
    ) {
      //pim
      return tmp + Math.floor((tmp1 + tmp2) / 2) - 1;
    }

    return -1;
    //setIndice(3);
  };

  const cargarResultadoEmpleado = async (userProp) => {
    try {
      const response = await dashboardApi.getResultadosEvaRequest(
        userProp.id_empleado
      );

      if (!response) {
        throw new Error("No se pudo cargar los resultados de la competencia");
      }

      if (response.status === 200) {
        const InformacioUser = response.data;

        return IndiceCalc(InformacioUser.data);

        // setGridBox(InformacioUser.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ItemEmpleado = ({ empleado }) => {
    console.log(empleado);
    return (
      <Link
        to={`/user-dashboard/?id_empleado=${empleado.id_empleado}`}
        className="px-2 py-3"
      >
        <h1 className="text-md text-white border border-dashed border-white rounded-md  px-3 py-2 hover:bg-red-900 transition-colors">
          {empleado.nombre}
        </h1>
      </Link>
    );
  };

  const ItemGrid = ({ item }) => {
    return (
      <div className=" col-span-1 flex flex-col text-white select-none bg-[#991922] px-10 py-2 items-center overflow-y-auto w-[22rem] h-[15rem]">
        <h1 className="font-bold text-lg mb-8">{item.nombre}</h1>

        <div className="flex flex-wrap px-2 max-w-xs">
          {item.empleados.map((empleado, index) => (
            <ItemEmpleado empleado={empleado} key={index} />
          ))}
        </div>
      </div>
    );
  };

  const handleGetEmployees = async () => {
    const response = await axios.get(
      "http://localhost:4000/data/obtener-empleados"
    );

    let itemsNew = [[], [], [], [], [], [], [], [], []];

    const empleados = response.data.data.filter(
      (empleado) => empleado.id_jefe === user.id_empleado
    );

    for (let i = 0; i < empleados.length; i++) {
      const empleado = empleados[i];


      const res = await cargarResultadoEmpleado(empleado);

      const formatEmpleado = {
        nombre: empleado.primer_nombre + " " + empleado.primer_apellido,
        id_empleado: empleado.id_empleado,
      };

      if (res === -1) {
        continue;
      }

      console.log(res);

      if (res === 0) {
        itemsNew[0].push(formatEmpleado);
      } else if (res === 1) {
        itemsNew[3].push(formatEmpleado);
      } else if (res === 2) {
        itemsNew[6].push(formatEmpleado);
      } else if (res === 3) {
        itemsNew[1].push(formatEmpleado);
      } else if (res === 4) {
        itemsNew[4].push(formatEmpleado);
      } else if (res === 5) {
        itemsNew[7].push(formatEmpleado);
      } else if (res === 6) {
        itemsNew[2].push(formatEmpleado);
      } else if (res === 7) {
        itemsNew[5].push(formatEmpleado);
      } else if (res === 8) {
        itemsNew[8].push(formatEmpleado);
      } else {
        console.log("No se encontro el indice");
      }
    }


    setEmpleados(itemsNew);
  };

  useEffect(() => {

    handleGetEmployees();

  }, []);

  return (
    <div className="box-grid-container">
      <Navbar />

      {empleados === null ? (
        console.log("Cargando...")
      ) : (
        <>
          <h2 className="mt-5">
            <b>9 Box Grid</b>
          </h2>

          <div className="grid grid-rows-4 grid-flow-col gap-5">
            <div className="flechaArriba">
              <p className="text-flechaArriba">Potencial</p>
            </div>

            <div className="flechaAbajo">
              <p className="text-xl ">Desempeño & Competencias</p>
            </div>

            {newItems.map((item, index) => (
              <ItemGrid
                item={{ nombre: item.nombre, empleados: empleados[index] }}
                key={index}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BoxGrid;
