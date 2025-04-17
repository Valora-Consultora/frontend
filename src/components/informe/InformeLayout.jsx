import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setGlobalInforme, setProvisionalInformeId } from "../../app/slices/informeSlice";
import FormularioScotia from "./InformeScotia";
import FormularioHsbc from "./InformeHsbc";
import FormularioBbva from "./InformeBbva";
import FormularioItau from "./InformeItau";
import { useSelector } from 'react-redux';
import InformeService from "../../api/InformeService";
import { InformeCard } from "./InformeCard";
import { useParams } from "react-router-dom";
import FormularioParticular from "./InformeParticular";

const InformeLayout = () => {
  const dispatch = useDispatch();
  const { banco } = useParams();
  //console.log('BANCOFIRO', banco);
  const [selectedBanco, setSelectedBanco] = useState(banco ?? "");
  const [showSelector, setShowSelector] = useState(banco ? false : true);
  const [informes, setInformes] = useState([]);
  const usuario = useSelector(state => state.user);

  const [informe, setInforme] = useState({
    tasador: usuario,
  });

  const bancos = [
    { id: "scotia", nombre: "Scotiabank" },
    { id: "hsbc", nombre: "HSBC" },
    { id: "bbva", nombre: "BBVA" },
    { id: "itau", nombre: "ITAU" },
    { id: "particular", nombre: "Particular" },
  ];

  const selectBanco = (banco) => {
    setSelectedBanco(banco);
    setShowSelector(false);
  };

  const handleBancoChange = async (banco) => {
    selectBanco(banco);
    try {
      const response = await InformeService.createInforme(informe, banco);
      const provisionalId = response.id;
      dispatch(setProvisionalInformeId(provisionalId));
    } catch (error) {
      console.error("Error al crear el informe:", error);
    }
  };

  const handleChangeBanco = () => {
    setShowSelector(true);
    setSelectedBanco("");
  };

  const handleCardSelect = (informe) => {
    selectBanco(informe.banco);
    dispatch(setGlobalInforme(informe));
    dispatch(setProvisionalInformeId(informe.id));
  }

  useEffect(() => {
    const fetchInformes = async () => {
      try {
        const response = await InformeService.getInformesByTasador(usuario);
        //console.log(response);
        setInformes(response);
      } catch (error) {
        console.error("Error al obtener los informes:", error);
      }
    };
    fetchInformes();
  }, [usuario]);

  //console.log('selected', selectedBanco);

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
            <div className="text-center h-24 space-x-4 justify-evenly flex flex-row my-2">
              {bancos.map((banco) => (
                <div className="p-4 flex justify-center items-center w-full rounded shadow-lg hover:!ring-2 hover:!ring-green-100" key={banco.id}>
                  <img
                    src={'/logo-' + banco.id + '.png'}
                    onClick={() => handleBancoChange(banco.id)}
                    className="max-h-16"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {selectedBanco === "scotia" && <FormularioScotia />}
            {selectedBanco === "hsbc" && <FormularioHsbc />}
            {selectedBanco === "bbva" && <FormularioBbva />}
            {selectedBanco === "itau" && <FormularioItau />}
            {selectedBanco === "particular" && <FormularioParticular />}

          </>
        )}

        {/* Listado de informes creados por el usuario tasador */}
        {showSelector &&
          <div className="bg-white shadow-lg w-4/5 mx-auto rounded-xl p-6 mb-16">
            <h2 className="text-center text-5xl text-green-900 font-light mx-auto my-10 relative">
              INFORMES CREADOS POR {usuario.username.toUpperCase()}
            </h2>
            <div className="text-center my-2">
              {informes && informes.length > 0 ? informes.map((informe) => (
                <InformeCard key={informe.id} informe={informe} handleCardSelect={handleCardSelect} />
              )) :
                <h3 className="text-xl text-green-900 font-light">Todavía no creaste informes, {usuario.nombre}</h3>}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default InformeLayout;
