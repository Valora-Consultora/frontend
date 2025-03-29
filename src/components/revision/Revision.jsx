const Revision = () => {
  const opciones = [];

  opciones.push(
    <div className="bg-white w-full rounded-lg shadow-md mx-auto">
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <div className="text-gray-500">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
              strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Orden</h3>
          <p className="text-gray-500">
            Revisar las Órdenes
          </p>
        </div>
        <a className="text-green-900 no-underline hover:underline" href="/Revision/Ordenes">
          Ir a Orden
        </a>
      </div>
    </div>
  );
  opciones.push(
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <div className="text-gray-500">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Inspección</h3>
          <p className="text-gray-500">
            Revisar las Inspecciones
          </p>
        </div>
        <a className="text-green-900 no-underline hover:underline" href="/Revision/Inspecciones">
          Ir a Inspección
        </a>
      </div>
    </div>
  );
  opciones.push(
    <div className="bg-white rounded-lg shadow-md" key="reporte">
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <div className="text-gray-500">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Informe</h3>
          <p className="text-gray-500">Revisar los Informes</p>
        </div>
        <a className="text-green-900 no-underline hover:underline" href="/Revision/Informes">
          Ir a Informe
        </a>
      </div>
    </div>
  );
  opciones.push(
    <div className="bg-white rounded-lg shadow-md" key="reporte">
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <div className="text-gray-500">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Usuario</h3>
          <p className="text-gray-500">Revisar los Usuarios</p>
        </div>
        <a className="text-green-900 no-underline hover:underline" href="/Revision/Usuarios">
          Ir a Usuario
        </a>
      </div>
    </div>
  );

  return <div>
    <div className="bg-gray-100 min-h-screen">
      <div className="text-center">
        <p className="text-gray-500 text-2xl mb-10">PORTAL DE REVISIONES</p>
      </div>
      {/* Aplicar las clases de Tailwind dinámicamente */}
      <div className={`grid grid-cols-4 gap-6 w-4/5 mx-auto`}>
        {opciones}
      </div>
    </div>
  </div>
}

export default Revision