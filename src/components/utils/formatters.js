const spaceNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const notificacionToMessage = (notificacion) => {
  const { tipoNotificacion, referencia } = notificacion;
  if (tipoNotificacion === "INFORME_APROBADO") {
    return `${referencia} ha aprobado tu informe`;
  } else if (tipoNotificacion === "INFORME_CREADO") {
    return `${referencia} ha creado un informe nuevo`;
  }
}

export { spaceNumber, notificacionToMessage };