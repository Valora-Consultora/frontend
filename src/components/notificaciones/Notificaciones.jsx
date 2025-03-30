import React, { useContext, useEffect } from "react";

import BellIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";
import NotificacionService from "../../api/NotificacionService";
import { NotificacionContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import { notificacionToMessage } from "../utils/formatters";

const API_URL = process.env.REACT_APP_API_URL;

const Notificaciones = () => {
  const user = useSelector(state => state.user);
  const userId = user.id;
  const tipoUsuario = user.tipoUsuario;

  const [notificaciones, setNotificaciones] = useContext(NotificacionContext)

  const unread = notificaciones?.filter(notificacion => !notificacion.leido)?.length ?? 0;

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await NotificacionService.getNotificacionesByUserId(userId);
        console.log("Notificaciones:", response);
        setNotificaciones(response);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    }

    fetchNotificaciones();
  }, [user]);

  useEffect(() => {
    console.log('Listening to notifications...', user);
    const eventSource = new EventSource(`${API_URL}/api/notificaciones/stream/${userId}/${tipoUsuario}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.tipoNotificacion === "INFORME_APROBADO") {
        toast.success(notificacionToMessage(data));
      }
      console.log(data);
      setNotificaciones((prevNotificaciones) => [...prevNotificaciones, data]);
    }

    eventSource.onerror = (error) => {
      console.error("Error en la conexión del EventSource:", error);
    }

    return () => {
      eventSource.close();
    }
  }, [user]);

  return <a className="relative mr-2 cursor-pointer" href="/Notificacion">
    <BellIcon sx={{ color: "white", fontSize: 24 }} color="inherit" />
    {unread > 0 ? <span className="text-xs absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full flex justify-center items-center"></span> : null}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
  </a>
}

export default Notificaciones;
