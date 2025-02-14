import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import InspeccionService from "../api/InspeccionService";
import InformeService from '../api/InformeService';
import { useNavigate } from 'react-router-dom';
import { setProvisionalInspectionId } from '../app/slices/inspectionSlice';
import { setProvisionalInformeId } from '../app/slices/informeSlice';
import { Visibility, CheckCircle, Description, Assessment, Search, Feed } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tipo = localStorage.getItem("tipo");
  const usuario = useSelector(state => state.user);
  const nombre = usuario.nombre ? usuario.nombre.toUpperCase() : "";
  const tipoUsuario = usuario.tipoUsuario;
  const opciones = [];



  const [inspeccion, setInspeccion] = useState({
    tasador: usuario,
  });

  const [informe, setInforme] = useState({
    tasador: usuario,
  });

  useEffect(() => {
  }, [usuario]);


  const handleClickInspeccion = async () => {
    try {
      const response = await InspeccionService.createInspeccion(inspeccion);

      if (response && response.id) {
        const provisionalId = response.id;
        dispatch(setProvisionalInspectionId(provisionalId));
        navigate('/Inspeccion', { state: { provisionalId: provisionalId } });
      } else {
        throw new Error('Respuesta de creación de inspección inválida');
      }
    } catch (error) {
      console.error('Error al crear la inspección:', error);
    }
  };

  if (tipoUsuario === "TASADOR") {
    opciones.push(
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
        <div className="text-gray-500">
          <Description fontSize="large" />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Inspección</h3>
          <p className="text-gray-500">Crea una nueva Inspección en el sistema</p>
        </div>
        <button className="text-green-900 hover:underline" onClick={handleClickInspeccion}>
          Ir a Inspección
        </button>
      </div>
    );
    opciones.push(
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
        <div className="text-gray-500">
          <Description fontSize="large" />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Reporte</h3>
          <p className="text-gray-500">Genera reportes de inmuebles y otros</p>
        </div>
        <a className="text-green-900 no-underline hover:underline" href="/Reportes">
          Ir a Reporte
        </a>
      </div>
    );
    opciones.push(
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
        <div className="text-gray-500">
          <Description fontSize="large" />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Descubrir</h3>
          <p className="text-gray-500">Explora alguna cosa que ni idea</p>
        </div>
        <a className="text-green-900 no-underline hover:underline mt-4" href="/Home">
          Ir a Descubrir
        </a>
      </div>
    );
    opciones.push(
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
        <div className="text-gray-500">
          <Feed fontSize="large" />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Informe</h3>
          <p className="text-gray-500">Crea un nuevo Informe en el sistema</p>
        </div>
        <a className="text-green-900 no-underline hover:underline" href="/Informe">
          Ir a Informe
        </a>
      </div>
    );
  }

  if (tipoUsuario === "ADMINISTRADOR") {
    opciones.push(
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
        <div className="text-gray-500">
          <Description fontSize="large" />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Inspección</h3>
          <p className="text-gray-500">Crea una nueva Inspección en el sistema</p>
        </div>
        <button className="text-green-900 hover:underline" onClick={handleClickInspeccion}>
          Ir a Inspección
        </button>
      </div>
    );
    opciones.push(
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
        <div className="text-gray-500">
          <Assessment fontSize="large" />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Reporte</h3>
          <p className="text-gray-500">Genera reportes de inmuebles y otros</p>
        </div>
        <a className="text-green-900 no-underline hover:underline" href="/Reportes">
          Ir a Reporte
        </a>
      </div>
    );
    opciones.push(
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
        <div className="text-gray-500">
          <Search fontSize="large" />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Revisar</h3>
          <p className="text-gray-500">Revisa y aprueba/rechaza los distintos elementos del sistema</p>
        </div>
        <a className="text-green-900 no-underline hover:underline mt-4" href="/Revision">
          Ir a Revisar
        </a>
      </div>
    );
    opciones.push(
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
        <div className="text-gray-500">
          <Feed fontSize="large" />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Informe</h3>
          <p className="text-gray-500">Crea un nuevo Informe en el sistema</p>
        </div>
        <a className="text-green-900 no-underline hover:underline" href="/Informe">
          Ir a Informe
        </a>
      </div>
    );
  }


  if (tipoUsuario === "SECRETARIA") {
    opciones.push(
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
        <div className="text-gray-500">
          <Feed fontSize="large" />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Orden</h3>
          <p className="text-gray-500">Crear una nueva Orden en el sistema</p>
        </div>
        <a className="text-green-900 no-underline hover:underline" href="/Orden">
          Ir a Orden
        </a>
      </div>
    );
    opciones.push(
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
        <div className="text-gray-500">
          <Description fontSize="large" />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Facturación</h3>
          <p className="text-gray-500">Gestiona la facturación del sistema</p>
        </div>
        <a className="text-green-900 no-underline hover:underline" href="/Home">
          Ir a Facturación
        </a>
      </div>
    );
    opciones.push(
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
        <div className="text-gray-500">
          <Description fontSize="large" />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Reporte</h3>
          <p className="text-gray-500">Genera reportes de inmuebles y otros</p>
        </div>
        <a className="text-green-900 no-underline hover:underline" href="/Reportes">
          Ir a Reporte
        </a>
      </div>
    );
    opciones.push(
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
        <div className="text-gray-500">
          <Description fontSize="large" />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Descubrir</h3>
          <p className="text-gray-500">Explora alguna cosa que ni idea</p>
        </div>
        <a className="text-green-900 no-underline hover:underline mt-4" href="/Home">
          Ir a Descubrir
        </a>
      </div>
    );
  }



  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const gridClass = gridClasses[opciones.length] || 'grid-cols-1';



  return (
    <div className="bg-gray-100 min-h-screen relative">
      {/* Etiqueta de tipo de usuario en la esquina superior izquierda */}
{/*       <span className="absolute top-4 left-4 bg-green-100 text-black text-sm font-medium px-3 py-1 rounded-md shadow-md">
        {tipoUsuario}
      </span> */}
  
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl text-green-900 font-light my-10">
          ¡HOLA {nombre}!
        </h1>
        <div className={`grid ${gridClass} gap-6 w-4/5`}>{opciones}</div>
      </div>
    </div>
  );
  


};

export default Home;
