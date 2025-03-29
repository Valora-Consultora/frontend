import React, { useContext } from "react";

import { NotificacionContext } from "../../App";
import { notificacionToMessage } from "../utils/formatters";

import TickIcon from "@mui/icons-material/Check";
import NotificacionService from "../../api/NotificacionService";
import { useSelector } from "react-redux";

const NotificacionesPage = () => {
  const [notificaciones, setNotificaciones] = useContext(NotificacionContext);
  const user = useSelector((state) => state.user);
  const userId = user?.id || null;
  const userType = user?.tipoUsuario || null;

  const markAsRead = async (id) => {
    try {
      await NotificacionService.markAsRead(id);
      setNotificaciones((prevNotificaciones) =>
        prevNotificaciones.map((notificacion) =>
          notificacion.id === id ? { ...notificacion, leido: true } : notificacion
        )
      );
    } catch (error) {
      console.error("Error al marcar la notificación como leída:", error);
    }
  }

  const markAllAsRead = async () => {
    try {
      await NotificacionService.markAllAsRead(userId, userType);
      setNotificaciones((prevNotificaciones) =>
        prevNotificaciones.map((notificacion) => ({ ...notificacion, leido: true }))
      );
    } catch (error) {
      console.error("Error al marcar todas las notificaciones como leídas:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div onClick={markAllAsRead} className="mt-4 p-2 bg-green-200 text-green-800 rounded-2 cursor-pointer">Marcar todos como leidos</div>
      <div className="bg-white shadow-md p-0 w-[480px] mx-auto mt-4 mb-4 rounded-lg">
        {notificaciones && notificaciones.length > 0 ? (
          notificaciones.map((notificacion) => (
            <div key={notificacion.id} className={`${!notificacion.leido && "bg-gray-200"} p-4 flex flex-row items-center last:border-none border-b border-gray-300 first:rounded-t-lg last:rounded-b-lg`}>
              <div className="flex-grow">
                <p className="text-lg">{notificacionToMessage(notificacion)}</p>
                <p className="text-gray-500 text-sm">{new Date(notificacion.fechaCreacion).toLocaleString()}</p>
              </div>
              <p className="text-gray-500 text-sm">{!notificacion.leido ? <TickIcon className="text-blue-200 cursor-pointer" onClick={() => markAsRead(notificacion.id)} /> : null}</p>
            </div>
          ))
        ) : (
          <p>No hay notificaciones.</p>
        )}
      </div>
    </div>
  );
}

export default NotificacionesPage;