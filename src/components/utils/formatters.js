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

const normalizeText = (text) => {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

const getAvatarByName = (nombre) => {
  return nombre.split(' ').filter((n) => n.length > 2).splice(0, 3).map((n) => n[0]).join('');
}

export { spaceNumber, notificacionToMessage, normalizeText, getAvatarByName };