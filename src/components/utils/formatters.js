const spaceNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const notificacionToMessage = (notificacion) => {
  const { tipoNotificacion, referencia } = notificacion;
  if (tipoNotificacion === "INFORME_APROBADO") {
    return `${referencia} ha aprobado tu informe`;
  } else if (tipoNotificacion === "INFORME_CREADO") {
    const referencias = referencia.split('-');
    const tasador = referencias[1];
    const banco = referencias[2];
    return `${tasador} ha creado un informe nuevo de ${normalizeText(banco)}`;
  }
}

const normalizeText = (text) => {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

const getAvatarByName = (nombre) => {
  return nombre.split(' ').filter((n) => n.length > 2).splice(0, 3).map((n) => n[0]).join('');
}

export { spaceNumber, notificacionToMessage, normalizeText, getAvatarByName };