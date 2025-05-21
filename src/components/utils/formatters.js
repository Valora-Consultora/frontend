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
  if (!text) return "";
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

const getAvatarByName = (nombre) => {
  return nombre.split(' ').filter((n) => n.length > 2).splice(0, 3).map((n) => n[0]).join('');
}

/// Parsear el rango para que quede en formato [value1-value2] con sus 
/// respectivos subtipos, ej: { value: undefined, value2: 100, subtipo: m² }
/// devolveria (*m²-200m²]
const parseRange = (key, object) => {
  //console.log(object);
  var value = object.value;
  var value2 = object.value2;
  var subtype = object.subtype ?? "";

  if (key === "price" || !object.adornments) {
    var rangeString = "";
    rangeString += value ? + value : "0";
    rangeString += subtype + "-";
    rangeString += value2 ? value2 + subtype : "0" + subtype;
  } else {
    var rangeString = "";
    rangeString += value ? "[" + value : "(*";
    rangeString += subtype + "-";
    rangeString += value2 ? value2 + subtype + "]" : "*" + subtype + ")";
  }
  return rangeString;
};

/// Dado un filtro de comparables, lo convierte a una URL scrappeable
// Si object.pathParam === true, entonces se agrega el valor como un path param
// Si no, se agrega como un query param
const filterToScrappingUrl = (filter) => {
  var urlSuffixPath = "";
  var urlSuffixParams = "";
  for (const key in filter) {
    const object = filter[key];
    if (object.pathParam === true) {
      urlSuffixPath += "/" + object.value;
    } else {
      urlSuffixParams += "_" + key + "_" + (object.range ? parseRange(key, object) : object.value);
    }
  }
  return urlSuffixPath + "/" + urlSuffixParams;
};

export { spaceNumber, notificacionToMessage, normalizeText, getAvatarByName, filterToScrappingUrl };