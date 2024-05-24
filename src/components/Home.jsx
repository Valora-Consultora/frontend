import React from "react";

const Home = () => {
  const nombre = localStorage.getItem("nombre");
  const tipo = localStorage.getItem("tipo");

  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl text-green-900 pt-14">¡Hola, {nombre}!</h1>
          <p className="text-gray-500 text-2xl mb-10">PORTAL DE {tipo}</p>
        </div>
        <div className="grid grid-cols-4 gap-6 w-4/5 mx-auto">
          {tipo === "TASADOR" && (
            <>
              <div className="bg-white rounded-lg shadow-md mx-auto">
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
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Orden</h3>
                    <p className="text-gray-500">
                      Crear una nueva Orden en el sistema
                    </p>
                  </div>
                  <a className="text-green-900 hover:underline" href="/Orden">
                    Ir a Orden
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md">
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Inspección</h3>
                    <p className="text-gray-500">
                      Crea una nueva Inspección en el sistema
                    </p>
                  </div>
                  <a
                    className="text-green-900 hover:underline"
                    href="/Inspeccion"
                  >
                    Ir a Inspección
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md">
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Reporte</h3>
                    <p className="text-gray-500">
                      Genera reportes de inmuebles y otros
                    </p>
                  </div>
                  <a className="text-green-900 hover:underline" href="/Home">
                    Ir a Reporte
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md">
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
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Descubrir</h3>
                    <p className="text-gray-500">
                      Explora alguna cosa que ni idea
                    </p>
                  </div>
                  <a className="text-green-900 hover:underline" href="/Home">
                    Ir a Descubrir
                  </a>
                </div>
              </div>
            </>
          )}
          {tipo === "SECRETARIA" && (
            <>
              <div className="bg-white rounded-lg shadow-md">
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
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Facturación</h3>
                    <p className="text-gray-500">
                      Gestiona la facturación del sistema
                    </p>
                  </div>
                  <a className="text-green-900 hover:underline" href="/Home">
                    Ir a Facturación
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex flex-col items-center justify-center gap-4 p-6">
                  <div className="text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Auditoría</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Realiza auditorías de todo el sistema
                    </p>
                  </div>
                  <a className="text-green-900 hover:underline" href="/Home">
                    Ir a Auditoría
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md mx-auto">
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
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Orden</h3>
                    <p className="text-gray-500">
                      Crear una nueva Orden en el sistema
                    </p>
                  </div>
                  <a className="text-green-900 hover:underline" href="/Orden">
                    Ir a Orden
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md">
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Inspección</h3>
                    <p className="text-gray-500">
                      Crea una nueva Inspección en el sistema
                    </p>
                  </div>
                  <a
                    className="text-green-900 hover:underline"
                    href="/Inspeccion"
                  >
                    Ir a Inspección
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md">
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Reporte</h3>
                    <p className="text-gray-500">
                      Genera reportes de inmuebles y otros
                    </p>
                  </div>
                  <a className="text-green-900 hover:underline" href="/Home">
                    Ir a Reporte
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md">
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
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Descubrir</h3>
                    <p className="text-gray-500">
                      Explora alguna cosa que ni idea
                    </p>
                  </div>
                  <a className="text-green-900 hover:underline" href="/Home">
                    Ir a Descubrir
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
