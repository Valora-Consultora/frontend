import React, { useState } from "react";
import FormularioScotia from "./InformeScotia";
import FormularioHsbc from "./InformeHsbc";
import FormularioOtro from "./InformeBbva";

const InformeLayout = () => {
  const [selectedBanco, setSelectedBanco] = useState("");
  const [showSelector, setShowSelector] = useState(true);

  const bancos = [
    { id: "scotiabank", nombre: "Scotiabank" },
    { id: "hsbc", nombre: "HSBC"},
    { id: "banco2", nombre: "Otro banco" },
  ];

  const handleBancoChange = (e) => {
    setSelectedBanco(e.target.value);
    setShowSelector(false);
  };

  const handleChangeBanco = () => {
    setShowSelector(true);
    setSelectedBanco("");
  };

  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        <h2 className="text-center text-5xl text-green-900 font-light mx-auto my-10 relative">
          CREAR INFORME
          {!showSelector && (
            <button
              onClick={handleChangeBanco}
              className="absolute right-10 top-20 mt-2 mr-4 border-2 border-green-900 text-green-900 text-sm px-4 py-2 rounded font-medium"
            >
              Seleccionar otro banco
            </button>
          )}
        </h2>

        {showSelector ? (
          <div className="bg-white shadow-lg w-4/5 mx-auto rounded-xl p-6 mb-16">
            <div className="text-center my-2">
              <label htmlFor="banco" className="mr-6 text-xl text-green-900">
                Seleccione un banco:
              </label>
              <select
                id="banco"
                name="banco"
                onChange={handleBancoChange}
                className="rounded py-2 px-3 leading-tight border text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-900 w-2/3"
              >
                <option value="">seleccionar</option>
                {bancos.map((banco) => (
                  <option key={banco.id} value={banco.id}>
                    {banco.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <>
            {selectedBanco === "scotiabank" && <FormularioScotia />}
            {selectedBanco === "hsbc" && <FormularioHsbc />}
            {selectedBanco === "banco2" && <FormularioOtro />}
          </>
        )}
      </div>
    </div>
  );
};

export default InformeLayout;
