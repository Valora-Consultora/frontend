import React from "react";

export const InformeCard = ({ informe, handleCardSelect }) => {
  const classNames = {
    aprobado: "bg-green-50 hover:bg-green-100",
    borrador: "bg-yellow-100 hover:bg-yellow-200",
    enviado: "bg-blue-50 hover:bg-blue-100",
  }
  return (
    <div
      className={`${classNames[informe.estado]} flex flex-col items-start shadow-lg rounded-xl p-3 mb-6`}
      onClick={() => handleCardSelect(informe)}
    >
      <h3 className="text-xl text-green-900 font-light">{new Date(informe.fechaInicio).toLocaleString()}</h3>
      <div className="flex flex-row items-center space-x-4 w-full">
        <img src={'/logo-' + informe.banco + '.png'} alt={informe.banco} className="self-end my-auto max-w-60 ml-2" />
        <div className="flex flex-col items-start w-full">
          <h3 className="text-xl text-green-900 font-light">{informe.direccion}</h3>
        </div>
        <h1 className="text-3xl text-green-900 font-light">#{informe.id}</h1>
      </div>
    </div>
  );
};
