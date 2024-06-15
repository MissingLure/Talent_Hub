import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionContainer from "../../components/QuestionContainer/QuestionContainer";
import "./BoxGrid.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
const BoxGrid = () => {
  const items = [
    {
      nombre: "UNREALIZED TALENT",
      empleados: [
        { nombre: "Juan Perez", id_empleado: 12341234 },
        { nombre: "Juan Luios", id_empleado: 12341234 },
        { nombre: "Juan Romero", id_empleado: 12341234 },
        { nombre: "Juan Perez", id_empleado: 12341234 },

        { nombre: "Juan Romero", id_empleado: 12341234 },
        { nombre: "Juan Perez", id_empleado: 12341234 },
        { nombre: "Juan Romero", id_empleado: 12341234 },
        { nombre: "Juan Perez", id_empleado: 12341234 },
      ],
    },
    {
      nombre: "UP AND COMING TALENT",
      empleados: [
        { nombre: "Juan Romeadsfasfaro", id_empleado: 12341234 },
        { nombre: "Juan Perez", id_empleado: 12341234 },

        { nombre: "Juan Romero", id_empleado: 12341234 },
        { nombre: "Juan Perez", id_empleado: 12341234 },
      ],
    },
    { nombre: "TOP TALENT", empleados: [] },
    { nombre: "UNCONFIRMED TALENT", empleados: [] },
    { nombre: "CORE TALENT", empleados: [] },
    { nombre: "FUTURE STAR", empleados: [] },
    { nombre: "UNDER PERFORMER", empleados: [] },
    { nombre: "CONSISTENT PERFORMER", empleados: [] },
    { nombre: "TECHNICAL EXPERT", empleados: [] },
  ];

  const loadEmpleados = async () => {
    try {
      const res = await axios.get("http://localhost:3001/empleados");
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ItemEmpleado = ({ empleado }) => {
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
      <div className=" col-span-1 flex flex-col text-white select-none bg-[#991922] px-10 py-2 items-center overflow-y-auto w-[22rem] h-[15rem] max-2xl:h-[22rem]">
        <h1 className="font-bold text-lg mb-8">{item.nombre}</h1>

        <div className="flex flex-wrap px-2 max-w-xs">
          {item.empleados.map((empleado) => (
            <ItemEmpleado empleado={empleado} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="box-grid-container">
      <Navbar />
      <h2 className="mt-5">
        <b>9 Box Grid</b>
      </h2>

      <div className="grid grid-rows-4 grid-flow-col gap-5">
        <div className="flechaArriba">
          <p className="text-flechaArriba">Potencial</p>
        </div>

        <div className="flechaAbajo">
          <p className="text-xl "> Flechita Abajo</p>
        </div>

        {items.map((item) => (
          <ItemGrid item={item} />
        ))}
      </div>
    </div>
  );
};

export default BoxGrid;
