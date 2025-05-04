import React, { useContext } from "react";

import { NotificacionContext } from "../../App";
import { notificacionToMessage } from "../utils/formatters";

import TickIcon from "@mui/icons-material/Check";
import NotificacionService from "../../api/NotificacionService";
import { useSelector } from "react-redux";

import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteIcon from "@mui/icons-material/Delete";
import EmptyList from "../utils/EmptyList";
import { Visibility } from "@mui/icons-material";
import { normalizeText } from "../utils/formatters";

const NotificacionesPage = () => {
  const [notificaciones, setNotificaciones] = useContext(NotificacionContext);
  const user = useSelector((state) => state.user);
  const userId = user?.id || null;

  const unread = notificaciones?.filter((notificacion) => !notificacion.leido)?.length ?? 0;

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
      await NotificacionService.markAllAsRead(userId);
      setNotificaciones((prevNotificaciones) =>
        prevNotificaciones.map((notificacion) => ({ ...notificacion, leido: true }))
      );
    } catch (error) {
      console.error("Error al marcar todas las notificaciones como leídas:", error);
    }
  }

  const deleteNotification = async (id) => {
    try {
      await NotificacionService.deleteNotificacion(id);
      setNotificaciones((prevNotificaciones) =>
        prevNotificaciones.filter((notificacion) => notificacion.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
    }
  }

  const ActionComponent = ({ notificacion }) => {
    if (notificacion.tipoNotificacion === "INFORME_CREADO") {
      const referencias = notificacion.referencia.split('-');
      const id = referencias[0];
      const banco = normalizeText(referencias[2]);
      return (
        <Visibility className="text-blue-200 cursor-pointer" onClick={() => window.open(`/Informe/${banco}/${id}`, "_blank")} />
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {unread > 0 ? <div onClick={markAllAsRead} className="mt-4 p-2 bg-green-200 text-green-800 rounded-2 cursor-pointer">Marcar todos como leidos</div> : null}
      <div className="bg-white shadow-md p-0 w-[480px] mx-auto mt-4 mb-4 rounded-lg">
        {notificaciones && notificaciones.length > 0 ? (
          notificaciones.map((notificacion) => !notificacion.eliminado ? (
            <div key={notificacion.id} className={`${!notificacion.leido && "bg-gray-200"} p-4 gap-2 flex flex-row items-center last:border-none border-b border-gray-300 first:rounded-t-lg last:rounded-b-lg`}>
              <div className="flex-grow">
                <p className="text-lg">{notificacionToMessage(notificacion)}</p>
                <p className="text-gray-500 text-sm">{new Date(notificacion.fechaCreacion).toLocaleString()}</p>
              </div>
              <ActionComponent notificacion={notificacion} />
              {!notificacion.leido ? <TickIcon className="text-blue-200 cursor-pointer" onClick={() => markAsRead(notificacion.id)} /> : <DeleteIcon className="text-red-200 cursor-pointer" onClick={() => deleteNotification(notificacion.id)} />}
            </div>
          ) : null)
        ) : (
          <EmptyList message="No hay notificaciones." Icon={NotificationsIcon} />
        )}
      </div>
    </div >
  );
}

export default NotificacionesPage;