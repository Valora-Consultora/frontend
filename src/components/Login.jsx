import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LoginService from "../api/LoginService";
import { setUser } from '../app/slices/userSlice';
import { useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const state = useState();
  const usuario = useSelector(state => state.user);

  const googleSuccess = async (payload) => {
    const data = jwtDecode(payload.credential);
    try {
      const response = await LoginService.verifyRegisteredEmail(data.email);
      
      if (response) {
        const user = response.usuario;

        // Guarda el usuario en el estado global
        dispatch(setUser({
          username: user.username,
          nombre: user.nombre,
          tipoUsuario: user.tipoUsuario,
          id: user.id,
        }));

        localStorage.setItem("token", response.token);
      }

      window.location.href = "/Home";
    } catch (error) {
      toast.error("El correo electrónico no está registrado en el sistema.");
    }
    setLoading(false);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await LoginService.login(info);

      if (response) {
        const user = response.usuario;

        // Guarda el usuario en el estado global
        dispatch(setUser({
          username: user.username,
          nombre: user.nombre,
          tipoUsuario: user.tipoUsuario,
          id: user.id,
        }));
        
        localStorage.setItem("token", response.token);
/*         //console.log('usuario en login  ' , usuario)
 */
        // También puedes guardarlo en localStorage si lo necesitas
/*         localStorage.setItem("username", response.username);
        localStorage.setItem("nombre", response.nombre);
        localStorage.setItem("tipoUsuario", response.tipoUsuario);
        localStorage.setItem("id", response.id); */

/*         //console.log('usuario en login ', usuario.id)
 */        window.location.href = "/Home";
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md flex flex-col justify-start">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-2xl font-semibold mb-6 text-green-900">
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
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={info.password}
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full bg-green-900 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="self-center">
          <GoogleLogin
            shape="pill"
            locale="es"
            onSuccess={googleSuccess}
            useOneTap
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Login;
