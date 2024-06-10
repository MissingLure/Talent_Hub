import React from "react";
import ItemPregunta from "./ItemPregunta";

function ItemCompetencia({ competencia, preguntas, handleChange, disabled = false}) {
  const renderPregunta = () => {
    return preguntas.map((pregunta, i) => (
      <ItemPregunta key={i} pregunta={pregunta} handleChange={handleChange} disabled={disabled}/>
    ));
  };

  return (
    <div className="bg-white px-8 py-6 rounded-md shadow-xl ">
      <h2 className="text-xl font-bold text-start ml-5 mb-2 text-gray-600">
        {competencia}
      </h2>
      <div className="grid grid-cols-1 gap-3">{renderPregunta()}</div>
    </div>
  );
}

export default ItemCompetencia;
