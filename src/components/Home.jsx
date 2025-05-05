import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import InspeccionService from "../api/InspeccionService";
import InformeService from '../api/InformeService';
import { useNavigate } from 'react-router-dom';
import { setProvisionalInspectionId } from '../app/slices/inspectionSlice';
import { setProvisionalInformeId } from '../app/slices/informeSlice';
import { Visibility, CheckCircle, Description, Assessment, Search, Feed, Done } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import UsuarioService from '../api/UsuarioService';
import { CircularProgress } from '@mui/material';
import EmptyList from './utils/EmptyList';

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
        <TaskDashboard />
      </div>
    </div>
  );



};

const TaskDashboard = () => {
  const usuario = useSelector(state => state.user);
  const [taskList, setTaskList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function getTaskList() {
      const taskListResponse = await UsuarioService.getTaskListByUserId(usuario.id);

      setTaskList(taskListResponse);
      setLoading(false);
    })();
  }, []);

  const renderTaskList = () => {
    if (!taskList) {
      return <div className="text-gray-500 text-center mt-4">No hay tareas disponibles</div>;
    }

    if (taskList.totalTasks === 0) {
      return <EmptyList Icon={Done} message={"Estas al día mano, bien ahí"} />
    }

    return <>
      {taskList.informes && taskList.informes.length > 0 && <>
        <div className="mt-4">
          <IconTitleBadge
            icon={<Description className="text-blue-500" />}
            title="Informes pendientes"
            badgeText={taskList.informes.length}
            foregroundColor="text-blue-500"
            backgroundColor="bg-blue-100"
          />
        </div>
        {taskList.informes.map((informe) => (
          <div key={informe.id} className="ml-4 mt-2 flex items-center space-x-2">
            <span className="text-md font-semibold flex-grow">{informe.localidad}</span>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => {}}
            >
              Ver Informe
            </button>
          </div>
        ))}
      </>}
      {taskList.ordenes && taskList.ordenes.length > 0 && <>
        <div className="mt-4">
          <IconTitleBadge
            icon={<Assessment className="text-green-500" />}
            title="Ordenes asignadas"
            badgeText={taskList.ordenes.length}
            foregroundColor="text-green-500"
            backgroundColor="bg-green-100"
          />
        </div>
        {taskList.ordenes.map((orden) => (
          <div key={orden.id} className="ml-4 mt-2 flex items-center space-x-2">
            <span className="text-md font-semibold flex-grow">{orden.localidad}</span>
            {/* <button
              className="text-blue-500 hover:underline"
              onClick={() => {}}
            > */}
            <a href={`/Inspeccion/Orden/${orden.id}`}>
              Crear inspección
            </a>
            {/* </button> */}
          </div>
        ))}
      </>}
      {taskList.inspecciones && taskList.inspecciones.length > 0 && <>
        <div className="mt-4">
          <IconTitleBadge
            icon={<Visibility className="text-red-500" />}
            title="Inspecciones pendientes"
            badgeText={taskList.inspecciones.length}
            foregroundColor="text-red-500"
            backgroundColor="bg-red-100"
          />
        </div>
        {taskList.inspecciones.map((inspeccion) => (
          <div key={inspeccion.id} className="ml-4 mt-2 flex items-center space-x-2">
            <span className="text-md font-semibold flex-grow">{inspeccion.localidad}</span>
            {/* <button
              className="text-blue-500 hover:underline"
              onClick={() => {}}
            > */}
            <a href={`/Informe/Inspeccion/${inspeccion.id}`}>
              Crear informe
            </a>
            {/* </button> */}
          </div>
        ))}
      </>}
    </>;

  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mt-10 w-1/5">
      <div className="flex flex-row items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Tus Tareas</h2>
        <span className={`text-sm ring-1 ring-gray-200 font-medium px-[.75rem] rounded-full`}>
          {taskList && taskList.totalTasks}
        </span>
      </div>
      {loading ? <CircularProgress /> : renderTaskList()}
    </div>
  );
}

const IconTitleBadge = ({ icon, title, badgeText, foregroundColor, backgroundColor }) => {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-md font-semibold flex-grow">{title}</span>
      {badgeText && (
        <span
          className={`text-sm ring-1 ring-gray-200 font-medium px-[.75rem] rounded-full ${foregroundColor} ${backgroundColor}`}
        >
          {badgeText}
        </span>
      )}
    </div>
  );
};

export default Home;
