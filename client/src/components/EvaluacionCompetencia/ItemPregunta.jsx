import React from "react";

function ItemPregunta({ pregunta, handleChange, disabled = false }) {

    let preguntaContent = pregunta.pregunta_habilidad;

    if(!preguntaContent.match(/^¿/))
        preguntaContent = `¿${preguntaContent}`;

    if(!preguntaContent.match(/\?$/))
        preguntaContent = `${preguntaContent}?`;
    
  return (
    <div className="flex justify-center items-center w-full hover:shadow-#1 transition-shadow">
      <div className="font-semibold  p-2 text-[#333356] rounded-sm rounded-l w-full col-span-4 text-lg text-start border-dashed border-2">
        {preguntaContent}
      </div>

      <select
        value={pregunta.resultado}
        className="h-full px-2 cursor-pointer disabled:bg-gray-200  selection:border-[#333356] transition-colors border-white border-dashed border-y-2 border-r-2"
        onChange={(e) => handleChange(pregunta.id_evaluacion_competencias, e.target.value)}
        disabled={disabled}
      >
        <option disabled selected value={null}>
          Selecione una opcion
        </option>
        <option value={0}>Low</option>
        <option value={1}>Moderate</option>
        <option value={2}>Outstanding</option>
      </select>
    </div>
  );
}

export default ItemPregunta;
