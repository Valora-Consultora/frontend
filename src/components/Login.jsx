import React, { useEffect, useState } from "react";
import "../css/FormsModuleLogin.css";
import LoginService from "../api/LoginService";

function Login() {
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await LoginService(info);
      console.log(response);

      if (response) {
        localStorage.setItem("username", response.username);
        localStorage.setItem("id", response.id);
        window.location.href = "/Inspeccion";
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-2xl font-bold mb-6 text-black">
            Iniciar Sesión
          </h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre de Usuario:
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={info.username}
                onChange={(e) => setInfo({ ...info, username: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={info.password}
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-1/3 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
