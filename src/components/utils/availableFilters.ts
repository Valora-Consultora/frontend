export const availableFilters = [
  {
    "id": "price",
    "name": "Precio (en pesos)",
    "type": "range",
    "values": [
      {
        "id": "*-3000000.0",
        "name": "Hasta $ 3.000.000",
      },
      {
        "id": "3000000.0-1.0E7",
        "name": "$3.000.000 a $10.000.000",
      },
      {
        "id": "1.0E7-*",
        "name": "Más de $10.000.000",
      }
    ]
  },
  {
    "id": "power_seller",
    "name": "Mejores vendedores",
    "type": "boolean",
    "values": [
      {
        "id": "yes",
        "name": "Mejores vendedores",
      }
    ]
  },
  {
    "id": "since",
    "name": "Fecha de comienzo",
    "type": "text",
    "values": [
      {
        "id": "today",
        "name": "Publicados hoy",
      }
    ]
  },
  {
    "id": "until",
    "name": "Fecha de finalización",
    "type": "text",
    "values": [
      {
        "id": "today",
        "name": "Finalizan hoy",
      }
    ]
  },
  {
    "id": "has_video",
    "name": "Publicaciones con video",
    "type": "boolean",
    "values": [
      {
        "id": "yes",
        "name": "Publicaciones con video",
      }
    ]
  },
  {
    "id": "has_pictures",
    "name": "Publicaciones con imágenes",
    "type": "boolean",
    "values": [
      {
        "id": "yes",
        "name": "Con fotos",
      }
    ]
  },
  {
    "id": "seller_type",
    "name": "Quien publica",
    "type": "text",
    "values": [
      {
        "id": "real_estate_agency",
        "name": "Inmobiliaria",
      },
      {
        "id": "private_seller",
        "name": "Dueño",
      }
    ]
  },
  {
    "id": "BEDROOMS",
    "name": "Cantidad de dormitorios",
    "type": "range",
    "values": [
      {
        "id": "[0-0]",
        "name": "Monoambiente",
      },
      {
        "id": "[1-1]",
        "name": "1 dormitorio",
      },
      {
        "id": "[2-2]",
        "name": "2 dormitorios",
      },
      {
        "id": "[3-3]",
        "name": "3 dormitorios",
      },
      {
        "id": "[4-*)",
        "name": "4 dormitorios o más",
      }
    ]
  },
  {
    "id": "COVERED_AREA",
    "name": "Área privada (en m²)",
    "type": "range",
    "subtype": "m²",
    "values": [
      {
        "id": "(*-40m²]",
        "name": "40 m² cubiertos o menos",
      },
      {
        "id": "[40m²-65m²]",
        "name": "40 a 65 m² cubiertos",
      },
      {
        "id": "[65m²-150m²]",
        "name": "65 a 150 m² cubiertos",
      },
      {
        "id": "[150m²-*)",
        "name": "150 m² cubiertos o más",
      }
    ]
  },
  {
    "id": "FULL_BATHROOMS",
    "name": "Cantidad de baños",
    "type": "range",
    "values": [
      {
        "id": "[1-1]",
        "name": "1 baño",
      },
      {
        "id": "[2-2]",
        "name": "2 baños",
      },
      {
        "id": "[3-3]",
        "name": "3 baños",
      },
      {
        "id": "[4-4]",
        "name": "4 baños",
      },
      {
        "id": "[5-*)",
        "name": "5 baños o más",
      }
    ]
  },
  {
    "id": "FURNISHED",
    "name": "Esta amoblado",
    "type": "boolean",
    "values": [
      {
        "id": "242085",
        "name": "Es amoblado",
      }
    ]
  },
  {
    "id": "HAS_AIR_CONDITIONING",
    "name": "Tiene aire acondicionado",
    "type": "boolean",
    "values": [
      {
        "id": "242085",
        "name": "Con aire acondicionado",
      }
    ]
  },
  {
    "id": "HAS_GARDEN",
    "name": "Tiene jardín",
    "type": "boolean",
    "values": [
      {
        "id": "242085",
        "name": "Con jardín",
      }
    ]
  },
  {
    "id": "HAS_SWIMMING_POOL",
    "name": "Tiene piscina",
    "type": "boolean",
    "values": [
      {
        "id": "242085",
        "name": "Con piscina",
      }
    ]
  },
  {
    "id": "state",
    "name": "Ubicación",
    "type": "text",
    "values": [
      {
        "id": "TUxVUE1BTFo5OWMx",
        "name": "Maldonado",
      },
      {
        "id": "TUxVUE1PTlo2MDIy",
        "name": "Montevideo",
      },
      {
        "id": "TUxVUENBTnMxNzliYw",
        "name": "Canelones",
      },
      {
        "id": "TUxVUENPTGExMTUwOQ",
        "name": "Colonia",
      },
      {
        "id": "TUxVUFJPQ1ozNWRm",
        "name": "Rocha",
      },
      {
        "id": "TUxVUFNBTloxMDk2NQ",
        "name": "San José",
      },
      {
        "id": "TUxVUExBVlpkNTI0",
        "name": "Lavalleja",
      },
      {
        "id": "TUxVUERVUm9kZDA1",
        "name": "Durazno",
      },
      {
        "id": "TUxVUFBBWVo0YzEy",
        "name": "Paysandú",
      },
      {
        "id": "TUxVUFRBQ280MGE5",
        "name": "Tacuarembó",
      },
      {
        "id": "TUxVUEZMT3MxYjc",
        "name": "Flores",
      },
      {
        "id": "TUxVUEZMT1o4MWUz",
        "name": "Florida",
      },
      {
        "id": "TUxVUFNPUm9mOTcx",
        "name": "Soriano",
      },
      {
        "id": "TUxVUFRSRXNiY2Zh",
        "name": "Treinta y Tres",
      },
      {
        "id": "TUxVUFNBTG9jMTM5",
        "name": "Salto",
      },
      {
        "id": "TUxVUFLNT1oxNTQ4MQ",
        "name": "Río Negro",
      },
      {
        "id": "TUxVUFJJVlpjOWQ1",
        "name": "Rivera",
      },
      {
        "id": "TUxVUENFUm9mOTJl",
        "name": "Cerro Largo",
      },
      {
        "id": "TUxVUEFSVHMxMzQ1Mw",
        "name": "Artigas",
      }
    ]
  },
  {
    "id": "city",
    "name": "Ciudad",
    "type": "text",
    "values": [],
  },
  {
    "id": "ITEM_CONDITION",
    "name": "Condición",
    "type": "STRING",
    "values": [
      {
        "id": "2230581",
        "name": "Usado",
      },
      {
        "id": "2230284",
        "name": "Nuevo",
      }
    ]
  },
  {
    "id": "OPERATION",
    "name": "Operación",
    "type": "STRING",
    "values": [
      {
        "id": "242075",
        "name": "Venta",
      },
      {
        "id": "242074",
        "name": "Alquiler temporada",
      },
      {
        "id": "242073",
        "name": "Alquiler",
      }
    ]
  },
  {
    "id": "OPERATION_SUBTYPE",
    "name": "Subtipo de operación",
    "type": "STRING",
    "values": [
      {
        "id": "244562",
        "name": "Propiedades individuales",
      },
      {
        "id": "245034",
        "name": "Emprendimientos",
      }
    ]
  },
  {
    "id": "PARKING_LOTS",
    "name": "Cantidad de cocheras",
    "type": "range",
    "values": [
      {
        "id": "[0-0]",
        "name": "No tiene cocheras",
      },
      {
        "id": "[1-1]",
        "name": "1 cochera",
      },
      {
        "id": "[2-2]",
        "name": "2 cocheras",
      },
      {
        "id": "[3-3]",
        "name": "3 cocheras",
      },
      {
        "id": "[4-*)",
        "name": "4 cocheras o más",
      }
    ]
  },
  {
    "id": "PROPERTY_AGE",
    "name": "Antigüedad (en años)",
    "type": "range",
    "subtype": "años",
    "values": [
      {
        "id": "[0años-0años]",
        "name": "A estrenar",
      },
      {
        "id": "[1años-3años]",
        "name": "1 a 3 años",
      },
      {
        "id": "[3años-15años]",
        "name": "3 a 15 años",
      },
      {
        "id": "[15años-50años]",
        "name": "15 a 50 años",
      },
      {
        "id": "[50años-*)",
        "name": "50 años o más",
      }
    ]
  },
  {
    "id": "PROPERTY_TYPE",
    "name": "Inmueble",
    "type": "STRING",
    "values": [
      {
        "id": "242062",
        "name": "Apartamento",
      },
      {
        "id": "242060",
        "name": "Casas",
      },
      {
        "id": "245004",
        "name": "Terrenos",
      },
      {
        "id": "242065",
        "name": "Locales",
      },
      {
        "id": "242070",
        "name": "Quintas",
      },
      {
        "id": "242059",
        "name": "Campos",
      },
      {
        "id": "242067",
        "name": "Oficinas",
      },
      {
        "id": "242068",
        "name": "Otros inmuebles",
      },
      {
        "id": "245003",
        "name": "Depósitos y galpones",
      },
      {
        "id": "267200",
        "name": "Llave de negocio",
      },
      {
        "id": "267198",
        "name": "Cocheras",
      },
      {
        "id": "267195",
        "name": "Habitaciones",
      }
    ]
  },
  {
    "id": "TOTAL_AREA",
    "name": "Superficie total (en m²)",
    "type": "range",
    "subtype": "m²",
    "values": [
      {
        "id": "(*-60m²]",
        "name": "60 m² totales o menos",
      },
      {
        "id": "[60m²-150m²]",
        "name": "60 a 150 m² totales",
      },
      {
        "id": "[150m²-550m²]",
        "name": "150 a 550 m² totales",
      },
      {
        "id": "[550m²-*)",
        "name": "550 m² totales o más",
      }
    ]
  },
  {
    "id": "WITH_VIRTUAL_TOUR",
    "name": "Multimedia",
    "type": "boolean",
    "values": [
      {
        "id": "242085",
        "name": "Con tour virtual",
      }
    ]
  },
  {
    "id": "official_store",
    "name": "Tiendas oficiales",
    "type": "text",
    "values": [
      {
        "id": "all",
        "name": "Todas las tiendas oficiales",
      },
      {
        "id": "67106",
        "name": "Altius Group",
      },
      {
        "id": "933",
        "name": "NICOLAS DE MODENA INMOBILIARIA",
      },
      {
        "id": "54462",
        "name": "Vitrium Capital",
      },
      {
        "id": "961",
        "name": "Golf Inmobiliaria",
      },
      {
        "id": "1142",
        "name": "Parolin Asoc Propiedades",
      },
      {
        "id": "889",
        "name": "Punta Ballena Inmobiliaria",
      },
      {
        "id": "1168",
        "name": "HHO BROKER",
      },
      {
        "id": "705",
        "name": "Poggio Propiedades",
      },
      {
        "id": "1161",
        "name": "Kopel Sanchez",
      },
      {
        "id": "53241",
        "name": "Pres",
      },
      {
        "id": "53561",
        "name": "Calyptus Desarrollos",
      },
      {
        "id": "758",
        "name": "Abate Propiedades",
      },
      {
        "id": "896",
        "name": "REMAX FOCUS",
      },
      {
        "id": "915",
        "name": "SURES REAL ESTATE",
      },
      {
        "id": "60006",
        "name": "SI SERVICIOS INMOBILIARIOS",
      },
      {
        "id": "937",
        "name": "POINTER",
      },
      {
        "id": "59650",
        "name": "Campiglia Construcciones",
      },
      {
        "id": "60030",
        "name": "Justany Desarrollos",
      },
      {
        "id": "1049",
        "name": "Capital Real Estate",
      },
      {
        "id": "911",
        "name": "Caetano Negocios Inmobiliarios",
      },
      {
        "id": "1087",
        "name": "Beba Paez Vilaro",
      },
      {
        "id": "992",
        "name": "SALAYA ROMERA Propiedades",
      },
      {
        "id": "841",
        "name": "Gasalla Negocios Inmobiliarios",
      },
      {
        "id": "1085",
        "name": "Antonio Mieres",
      },
      {
        "id": "1055",
        "name": "AFILIA Propiedades",
      },
      {
        "id": "1149",
        "name": "Engel Volkers Montevideo",
      },
      {
        "id": "737",
        "name": "PROP",
      },
      {
        "id": "77122",
        "name": "Plaza Mayor Propiedades",
      },
      {
        "id": "1097",
        "name": "ESTUDIO SM",
      },
      {
        "id": "57569",
        "name": "Century 21 Premier",
      }
    ]
  }
];

export const stateFilters = {
  'TUxVUE1BTFo5OWMx': [
    {
      "id": "TVhYQWJyYSBEZSBDYXN0ZWxsYW5vc1RVeFZVR",
      "name": "Abra De Castellanos"
    },
    {
      "id": "TUxVQ0FCUmJjMDli",
      "name": "Abra de Perdomo"
    },
    {
      "id": "TUxVQ0FJRzY1ZDRi",
      "name": "Aiguá"
    },
    {
      "id": "TVhYQWxmYXJvVFV4VlVFMUJURm81T1dNeA",
      "name": "Alfaro"
    },
    {
      "id": "TVhYQWxmZXJlelRVeFZVRTFCVEZvNU9XTXg",
      "name": "Alferez"
    },
    {
      "id": "TVhYQXJlbmFzIERlIEpvc2UgSWduYWNpb1RVe",
      "name": "Arenas De Jose Ignacio"
    },
    {
      "id": "TVhYQXJyb3lpdG8gRGUgTWVkaW5hVFV4VlVFM",
      "name": "Arroyito De Medina"
    },
    {
      "id": "TVhYQmFsbmVhcmlvIEJ1ZW5vcyBBaXJlc1RVe",
      "name": "Balneario Buenos Aires"
    },
    {
      "id": "TUxVQ0JBTDc3MTVl",
      "name": "Balneario Las Flores"
    },
    {
      "id": "TVhYQmFycmEgRGUgUG9ydGV6dWVsb1RVeFZVR",
      "name": "Barra De Portezuelo"
    },
    {
      "id": "TVhYQmFycmEgRGVsIFNhdWNlVFV4VlVFMUJUR",
      "name": "Barra Del Sauce"
    },
    {
      "id": "TVhYQmFycmlvIEtlbm5lZHlUVXhWVUUxQlRGb",
      "name": "Barrio Kennedy"
    },
    {
      "id": "TUxVQ0JBTGIxOTA2",
      "name": "Bella Vista"
    },
    {
      "id": "TVhYQnVlbm9zIEFpcmVzVFV4VlVFMUJURm81T",
      "name": "Buenos Aires"
    },
    {
      "id": "TVhYQ2FudGVyYXMgRGUgTWFyZWxsaVRVeFZVR",
      "name": "Canteras De Marelli"
    },
    {
      "id": "TVhYQ2FyYXBlVFV4VlVFMUJURm81T1dNeA",
      "name": "Carape"
    },
    {
      "id": "TVhYQ2FybG9zIENhbFRVeFZVRTFCVEZvNU9XT",
      "name": "Carlos Cal"
    },
    {
      "id": "TVhYQ2HDsWFkYSBCZWxsYWNhVFV4VlVFMUJUR",
      "name": "Cañada Bellaca"
    },
    {
      "id": "TVhYQ2HDsWFkYSBEZSBMYSBDcnV6VFV4VlVFM",
      "name": "Cañada De La Cruz"
    },
    {
      "id": "TUxVQ0NFUjg4MTE",
      "name": "Cerro Pelado"
    },
    {
      "id": "TUxVQ0NFUjY1YzY4",
      "name": "Cerros Azules"
    },
    {
      "id": "TVhYQ2hpaHVhaHVhVFV4VlVFMUJURm81T1dNe",
      "name": "Chihuahua"
    },
    {
      "id": "TVhYQ29sb25pYSBKLiBTdWFyZXpUVXhWVUUxQ",
      "name": "Colonia J. Suarez"
    },
    {
      "id": "TVhYQ29yb25pbGxhVFV4VlVFMUJURm81T1dNe",
      "name": "Coronilla"
    },
    {
      "id": "TVhYQ29ydGUgRGUgTGEgTGXDsWFUVXhWVUUxQ",
      "name": "Corte De La Leña"
    },
    {
      "id": "TVhYQ29zdGFzIERlIEpvc2UgSWduYWNpb1RVe",
      "name": "Costas De Jose Ignacio"
    },
    {
      "id": "TVhYRWRlbiBSb2NrVFV4VlVFMUJURm81T1dNe",
      "name": "Eden Rock"
    },
    {
      "id": "TVhYRWwgQ2hvcnJvVFV4VlVFMUJURm81T1dNe",
      "name": "El Chorro"
    },
    {
      "id": "TVhYRWwgUXVpam90ZVRVeFZVRTFCVEZvNU9XT",
      "name": "El Quijote"
    },
    {
      "id": "TVhYRWwgVGVzb3JvVFV4VlVFMUJURm81T1dNe",
      "name": "El Tesoro"
    },
    {
      "id": "TVhYRmFybyBKb3NlIElnbmFjaW9UVXhWVUUxQ",
      "name": "Faro Jose Ignacio"
    },
    {
      "id": "TVhYRmFybyBKb3NlIElnbmFjaW8gTm9ydGVUV",
      "name": "Faro Jose Ignacio Norte"
    },
    {
      "id": "TVhYR2Fyem9uVFV4VlVFMUJURm81T1dNeA",
      "name": "Garzon"
    },
    {
      "id": "TVhYR2Vyb25hVFV4VlVFMUJURm81T1dNeA",
      "name": "Gerona"
    },
    {
      "id": "TUxVQ0dSRWE2ZmVm",
      "name": "Gregorio Aznárez"
    },
    {
      "id": "TVhYR3VhcmRpYSBWaWVqYVRVeFZVRTFCVEZvN",
      "name": "Guardia Vieja"
    },
    {
      "id": "TUxVQ0hJUDg5MDI",
      "name": "Hipódromo"
    },
    {
      "id": "TUxVQ0ZBUjhmNmJi",
      "name": "José Ignacio"
    },
    {
      "id": "TUxVQ0xBWjIwZDQ5",
      "name": "La Barra"
    },
    {
      "id": "TVhYTGEgQ2FwdWVyYVRVeFZVRTFCVEZvNU9XT",
      "name": "La Capuera"
    },
    {
      "id": "TVhYTGEgRmFsZGFUVXhWVUUxQlRGbzVPV014",
      "name": "La Falda"
    },
    {
      "id": "TVhYTGEgSnVhbml0YVRVeFZVRTFCVEZvNU9XT",
      "name": "La Juanita"
    },
    {
      "id": "TVhYTGEgU2llcnJhVFV4VlVFMUJURm81T1dNe",
      "name": "La Sierra"
    },
    {
      "id": "TVhYTGEgU29ucmlzYVRVeFZVRTFCVEZvNU9XT",
      "name": "La Sonrisa"
    },
    {
      "id": "TVhYTGFnbyBEZSBMb3MgQ2lzbmVzVFV4VlVFM",
      "name": "Lago De Los Cisnes"
    },
    {
      "id": "TVhYTGFndW5hIEJsYW5jYVRVeFZVRTFCVEZvN",
      "name": "Laguna Blanca"
    },
    {
      "id": "TVhYTGFndW5hIERlbCBTYXVjZVRVeFZVRTFCV",
      "name": "Laguna Del Sauce"
    },
    {
      "id": "TVhYTGFzIENhw7Fhc1RVeFZVRTFCVEZvNU9XT",
      "name": "Las Cañas"
    },
    {
      "id": "TVhYTGFzIEN1bWJyZXNUVXhWVUUxQlRGbzVPV",
      "name": "Las Cumbres"
    },
    {
      "id": "TUxVQ0xBUzc4ODc",
      "name": "Las Flores"
    },
    {
      "id": "TVhYTGFzIEZsb3JlcyAtIEVzdGFjaW9uVFV4V",
      "name": "Las Flores - Estacion"
    },
    {
      "id": "TVhYTG9zIEFyb21vc1RVeFZVRTFCVEZvNU9XT",
      "name": "Los Aromos"
    },
    {
      "id": "TVhYTG9zIENlaWJvc1RVeFZVRTFCVEZvNU9XT",
      "name": "Los Ceibos"
    },
    {
      "id": "TVhYTG9zIENvcmNob3NUVXhWVUUxQlRGbzVPV",
      "name": "Los Corchos"
    },
    {
      "id": "TVhYTG9zIFRhbGFzVFV4VlVFMUJURm81T1dNe",
      "name": "Los Talas"
    },
    {
      "id": "TUxVQ01BTDk1ODYx",
      "name": "Maldonado"
    },
    {
      "id": "TUxVQ01BTjMxNzc",
      "name": "Manantiales"
    },
    {
      "id": "TVhYTWF0YW9qb1RVeFZVRTFCVEZvNU9XTXg",
      "name": "Mataojo"
    },
    {
      "id": "TVhYTW9sbGVzIERlIEdhcnpvblRVeFZVRTFCV",
      "name": "Molles De Garzon"
    },
    {
      "id": "TVhYTnVldmEgQ2FycmFyYVRVeFZVRTFCVEZvN",
      "name": "Nueva Carrara"
    },
    {
      "id": "TUxVQ01BTERPQ05QMQ",
      "name": "Ocean Park"
    },
    {
      "id": "TUxVQ09UUjkyMjc",
      "name": "Otras"
    },
    {
      "id": "TUxVQ1BaWmRhZmI3",
      "name": "Punta Ballena"
    },
    {
      "id": "TUxVQ1BaWjU1OTJh",
      "name": "P. Coloradas"
    },
    {
      "id": "TVhYUGFnbyBEZSBMYSBQYWphVFV4VlVFMUJUR",
      "name": "Pago De La Paja"
    },
    {
      "id": "TUxVQ1BBTjNmYWVm",
      "name": "Pan de Azúcar"
    },
    {
      "id": "TVhYUGFycXVlIE1lZGluYVRVeFZVRTFCVEZvN",
      "name": "Parque Medina"
    },
    {
      "id": "TVhYUGFydGlkbyBOb3J0ZVRVeFZVRTFCVEZvN",
      "name": "Partido Norte"
    },
    {
      "id": "TVhYUGFydGlkbyBPZXN0ZVRVeFZVRTFCVEZvN",
      "name": "Partido Oeste"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYSBDYW50ZXJhVFV4VlVFM",
      "name": "Paso De La Cantera"
    },
    {
      "id": "TVhYUGFzbyBEZSBMb3MgVGFsYXNUVXhWVUUxQ",
      "name": "Paso De Los Talas"
    },
    {
      "id": "TUxVQ1BJTjMwNDk",
      "name": "Pinares"
    },
    {
      "id": "TUxVQ1BJUjY0M2Jh",
      "name": "Piriápolis"
    },
    {
      "id": "TUxVQ1BMQTQ2MDJj",
      "name": "Playa Grande"
    },
    {
      "id": "TUxVQ1BMQWIzZGVl",
      "name": "Playa Hermosa"
    },
    {
      "id": "TUxVQ1BMQTc0ZWQx",
      "name": "Playa Verde"
    },
    {
      "id": "TUxVQ1BPUmE4ODc3",
      "name": "Portezuelo"
    },
    {
      "id": "TUxVQ1BVRTQ1NGMx",
      "name": "Pueblo Edén"
    },
    {
      "id": "TVhYUHVlYmxvIFNvbGlzVFV4VlVFMUJURm81T",
      "name": "Pueblo Solis"
    },
    {
      "id": "TUxVQ1BVTmNjZjBh",
      "name": "Punta Fría"
    },
    {
      "id": "TVhYUHVudGEgTmVncmFUVXhWVUUxQlRGbzVPV",
      "name": "Punta Negra"
    },
    {
      "id": "TUxVQ1BVTjJjMzIy",
      "name": "Punta Piedras"
    },
    {
      "id": "TUxVQ1BaWmFhNDM2",
      "name": "Punta del Este"
    },
    {
      "id": "TVhYUHVudGFzIERlIEpvc2UgSWduYWNpb1RVe",
      "name": "Puntas De Jose Ignacio"
    },
    {
      "id": "TVhYUHVudGFzIERlIExhIFNpZXJyYVRVeFZVR",
      "name": "Puntas De La Sierra"
    },
    {
      "id": "TVhYUHVudGFzIERlIE1hdGFvam9UVXhWVUUxQ",
      "name": "Puntas De Mataojo"
    },
    {
      "id": "TVhYUHVudGFzIERlIFBhbiBEZSBBenVjYXJUV",
      "name": "Puntas De Pan De Azucar"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBDYW1wYW5lcmFUVXhWV",
      "name": "Puntas Del Campanera"
    },
    {
      "id": "TVhYUmluY29uIERlIEFwYXJpY2lvVFV4VlVFM",
      "name": "Rincon De Aparicio"
    },
    {
      "id": "TVhYUmluY29uIERlIExvcyBTb3NhVFV4VlVFM",
      "name": "Rincon De Los Sosa"
    },
    {
      "id": "TVhYUmluY29uIERlbCBJbmRpb1RVeFZVRTFCV",
      "name": "Rincon Del Indio"
    },
    {
      "id": "TVhYUnV0YSAzNyBZIDlUVXhWVUUxQlRGbzVPV",
      "name": "Ruta 37 Y 9"
    },
    {
      "id": "TVhYU2FsYW1hbmNhVFV4VlVFMUJURm81T1dNe",
      "name": "Salamanca"
    },
    {
      "id": "TUxVQ1NBTjhlODQ",
      "name": "San Carlos"
    },
    {
      "id": "U2FuIEZyYW5jaXNjb1RVeFZVRTFCVEZvNU9XTXg",
      "name": "San Francisco"
    },
    {
      "id": "TVhYU2FuIEp1YW4gRGVsIEVzdGVUVXhWVUUxQ",
      "name": "San Juan Del Este"
    },
    {
      "id": "TUxVQ1NBTjY5NTQ",
      "name": "San Rafael"
    },
    {
      "id": "TVhYU2FuIFZpY2VudGVUVXhWVUUxQlRGbzVPV",
      "name": "San Vicente"
    },
    {
      "id": "TVhYU2FudGEgTW9uaWNhVFV4VlVFMUJURm81T",
      "name": "Santa Monica"
    },
    {
      "id": "TVhYU2FyYW5kaSBEZSBBaWd1YVRVeFZVRTFCV",
      "name": "Sarandi De Aigua"
    },
    {
      "id": "TVhYU2FyYW5kaSBEZWwgTWF0YW9qb1RVeFZVR",
      "name": "Sarandi Del Mataojo"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgQWlndWFUVXhWVUUxQlRGb",
      "name": "Sauce De Aigua"
    },
    {
      "id": "TUxVQ1NBVTc0OTc",
      "name": "Sauce de Portezuelo"
    },
    {
      "id": "TUxVQ1NPTDQ0MjY",
      "name": "Solís"
    },
    {
      "id": "TVhYVmFsZGl2aWFUVXhWVUUxQlRGbzVPV014",
      "name": "Valdivia"
    },
    {
      "id": "TVhYVmlsbGEgRGVsaWFUVXhWVUUxQlRGbzVPV",
      "name": "Villa Delia"
    },
    {
      "id": "TVhYWmFuamEgRGVsIFRpZ3JlVFV4VlVFMUJUR",
      "name": "Zanja Del Tigre"
    }
  ],
  'TUxVUE1PTlo2MDIy': [
    {
      "id": "TUxVQ0FHVWUwMzc3",
      "name": "Aguada"
    },
    {
      "id": "TUxVQ0FJUjE1NDM",
      "name": "Aires Puros"
    },
    {
      "id": "TUxVQ0FSUmJmZDVl",
      "name": "Arroyo Seco"
    },
    {
      "id": "TUxVQ0FUQTYzNjc",
      "name": "Atahualpa"
    },
    {
      "id": "TUxVQ0JFTDUyODE",
      "name": "Bella Vista"
    },
    {
      "id": "TUxVQ0JFTDU0MjU0",
      "name": "Belvedere"
    },
    {
      "id": "TUxVQ0JPTDIxMDY",
      "name": "Bolivar"
    },
    {
      "id": "TUxVQ0JSQWNhNzZl",
      "name": "Brazo Oriental"
    },
    {
      "id": "TUxVQ0JVQzNlMDdl",
      "name": "Buceo"
    },
    {
      "id": "TUxVQ0NBUDYxOTA",
      "name": "Capurro"
    },
    {
      "id": "TUxVQ0NBUmRhYWU0",
      "name": "Carrasco"
    },
    {
      "id": "TUxVQ0NBUzc5NzA",
      "name": "Casabo"
    },
    {
      "id": "TVhYQ2FzYXZhbGxlVFV4VlVFMVBUbG8yTURJe",
      "name": "Casavalle"
    },
    {
      "id": "TUxVQ0NFTjVjMTM",
      "name": "Centro"
    },
    {
      "id": "TUxVQ0NFUjI3NDg",
      "name": "Cerrito"
    },
    {
      "id": "TUxVQ0NFUjEwNDc",
      "name": "Cerro"
    },
    {
      "id": "TUxVQ0NJVTk5MTU",
      "name": "Ciudad Vieja"
    },
    {
      "id": "TUxVQ0NPTDk2ZjYz",
      "name": "Colón"
    },
    {
      "id": "TUxVQ0NPUjZmZjNm",
      "name": "Cordón"
    },
    {
      "id": "TUxVQ0dPRTY1NDU",
      "name": "Goes"
    },
    {
      "id": "TUxVQ0lUVTM0MjQ",
      "name": "Ituzaingó"
    },
    {
      "id": "TUxVQ0pBQzJiODI2",
      "name": "Jacinto Vera"
    },
    {
      "id": "TUxVQ0pBUjMzOTE",
      "name": "Jardines Hipódromo"
    },
    {
      "id": "TUxVQ0xBWjk5YTE5",
      "name": "La Blanqueada"
    },
    {
      "id": "TUxVQ0xBQzU0NjU",
      "name": "La Comercial"
    },
    {
      "id": "TUxVQ0xBRjMyODM",
      "name": "La Figurita"
    },
    {
      "id": "TUxVQ0xBVDQ5ODI",
      "name": "La Teja"
    },
    {
      "id": "TVhYTGFycmHDsWFnYVRVeFZVRTFQVGxvMk1ES",
      "name": "Larrañaga"
    },
    {
      "id": "TUxVQ0xBUzE0MjM",
      "name": "Las Acacias"
    },
    {
      "id": "TUxVQ0xFWjQ0NTA",
      "name": "Lezica"
    },
    {
      "id": "TUxVQ01BTDE0YmY1",
      "name": "Malvin"
    },
    {
      "id": "TUxVQ01BTDk4MDg",
      "name": "Malvin Norte"
    },
    {
      "id": "TUxVQ01BTjY0Mzc",
      "name": "Manga"
    },
    {
      "id": "TUxVQ01BUjcwMjI",
      "name": "Marconi"
    },
    {
      "id": "TUxVQ01BUjczNTk",
      "name": "Maroñas"
    },
    {
      "id": "TUxVQ01BUjYwMDA",
      "name": "Maroñas, Curva"
    },
    {
      "id": "TUxVQ01FTDE5OTE",
      "name": "Melilla"
    },
    {
      "id": "TVhYTWVyY2FkbyBNb2RlbG9UVXhWVUUxUFRsb",
      "name": "Mercado Modelo"
    },
    {
      "id": "TUxVQ01PTjc2Nzc",
      "name": "Montevideo"
    },
    {
      "id": "TUxVQ05VRTk3MTk",
      "name": "Nuevo París"
    },
    {
      "id": "TUxVQ1BBSjk4NDY",
      "name": "Pajas Blancas"
    },
    {
      "id": "TUxVQ1BBTDU0NzY",
      "name": "Palermo"
    },
    {
      "id": "TUxVQ1BBUjVkNGE4",
      "name": "Parque Batlle"
    },
    {
      "id": "TUxVQ1BBUmU3Y2Nj",
      "name": "Parque Rodó"
    },
    {
      "id": "TUxVQ1BBUzQzMDA",
      "name": "Paso Molino"
    },
    {
      "id": "TUxVQ1BBUzc3MDM",
      "name": "Paso de la Arena"
    },
    {
      "id": "TVhYUGVyZXogQ2FzdGVsbGFub3NUVXhWVUUxU",
      "name": "Perez Castellanos"
    },
    {
      "id": "TUxVQ1BF0TUxNDI",
      "name": "Peñarol"
    },
    {
      "id": "TUxVQ1BJRWMyMjhl",
      "name": "Piedras Blancas"
    },
    {
      "id": "TUxVQ1BPQzM5ZGRi",
      "name": "Pocitos"
    },
    {
      "id": "TUxVQ1BPQzIwNDU",
      "name": "Pocitos Nuevo"
    },
    {
      "id": "TUxVQ1BSQTYwOTJl",
      "name": "Prado"
    },
    {
      "id": "TUxVQ1BVRTI0NDA",
      "name": "Puerto Buceo"
    },
    {
      "id": "TUxVQ1BVTjJmMjkx",
      "name": "Punta Carretas"
    },
    {
      "id": "TUxVQ1BVTjYxODI",
      "name": "Punta Gorda"
    },
    {
      "id": "TUxVQ1BVTjMxMTE",
      "name": "Punta Rieles"
    },
    {
      "id": "TUxVQ1JFRDg3YzQy",
      "name": "Reducto"
    },
    {
      "id": "TUxVQ1NBTjU4MTU",
      "name": "Santiago Vázquez"
    },
    {
      "id": "TUxVQ1NBWTkxODY",
      "name": "Sayago"
    },
    {
      "id": "TUxVQ1RPTDE5MDY",
      "name": "Toledo Chico"
    },
    {
      "id": "TUxVQ1RSRTg3OGM3",
      "name": "Tres Cruces"
    },
    {
      "id": "TUxVQ1VOSTVkOGFk",
      "name": "Unión"
    },
    {
      "id": "TUxVQ1ZJTDE2MDU",
      "name": "Villa Biarritz"
    },
    {
      "id": "TUxVQ1ZJTDk1MTY",
      "name": "Villa Dolores"
    },
    {
      "id": "TUxVQ1ZJTDI2MzY",
      "name": "Villa Española"
    },
    {
      "id": "TUxVQ1ZJTDM1MTk",
      "name": "Villa García"
    },
    {
      "id": "TUxVQ1ZJTDRkMTY",
      "name": "Villa Muñoz"
    },
    {
      "id": "TUxVQ1ZJTDI0NTk",
      "name": "Villa del Cerro"
    }
  ],
  'TUxVUENBTnMxNzliYw': [
    {
      "id": "TUxVQ0FDQTc3NjI",
      "name": "Acapulco"
    },
    {
      "id": "TVhYQWVyb3B1ZXJ0byBJbnRlcm5hY2lvbmFsI",
      "name": "Aeropuerto Internacional De Carrasco"
    },
    {
      "id": "TUxVQ0FHVWE5MmE0",
      "name": "Aguas Corrientes"
    },
    {
      "id": "TUxVQ0FSQTQwZDgw",
      "name": "Araminda"
    },
    {
      "id": "TVhYQXJlbmFsVFV4VlVFTkJUbk14TnpsaVl3",
      "name": "Arenal"
    },
    {
      "id": "TUxVQ0FUTDI1ZmY5",
      "name": "Atlántida"
    },
    {
      "id": "TVhYQi5ILlUuVFV4VlVFTkJUbk14TnpsaVl3",
      "name": "B.H.U."
    },
    {
      "id": "TUxVQ0JBTDVmZGQx",
      "name": "Balneario Argentino"
    },
    {
      "id": "TVhYQmFycmEgRGUgTGEgUGVkcmVyYVRVeFZVR",
      "name": "Barra De La Pedrera"
    },
    {
      "id": "TVhYQmFycmEgRGVsIFRhbGFUVXhWVUVOQlRuT",
      "name": "Barra Del Tala"
    },
    {
      "id": "TUxVQ0JBUjI1MTA",
      "name": "Barra de Carrasco"
    },
    {
      "id": "TVhYQmFycmFuY2FzIENvbG9yYWRhc1RVeFZVR",
      "name": "Barrancas Coloradas"
    },
    {
      "id": "TVhYQmFycmlvIEJlbnpvVFV4VlVFTkJUbk14T",
      "name": "Barrio Benzo"
    },
    {
      "id": "TVhYQmFycmlvIENvcG9sYVRVeFZVRU5CVG5Ne",
      "name": "Barrio Copola"
    },
    {
      "id": "TVhYQmFycmlvIERlbCBMaWJlcnRhZG9yVFV4V",
      "name": "Barrio Del Libertador"
    },
    {
      "id": "TVhYQmFycmlvIExhIEx1Y2hhVFV4VlVFTkJUb",
      "name": "Barrio La Lucha"
    },
    {
      "id": "TVhYQmFycmlvIExvcyBQYW5vcmFtYXNUVXhWV",
      "name": "Barrio Los Panoramas"
    },
    {
      "id": "TVhYQmFycmlvIE9icmVyb1RVeFZVRU5CVG5Ne",
      "name": "Barrio Obrero"
    },
    {
      "id": "TVhYQmFycmlvIFByZXR0aVRVeFZVRU5CVG5Ne",
      "name": "Barrio Pretti"
    },
    {
      "id": "TVhYQmFycmlvIFJlbWFuc29UVXhWVUVOQlRuT",
      "name": "Barrio Remanso"
    },
    {
      "id": "TVhYQmFycmlvIFNhbnRhIFJpdGFUVXhWVUVOQ",
      "name": "Barrio Santa Rita"
    },
    {
      "id": "TVhYQmFycmlvIFRyYXZlcnNvVFV4VlVFTkJUb",
      "name": "Barrio Traverso"
    },
    {
      "id": "TVhYQmFycmlvIFZpbGxhIE11cmNpYVRVeFZVR",
      "name": "Barrio Villa Murcia"
    },
    {
      "id": "TUxVQ0JBUmFkYTE5",
      "name": "Barros Blancos"
    },
    {
      "id": "TUxVQ0JB0TI5MjU",
      "name": "Bañado de Medina"
    },
    {
      "id": "TUxVQ0JFTDk0NDE5",
      "name": "Bello Horizonte"
    },
    {
      "id": "TUxVQ0JJQTM4OTBh",
      "name": "Biarritz"
    },
    {
      "id": "TVhYQmxhbmNvVFV4VlVFTkJUbk14TnpsaVl3",
      "name": "Blanco"
    },
    {
      "id": "TVhYQm9saXZhclRVeFZVRU5CVG5NeE56bGlZd",
      "name": "Bolivar"
    },
    {
      "id": "TVhYQ2FtaW5vIERlIExhIENhZGVuYVRVeFZVR",
      "name": "Camino De La Cadena"
    },
    {
      "id": "TVhYQ2FtaW5vIERvZGVyYVRVeFZVRU5CVG5Ne",
      "name": "Camino Dodera"
    },
    {
      "id": "TVhYQ2FtaW5vIExsb3ZlcmFzVFV4VlVFTkJUb",
      "name": "Camino Lloveras"
    },
    {
      "id": "TVhYQ2FtcG8gTWlsaXRhclRVeFZVRU5CVG5Ne",
      "name": "Campo Militar"
    },
    {
      "id": "TVhYQ2FuZWxvbiBDaGljb1RVeFZVRU5CVG5Ne",
      "name": "Canelon Chico"
    },
    {
      "id": "TVhYQ2FuZWxvbiBDaGljbyBBbCBDZW50cm9UV",
      "name": "Canelon Chico Al Centro"
    },
    {
      "id": "TVhYQ2FuZWxvbiBDaGljbyBEZSBQcm9ncmVzb",
      "name": "Canelon Chico De Progreso"
    },
    {
      "id": "TVhYQ2FuZWxvbiBHcmFuZGVUVXhWVUVOQlRuT",
      "name": "Canelon Grande"
    },
    {
      "id": "TVhYQ2FuZWxvbiBHcmFuZGUgRGUgUGFjaGVjb",
      "name": "Canelon Grande De Pacheco"
    },
    {
      "id": "TVhYQ2FuZWxvbiBHcmFuZGUgTm9ydGVUVXhWV",
      "name": "Canelon Grande Norte"
    },
    {
      "id": "TUxVQ0NBTjgxOWJi",
      "name": "Canelones"
    },
    {
      "id": "TVhYQ2FwaWxsYSBEZSBDZWxsYVRVeFZVRU5CV",
      "name": "Capilla De Cella"
    },
    {
      "id": "TVhYQ2FybWVsVFV4VlVFTkJUbk14TnpsaVl3",
      "name": "Carmel"
    },
    {
      "id": "TVhYQ2FycmFzY28gRGVsIFNhdWNlVFV4VlVFT",
      "name": "Carrasco Del Sauce"
    },
    {
      "id": "TVhYQ2FzYXJpbm9UVXhWVUVOQlRuTXhOemxpW",
      "name": "Casarino"
    },
    {
      "id": "TVhYQ2HDsWFkYSBDYXJkb3pvVFV4VlVFTkJUb",
      "name": "Cañada Cardozo"
    },
    {
      "id": "TVhYQ2HDsWFkYSBEZSBNb250YcOxb1RVeFZVR",
      "name": "Cañada De Montaño"
    },
    {
      "id": "TVhYQ2HDsWFkYSBHcmFuZGVUVXhWVUVOQlRuT",
      "name": "Cañada Grande"
    },
    {
      "id": "TVhYQ2HDsWFkYSBQcnVkZW5jaW9UVXhWVUVOQ",
      "name": "Cañada Prudencio"
    },
    {
      "id": "TUxVQ0NFUjUyMTg",
      "name": "Cerrillos"
    },
    {
      "id": "TVhYQ2VycmlsbG9zIEFsIE9lc3RlVFV4VlVFT",
      "name": "Cerrillos Al Oeste"
    },
    {
      "id": "TVhYQ2VycmlsbG9zIEFsIFN1clRVeFZVRU5CV",
      "name": "Cerrillos Al Sur"
    },
    {
      "id": "TVhYQ2l0eSBHb2xmVFV4VlVFTkJUbk14Tnpsa",
      "name": "City Golf"
    },
    {
      "id": "TUxVQ0NJVTY5NzM",
      "name": "Ciudad de la Costa"
    },
    {
      "id": "TVhYQ29jaGVuZ29UVXhWVUVOQlRuTXhOemxpW",
      "name": "Cochengo"
    },
    {
      "id": "TVhYQ29saW5hcyBEZSBDYXJyYXNjb1RVeFZVR",
      "name": "Colinas De Carrasco"
    },
    {
      "id": "TUxVQ0NPTDU1Mzgw",
      "name": "Colinas de Solymar"
    },
    {
      "id": "TVhYQ29sb25pYSBUcmVpbnRhIFkgVHJlcyBPc",
      "name": "Colonia Treinta Y Tres Orientales"
    },
    {
      "id": "TVhYQ29sb3JhZG8gQ2hpY29UVXhWVUVOQlRuT",
      "name": "Colorado Chico"
    },
    {
      "id": "TVhYQ29sb3JhZG8gWSBCcnVqYXNUVXhWVUVOQ",
      "name": "Colorado Y Brujas"
    },
    {
      "id": "TUxVQ0NPU2RjZjlk",
      "name": "Costa Azul"
    },
    {
      "id": "TVhYQ29zdGEgRGUgUGFuZG9UVXhWVUVOQlRuT",
      "name": "Costa De Pando"
    },
    {
      "id": "TVhYQ29zdGEgRGUgUGFuZG8gT2xtb3NUVXhWV",
      "name": "Costa De Pando Olmos"
    },
    {
      "id": "TVhYQ29zdGEgRGUgUGFuZG8gU2FuIEJhdXRpc",
      "name": "Costa De Pando San Bautista"
    },
    {
      "id": "TVhYQ29zdGEgRGUgUGFuZG8gU2FuIEphY2lud",
      "name": "Costa De Pando San Jacinto"
    },
    {
      "id": "TVhYQ29zdGEgRGVsIFBhbnRhbm9zb1RVeFZVR",
      "name": "Costa Del Pantanoso"
    },
    {
      "id": "TVhYQ29zdGEgRGVsIFNhdWNlVFV4VlVFTkJUb",
      "name": "Costa Del Sauce"
    },
    {
      "id": "TVhYQ29zdGEgRGVsIFRhbGEgRXN0ZVRVeFZVR",
      "name": "Costa Del Tala Este"
    },
    {
      "id": "TVhYQ29zdGEgRGVsIFRhbGEgTm9ydGVUVXhWV",
      "name": "Costa Del Tala Norte"
    },
    {
      "id": "TVhYQ29zdGEgWSBHdWlsbGFtb25UVXhWVUVOQ",
      "name": "Costa Y Guillamon"
    },
    {
      "id": "TVhYQ29zdGFzIERlIFBlZGVybmFsVFV4VlVFT",
      "name": "Costas De Pedernal"
    },
    {
      "id": "TVhYQ29zdGFzIERlIFNhbnRhIEx1Y2lhVFV4V",
      "name": "Costas De Santa Lucia"
    },
    {
      "id": "TVhYQ29zdGFzIERlIFNvbGlzVFV4VlVFTkJUb",
      "name": "Costas De Solis"
    },
    {
      "id": "TVhYQ29zdGFzIERlbCBDb2xvcmFkb1RVeFZVR",
      "name": "Costas Del Colorado"
    },
    {
      "id": "TVhYQ29zdGFzIERlbCBDb2xvcmFkbyBFc3RlV",
      "name": "Costas Del Colorado Este"
    },
    {
      "id": "TVhYQ29zdGFzIERlbCBUYWxhVFV4VlVFTkJUb",
      "name": "Costas Del Tala"
    },
    {
      "id": "TVhYQ3J1eiBEZSBMb3MgQ2FtaW5vc1RVeFZVR",
      "name": "Cruz De Los Caminos"
    },
    {
      "id": "TUxVQ0NVQ2FmYjBh",
      "name": "Cuchilla Alta"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgQWx0YSBZIEVsIEdhbGVvb",
      "name": "Cuchilla Alta Y El Galeon"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgQ2FibyBEZSBIb3Jub3NUV",
      "name": "Cuchilla Cabo De Hornos"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgTWFjaGluVFV4VlVFT",
      "name": "Cuchilla De Machin"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgUm9jaGFUVXhWVUVOQ",
      "name": "Cuchilla De Rocha"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgU2llcnJhVFV4VlVFT",
      "name": "Cuchilla De Sierra"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgWmViYWxsb3NUVXhWV",
      "name": "Cuchilla De Zeballos"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgVmVyZGVUVXhWVUVOQlRuT",
      "name": "Cuchilla Verde"
    },
    {
      "id": "TVhYQ3VldmEgRGVsIFRpZ3JlVFV4VlVFTkJUb",
      "name": "Cueva Del Tigre"
    },
    {
      "id": "TVhYQ3VtYnJlcyBEZSBDYXJyYXNjb1RVeFZVR",
      "name": "Cumbres De Carrasco"
    },
    {
      "id": "TVhYRWNoZXZhcnJpYVRVeFZVRU5CVG5NeE56b",
      "name": "Echevarria"
    },
    {
      "id": "TUxVQ0VMWjY5ODRi",
      "name": "El Bosque"
    },
    {
      "id": "TVhYRWwgQm9zcXVlIERlIFNvbHltYXJUVXhWV",
      "name": "El Bosque De Solymar"
    },
    {
      "id": "TVhYRWwgQ29sb3JhZG9UVXhWVUVOQlRuTXhOe",
      "name": "El Colorado"
    },
    {
      "id": "TVhYRWwgQ29sb3JhZG8gRGUgTWlndWVzVFV4V",
      "name": "El Colorado De Migues"
    },
    {
      "id": "TVhYRWwgQ29sb3JhZG8gU2FuIEJhdXRpc3RhV",
      "name": "El Colorado San Bautista"
    },
    {
      "id": "TVhYRWwgQ3VhZHJvVFV4VlVFTkJUbk14Tnpsa",
      "name": "El Cuadro"
    },
    {
      "id": "TUxVQ0VMWjZmMzdm",
      "name": "El Dorado"
    },
    {
      "id": "TVhYRWwgR2FsZW9uVFV4VlVFTkJUbk14Tnpsa",
      "name": "El Galeon"
    },
    {
      "id": "TUxVQ0VMWjcwMmFl",
      "name": "El Pinar"
    },
    {
      "id": "TVhYRW1wYWxtZSBEb2dsaW90dGlUVXhWVUVOQ",
      "name": "Empalme Dogliotti"
    },
    {
      "id": "TVhYRW1wYWxtZSBOaWNvbGljaFRVeFZVRU5CV",
      "name": "Empalme Nicolich"
    },
    {
      "id": "TUxVQ0VNUDgwYTYw",
      "name": "Empalme Olmos"
    },
    {
      "id": "TVhYRW1wYWxtZSBTYXVjZVRVeFZVRU5CVG5Ne",
      "name": "Empalme Sauce"
    },
    {
      "id": "TVhYRXNxdWluYSBHb256YWxlelRVeFZVRU5CV",
      "name": "Esquina Gonzalez"
    },
    {
      "id": "TUxVQ0VTVGRlMjVm",
      "name": "Est. Atlántida"
    },
    {
      "id": "TVhYRXN0YWNpb24gTWlndWVzVFV4VlVFTkJUb",
      "name": "Estacion Migues"
    },
    {
      "id": "TVhYRXN0YWNpb24gUGllZHJhcyBEZSBBZmlsY",
      "name": "Estacion Piedras De Afilar"
    },
    {
      "id": "TVhYRXN0YWNpb24gVGFwaWFUVXhWVUVOQlRuT",
      "name": "Estacion Tapia"
    },
    {
      "id": "TUxVQ0VTVGVjNzhl",
      "name": "Estación Pedrera"
    },
    {
      "id": "TUxVQ0VTVDMzMTA",
      "name": "Estación la Floresta"
    },
    {
      "id": "TVhYRXN0YW5xdWUgRGUgUGFuZG9UVXhWVUVOQ",
      "name": "Estanque De Pando"
    },
    {
      "id": "TVhYRmVsaWNpYW5vVFV4VlVFTkJUbk14Tnpsa",
      "name": "Feliciano"
    },
    {
      "id": "TUxVQ0ZPUjFjNWYz",
      "name": "Fortin de Santa Rosa"
    },
    {
      "id": "TVhYRnJhY2MgU29icmUgUnV0YSA3NFRVeFZVR",
      "name": "Fracc Sobre Ruta 74"
    },
    {
      "id": "TVhYRnJhY2MuIENuby4gQW5kYWx1eiBZIFIuO",
      "name": "Fracc. Cno. Andaluz Y R.84"
    },
    {
      "id": "TVhYRnJhY2MuIFByb2dyZXNvVFV4VlVFTkJUb",
      "name": "Fracc. Progreso"
    },
    {
      "id": "TUxVQ0NPTDkxNDU",
      "name": "General Líber Seregni"
    },
    {
      "id": "TVhYR3VhenV2aXJhIE51ZXZvVFV4VlVFTkJUb",
      "name": "Guazuvira Nuevo"
    },
    {
      "id": "TUxVQ0dVQTE0NzQ",
      "name": "Guazú-Virá"
    },
    {
      "id": "TVhYSGFyYXMgRGVsIExhZ29UVXhWVUVOQlRuT",
      "name": "Haras Del Lago"
    },
    {
      "id": "TVhYSW5zdGl0dXRvIEFkdmVudGlzdGFUVXhWV",
      "name": "Instituto Adventista"
    },
    {
      "id": "TVhYSmFyZGluZXMgRGUgUGFuZG9UVXhWVUVOQ",
      "name": "Jardines De Pando"
    },
    {
      "id": "TUxVQ0pBVTQ2NWYz",
      "name": "Jaureguiberry"
    },
    {
      "id": "TUxVQ0pPQTgwMTE",
      "name": "Joaquín Suárez"
    },
    {
      "id": "TUxVQ0pVQTE3NDQ",
      "name": "Juan Antonio Artigas"
    },
    {
      "id": "TUxVQ0pVQWM5Y2Ey",
      "name": "Juanicó"
    },
    {
      "id": "TVhYTGEgQXN1bmNpb25UVXhWVUVOQlRuTXhOe",
      "name": "La Asuncion"
    },
    {
      "id": "TVhYTGEgQ2hpbmNoaWxsYVRVeFZVRU5CVG5Ne",
      "name": "La Chinchilla"
    },
    {
      "id": "TUxVQ0xBWjcyMGIw",
      "name": "La Floresta"
    },
    {
      "id": "TVhYTGEgSnVhbmFUVXhWVUVOQlRuTXhOemxpW",
      "name": "La Juana"
    },
    {
      "id": "TVhYTGEgTW9udGHDsWVzYVRVeFZVRU5CVG5Ne",
      "name": "La Montañesa"
    },
    {
      "id": "TVhYTGEgUGFsbWl0YVRVeFZVRU5CVG5NeE56b",
      "name": "La Palmita"
    },
    {
      "id": "TVhYTGEgUGFsb21hVFV4VlVFTkJUbk14Tnpsa",
      "name": "La Paloma"
    },
    {
      "id": "TUxVQ0xBWmM2OTVm",
      "name": "La Paz"
    },
    {
      "id": "TVhYTGEgVGFob25hVFV4VlVFTkJUbk14Tnpsa",
      "name": "La Tahona"
    },
    {
      "id": "TVhYTGEgVG90b3JhVFV4VlVFTkJUbk14Tnpsa",
      "name": "La Totora"
    },
    {
      "id": "TUxVQ0xBWmMzZjYw",
      "name": "La Tuna"
    },
    {
      "id": "TVhYTGFnbyBKYXJkaW4gRGVsIEJvc3F1ZVRVe",
      "name": "Lago Jardin Del Bosque"
    },
    {
      "id": "TUxVQ0xBRzNhZDFl",
      "name": "Lagomar"
    },
    {
      "id": "TVhYTGFzIEJydWphc1RVeFZVRU5CVG5NeE56b",
      "name": "Las Brujas"
    },
    {
      "id": "TVhYTGFzIEhpZ3Vlcml0YXNUVXhWVUVOQlRuT",
      "name": "Las Higueritas"
    },
    {
      "id": "TUxVQ0xBU2I5Y2Vi",
      "name": "Las Piedras"
    },
    {
      "id": "TVhYTGFzIFJhbmFzVFV4VlVFTkJUbk14Tnpsa",
      "name": "Las Ranas"
    },
    {
      "id": "TUxVQ0xBUzZmZGEw",
      "name": "Las Toscas"
    },
    {
      "id": "TUxVQ0xBUzM0NTc",
      "name": "Las Vegas"
    },
    {
      "id": "TVhYTGFzIFZpb2xldGFzVFV4VlVFTkJUbk14T",
      "name": "Las Violetas"
    },
    {
      "id": "TVhYTG9tYXMgRGUgQ2FycmFzY29UVXhWVUVOQ",
      "name": "Lomas De Carrasco"
    },
    {
      "id": "TVhYTG9tYXMgRGUgVG9sZWRvVFV4VlVFTkJUb",
      "name": "Lomas De Toledo"
    },
    {
      "id": "TUxVQ0xPTWQ1NGJi",
      "name": "Lomas de Solymar"
    },
    {
      "id": "TVhYTG9zIENlaWJvc1RVeFZVRU5CVG5NeE56b",
      "name": "Los Ceibos"
    },
    {
      "id": "TUxVQ0xPU2VmMDNj",
      "name": "Los Cerrillos"
    },
    {
      "id": "TVhYTG9zIEhvcm5vc1RVeFZVRU5CVG5NeE56b",
      "name": "Los Hornos"
    },
    {
      "id": "TUxVQ0xPUzg2Zjhi",
      "name": "Los Titanes"
    },
    {
      "id": "TVhYTWFjYW5hVFV4VlVFTkJUbk14TnpsaVl3",
      "name": "Macana"
    },
    {
      "id": "TVhYTWFyZ2F0VFV4VlVFTkJUbk14TnpsaVl3",
      "name": "Margat"
    },
    {
      "id": "TUxVQ01BUjhiNzFh",
      "name": "Marindia"
    },
    {
      "id": "TUxVQ01BVDZiZWJl",
      "name": "Mata Siete"
    },
    {
      "id": "TVhYTWF0YW9qb1RVeFZVRU5CVG5NeE56bGlZd",
      "name": "Mataojo"
    },
    {
      "id": "TVhYTWVsZ2FyZWpvVFV4VlVFTkJUbk14Tnpsa",
      "name": "Melgarejo"
    },
    {
      "id": "TVhYTWVsaWxsYVRVeFZVRU5CVG5NeE56bGlZd",
      "name": "Melilla"
    },
    {
      "id": "TUxVQ01JR2NmNDc",
      "name": "Migues"
    },
    {
      "id": "TVhYTW9udGVzVFV4VlVFTkJUbk14TnpsaVl3",
      "name": "Montes"
    },
    {
      "id": "TUxVQ01PTmE3ZGUx",
      "name": "Montes de Solymar"
    },
    {
      "id": "TVhYTXVyaWFsZG9UVXhWVUVOQlRuTXhOemxpW",
      "name": "Murialdo"
    },
    {
      "id": "TUxVQ03JRGI1NTAy",
      "name": "Médanos de Solymar"
    },
    {
      "id": "TVhYTmF0YWx5VFV4VlVFTkJUbk14TnpsaVl3",
      "name": "Nataly"
    },
    {
      "id": "TUxVQ05FUGUzZjkz",
      "name": "Neptunia"
    },
    {
      "id": "TVhYTnV0cmlhc1RVeFZVRU5CVG5NeE56bGlZd",
      "name": "Nutrias"
    },
    {
      "id": "TVhYT2xtb3NUVXhWVUVOQlRuTXhOemxpWXc",
      "name": "Olmos"
    },
    {
      "id": "TUxVQ09UUjY1ODI",
      "name": "Otras"
    },
    {
      "id": "TUxVQ1BBTjQzOWU5",
      "name": "Pando"
    },
    {
      "id": "TVhYUGFudGFub3NvVFV4VlVFTkJUbk14Tnpsa",
      "name": "Pantanoso"
    },
    {
      "id": "TVhYUGFudGFub3NvIERlbCBTYXVjZVRVeFZVR",
      "name": "Pantanoso Del Sauce"
    },
    {
      "id": "TVhYUGFyYWRhIENhYnJlcmFUVXhWVUVOQlRuT",
      "name": "Parada Cabrera"
    },
    {
      "id": "TVhYUGFyYWRvciBUYWplc1RVeFZVRU5CVG5Ne",
      "name": "Parador Tajes"
    },
    {
      "id": "TVhYUGFycXVlIENhcnJhc2NvVFV4VlVFTkJUb",
      "name": "Parque Carrasco"
    },
    {
      "id": "TVhYUGFycXVlIE1pcmFtYXJUVXhWVUVOQlRuT",
      "name": "Parque Miramar"
    },
    {
      "id": "TUxVQ1BBUmJlZWI3",
      "name": "Parque de Solymar"
    },
    {
      "id": "TUxVQ1BBUmJhNGJl",
      "name": "Parque del Plata"
    },
    {
      "id": "TVhYUGFzbyBBcmJlbG9UVXhWVUVOQlRuTXhOe",
      "name": "Paso Arbelo"
    },
    {
      "id": "TVhYUGFzbyBEZSBDdWVsbG9UVXhWVUVOQlRuT",
      "name": "Paso De Cuello"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYSBDYWRlbmFUVXhWVUVOQ",
      "name": "Paso De La Cadena"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYSBQYWxvbWFUVXhWVUVOQ",
      "name": "Paso De La Paloma"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYSBTYWxhbWFuY2FUVXhWV",
      "name": "Paso De La Salamanca"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYXMgVG9zY2FzVFV4VlVFT",
      "name": "Paso De Las Toscas"
    },
    {
      "id": "TVhYUGFzbyBEZSBMb3MgQWxhbW9zVFV4VlVFT",
      "name": "Paso De Los Alamos"
    },
    {
      "id": "TVhYUGFzbyBEZSBMb3MgRGlmdW50b3NUVXhWV",
      "name": "Paso De Los Difuntos"
    },
    {
      "id": "TVhYUGFzbyBEZSBMb3MgRnJhbmNvc1RVeFZVR",
      "name": "Paso De Los Francos"
    },
    {
      "id": "TVhYUGFzbyBEZSBQYWNoZVRVeFZVRU5CVG5Ne",
      "name": "Paso De Pache"
    },
    {
      "id": "TVhYUGFzbyBEZWwgQm90ZVRVeFZVRU5CVG5Ne",
      "name": "Paso Del Bote"
    },
    {
      "id": "TVhYUGFzbyBEZWwgQ29sb3JhZG9UVXhWVUVOQ",
      "name": "Paso Del Colorado"
    },
    {
      "id": "TVhYUGFzbyBEZWwgTWVkaW9UVXhWVUVOQlRuT",
      "name": "Paso Del Medio"
    },
    {
      "id": "TVhYUGFzbyBEZWwgU29yZG9UVXhWVUVOQlRuT",
      "name": "Paso Del Sordo"
    },
    {
      "id": "TVhYUGFzbyBFc3Bpbm9zYVRVeFZVRU5CVG5Ne",
      "name": "Paso Espinosa"
    },
    {
      "id": "TVhYUGFzbyBQYWxvbWVxdWVUVXhWVUVOQlRuT",
      "name": "Paso Palomeque"
    },
    {
      "id": "TVhYUGFzbyBSaXZlcm8gRGUgVmVqaWdhc1RVe",
      "name": "Paso Rivero De Vejigas"
    },
    {
      "id": "TUxVQ1BBUzk5ODk",
      "name": "Paso de Carrasco"
    },
    {
      "id": "TVhYUGVkZXJuYWxUVXhWVUVOQlRuTXhOemxpW",
      "name": "Pedernal"
    },
    {
      "id": "TVhYUGVkZXJuYWwgQ2hpY29UVXhWVUVOQlRuT",
      "name": "Pedernal Chico"
    },
    {
      "id": "TVhYUGVkZXJuYWwgR3JhbmRlVFV4VlVFTkJUb",
      "name": "Pedernal Grande"
    },
    {
      "id": "TVhYUGllZHJhIERlbCBUb3JvVFV4VlVFTkJUb",
      "name": "Piedra Del Toro"
    },
    {
      "id": "TVhYUGllZHJhIFNvbGFUVXhWVUVOQlRuTXhOe",
      "name": "Piedra Sola"
    },
    {
      "id": "TUxVQ0VTVDhiYTYx",
      "name": "Piedras de Afilar"
    },
    {
      "id": "TVhYUGllZHJpdGFzVFV4VlVFTkJUbk14Tnpsa",
      "name": "Piedritas"
    },
    {
      "id": "TVhYUGllZHJpdGFzIERlIFN1YXJlelRVeFZVR",
      "name": "Piedritas De Suarez"
    },
    {
      "id": "TUxVQ1BJTjgzODMz",
      "name": "Pinamar"
    },
    {
      "id": "TVhYUGluYW1hciBZIFBpbmVwYXJrVFV4VlVFT",
      "name": "Pinamar Y Pinepark"
    },
    {
      "id": "TUxVQ1BJTmUzZDgz",
      "name": "Pinares de Solymar"
    },
    {
      "id": "TVhYUGluZSBQYXJrVFV4VlVFTkJUbk14Tnpsa",
      "name": "Pine Park"
    },
    {
      "id": "TVhYUG9uY2UgTWF0YSBTaWV0ZVRVeFZVRU5CV",
      "name": "Ponce Mata Siete"
    },
    {
      "id": "TVhYUG9xdWl0b3NUVXhWVUVOQlRuTXhOemxpW",
      "name": "Poquitos"
    },
    {
      "id": "TUxVQ1BST2UxNWVh",
      "name": "Progreso"
    },
    {
      "id": "TVhYUHVlYmxvIENhc3RlbGxhbm9zVFV4VlVFT",
      "name": "Pueblo Castellanos"
    },
    {
      "id": "TUxVQ1BVRTY3OTg",
      "name": "Pueblo Suizo"
    },
    {
      "id": "TVhYUHVlbnRlIERlIEJydWphc1RVeFZVRU5CV",
      "name": "Puente De Brujas"
    },
    {
      "id": "TVhYUHVudGFzIERlIEJydWphc1RVeFZVRU5CV",
      "name": "Puntas De Brujas"
    },
    {
      "id": "TVhYUHVudGFzIERlIENhbmVsb24gQ2hpY29UV",
      "name": "Puntas De Canelon Chico"
    },
    {
      "id": "TVhYUHVudGFzIERlIENhw7FhZGEgQ2FyZG96b",
      "name": "Puntas De Cañada Cardozo"
    },
    {
      "id": "TVhYUHVudGFzIERlIENhw7FhZGEgR3JhbmRlV",
      "name": "Puntas De Cañada Grande"
    },
    {
      "id": "TVhYUHVudGFzIERlIENvY2hlbmdvVFV4VlVFT",
      "name": "Puntas De Cochengo"
    },
    {
      "id": "TVhYUHVudGFzIERlIExhcyBWaW9sZXRhc1RVe",
      "name": "Puntas De Las Violetas"
    },
    {
      "id": "TVhYUHVudGFzIERlIE1hdGEgU2lldGVUVXhWV",
      "name": "Puntas De Mata Siete"
    },
    {
      "id": "TVhYUHVudGFzIERlIFBhbnRhbm9zb1RVeFZVR",
      "name": "Puntas De Pantanoso"
    },
    {
      "id": "TVhYUHVudGFzIERlIFBhbnRhbm9zbyBFc3RlV",
      "name": "Puntas De Pantanoso Este"
    },
    {
      "id": "TVhYUHVudGFzIERlIFBlZHJlcmFUVXhWVUVOQ",
      "name": "Puntas De Pedrera"
    },
    {
      "id": "TVhYUHVudGFzIERlIFRvbGVkb1RVeFZVRU5CV",
      "name": "Puntas De Toledo"
    },
    {
      "id": "TVhYUHVudGFzIERlIFZlamlnYXNUVXhWVUVOQ",
      "name": "Puntas De Vejigas"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBBcmVuYWxUVXhWVUVOQ",
      "name": "Puntas Del Arenal"
    },
    {
      "id": "TVhYUXVpbnRhIExvcyBIb3JuZXJvc1RVeFZVR",
      "name": "Quinta Los Horneros"
    },
    {
      "id": "TVhYUXVpbnRhcyBEZWwgQm9zcXVlVFV4VlVFT",
      "name": "Quintas Del Bosque"
    },
    {
      "id": "TVhYUmFuY2hlcmlvcyBEZSBQb25jZVRVeFZVR",
      "name": "Rancherios De Ponce"
    },
    {
      "id": "TVhYUmluY29uIERlIENhcnJhc2NvVFV4VlVFT",
      "name": "Rincon De Carrasco"
    },
    {
      "id": "TVhYUmluY29uIERlIFBhbmRvVFV4VlVFTkJUb",
      "name": "Rincon De Pando"
    },
    {
      "id": "TVhYUmluY29uIERlIFBvcnRlenVlbG9UVXhWV",
      "name": "Rincon De Portezuelo"
    },
    {
      "id": "TVhYUmluY29uIERlIFZlbGF6cXVlelRVeFZVR",
      "name": "Rincon De Velazquez"
    },
    {
      "id": "TVhYUmluY29uIERlIFZpZGFsVFV4VlVFTkJUb",
      "name": "Rincon De Vidal"
    },
    {
      "id": "TVhYUmluY29uIERlbCBDb2xvcmFkb1RVeFZVR",
      "name": "Rincon Del Colorado"
    },
    {
      "id": "TVhYUmluY29uIERlbCBDb25kZVRVeFZVRU5CV",
      "name": "Rincon Del Conde"
    },
    {
      "id": "TVhYUmluY29uIERlbCBHaWdhbnRlVFV4VlVFT",
      "name": "Rincon Del Gigante"
    },
    {
      "id": "TUxVQ1NBTDJkNWNh",
      "name": "Salinas"
    },
    {
      "id": "TVhYU2FuIEFuZHJlc1RVeFZVRU5CVG5NeE56b",
      "name": "San Andres"
    },
    {
      "id": "TUxVQ1NBTjgzMzBk",
      "name": "San Antonio"
    },
    {
      "id": "TUxVQ1NBTjVjMjJh",
      "name": "San Bautista"
    },
    {
      "id": "TUxVQ1NBTjk1NDI",
      "name": "San Cristóbal"
    },
    {
      "id": "TUxVQ1NBTmNmOGYz",
      "name": "San Jacinto"
    },
    {
      "id": "TUxVQ1NBTjJmMzc",
      "name": "San José de Carrasco"
    },
    {
      "id": "TUxVQ1NBTjExNmM",
      "name": "San Luis"
    },
    {
      "id": "TVhYU2FuIFBlZHJvVFV4VlVFTkJUbk14Tnpsa",
      "name": "San Pedro"
    },
    {
      "id": "TUxVQ1NBTmFkZGU2",
      "name": "San Ramón"
    },
    {
      "id": "TUxVQ1NBTjUxMGUy",
      "name": "Santa Ana"
    },
    {
      "id": "TUxVQ1NBTjI1MTVj",
      "name": "Santa Lucía"
    },
    {
      "id": "TUxVQ1NBTjNkZTVh",
      "name": "Santa Lucía del Este"
    },
    {
      "id": "TUxVQ1NBTmQ3NmEx",
      "name": "Santa Rosa"
    },
    {
      "id": "TUxVQ1NBTmU4Yzg1",
      "name": "Santa Teresita"
    },
    {
      "id": "TVhYU2FudG9zIEx1Z2FyZXNUVXhWVUVOQlRuT",
      "name": "Santos Lugares"
    },
    {
      "id": "TVhYU2FyYW5kaSBEZSBNaWd1ZXNUVXhWVUVOQ",
      "name": "Sarandi De Migues"
    },
    {
      "id": "TUxVQ1NBVTQ3ZDc2",
      "name": "Sauce"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgU29saXNUVXhWVUVOQlRuT",
      "name": "Sauce De Solis"
    },
    {
      "id": "TVhYU2F1Y2UgU29sb1RVeFZVRU5CVG5NeE56b",
      "name": "Sauce Solo"
    },
    {
      "id": "TVhYU2F1Y2UgU29sbyBEZSBNaWd1ZXNUVXhWV",
      "name": "Sauce Solo De Migues"
    },
    {
      "id": "TVhYU2F1Y2UgU29sbyBEZSBNb250ZXNUVXhWV",
      "name": "Sauce Solo De Montes"
    },
    {
      "id": "TVhYU2VpcyBIZXJtYW5vc1RVeFZVRU5CVG5Ne",
      "name": "Seis Hermanos"
    },
    {
      "id": "TUxVQ1NIQTJlZDky",
      "name": "Shangrilá"
    },
    {
      "id": "TUxVQ1NJRWM1NWJj",
      "name": "Sierra del Mar"
    },
    {
      "id": "TUxVQ1NPQzE4NGJi",
      "name": "Soca"
    },
    {
      "id": "TVhYU29maWEgU2FudG9zVFV4VlVFTkJUbk14T",
      "name": "Sofia Santos"
    },
    {
      "id": "TVhYU29saXMgQ2hpY28gRGUgTWlndWVzVFV4V",
      "name": "Solis Chico De Migues"
    },
    {
      "id": "TUxVQ1NPTDU0N2Fh",
      "name": "Solymar"
    },
    {
      "id": "TUxVQ1NPTDk4ODc5",
      "name": "Solís Chico"
    },
    {
      "id": "TVhYU29zYSBEaWF6VFV4VlVFTkJUbk14Tnpsa",
      "name": "Sosa Diaz"
    },
    {
      "id": "TUxVQ1NVwTQ5Zjg5",
      "name": "Suárez"
    },
    {
      "id": "TUxVQ1RBTDFiZGQ",
      "name": "Tala"
    },
    {
      "id": "TVhYVGFsaXRhVFV4VlVFTkJUbk14TnpsaVl3",
      "name": "Talita"
    },
    {
      "id": "TUxVQ1RPTGYyYzQw",
      "name": "Toledo"
    },
    {
      "id": "TUxVQ1RPVGQwNmU4",
      "name": "Totoral"
    },
    {
      "id": "TVhYVmVqaWdhc1RVeFZVRU5CVG5NeE56bGlZd",
      "name": "Vejigas"
    },
    {
      "id": "TVhYVmVqaWdhcyBEZSBTYW4gUmFtb25UVXhWV",
      "name": "Vejigas De San Ramon"
    },
    {
      "id": "TVhYVmVqaWdhcyBEZSBUYWxhVFV4VlVFTkJUb",
      "name": "Vejigas De Tala"
    },
    {
      "id": "TVhYVmllam8gTW9saW5vIFNhbiBCZXJuYXJkb",
      "name": "Viejo Molino San Bernardo"
    },
    {
      "id": "TUxVQ1ZJTDcyMzg",
      "name": "Villa Aeroparque"
    },
    {
      "id": "TVhYVmlsbGEgQXJlam9UVXhWVUVOQlRuTXhOe",
      "name": "Villa Arejo"
    },
    {
      "id": "TUxVQ1ZJTDQ1Nzhh",
      "name": "Villa Argentina"
    },
    {
      "id": "TUxVQ1ZJTDk0ODM",
      "name": "Villa Crespo"
    },
    {
      "id": "TVhYVmlsbGEgRWwgVGF0b1RVeFZVRU5CVG5Ne",
      "name": "Villa El Tato"
    },
    {
      "id": "TVhYVmlsbGEgRW5jYW50YWRhVFV4VlVFTkJUb",
      "name": "Villa Encantada"
    },
    {
      "id": "TUxVQ1ZJTDg4OTQ",
      "name": "Villa Felicidad"
    },
    {
      "id": "TVhYVmlsbGEgRm9yZXN0aVRVeFZVRU5CVG5Ne",
      "name": "Villa Foresti"
    },
    {
      "id": "TVhYVmlsbGEgRm9ydHVuYVRVeFZVRU5CVG5Ne",
      "name": "Villa Fortuna"
    },
    {
      "id": "TVhYVmlsbGEgSGFkaXRhVFV4VlVFTkJUbk14T",
      "name": "Villa Hadita"
    },
    {
      "id": "TVhYVmlsbGEgSHVlcnRvcyBEZSBUb2xlZG9UV",
      "name": "Villa Huertos De Toledo"
    },
    {
      "id": "TVhYVmlsbGEgSnVhbmFUVXhWVUVOQlRuTXhOe",
      "name": "Villa Juana"
    },
    {
      "id": "TVhYVmlsbGEgSnVhbml0YVRVeFZVRU5CVG5Ne",
      "name": "Villa Juanita"
    },
    {
      "id": "TVhYVmlsbGEgTG9zIEFscGVzVFV4VlVFTkJUb",
      "name": "Villa Los Alpes"
    },
    {
      "id": "TVhYVmlsbGEgTWFyaW5hVFV4VlVFTkJUbk14T",
      "name": "Villa Marina"
    },
    {
      "id": "TVhYVmlsbGEgTW9sZmlub1RVeFZVRU5CVG5Ne",
      "name": "Villa Molfino"
    },
    {
      "id": "TVhYVmlsbGEgTnVldmFUVXhWVUVOQlRuTXhOe",
      "name": "Villa Nueva"
    },
    {
      "id": "TVhYVmlsbGEgUGF6IFMuQS5UVXhWVUVOQlRuT",
      "name": "Villa Paz S.A."
    },
    {
      "id": "TVhYVmlsbGEgUHJhZG9zIERlIFRvbGVkb1RVe",
      "name": "Villa Prados De Toledo"
    },
    {
      "id": "TVhYVmlsbGEgU2FuIENvbm9UVXhWVUVOQlRuT",
      "name": "Villa San Cono"
    },
    {
      "id": "TVhYVmlsbGEgU2FuIEZlbGlwZVRVeFZVRU5CV",
      "name": "Villa San Felipe"
    },
    {
      "id": "TUxVQ1ZJTDMzODk",
      "name": "Villa San José"
    },
    {
      "id": "TVhYVmlsbGEgVmFsdmVyZGVUVXhWVUVOQlRuT",
      "name": "Villa Valverde"
    },
    {
      "id": "TUxVQ1ZJUzY1MWM",
      "name": "Vista Linda"
    }
  ],
  'TUxVUENPTGExMTUwOQ': [
    {
      "id": "TVhYQWdyYWNpYWRhVFV4VlVFTlBUR0V4TVRVd",
      "name": "Agraciada"
    },
    {
      "id": "TVhYQXJyaXZpbGxhZ2FUVXhWVUVOUFRHRXhNV",
      "name": "Arrivillaga"
    },
    {
      "id": "TVhYQXJ0aWxsZXJvc1RVeFZVRU5QVEdFeE1UV",
      "name": "Artilleros"
    },
    {
      "id": "TVhYQmFya2VyVFV4VlVFTlBUR0V4TVRVd09R",
      "name": "Barker"
    },
    {
      "id": "TVhYQmFya2VyIE5vcnRlVFV4VlVFTlBUR0V4T",
      "name": "Barker Norte"
    },
    {
      "id": "TVhYQmFycmFuY2FzIENvbG9yYWRhc1RVeFZVR0",
      "name": "Barrancas Coloradas"
    },
    {
      "id": "TVhYQmFycmlvIE1lbmRhw7FhVFV4VlVFTlBUR",
      "name": "Barrio Mendaña"
    },
    {
      "id": "TVhYQmFycmlvIE9saW1waWNvVFV4VlVFTlBUR",
      "name": "Barrio Olimpico"
    },
    {
      "id": "TVhYQmVsZ3Jhbm8gTm9ydGVUVXhWVUVOUFRHR",
      "name": "Belgrano Norte"
    },
    {
      "id": "TVhYQmVsZ3Jhbm8gU3VyVFV4VlVFTlBUR0V4T",
      "name": "Belgrano Sur"
    },
    {
      "id": "TVhYQmxhbmNhIEFyZW5hVFV4VlVFTlBUR0V4T",
      "name": "Blanca Arena"
    },
    {
      "id": "TVhYQm9jYSBEZWwgUm9zYXJpbyBPZXN0ZVRVe",
      "name": "Boca Del Rosario Oeste"
    },
    {
      "id": "TUxVQ0JPQ2NhMGYw",
      "name": "Boca del Rosario"
    },
    {
      "id": "TVhYQm9uam91clRVeFZVRU5QVEdFeE1UVXdPU",
      "name": "Bonjour"
    },
    {
      "id": "TVhYQnJpc2FzIERlbCBQbGF0YVRVeFZVRU5QV",
      "name": "Brisas Del Plata"
    },
    {
      "id": "TVhYQnVlbmEgSG9yYVRVeFZVRU5QVEdFeE1UV",
      "name": "Buena Hora"
    },
    {
      "id": "TVhYQ2FtcGFtZW50byBBcnRpZ2FzVFV4VlVFT",
      "name": "Campamento Artigas"
    },
    {
      "id": "TUxVQ0NBTTczMDA",
      "name": "Campana"
    },
    {
      "id": "TUxVQ0NBUjM5ZGZj",
      "name": "Carmelo"
    },
    {
      "id": "TVhYQ2FzZXJpbyBFbCBDZXJyb1RVeFZVRU5QV",
      "name": "Caserio El Cerro"
    },
    {
      "id": "TVhYQ2Vycm8gQ2FybWVsb1RVeFZVRU5QVEdFe",
      "name": "Cerro Carmelo"
    },
    {
      "id": "TVhYQ2Vycm8gRGUgTGFzIEFybWFzVFV4VlVFT",
      "name": "Cerro De Las Armas"
    },
    {
      "id": "TVhYQ2Vycm9zIERlIFNhbiBKdWFuVFV4VlVFT",
      "name": "Cerros De San Juan"
    },
    {
      "id": "TVhYQ2Vycm9zIE5lZ3Jvc1RVeFZVRU5QVEdFe",
      "name": "Cerros Negros"
    },
    {
      "id": "TVhYQ2hpY28gVG9yaW5vVFV4VlVFTlBUR0V4T",
      "name": "Chico Torino"
    },
    {
      "id": "TVhYQ29sb25pYSBBcnJ1ZVRVeFZVRU5QVEdFe",
      "name": "Colonia Arrue"
    },
    {
      "id": "TVhYQ29sb25pYSBDb3Ntb3BvbGl0YVRVeFZVR",
      "name": "Colonia Cosmopolita"
    },
    {
      "id": "TVhYQ29sb25pYSBFc3Bhw7FvbGFUVXhWVUVOU",
      "name": "Colonia Española"
    },
    {
      "id": "TVhYQ29sb25pYSBFc3RyZWxsYVRVeFZVRU5QV",
      "name": "Colonia Estrella"
    },
    {
      "id": "TVhYQ29sb25pYSBNaWd1ZWxldGVUVXhWVUVOU",
      "name": "Colonia Miguelete"
    },
    {
      "id": "TVhYQ29sb25pYSBQZWlyYW5vVFV4VlVFTlBUR",
      "name": "Colonia Peirano"
    },
    {
      "id": "TVhYQ29sb25pYSBRdWV2ZWRvVFV4VlVFTlBUR",
      "name": "Colonia Quevedo"
    },
    {
      "id": "TVhYQ29sb25pYSBTYXJhbmRpVFV4VlVFTlBUR",
      "name": "Colonia Sarandi"
    },
    {
      "id": "TVhYQ29sb25pYSBUYWxpY2VUVXhWVUVOUFRHR",
      "name": "Colonia Talice"
    },
    {
      "id": "TUxVQ0NPTGFkOTJj",
      "name": "Colonia Valdense"
    },
    {
      "id": "TUxVQ0NPTGM1MDQ0",
      "name": "Colonia del Sacramento"
    },
    {
      "id": "TVhYQ29uY2hpbGxhc1RVeFZVRU5QVEdFeE1UV",
      "name": "Conchillas"
    },
    {
      "id": "TVhYQ29uY29yZGlhVFV4VlVFTlBUR0V4TVRVd",
      "name": "Concordia"
    },
    {
      "id": "TVhYQ29zdGEgRGUgQ29sbGEgQWwgRXN0ZVRVe",
      "name": "Costa De Colla Al Este"
    },
    {
      "id": "TVhYQ29zdGEgRGUgUm9zYXJpb1RVeFZVRU5QV",
      "name": "Costa De Rosario"
    },
    {
      "id": "TVhYQ29zdGEgRGUgVGFyYXJpcmFzVFV4VlVFT",
      "name": "Costa De Tarariras"
    },
    {
      "id": "TVhYQ29zdGEgRGUgVmFjYXNUVXhWVUVOUFRHR",
      "name": "Costa De Vacas"
    },
    {
      "id": "TVhYQ29zdGEgRGVsIE5hdmFycm9UVXhWVUVOU",
      "name": "Costa Del Navarro"
    },
    {
      "id": "TVhYQ29zdGFzIERlIEp1YW4gR29uemFsZXpUV",
      "name": "Costas De Juan Gonzalez"
    },
    {
      "id": "TVhYQ29zdGFzIERlIFBvbG9uaWFUVXhWVUVOU",
      "name": "Costas De Polonia"
    },
    {
      "id": "TVhYQ29zdGFzIERlIFNhbiBKdWFuVFV4VlVFT",
      "name": "Costas De San Juan"
    },
    {
      "id": "TVhYQ3VmcmVUVXhWVUVOUFRHRXhNVFV3T1E",
      "name": "Cufre"
    },
    {
      "id": "TVhYQ3VydXBpVFV4VlVFTlBUR0V4TVRVd09R",
      "name": "Curupi"
    },
    {
      "id": "TVhYRWwgQmHDsWFkb1RVeFZVRU5QVEdFeE1UV",
      "name": "El Bañado"
    },
    {
      "id": "TVhYRWwgQ2HDsW9UVXhWVUVOUFRHRXhNVFV3T",
      "name": "El Caño"
    },
    {
      "id": "TVhYRWwgQ2Vycm9UVXhWVUVOUFRHRXhNVFV3T",
      "name": "El Cerro"
    },
    {
      "id": "TVhYRWwgQ2hpbGVub1RVeFZVRU5QVEdFeE1UV",
      "name": "El Chileno"
    },
    {
      "id": "TVhYRWwgQ3VhZHJvVFV4VlVFTlBUR0V4TVRVd",
      "name": "El Cuadro"
    },
    {
      "id": "TVhYRWwgRW5zdWXDsW9UVXhWVUVOUFRHRXhNV",
      "name": "El Ensueño"
    },
    {
      "id": "TVhYRWwgRmFyb1RVeFZVRU5QVEdFeE1UVXdPU",
      "name": "El Faro"
    },
    {
      "id": "TVhYRWwgR2VuZXJhbFRVeFZVRU5QVEdFeE1UV",
      "name": "El General"
    },
    {
      "id": "TVhYRWwgUXVpbnRvblRVeFZVRU5QVEdFeE1UV",
      "name": "El Quinton"
    },
    {
      "id": "TVhYRWwgU2VtaWxsZXJvVFV4VlVFTlBUR0V4T",
      "name": "El Semillero"
    },
    {
      "id": "TVhYRXN0YWNpb24gRXhwZXJpbWVudGFsIExhI",
      "name": "Estacion Experimental La Estanzuela"
    },
    {
      "id": "TVhYRXN0YW5jaWEgQW5jaG9yZW5hVFV4VlVFT",
      "name": "Estancia Anchorena"
    },
    {
      "id": "TUxVQ0ZMT2JkYzI",
      "name": "Florencio Sánchez"
    },
    {
      "id": "TVhYR2lsVFV4VlVFTlBUR0V4TVRVd09R",
      "name": "Gil"
    },
    {
      "id": "TVhYSnVhbiBDYXJsb3MgQ2FzZXJvc1RVeFZVR",
      "name": "Juan Carlos Caseros"
    },
    {
      "id": "TVhYSnVhbiBHb256YWxlelRVeFZVRU5QVEdFe",
      "name": "Juan Gonzalez"
    },
    {
      "id": "TVhYSnVhbiBKYWNrc29uVFV4VlVFTlBUR0V4T",
      "name": "Juan Jackson"
    },
    {
      "id": "TUxVQ0pVQWQ1ZWQ",
      "name": "Juan Lacaze"
    },
    {
      "id": "TVhYTGEgRXN0YW56dWVsYVRVeFZVRU5QVEdFe",
      "name": "La Estanzuela"
    },
    {
      "id": "TVhYTGEgSG9ycXVldGFUVXhWVUVOUFRHRXhNV",
      "name": "La Horqueta"
    },
    {
      "id": "TVhYTGEgUGF6VFV4VlVFTlBUR0V4TVRVd09R",
      "name": "La Paz"
    },
    {
      "id": "TVhYTGEgU2llcnJhVFV4VlVFTlBUR0V4TVRVd",
      "name": "La Sierra"
    },
    {
      "id": "TVhYTGFndW5hIERlIExvcyBQYXRvc1RVeFZVR",
      "name": "Laguna De Los Patos"
    },
    {
      "id": "TVhYTGFzIENoaXNwYXNUVXhWVUVOUFRHRXhNV",
      "name": "Las Chispas"
    },
    {
      "id": "TVhYTGFzIEZsb3Jlc1RVeFZVRU5QVEdFeE1UV",
      "name": "Las Flores"
    },
    {
      "id": "TVhYTG9tYXMgRGUgQ2FybWVsb1RVeFZVRU5QV",
      "name": "Lomas De Carmelo"
    },
    {
      "id": "TVhYTG9zIFBpbm9zVFV4VlVFTlBUR0V4TVRVd",
      "name": "Los Pinos"
    },
    {
      "id": "TVhYTWFuYW50aWFsZXNUVXhWVUVOUFRHRXhNV",
      "name": "Manantiales"
    },
    {
      "id": "TVhYTWFydGluIENoaWNvVFV4VlVFTlBUR0V4T",
      "name": "Martin Chico"
    },
    {
      "id": "TVhYTWFydGluIENoaWNvIERlIENvbmNoaWxsY",
      "name": "Martin Chico De Conchillas"
    },
    {
      "id": "TVhYTWVkaWEgQWd1YVRVeFZVRU5QVEdFeE1UV",
      "name": "Media Agua"
    },
    {
      "id": "TVhYTWlndWVsZXRlIERlIENvbmNoaWxsYXNUV",
      "name": "Miguelete De Conchillas"
    },
    {
      "id": "TVhYTWluYXMgRGUgTmFyYW5jaW9UVXhWVUVOU",
      "name": "Minas De Narancio"
    },
    {
      "id": "TVhYTWludWFubyBZIFNhdWNlVFV4VlVFTlBUR",
      "name": "Minuano Y Sauce"
    },
    {
      "id": "TVhYTW9sbGVzIERlIE1pZ3VlbGV0ZVRVeFZVR",
      "name": "Molles De Miguelete"
    },
    {
      "id": "TUxVQ05VRTljNDE",
      "name": "Nueva Helvecia"
    },
    {
      "id": "TUxVQ05VRTYxN2Rj",
      "name": "Nueva Palmira"
    },
    {
      "id": "TVhYT21idWVzIERlIExhdmFsbGVUVXhWVUVOU",
      "name": "Ombues De Lavalle"
    },
    {
      "id": "TUxVQ09UUjYzNjI",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFyYWplIE1pbnVhbm9UVXhWVUVOUFRHR",
      "name": "Paraje Minuano"
    },
    {
      "id": "TVhYUGFzbyBBbnRvbGluVFV4VlVFTlBUR0V4T",
      "name": "Paso Antolin"
    },
    {
      "id": "TVhYUGFzbyBCaXJyaWVsVFV4VlVFTlBUR0V4T",
      "name": "Paso Birriel"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYSBRdWludGFUVXhWVUVOU",
      "name": "Paso De La Quinta"
    },
    {
      "id": "TVhYUGFzbyBIb3NwaXRhbFRVeFZVRU5QVEdFe",
      "name": "Paso Hospital"
    },
    {
      "id": "TVhYUGFzbyBIb3NwaXRhbCBNYW5hbnRpYWxlc",
      "name": "Paso Hospital Manantiales"
    },
    {
      "id": "TVhYUGFzbyBNb3JsYW5UVXhWVUVOUFRHRXhNV",
      "name": "Paso Morlan"
    },
    {
      "id": "TVhYUGFzbyBRdWljaG9UVXhWVUVOUFRHRXhNV",
      "name": "Paso Quicho"
    },
    {
      "id": "TVhYUGFzdG9yZW9UVXhWVUVOUFRHRXhNVFV3T",
      "name": "Pastoreo"
    },
    {
      "id": "TVhYUGljYWRhIERlIEJlbml0ZXpUVXhWVUVOU",
      "name": "Picada De Benitez"
    },
    {
      "id": "TVhYUGllZHJhIENoYXRhVFV4VlVFTlBUR0V4T",
      "name": "Piedra Chata"
    },
    {
      "id": "TVhYUGllZHJhIERlIExvcyBJbmRpb3NUVXhWV",
      "name": "Piedra De Los Indios"
    },
    {
      "id": "TVhYUGllZHJhcyBCbGFuY2FzVFV4VlVFTlBUR",
      "name": "Piedras Blancas"
    },
    {
      "id": "TVhYUGxheWEgQXp1bFRVeFZVRU5QVEdFeE1UV",
      "name": "Playa Azul"
    },
    {
      "id": "TVhYUGxheWEgQnJpdG9wb2xpc1RVeFZVRU5QV",
      "name": "Playa Britopolis"
    },
    {
      "id": "TVhYUGxheWEgRm9tZW50b1RVeFZVRU5QVEdFe",
      "name": "Playa Fomento"
    },
    {
      "id": "TVhYUGxheWEgUGFyYW50VFV4VlVFTlBUR0V4T",
      "name": "Playa Parant"
    },
    {
      "id": "TVhYUG9sYW5jb3NUVXhWVUVOUFRHRXhNVFV3T",
      "name": "Polancos"
    },
    {
      "id": "TVhYUHVlcnRvIENvbmNvcmRpYVRVeFZVRU5QV",
      "name": "Puerto Concordia"
    },
    {
      "id": "TVhYUHVlcnRvIEluZ2xlc1RVeFZVRU5QVEdFe",
      "name": "Puerto Ingles"
    },
    {
      "id": "TVhYUHVlcnRvIFBsYXRlcm9UVXhWVUVOUFRHR",
      "name": "Puerto Platero"
    },
    {
      "id": "TVhYUHVlcnRvIFJvc2FyaW9UVXhWVUVOUFRHR",
      "name": "Puerto Rosario"
    },
    {
      "id": "TVhYUHVudGEgRnJhbmNlc2FUVXhWVUVOUFRHR",
      "name": "Punta Francesa"
    },
    {
      "id": "TVhYUHVudGFzIERlIEp1YW4gR29uemFsZXpUV",
      "name": "Puntas De Juan Gonzalez"
    },
    {
      "id": "TVhYUHVudGFzIERlIE1lbG9UVXhWVUVOUFRHR",
      "name": "Puntas De Melo"
    },
    {
      "id": "TVhYUHVudGFzIERlIFNhbiBKdWFuVFV4VlVFT",
      "name": "Puntas De San Juan"
    },
    {
      "id": "TVhYUHVudGFzIERlIFNhbiBQZWRyb1RVeFZVR",
      "name": "Puntas De San Pedro"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBSaWFjaHVlbG9UVXhWV",
      "name": "Puntas Del Riachuelo"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBSb3NhcmlvVFV4VlVFT",
      "name": "Puntas Del Rosario"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBTYXVjZVRVeFZVRU5QV",
      "name": "Puntas Del Sauce"
    },
    {
      "id": "TVhYUXVpbnRvblRVeFZVRU5QVEdFeE1UVXdPU",
      "name": "Quinton"
    },
    {
      "id": "TVhYUmFkaWFsIEhlcm5hbmRlelRVeFZVRU5QV",
      "name": "Radial Hernandez"
    },
    {
      "id": "TVhYUmFkaWFsIFJvc2FyaW9UVXhWVUVOUFRHR",
      "name": "Radial Rosario"
    },
    {
      "id": "TVhYUmVhbCBEZSBWZXJhVFV4VlVFTlBUR0V4T",
      "name": "Real De Vera"
    },
    {
      "id": "TVhYUmVkdWN0b1RVeFZVRU5QVEdFeE1UVXdPU",
      "name": "Reducto"
    },
    {
      "id": "TVhYUmVzZ3VhcmRvIEN1ZnJlVFV4VlVFTlBUR",
      "name": "Resguardo Cufre"
    },
    {
      "id": "TVhYUmlhY2h1ZWxvVFV4VlVFTlBUR0V4TVRVd",
      "name": "Riachuelo"
    },
    {
      "id": "TVhYUmluY29uIERlbCBSZXlUVXhWVUVOUFRHR",
      "name": "Rincon Del Rey"
    },
    {
      "id": "TUxVQ1JPUzQ5ZjNh",
      "name": "Rosario"
    },
    {
      "id": "TVhYUm9zYXJpbyBZIENvbGxhVFV4VlVFTlBUR",
      "name": "Rosario Y Colla"
    },
    {
      "id": "TVhYU2FuIEp1YW5UVXhWVUVOUFRHRXhNVFV3T",
      "name": "San Juan"
    },
    {
      "id": "TVhYU2FuIEx1aXNUVXhWVUVOUFRHRXhNVFV3T",
      "name": "San Luis"
    },
    {
      "id": "TVhYU2FuIEx1aXMgRGUgVGFyYXJpcmFzVFV4V",
      "name": "San Luis De Tarariras"
    },
    {
      "id": "TVhYU2FuIEx1aXMgU2FuY2hlelRVeFZVRU5QV",
      "name": "San Luis Sanchez"
    },
    {
      "id": "TVhYU2FuIFBlZHJvVFV4VlVFTlBUR0V4TVRVd",
      "name": "San Pedro"
    },
    {
      "id": "TVhYU2FuIFBlZHJvIERlIEFycmliYVRVeFZVR",
      "name": "San Pedro De Arriba"
    },
    {
      "id": "TVhYU2FuIFBlZHJvIE5vcnRlVFV4VlVFTlBUR",
      "name": "San Pedro Norte"
    },
    {
      "id": "TVhYU2FuIFJvcXVlVFV4VlVFTlBUR0V4TVRVd",
      "name": "San Roque"
    },
    {
      "id": "TUxVQ1NBTjg1NDU1Mw",
      "name": "Santa Ana"
    },
    {
      "id": "TVhYU2FudGEgUmVnaW5hVFV4VlVFTlBUR0V4T",
      "name": "Santa Regina"
    },
    {
      "id": "TVhYU2FudGEgUm9zYVRVeFZVRU5QVEdFeE1UV",
      "name": "Santa Rosa"
    },
    {
      "id": "TVhYU2FyYW5kaSBDYW1wYW5hVFV4VlVFTlBUR",
      "name": "Sarandi Campana"
    },
    {
      "id": "TUxVQ1RBUjY5YWMy",
      "name": "Tarariras"
    },
    {
      "id": "TVhYVGVybWluYWxUVXhWVUVOUFRHRXhNVFV3T",
      "name": "Terminal"
    },
    {
      "id": "TVhYVG9tYXMgQmVsbFRVeFZVRU5QVEdFeE1UV",
      "name": "Tomas Bell"
    },
    {
      "id": "TVhYVHJlcyBFc3F1aW5hc1RVeFZVRU5QVEdFe",
      "name": "Tres Esquinas"
    },
    {
      "id": "TUxVQ1ZBTDQzNjE",
      "name": "Valdenese"
    },
    {
      "id": "TVhYVmlib3Jhc1RVeFZVRU5QVEdFeE1UVXdPU",
      "name": "Viboras"
    },
    {
      "id": "TVhYVmlib3JhcyBZIFZhY2FzVFV4VlVFTlBUR",
      "name": "Viboras Y Vacas"
    },
    {
      "id": "TVhYVmlsbGEgUGFuY2hhVFV4VlVFTlBUR0V4T",
      "name": "Villa Pancha"
    },
    {
      "id": "TVhYWmFnYXJ6YXp1VFV4VlVFTlBUR0V4TVRVd",
      "name": "Zagarzazu"
    },
    {
      "id": "TVhYWnVuaW5UVXhWVUVOUFRHRXhNVFV3T1E",
      "name": "Zunin"
    }
  ],
  'TUxVUFJPQ1ozNWRm': [
    {
      "id": "TVhYMTggRGUgSnVsaW9UVXhWVUZKUFExb3pOV",
      "name": "18 De Julio"
    },
    {
      "id": "TVhYMTkgRGUgQWJyaWxUVXhWVUZKUFExb3pOV",
      "name": "19 De Abril"
    },
    {
      "id": "TVhYQWJyYSBEZSBBbGZlcmV6VFV4VlVGSlBRM",
      "name": "Abra De Alferez"
    },
    {
      "id": "TUxVQ0FHVWNmYTJk",
      "name": "Aguas Dulces"
    },
    {
      "id": "TVhYQW50b25pb3BvbGlzVFV4VlVGSlBRMW96T",
      "name": "Antoniopolis"
    },
    {
      "id": "TVhYQXJhY2hhbmlhVFV4VlVGSlBRMW96TldSb",
      "name": "Arachania"
    },
    {
      "id": "TVhYQXJib2xpdG9UVXhWVUZKUFExb3pOV1Jt",
      "name": "Arbolito"
    },
    {
      "id": "TUxVQ0JBTDE5ZmE",
      "name": "Balneario La Esmeralda"
    },
    {
      "id": "TVhYQmFsbmVhcmlvIFB1ZWJsbyBOdWV2b1RVe",
      "name": "Balneario Pueblo Nuevo"
    },
    {
      "id": "TVhYQmFycmEgSXNsYSBOZWdyYVRVeFZVRkpQU",
      "name": "Barra Isla Negra"
    },
    {
      "id": "TUxVQ0JBUjM4MTA1",
      "name": "Barra de Valizas"
    },
    {
      "id": "TUxVQ0JBUjE4NWNj",
      "name": "Barra del Chuy"
    },
    {
      "id": "TVhYQmFycmFuY2FzIERlIExhIENvcm9uaWxsY",
      "name": "Barrancas De La Coronilla"
    },
    {
      "id": "TVhYQmFycmlvIENhcmRvem9UVXhWVUZKUFExb",
      "name": "Barrio Cardozo"
    },
    {
      "id": "TVhYQmFycmlvIENhcnBhY2hvVFV4VlVGSlBRM",
      "name": "Barrio Carpacho"
    },
    {
      "id": "TVhYQmFycmlvIFBlcmVpcmFUVXhWVUZKUFExb",
      "name": "Barrio Pereira"
    },
    {
      "id": "TVhYQmFycmlvIFBvcnZlbmlyVFV4VlVGSlBRM",
      "name": "Barrio Porvenir"
    },
    {
      "id": "TVhYQmFycmlvIFRvcnJlc1RVeFZVRkpQUTFve",
      "name": "Barrio Torres"
    },
    {
      "id": "TUxVQ0NBQjY1MmQ1",
      "name": "Cabo Polonio"
    },
    {
      "id": "TVhYQ2FwYWNob1RVeFZVRkpQUTFvek5XUm0",
      "name": "Capacho"
    },
    {
      "id": "TUxVQ0NBUzQxYzlh",
      "name": "Castillos"
    },
    {
      "id": "TVhYQ2Vib2xsYXRpVFV4VlVGSlBRMW96TldSb",
      "name": "Cebollati"
    },
    {
      "id": "TVhYQ2Vycm8gRGUgTG9zIFJvY2hhVFV4VlVGS",
      "name": "Cerro De Los Rocha"
    },
    {
      "id": "TVhYQ2Vycm8gRGUgUGVzY2Fkb3Jlc1RVeFZVR",
      "name": "Cerro De Pescadores"
    },
    {
      "id": "TUxVQ0NIVThjNTFm",
      "name": "Chuy"
    },
    {
      "id": "TVhYQ29sb25pYSBHcmVpc3NpbmdUVXhWVUZKU",
      "name": "Colonia Greissing"
    },
    {
      "id": "TUxVQ0NPUzQzZDk0",
      "name": "Costa Azul"
    },
    {
      "id": "TVhYQ29zdGFzIERlIENlYm9sbGF0aVRVeFZVR",
      "name": "Costas De Cebollati"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgR2Fyem9uVFV4VlVGS",
      "name": "Cuchilla De Garzon"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGVsIEFyYm9saXRvVFV4V",
      "name": "Cuchilla Del Arbolito"
    },
    {
      "id": "TVhYRWwgQ2FuZWxvblRVeFZVRkpQUTFvek5XU",
      "name": "El Canelon"
    },
    {
      "id": "TVhYRWwgQ2hpbWFuZ29UVXhWVUZKUFExb3pOV",
      "name": "El Chimango"
    },
    {
      "id": "TUxVQ0VMUDM0OTI",
      "name": "El Palmar"
    },
    {
      "id": "TVhYRm9ydGluIERlIFNhbiBNaWd1ZWxUVXhWV",
      "name": "Fortin De San Miguel"
    },
    {
      "id": "TVhYR2Fyem9uIEFiYWpvVFV4VlVGSlBRMW96T",
      "name": "Garzon Abajo"
    },
    {
      "id": "TVhYR2Fyem9uIEFsIE1lZGlvVFV4VlVGSlBRM",
      "name": "Garzon Al Medio"
    },
    {
      "id": "TVhYR2Fyem9uIEFycmliYVRVeFZVRkpQUTFve",
      "name": "Garzon Arriba"
    },
    {
      "id": "TVhYSXNsYSBOZWdyYVRVeFZVRkpQUTFvek5XU",
      "name": "Isla Negra"
    },
    {
      "id": "TVhYS2lsb21ldHJvIDE4VFV4VlVGSlBRMW96T",
      "name": "Kilometro 18"
    },
    {
      "id": "TVhYTGEgQWd1YWRhVFV4VlVGSlBRMW96TldSb",
      "name": "La Aguada"
    },
    {
      "id": "TVhYTGEgQWd1YWRhIFkgQ29zdGEgQXp1bFRVe",
      "name": "La Aguada Y Costa Azul"
    },
    {
      "id": "TUxVQ0xBWmFlYzJh",
      "name": "La Coronilla"
    },
    {
      "id": "TUxVQ0xBWmYzMmU0",
      "name": "La Palma"
    },
    {
      "id": "TUxVQ0xBWmQ4YTc1",
      "name": "La Paloma"
    },
    {
      "id": "TUxVQ0xBWjQyNGEy",
      "name": "La Pedrera"
    },
    {
      "id": "TVhYTGEgUmliaWVyYVRVeFZVRkpQUTFvek5XU",
      "name": "La Ribiera"
    },
    {
      "id": "TVhYTGEgU2llcnJhVFV4VlVGSlBRMW96TldSb",
      "name": "La Sierra"
    },
    {
      "id": "TUxVQ0xBR2JkZGMy",
      "name": "Laguna de Rocha"
    },
    {
      "id": "TUxVQ0xBUzcyNDI",
      "name": "Las Garzas"
    },
    {
      "id": "TUxVQ0xBU2YyZDU1",
      "name": "Lascano"
    },
    {
      "id": "TVhYTG9tYXNUVXhWVUZKUFExb3pOV1Jt",
      "name": "Lomas"
    },
    {
      "id": "TVhYTG9zIEFqb3NUVXhWVUZKUFExb3pOV1Jt",
      "name": "Los Ajos"
    },
    {
      "id": "TVhYTG9zIENlcnJpbGxvc1RVeFZVRkpQUTFve",
      "name": "Los Cerrillos"
    },
    {
      "id": "TVhYTG9zIEluZGlvc1RVeFZVRkpQUTFvek5XU",
      "name": "Los Indios"
    },
    {
      "id": "TVhYT2NlYW5pYSBEZWwgUG9sb25pb1RVeFZVR",
      "name": "Oceania Del Polonio"
    },
    {
      "id": "TVhYT3JhdG9yaW9UVXhWVUZKUFExb3pOV1Jt",
      "name": "Oratorio"
    },
    {
      "id": "TUxVQ09UUjQxODQ",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFsbWFyVFV4VlVGSlBRMW96TldSbQ",
      "name": "Palmar"
    },
    {
      "id": "TVhYUGFsbWFyIERlIENhc3RpbGxvc1RVeFZVR",
      "name": "Palmar De Castillos"
    },
    {
      "id": "TVhYUGFsbWFyZXMgRGUgTGEgQ29yb25pbGxhV",
      "name": "Palmares De La Coronilla"
    },
    {
      "id": "TVhYUGFzbyBEZSBMb3BlelRVeFZVRkpQUTFve",
      "name": "Paso De Lopez"
    },
    {
      "id": "TVhYUGFzbyBEZWwgQmHDsWFkb1RVeFZVRkpQU",
      "name": "Paso Del Bañado"
    },
    {
      "id": "TVhYUGFzbyBEZWwgT21idVRVeFZVRkpQUTFve",
      "name": "Paso Del Ombu"
    },
    {
      "id": "TVhYUGFzbyBEb8OxYSBSb3NhVFV4VlVGSlBRM",
      "name": "Paso Doña Rosa"
    },
    {
      "id": "TVhYUGljYWRhIFRvbG9zYVRVeFZVRkpQUTFve",
      "name": "Picada Tolosa"
    },
    {
      "id": "TVhYUGxhbm8gMjkxVFV4VlVGSlBRMW96TldSb",
      "name": "Plano 291"
    },
    {
      "id": "TVhYUHVlYmxvIE51ZXZvVFV4VlVGSlBRMW96T",
      "name": "Pueblo Nuevo"
    },
    {
      "id": "TVhYUHVlbnRlIFZhbGl6YXNUVXhWVUZKUFExb",
      "name": "Puente Valizas"
    },
    {
      "id": "TVhYUHVlcnRvIERlIExvcyBCb3Rlc1RVeFZVR",
      "name": "Puerto De Los Botes"
    },
    {
      "id": "TVhYUHVpbWF5ZW5UVXhWVUZKUFExb3pOV1Jt",
      "name": "Puimayen"
    },
    {
      "id": "TVhYUHVudGEgQ2Vib2xsYXRpVFV4VlVGSlBRM",
      "name": "Punta Cebollati"
    },
    {
      "id": "TVhYUHVudGEgUGFsbWFyVFV4VlVGSlBRMW96T",
      "name": "Punta Palmar"
    },
    {
      "id": "TVhYUHVudGEgUnViaWFUVXhWVUZKUFExb3pOV",
      "name": "Punta Rubia"
    },
    {
      "id": "TUxVQ1BVTjE5ZTIw",
      "name": "Punta del Diablo"
    },
    {
      "id": "TVhYUHVudGFzIERlIERvbiBDYXJsb3NUVXhWV",
      "name": "Puntas De Don Carlos"
    },
    {
      "id": "TVhYUXVlYnJhY2hvVFV4VlVGSlBRMW96TldSb",
      "name": "Quebracho"
    },
    {
      "id": "TVhYUmluY29uIERlIExvcyBPbGl2ZXJhVFV4V0",
      "name": "Rincon De Los Olivera"
    },
    {
      "id": "TVhYUmluY29uIERlIFZhbGl6YXNUVXhWVUZKU",
      "name": "Rincon De Valizas"
    },
    {
      "id": "TUxVQ1JPQzFjOWE5",
      "name": "Rocha"
    },
    {
      "id": "TVhYU2FtdWVsVFV4VlVGSlBRMW96TldSbQ",
      "name": "Samuel"
    },
    {
      "id": "TVhYU2FuIEFudG9uaW9UVXhWVUZKUFExb3pOV",
      "name": "San Antonio"
    },
    {
      "id": "TVhYU2FuIEx1aXMgQWwgTWVkaW9UVXhWVUZKU",
      "name": "San Luis Al Medio"
    },
    {
      "id": "TVhYU2FuIFNlYmFzdGlhblRVeFZVRkpQUTFve",
      "name": "San Sebastian"
    },
    {
      "id": "TVhYU2FuIFNlYmFzdGlhbiBEZSBMYSBQZWRyZ",
      "name": "San Sebastian De La Pedrera"
    },
    {
      "id": "TUxVQ1NBTmVhNWRk",
      "name": "Santa Teresa"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgUm9jaGFUVXhWVUZKUFExb",
      "name": "Sauce De Rocha"
    },
    {
      "id": "TVhYU2llcnJhIERlIExvcyBSb2NoYVRVeFZVR",
      "name": "Sierra De Los Rocha"
    },
    {
      "id": "TVhYVGFqYW1hcmVzIERlIExhIFBlZHJlcmFUV",
      "name": "Tajamares De La Pedrera"
    },
    {
      "id": "TUxVQ1ZFTDhlZWM3",
      "name": "Velázquez"
    }
  ],
  'TUxVUFNBTloxMDk2NQ': [
    {
      "id": "TVhYMTggRGUgSnVsaW9UVXhWVUZOQlRsb3hNR",
      "name": "18 De Julio"
    },
    {
      "id": "TVhYQXJyb3lvIExsYW5vVFV4VlVGTkJUbG94T",
      "name": "Arroyo Llano"
    },
    {
      "id": "TUxVQ0FSUmE4YzU4",
      "name": "Arroyo de la Virgen"
    },
    {
      "id": "TVhYQXV0b2Ryb21vIE5hY2lvbmFsVFV4VlVGT",
      "name": "Autodromo Nacional"
    },
    {
      "id": "TUxVQ0JBTGI2MGNk",
      "name": "Balneario Kiyú"
    },
    {
      "id": "TVhYQmHDsWFkb1RVeFZVRk5CVGxveE1EazJOU",
      "name": "Bañado"
    },
    {
      "id": "TVhYQmVsbGEgVmlzdGFUVXhWVUZOQlRsb3hNR",
      "name": "Bella Vista"
    },
    {
      "id": "TVhYQm9jYSBEZWwgQ3VmcmVUVXhWVUZOQlRsb",
      "name": "Boca Del Cufre"
    },
    {
      "id": "TVhYQ2FnYW5jaGFUVXhWVUZOQlRsb3hNRGsyT",
      "name": "Cagancha"
    },
    {
      "id": "TVhYQ2FnYW5jaGEgQ2hpY29UVXhWVUZOQlRsb",
      "name": "Cagancha Chico"
    },
    {
      "id": "TVhYQ2FwdXJyb1RVeFZVRk5CVGxveE1EazJOU",
      "name": "Capurro"
    },
    {
      "id": "TUxVQ0NBUjkzYmI1",
      "name": "Carreta Quemada"
    },
    {
      "id": "TVhYQ2HDsWFkYSBHcmFuZGVUVXhWVUZOQlRsb",
      "name": "Cañada Grande"
    },
    {
      "id": "TVhYQ2VyYW1pY2FzIERlbCBTdXJUVXhWVUZOQ",
      "name": "Ceramicas Del Sur"
    },
    {
      "id": "TVhYQ2hhbWl6b1RVeFZVRk5CVGxveE1EazJOU",
      "name": "Chamizo"
    },
    {
      "id": "TUxVQ0NJVTI3NzE",
      "name": "Ciudad del Plata"
    },
    {
      "id": "TVhYQ29sb2xvIFRpbm9zYVRVeFZVRk5CVGxve",
      "name": "Cololo Tinosa"
    },
    {
      "id": "TUxVQ0NPTGUwMDhk",
      "name": "Colonia Agraria Delta"
    },
    {
      "id": "TVhYQ29sb25pYSBBbWVyaWNhVFV4VlVGTkJUb",
      "name": "Colonia America"
    },
    {
      "id": "TVhYQ29sb25pYSBEb2N0b3IgQmVybmFyZG8gR",
      "name": "Colonia Doctor Bernardo Etchepare"
    },
    {
      "id": "TVhYQ29sb25pYSBGZXJuYW5kZXogQ3Jlc3BvV",
      "name": "Colonia Fernandez Crespo"
    },
    {
      "id": "TVhYQ29sb25pYSBJdGFsaWFUVXhWVUZOQlRsb",
      "name": "Colonia Italia"
    },
    {
      "id": "TVhYQ29sb25pYSBKdWFuIE1hcmlhIFBlcmV6V",
      "name": "Colonia Juan Maria Perez"
    },
    {
      "id": "TVhYQ29sb25pYSBTYW4gSm9hcXVpblRVeFZVR",
      "name": "Colonia San Joaquin"
    },
    {
      "id": "TVhYQ29sb25pYSBXaWxzb25UVXhWVUZOQlRsb",
      "name": "Colonia Wilson"
    },
    {
      "id": "TVhYQ29yb25pbGxhVFV4VlVGTkJUbG94TURrM",
      "name": "Coronilla"
    },
    {
      "id": "TVhYQ29zdGEgRGVsIE1hdXJpY2lvVFV4VlVGT",
      "name": "Costa Del Mauricio"
    },
    {
      "id": "TVhYQ29zdGFzIERlIFBlcmVpcmFUVXhWVUZOQ",
      "name": "Costas De Pereira"
    },
    {
      "id": "TVhYQ29zdGFzIERlbCBTYXVjZVRVeFZVRk5CV",
      "name": "Costas Del Sauce"
    },
    {
      "id": "TVhYQ3J1eiBEZSBMb3MgQ2FtaW5vc1RVeFZVR0",
      "name": "Cruz De Los Caminos"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgUGVyZWlyYVRVeFZVR",
      "name": "Cuchilla De Pereira"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGVsIFZpY2hhZGVyb1RVe",
      "name": "Cuchilla Del Vichadero"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgU2VjYVRVeFZVRk5CVGxve",
      "name": "Cuchilla Seca"
    },
    {
      "id": "TVhYRGVsdGEgRWwgVGlncmVUVXhWVUZOQlRsb",
      "name": "Delta El Tigre"
    },
    {
      "id": "TUxVQ0VDSWFiNDVk",
      "name": "Ecilda Paullier"
    },
    {
      "id": "TVhYRXNjdWRlcm9UVXhWVUZOQlRsb3hNRGsyT",
      "name": "Escudero"
    },
    {
      "id": "TVhYRmFqYXJkb1RVeFZVRk5CVGxveE1EazJOU",
      "name": "Fajardo"
    },
    {
      "id": "TVhYRmFqaW5hVFV4VlVGTkJUbG94TURrMk5R",
      "name": "Fajina"
    },
    {
      "id": "TVhYR29uemFsZXpUVXhWVUZOQlRsb3hNRGsyT",
      "name": "Gonzalez"
    },
    {
      "id": "TVhYR3VheWN1cnVUVXhWVUZOQlRsb3hNRGsyT",
      "name": "Guaycuru"
    },
    {
      "id": "TVhYSXR1emFpbmdvVFV4VlVGTkJUbG94TURrM",
      "name": "Ituzaingo"
    },
    {
      "id": "TVhYSmVzdXMgTWFyaWFUVXhWVUZOQlRsb3hNR",
      "name": "Jesus Maria"
    },
    {
      "id": "TVhYSnVhbiBTb2xlclRVeFZVRk5CVGxveE1Ea",
      "name": "Juan Soler"
    },
    {
      "id": "TVhYSnVuY2FsVFV4VlVGTkJUbG94TURrMk5R",
      "name": "Juncal"
    },
    {
      "id": "TVhYTGEgQm95YWRhVFV4VlVGTkJUbG94TURrM",
      "name": "La Boyada"
    },
    {
      "id": "TVhYTGEgQ2FzaWxsYVRVeFZVRk5CVGxveE1Ea",
      "name": "La Casilla"
    },
    {
      "id": "TVhYTGEgQ3VjaGlsbGFUVXhWVUZOQlRsb3hNR",
      "name": "La Cuchilla"
    },
    {
      "id": "TVhYTGF1cmVsVFV4VlVGTkJUbG94TURrMk5R",
      "name": "Laurel"
    },
    {
      "id": "TUxVQ0xJQmM4Zjk0",
      "name": "Libertad"
    },
    {
      "id": "TVhYTWFob21hVFV4VlVGTkJUbG94TURrMk5R",
      "name": "Mahoma"
    },
    {
      "id": "TUxVQ01BTGJhOGE5",
      "name": "Mal Abrigo"
    },
    {
      "id": "TVhYTWFuZ3J1bGxvVFV4VlVGTkJUbG94TURrM",
      "name": "Mangrullo"
    },
    {
      "id": "TVhYTW9udGUgR3JhbmRlVFV4VlVGTkJUbG94T",
      "name": "Monte Grande"
    },
    {
      "id": "TVhYTXVuZG8gQXp1bFRVeFZVRk5CVGxveE1Ea",
      "name": "Mundo Azul"
    },
    {
      "id": "TVhYTXVuZG8gQXp1bCBBZ3VpcnJlVFV4VlVGT",
      "name": "Mundo Azul Aguirre"
    },
    {
      "id": "TVhYT3JpbGxhcyBEZWwgUGxhdGFUVXhWVUZOQ",
      "name": "Orillas Del Plata"
    },
    {
      "id": "TUxVQ09UUjYzOTE",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFjaGluYVRVeFZVRk5CVGxveE1EazJOU",
      "name": "Pachina"
    },
    {
      "id": "TVhYUGFudGFUVXhWVUZOQlRsb3hNRGsyTlE",
      "name": "Panta"
    },
    {
      "id": "TVhYUGFudGFub3NvVFV4VlVGTkJUbG94TURrM",
      "name": "Pantanoso"
    },
    {
      "id": "TVhYUGFycXVlIFBvc3RlbFRVeFZVRk5CVGxve",
      "name": "Parque Postel"
    },
    {
      "id": "TVhYUGFycXVlIFBvc3RlbCBDbmVsLiBBZHJpY",
      "name": "Parque Postel Cnel. Adrian Medina"
    },
    {
      "id": "TVhYUGFzbyBCZWxhc3RpcXVpVFV4VlVGTkJUb",
      "name": "Paso Belastiqui"
    },
    {
      "id": "TVhYUGFzbyBEZSBDYW1lc1RVeFZVRk5CVGxve",
      "name": "Paso De Cames"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYXMgUGllZHJhc1RVeFZVR",
      "name": "Paso De Las Piedras"
    },
    {
      "id": "TVhYUGFzbyBEZSBNYXNUVXhWVUZOQlRsb3hNR",
      "name": "Paso De Mas"
    },
    {
      "id": "TVhYUGFzbyBEZWwgQ2FycmV0b25UVXhWVUZOQ",
      "name": "Paso Del Carreton"
    },
    {
      "id": "TVhYUGFzbyBEZWwgR3VheWN1cnVUVXhWVUZOQ",
      "name": "Paso Del Guaycuru"
    },
    {
      "id": "TVhYUGFzbyBEZWwgUmV5VFV4VlVGTkJUbG94T",
      "name": "Paso Del Rey"
    },
    {
      "id": "TVhYUGF2b25UVXhWVUZOQlRsb3hNRGsyTlE",
      "name": "Pavon"
    },
    {
      "id": "TVhYUGVuaW5vVFV4VlVGTkJUbG94TURrMk5R",
      "name": "Penino"
    },
    {
      "id": "TVhYUGVyaWNvIFBlcmV6VFV4VlVGTkJUbG94T",
      "name": "Perico Perez"
    },
    {
      "id": "TVhYUGljYWRhIEdhbWJldHRhVFV4VlVGTkJUb",
      "name": "Picada Gambetta"
    },
    {
      "id": "TUxVQ1BMQTUwNTc",
      "name": "Playa Pascual"
    },
    {
      "id": "TVhYUHVudGFzIERlIENhZ2FuY2hhVFV4VlVGT",
      "name": "Puntas De Cagancha"
    },
    {
      "id": "TVhYUHVudGFzIERlIENhw7FhZGEgR3JhbmRlV0",
      "name": "Puntas De Cañada Grande"
    },
    {
      "id": "TVhYUHVudGFzIERlIENoYW1pem9UVXhWVUZOQ",
      "name": "Puntas De Chamizo"
    },
    {
      "id": "TVhYUHVudGFzIERlIEdyZWdvcmlvVFV4VlVGT",
      "name": "Puntas De Gregorio"
    },
    {
      "id": "TVhYUHVudGFzIERlIExhdXJlbFRVeFZVRk5CV",
      "name": "Puntas De Laurel"
    },
    {
      "id": "TVhYUHVudGFzIERlIFRyb3BhIFZpZWphVFV4V",
      "name": "Puntas De Tropa Vieja"
    },
    {
      "id": "TVhYUHVudGFzIERlIFZhbGRlelRVeFZVRk5CV",
      "name": "Puntas De Valdez"
    },
    {
      "id": "TVhYUmFkaWFsIFJ1dGEgM1RVeFZVRk5CVGxve",
      "name": "Radial Ruta 3"
    },
    {
      "id": "TUxVQ1JBRmE3Mzgz",
      "name": "Rafael Perazza"
    },
    {
      "id": "TVhYUmFpZ29uVFV4VlVGTkJUbG94TURrMk5R",
      "name": "Raigon"
    },
    {
      "id": "TVhYUmluY29uIERlIEFsYmFub1RVeFZVRk5CV",
      "name": "Rincon De Albano"
    },
    {
      "id": "TVhYUmluY29uIERlIEFyYXphdGlUVXhWVUZOQ",
      "name": "Rincon De Arazati"
    },
    {
      "id": "TVhYUmluY29uIERlIEFyaWFzVFV4VlVGTkJUb",
      "name": "Rincon De Arias"
    },
    {
      "id": "TVhYUmluY29uIERlIEJ1c2NoZW50YWxUVXhWV",
      "name": "Rincon De Buschental"
    },
    {
      "id": "TVhYUmluY29uIERlIEN1ZnJlVFV4VlVGTkJUb",
      "name": "Rincon De Cufre"
    },
    {
      "id": "TVhYUmluY29uIERlIExhIEJvbHNhVFV4VlVGT",
      "name": "Rincon De La Bolsa"
    },
    {
      "id": "TVhYUmluY29uIERlIExhIFRvcnJlVFV4VlVGT",
      "name": "Rincon De La Torre"
    },
    {
      "id": "TVhYUmluY29uIERlIE5hemFyZXRoVFV4VlVGT",
      "name": "Rincon De Nazareth"
    },
    {
      "id": "TVhYUmluY29uIERlbCBQaW5vVFV4VlVGTkJUb",
      "name": "Rincon Del Pino"
    },
    {
      "id": "TVhYUm9jaG9UVXhWVUZOQlRsb3hNRGsyTlE",
      "name": "Rocho"
    },
    {
      "id": "TVhYU2FmaWNpVFV4VlVGTkJUbG94TURrMk5R",
      "name": "Safici"
    },
    {
      "id": "TVhYU2FuIEZlcm5hbmRvVFV4VlVGTkJUbG94T",
      "name": "San Fernando"
    },
    {
      "id": "TVhYU2FuIEZlcm5hbmRvIENoaWNvVFV4VlVGT",
      "name": "San Fernando Chico"
    },
    {
      "id": "TVhYU2FuIEdyZWdvcmlvVFV4VlVGTkJUbG94T",
      "name": "San Gregorio"
    },
    {
      "id": "TUxVQ1NBTjJmNWQz",
      "name": "San José de Mayo"
    },
    {
      "id": "TVhYU2FudGEgTW9uaWNhVFV4VlVGTkJUbG94T",
      "name": "Santa Monica"
    },
    {
      "id": "TVhYU2F1Y2VUVXhWVUZOQlRsb3hNRGsyTlE",
      "name": "Sauce"
    },
    {
      "id": "TVhYU2F1Y2UgQ2hpY29UVXhWVUZOQlRsb3hNR",
      "name": "Sauce Chico"
    },
    {
      "id": "TVhYU2Nhdmlub1RVeFZVRk5CVGxveE1EazJOU",
      "name": "Scavino"
    },
    {
      "id": "TVhYVGFiYXJlelRVeFZVRk5CVGxveE1EazJOU",
      "name": "Tabarez"
    },
    {
      "id": "TVhYVGFsYSBEZSBQZXJlaXJhVFV4VlVGTkJUb",
      "name": "Tala De Pereira"
    },
    {
      "id": "TVhYVHJhbnF1ZXJhIENvbG9yYWRhVFV4VlVGT",
      "name": "Tranquera Colorada"
    },
    {
      "id": "TUxVQ1RST2QwNjQ4",
      "name": "Tropas Viejas"
    },
    {
      "id": "TVhYVHJvcGV6b25UVXhWVUZOQlRsb3hNRGsyT",
      "name": "Tropezon"
    },
    {
      "id": "TVhYVmFsZGV6IENoaWNvVFV4VlVGTkJUbG94T",
      "name": "Valdez Chico"
    },
    {
      "id": "TVhYVmlsbGEgTWFyaWFUVXhWVUZOQlRsb3hNR",
      "name": "Villa Maria"
    },
    {
      "id": "TVhYVmlsbGEgT2xpbXBpY2FUVXhWVUZOQlRsb",
      "name": "Villa Olimpica"
    },
    {
      "id": "TVhYVmlsbGEgUml2ZXNUVXhWVUZOQlRsb3hNR",
      "name": "Villa Rives"
    },
    {
      "id": "TUxVQ1JPRGQ3Y2Fj",
      "name": "Villa Rodriguez"
    },
    {
      "id": "TVhYWmFuamEgSG9uZGFUVXhWVUZOQlRsb3hNR",
      "name": "Zanja Honda"
    }
  ],
  'TUxVUExBVlpkNTI0': [
    {
      "id": "TVhYMTkgRGUgSnVuaW9UVXhWVUV4QlZscGtOV",
      "name": "19 De Junio"
    },
    {
      "id": "TVhYQWJyYSBEZSBaYWJhbGV0YVRVeFZVRXhCV",
      "name": "Abra De Zabaleta"
    },
    {
      "id": "TUxVQ0FHVTQyOGEz",
      "name": "Aguas Blancas"
    },
    {
      "id": "TVhYQWxvbnNvVFV4VlVFeEJWbHBrTlRJMA",
      "name": "Alonso"
    },
    {
      "id": "TVhYQXJhbWVuZGlhVFV4VlVFeEJWbHBrTlRJM",
      "name": "Aramendia"
    },
    {
      "id": "TVhYQXJlcXVpdGFUVXhWVUV4QlZscGtOVEkw",
      "name": "Arequita"
    },
    {
      "id": "TVhYQXJyb3lvIERlIExvcyBQYXRvc1RVeFZVR",
      "name": "Arroyo De Los Patos"
    },
    {
      "id": "TVhYQXJyb3lvIERlbCBNZWRpb1RVeFZVRXhCV",
      "name": "Arroyo Del Medio"
    },
    {
      "id": "TVhYQXp1Y2FyVFV4VlVFeEJWbHBrTlRJMA",
      "name": "Azucar"
    },
    {
      "id": "TVhYQmFycmEgRGUgTG9zIENoYW5jaG9zVFV4V",
      "name": "Barra De Los Chanchos"
    },
    {
      "id": "TVhYQmFycmFuY2FzVFV4VlVFeEJWbHBrTlRJM",
      "name": "Barrancas"
    },
    {
      "id": "TVhYQmFycmlnYSBOZWdyYVRVeFZVRXhCVmxwa",
      "name": "Barriga Negra"
    },
    {
      "id": "TVhYQmFycmlvIExhIENvcm9uaWxsYSAtIEFuY",
      "name": "Barrio La Coronilla - Ancap"
    },
    {
      "id": "TVhYQmxhbmVzIFZpYWxlVFV4VlVFeEJWbHBrT",
      "name": "Blanes Viale"
    },
    {
      "id": "TVhYQ2FtcGFuZXJvVFV4VlVFeEJWbHBrTlRJM",
      "name": "Campanero"
    },
    {
      "id": "TVhYQ2FudGVyYXMgRGVsIFZlcmR1blRVeFZVR",
      "name": "Canteras Del Verdun"
    },
    {
      "id": "TVhYQ2FybmFsZXNUVXhWVUV4QlZscGtOVEkw",
      "name": "Carnales"
    },
    {
      "id": "TVhYQ2FzdXBhVFV4VlVFeEJWbHBrTlRJMA",
      "name": "Casupa"
    },
    {
      "id": "TVhYQ2FzdXBhIENoaWNvVFV4VlVFeEJWbHBrT",
      "name": "Casupa Chico"
    },
    {
      "id": "TVhYQ2Vycm8gUGVsYWRvVFV4VlVFeEJWbHBrT",
      "name": "Cerro Pelado"
    },
    {
      "id": "TVhYQ2hhbWFtZVRVeFZVRXhCVmxwa05USTA",
      "name": "Chamame"
    },
    {
      "id": "TVhYQ29sb25UVXhWVUV4QlZscGtOVEkw",
      "name": "Colon"
    },
    {
      "id": "TVhYQ29uc2VqbyBEZWwgTmnDsW9UVXhWVUV4Q",
      "name": "Consejo Del Niño"
    },
    {
      "id": "TVhYQ29zdGEgRGVsIExlbmd1YXpvVFV4VlVFe",
      "name": "Costa Del Lenguazo"
    },
    {
      "id": "TVhYQ29zdGFzIERlIENvcnJhbGVzVFV4VlVFe",
      "name": "Costas De Corrales"
    },
    {
      "id": "TVhYQ29zdGFzIERlbCBTb2xkYWRvVFV4VlVFe",
      "name": "Costas Del Soldado"
    },
    {
      "id": "TVhYRWwgQWx0b1RVeFZVRXhCVmxwa05USTA",
      "name": "El Alto"
    },
    {
      "id": "TVhYRWwgUGVyZGlkb1RVeFZVRXhCVmxwa05US",
      "name": "El Perdido"
    },
    {
      "id": "TVhYRWwgU29sZGFkb1RVeFZVRXhCVmxwa05US",
      "name": "El Soldado"
    },
    {
      "id": "TVhYRWwgVGlncmVUVXhWVUV4QlZscGtOVEkw",
      "name": "El Tigre"
    },
    {
      "id": "TVhYRXNwdWVsaXRhc1RVeFZVRXhCVmxwa05US",
      "name": "Espuelitas"
    },
    {
      "id": "TVhYRXN0YWNpb24gQW5kcmVvbmlUVXhWVUV4Q",
      "name": "Estacion Andreoni"
    },
    {
      "id": "TVhYRXN0YWNpb24gT3J0aXpUVXhWVUV4QlZsc",
      "name": "Estacion Ortiz"
    },
    {
      "id": "TVhYRXN0YWNpb24gU29saXNUVXhWVUV4QlZsc",
      "name": "Estacion Solis"
    },
    {
      "id": "TVhYR2FldGFuIChDdWNoaWxsYSBEZSBDYXJiY",
      "name": "Gaetan (Cuchilla De Carbajal)"
    },
    {
      "id": "TVhYR29kb3lUVXhWVUV4QlZscGtOVEkw",
      "name": "Godoy"
    },
    {
      "id": "TVhYR3V0aWVycmV6VFV4VlVFeEJWbHBrTlRJM",
      "name": "Gutierrez"
    },
    {
      "id": "TVhYSGlndWVyaXRhc1RVeFZVRXhCVmxwa05US",
      "name": "Higueritas"
    },
    {
      "id": "TVhYSWxsZXNjYXNUVXhWVUV4QlZscGtOVEkw",
      "name": "Illescas"
    },
    {
      "id": "TUxVQ0JBVGE0ODFm",
      "name": "José Batlle y Ordoñez"
    },
    {
      "id": "TUxVQ0pPUzM3MmIw",
      "name": "José Pedro Varela"
    },
    {
      "id": "TVhYTGEgQ3VjaGlsbGFUVXhWVUV4QlZscGtOV",
      "name": "La Cuchilla"
    },
    {
      "id": "TVhYTGEgUGxhdGFUVXhWVUV4QlZscGtOVEkw",
      "name": "La Plata"
    },
    {
      "id": "TVhYTGFkcmlsbG9zVFV4VlVFeEJWbHBrTlRJM",
      "name": "Ladrillos"
    },
    {
      "id": "TVhYTGFycm9zYVRVeFZVRXhCVmxwa05USTA",
      "name": "Larrosa"
    },
    {
      "id": "TVhYTGFzIEFjaGlyYXNUVXhWVUV4QlZscGtOV",
      "name": "Las Achiras"
    },
    {
      "id": "TVhYTG9zIENlaWJvc1RVeFZVRXhCVmxwa05US",
      "name": "Los Ceibos"
    },
    {
      "id": "TVhYTG9zIFRhcGVzVFV4VlVFeEJWbHBrTlRJM",
      "name": "Los Tapes"
    },
    {
      "id": "TVhYTWFuZ3VlcmEgQXp1bFRVeFZVRXhCVmxwa",
      "name": "Manguera Azul"
    },
    {
      "id": "TVhYTWFyY28gRGUgTG9zIFJleWVzVFV4VlVFe",
      "name": "Marco De Los Reyes"
    },
    {
      "id": "TVhYTWFyaWEgSXNhYmVsVFV4VlVFeEJWbHBrT",
      "name": "Maria Isabel"
    },
    {
      "id": "TVhYTWFyaXNjYWxhVFV4VlVFeEJWbHBrTlRJM",
      "name": "Mariscala"
    },
    {
      "id": "TVhYTWFybWFyYWphVFV4VlVFeEJWbHBrTlRJM",
      "name": "Marmaraja"
    },
    {
      "id": "TUxVQ01JTjE1NmI4",
      "name": "Minas"
    },
    {
      "id": "TVhYTW9sbGVzIERlIEFpZ3VhVFV4VlVFeEJWb",
      "name": "Molles De Aigua"
    },
    {
      "id": "TVhYTW9sbGVzIERlIENhw7FhZGEgR3JhbmRlV",
      "name": "Molles De Cañada Grande"
    },
    {
      "id": "TVhYTW9sbGVzIERlbCBTYXVjZVRVeFZVRXhCV",
      "name": "Molles Del Sauce"
    },
    {
      "id": "TVhYT21idWVzIERlIEJlbnRhbmNvclRVeFZVR",
      "name": "Ombues De Bentancor"
    },
    {
      "id": "TVhYT3J0aXogQ2FzdHJvVFV4VlVFeEJWbHBrT",
      "name": "Ortiz Castro"
    },
    {
      "id": "TUxVQ09UUjU1ODY",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFudGVvblRVeFZVRXhCVmxwa05USTA",
      "name": "Panteon"
    },
    {
      "id": "TVhYUGFzbyBEZSBMb3MgVHJvbmNvc1RVeFZVR",
      "name": "Paso De Los Troncos"
    },
    {
      "id": "TVhYUGFzbyBEZSBNZXNhVFV4VlVFeEJWbHBrT",
      "name": "Paso De Mesa"
    },
    {
      "id": "TVhYUGlyYXJhamFUVXhWVUV4QlZscGtOVEkw",
      "name": "Piraraja"
    },
    {
      "id": "TUxVQ1BPTDdkMjk2",
      "name": "Polanco"
    },
    {
      "id": "TVhYUG9sYW5jbyBOb3J0ZVRVeFZVRXhCVmxwa",
      "name": "Polanco Norte"
    },
    {
      "id": "TVhYUG9sYW5jbyBTdXJUVXhWVUV4QlZscGtOV",
      "name": "Polanco Sur"
    },
    {
      "id": "TVhYUG9yb3JvVFV4VlVFeEJWbHBrTlRJMA",
      "name": "Pororo"
    },
    {
      "id": "TVhYUHVlbnRlIERlIE1hcm1hcmFqYVRVeFZVR",
      "name": "Puente De Marmaraja"
    },
    {
      "id": "TVhYUHVudGFzIERlIEJhcnJpZ2EgTmVncmFUV",
      "name": "Puntas De Barriga Negra"
    },
    {
      "id": "TVhYUHVudGFzIERlIExvcyBDaGFuY2hvc1RVe",
      "name": "Puntas De Los Chanchos"
    },
    {
      "id": "TVhYUHVudGFzIERlIFBvbGFuY29UVXhWVUV4Q",
      "name": "Puntas De Polanco"
    },
    {
      "id": "TVhYUHVudGFzIERlIFNhbiBGcmFuY2lzY29UV",
      "name": "Puntas De San Francisco"
    },
    {
      "id": "TVhYUHVudGFzIERlIFNhbnRhIEx1Y2lhVFV4V",
      "name": "Puntas De Santa Lucia"
    },
    {
      "id": "TVhYUHVudGFzIERlIFNvbGlzVFV4VlVFeEJWb",
      "name": "Puntas De Solis"
    },
    {
      "id": "TVhYUHVudGFzIERlIFZlamlnYXNUVXhWVUV4Q",
      "name": "Puntas De Vejigas"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBQZXJkaWRvVFV4VlVFe",
      "name": "Puntas Del Perdido"
    },
    {
      "id": "TVhYUmV0YW1vc2FUVXhWVUV4QlZscGtOVEkw",
      "name": "Retamosa"
    },
    {
      "id": "TVhYUmluY29uIERlIENlYm9sbGF0aVRVeFZVR",
      "name": "Rincon De Cebollati"
    },
    {
      "id": "TVhYUmluY29uIERlIE1hcmlzY2FsYVRVeFZVR",
      "name": "Rincon De Mariscala"
    },
    {
      "id": "TVhYUmluY29uIERlIFNpbHZhVFV4VlVFeEJWb",
      "name": "Rincon De Silva"
    },
    {
      "id": "TVhYUm9sZGFuVFV4VlVFeEJWbHBrTlRJMA",
      "name": "Roldan"
    },
    {
      "id": "TVhYU2FuIEZyYW5jaXNjbyBEZSBMYXMgU2llc",
      "name": "San Francisco De Las Sierras"
    },
    {
      "id": "TVhYU2FudGEgTHVjaWFUVXhWVUV4QlZscGtOV",
      "name": "Santa Lucia"
    },
    {
      "id": "TVhYU2FyYW5kaSBEZSBHdXRpZXJyZXpUVXhWV",
      "name": "Sarandi De Gutierrez"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgQWlndWFUVXhWVUV4QlZsc",
      "name": "Sauce De Aigua"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgT2xpbWFyIENoaWNvVFV4V",
      "name": "Sauce De Olimar Chico"
    },
    {
      "id": "TVhYU2llcnJhcyBCbGFuY2FzVFV4VlVFeEJWb",
      "name": "Sierras Blancas"
    },
    {
      "id": "TVhYU29sZGFkb1RVeFZVRXhCVmxwa05USTA",
      "name": "Soldado"
    },
    {
      "id": "TVhYU29saXNUVXhWVUV4QlZscGtOVEkw",
      "name": "Solis"
    },
    {
      "id": "TVhYU29saXMgR3JhbmRlVFV4VlVFeEJWbHBrT",
      "name": "Solis Grande"
    },
    {
      "id": "TUxVQ1NPTDgzYzdl",
      "name": "Solís de Mataojo"
    },
    {
      "id": "TVhYVGFwZXMgQ2hpY29UVXhWVUV4QlZscGtOV",
      "name": "Tapes Chico"
    },
    {
      "id": "TVhYVGFwZXMgR3JhbmRlVFV4VlVFeEJWbHBrT",
      "name": "Tapes Grande"
    },
    {
      "id": "TVhYVmFsbGUgRGUgU29saXNUVXhWVUV4QlZsc",
      "name": "Valle De Solis"
    },
    {
      "id": "TVhYVmVqaWdhc1RVeFZVRXhCVmxwa05USTA",
      "name": "Vejigas"
    },
    {
      "id": "TVhYVmVsYXpxdWV6VFV4VlVFeEJWbHBrTlRJM",
      "name": "Velazquez"
    },
    {
      "id": "TVhYVmVyZHVuVFV4VlVFeEJWbHBrTlRJMA",
      "name": "Verdun"
    },
    {
      "id": "TVhYVmlsbGEgRGVsIFJvc2FyaW9UVXhWVUV4Q",
      "name": "Villa Del Rosario"
    },
    {
      "id": "TVhYVmlsbGEgU2VycmFuYVRVeFZVRXhCVmxwa",
      "name": "Villa Serrana"
    },
    {
      "id": "TVhYWmFwaWNhblRVeFZVRXhCVmxwa05USTA",
      "name": "Zapican"
    }
  ],
  'TUxVUERVUm9kZDA1': [
    {
      "id": "TVhYQWJlbGxhVFV4VlVFUlZVbTlrWkRBMQ",
      "name": "Abella"
    },
    {
      "id": "TVhYQWd1YXMgQnVlbmFzVFV4VlVFUlZVbTlrW",
      "name": "Aguas Buenas"
    },
    {
      "id": "TVhYQXJyb3lvIERlIExvcyBQZXJyb3NUVXhWV",
      "name": "Arroyo De Los Perros"
    },
    {
      "id": "TVhYQmFycmFuY2FzIENvbG9yYWRhc1RVeFZVR1",
      "name": "Barrancas Coloradas"
    },
    {
      "id": "TVhYQmFycmlvIER1cmFuVFV4VlVFUlZVbTlrW",
      "name": "Barrio Duran"
    },
    {
      "id": "TVhYQmF0b3ZpVFV4VlVFUlZVbTlrWkRBMQ",
      "name": "Batovi"
    },
    {
      "id": "TVhYQmF5Z29ycmlhVFV4VlVFUlZVbTlrWkRBM",
      "name": "Baygorria"
    },
    {
      "id": "TUxVQ0JMQWFmMjgy",
      "name": "Blanquillo"
    },
    {
      "id": "TVhYQmxhbnF1aWxsbyBBbCBPZXN0ZVRVeFZVR",
      "name": "Blanquillo Al Oeste"
    },
    {
      "id": "TVhYQ2FiYWxsZXJvVFV4VlVFUlZVbTlrWkRBM",
      "name": "Caballero"
    },
    {
      "id": "TVhYQ2FwaWxsYSBEZSBGYXJydWNvVFV4VlVFU",
      "name": "Capilla De Farruco"
    },
    {
      "id": "TVhYQ2FybG9zIFJleWxlc1RVeFZVRVJWVW05a",
      "name": "Carlos Reyles"
    },
    {
      "id": "TVhYQ2VpYmFsVFV4VlVFUlZVbTlrWkRBMQ",
      "name": "Ceibal"
    },
    {
      "id": "TVhYQ2VycmV6dWVsb1RVeFZVRVJWVW05a1pEQ",
      "name": "Cerrezuelo"
    },
    {
      "id": "TUxVQ0NFUmI3YTgx",
      "name": "Cerro Chato"
    },
    {
      "id": "TVhYQ2Vycm8gQ29udmVudG9UVXhWVUVSVlVtO",
      "name": "Cerro Convento"
    },
    {
      "id": "TVhYQ2hhY3JhcyBEZSBEdXJhem5vVFV4VlVFU",
      "name": "Chacras De Durazno"
    },
    {
      "id": "TVhYQ2hpbGVub1RVeFZVRVJWVW05a1pEQTE",
      "name": "Chileno"
    },
    {
      "id": "TVhYQ2hpbGVubyBDaGljb1RVeFZVRVJWVW05a",
      "name": "Chileno Chico"
    },
    {
      "id": "TVhYQ2hpbGVubyBHcmFuZGUgKEFndWVybylUV",
      "name": "Chileno Grande (Aguero)"
    },
    {
      "id": "TVhYQ29zdGEgRGUgQ3VhZHJhVFV4VlVFUlZVb",
      "name": "Costa De Cuadra"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgUmFtaXJlelRVeFZVR",
      "name": "Cuchilla De Ramirez"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGVsIFJpbmNvblRVeFZVR",
      "name": "Cuchilla Del Rincon"
    },
    {
      "id": "TVhYRGUgRGlvc1RVeFZVRVJWVW05a1pEQTE",
      "name": "De Dios"
    },
    {
      "id": "TUxVQ0RVUjEyY2Y4",
      "name": "Durazno"
    },
    {
      "id": "TVhYRWxpYXMgUmVndWxlc1RVeFZVRVJWVW05a",
      "name": "Elias Regules"
    },
    {
      "id": "TVhYRXN0YWNpb24gQ2hpbGVub1RVeFZVRVJWV",
      "name": "Estacion Chileno"
    },
    {
      "id": "TVhYRmVsaWNpYW5vVFV4VlVFUlZVbTlrWkRBM",
      "name": "Feliciano"
    },
    {
      "id": "TVhYRm9uc2VjYVRVeFZVRVJWVW05a1pEQTE",
      "name": "Fonseca"
    },
    {
      "id": "TVhYSGlndWVyYXMgRGUgQ2FycGludGVyaWFUV",
      "name": "Higueras De Carpinteria"
    },
    {
      "id": "TVhYTGEgQWxlZ3JpYVRVeFZVRVJWVW05a1pEQ",
      "name": "La Alegria"
    },
    {
      "id": "TVhYTGEgTWF6YW1vcnJhVFV4VlVFUlZVbTlrW",
      "name": "La Mazamorra"
    },
    {
      "id": "TVhYTGEgUGFsb21hVFV4VlVFUlZVbTlrWkRBM",
      "name": "La Paloma"
    },
    {
      "id": "TVhYTGFzIEFjYWNpYXNUVXhWVUVSVlVtOWtaR",
      "name": "Las Acacias"
    },
    {
      "id": "TVhYTGFzIENhw7Fhc1RVeFZVRVJWVW05a1pEQ",
      "name": "Las Cañas"
    },
    {
      "id": "TVhYTGFzIFBhbG1hc1RVeFZVRVJWVW05a1pEQ",
      "name": "Las Palmas"
    },
    {
      "id": "TVhYTGFzIFR1bmFzVFV4VlVFUlZVbTlrWkRBM",
      "name": "Las Tunas"
    },
    {
      "id": "TVhYTG9zIEFncmVnYWRvc1RVeFZVRVJWVW05a",
      "name": "Los Agregados"
    },
    {
      "id": "TVhYTG9zIFRhcGVzVFV4VlVFUlZVbTlrWkRBM",
      "name": "Los Tapes"
    },
    {
      "id": "TVhYTWFlc3RyZSBDYW1wb1RVeFZVRVJWVW05a",
      "name": "Maestre Campo"
    },
    {
      "id": "TVhYTWFsYmFqYXIgRXN0ZVRVeFZVRVJWVW05a",
      "name": "Malbajar Este"
    },
    {
      "id": "TVhYTWFsYmFqYXIgT2VzdGVUVXhWVUVSVlVtO",
      "name": "Malbajar Oeste"
    },
    {
      "id": "TVhYTWFyaWEgQ2VqYXNUVXhWVUVSVlVtOWtaR",
      "name": "Maria Cejas"
    },
    {
      "id": "TVhYTWFyaXNjYWxhVFV4VlVFUlZVbTlrWkRBM",
      "name": "Mariscala"
    },
    {
      "id": "TVhYTWFyaXNjYWxhIERlbCBDYXJtZW5UVXhWV",
      "name": "Mariscala Del Carmen"
    },
    {
      "id": "TVhYTW9sbGVzIENoaWNvVFV4VlVFUlZVbTlrW",
      "name": "Molles Chico"
    },
    {
      "id": "TVhYTW9sbGVzIERlIFF1aW50ZXJvc1RVeFZVR",
      "name": "Molles De Quinteros"
    },
    {
      "id": "TVhYTW91cmnDsW9UVXhWVUVSVlVtOWtaREEx",
      "name": "Mouriño"
    },
    {
      "id": "TVhYTXVuaWNpcGlvIERlIER1cmF6bm9UVXhWV",
      "name": "Municipio De Durazno"
    },
    {
      "id": "TVhYT21idWVzIERlIE9yaWJlVFV4VlVFUlZVb",
      "name": "Ombues De Oribe"
    },
    {
      "id": "TUxVQ09UUjgzNDE",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFsbWFyIERlIFBvcnJ1YVRVeFZVRVJWV",
      "name": "Palmar De Porrua"
    },
    {
      "id": "TVhYUGFyYWRhIFN1clRVeFZVRVJWVW05a1pEQ",
      "name": "Parada Sur"
    },
    {
      "id": "TVhYUGFyaXNoVFV4VlVFUlZVbTlrWkRBMQ",
      "name": "Parish"
    },
    {
      "id": "TVhYUGFzbyBEZSBBZ3VpcnJlVFV4VlVFUlZVb",
      "name": "Paso De Aguirre"
    },
    {
      "id": "TVhYUGFzbyBEZSBDYXN0cm9UVXhWVUVSVlVtO",
      "name": "Paso De Castro"
    },
    {
      "id": "TVhYUGFzbyBEZWwgTWVkaW8gTGFzIFBhbG1hc",
      "name": "Paso Del Medio Las Palmas"
    },
    {
      "id": "TVhYUGFzbyBSYW1pcmV6VFV4VlVFUlZVbTlrW",
      "name": "Paso Ramirez"
    },
    {
      "id": "TVhYUGFzbyBSZWFsIERlIENhcnBpbnRlcmlhV",
      "name": "Paso Real De Carpinteria"
    },
    {
      "id": "TVhYUGFzbyBUZWplcmFUVXhWVUVSVlVtOWtaR",
      "name": "Paso Tejera"
    },
    {
      "id": "TVhYUHVlYmxvIENlbnRlbmFyaW9UVXhWVUVSV",
      "name": "Pueblo Centenario"
    },
    {
      "id": "TVhYUHVlYmxvIERlIEFsdmFyZXpUVXhWVUVSV",
      "name": "Pueblo De Alvarez"
    },
    {
      "id": "TVhYUHVnbGlhVFV4VlVFUlZVbTlrWkRBMQ",
      "name": "Puglia"
    },
    {
      "id": "TVhYUHVudGFzIERlIENhcnBpbnRlcmlhVFV4V",
      "name": "Puntas De Carpinteria"
    },
    {
      "id": "TVhYUHVudGFzIERlIEhlcnJlcmFUVXhWVUVSV",
      "name": "Puntas De Herrera"
    },
    {
      "id": "TVhYUHVudGFzIERlIE1hbGJhamFyVFV4VlVFU",
      "name": "Puntas De Malbajar"
    },
    {
      "id": "TVhYUmluY29uIERlIEN1YWRyYVRVeFZVRVJWV",
      "name": "Rincon De Cuadra"
    },
    {
      "id": "TVhYUmluY29uIERlIExvcyBUYXBlc1RVeFZVR",
      "name": "Rincon De Los Tapes"
    },
    {
      "id": "TVhYUm9sb25UVXhWVUVSVlVtOWtaREEx",
      "name": "Rolon"
    },
    {
      "id": "TVhYUm9zc2VsbCBZIFJpdXNUVXhWVUVSVlVtO",
      "name": "Rossell Y Rius"
    },
    {
      "id": "TVhYU2FsaW5hc1RVeFZVRVJWVW05a1pEQTE",
      "name": "Salinas"
    },
    {
      "id": "TVhYU2FsaW5hcyBDaGljb1RVeFZVRVJWVW05a",
      "name": "Salinas Chico"
    },
    {
      "id": "TVhYU2FuIEpvcmdlVFV4VlVFUlZVbTlrWkRBM",
      "name": "San Jorge"
    },
    {
      "id": "TVhYU2FuIEpvc2UgRGUgTGFzIENhw7Fhc1RVe",
      "name": "San Jose De Las Cañas"
    },
    {
      "id": "TVhYU2FuZHUgQ2hpY29UVXhWVUVSVlVtOWtaR",
      "name": "Sandu Chico"
    },
    {
      "id": "TVhYU2FudGEgQmVybmFyZGluYVRVeFZVRVJWV",
      "name": "Santa Bernardina"
    },
    {
      "id": "TVhYU2FyYW5kaSBEZSBMYSBDaGluYVRVeFZVR",
      "name": "Sarandi De La China"
    },
    {
      "id": "TVhYU2FyYW5kaSBEZSBSaW8gTmVncm9UVXhWV",
      "name": "Sarandi De Rio Negro"
    },
    {
      "id": "TUxVQ1NBUmM2YmQ4",
      "name": "Sarandí del Yi"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgSGVycmVyYVRVeFZVRVJWV",
      "name": "Sauce De Herrera"
    },
    {
      "id": "TVhYU2F1Y2UgRGVsIFlpVFV4VlVFUlZVbTlrW",
      "name": "Sauce Del Yi"
    },
    {
      "id": "TVhYVGFsYSBEZSBNYXJpc2NhbGFUVXhWVUVSV",
      "name": "Tala De Mariscala"
    },
    {
      "id": "TVhYVGVqZXJhVFV4VlVFUlZVbTlrWkRBMQ",
      "name": "Tejera"
    },
    {
      "id": "TVhYVmVyZHVuVFV4VlVFUlZVbTlrWkRBMQ",
      "name": "Verdun"
    },
    {
      "id": "TVhYVmlsbGEgRGVsIENhcm1lblRVeFZVRVJWV",
      "name": "Villa Del Carmen"
    },
    {
      "id": "TVhYVmlsbGFzYm9hc1RVeFZVRVJWVW05a1pEQ",
      "name": "Villasboas"
    }
  ],
  'TUxVUFBBWVo0YzEy': [
    {
      "id": "TVhYQWwgU3VyIERlIEFycm95byBTYWNyYVRVe",
      "name": "Al Sur De Arroyo Sacra"
    },
    {
      "id": "TVhYQXJhdWpvVFV4VlVGQkJXVm8wWXpFeQ",
      "name": "Araujo"
    },
    {
      "id": "TVhYQXJib2xpdG8gKFRvdG9yYWwpVFV4VlVGQ",
      "name": "Arbolito (Totoral)"
    },
    {
      "id": "TVhYQXJyb3lvIE1hbG9UVXhWVUZCQldWbzBZe",
      "name": "Arroyo Malo"
    },
    {
      "id": "TVhYQXJyb3lvIE5lZ3JvVFV4VlVGQkJXVm8wW",
      "name": "Arroyo Negro"
    },
    {
      "id": "TVhYQmVpc3NvVFV4VlVGQkJXVm8wWXpFeQ",
      "name": "Beisso"
    },
    {
      "id": "TVhYQmVsbGEgVmlzdGFUVXhWVUZCQldWbzBZe",
      "name": "Bella Vista"
    },
    {
      "id": "TVhYQ2FuZ3VlVFV4VlVGQkJXVm8wWXpFeQ",
      "name": "Cangue"
    },
    {
      "id": "TVhYQ2FydW1iZVRVeFZVRkJCV1ZvMFl6RXk",
      "name": "Carumbe"
    },
    {
      "id": "TVhYQ2FzYSBCbGFuY2FUVXhWVUZCQldWbzBZe",
      "name": "Casa Blanca"
    },
    {
      "id": "TVhYQ2HDsWFkYSBEZWwgUHVlYmxvVFV4VlVGQ",
      "name": "Cañada Del Pueblo"
    },
    {
      "id": "TVhYQ2Vycm8gQ2hhdG9UVXhWVUZCQldWbzBZe",
      "name": "Cerro Chato"
    },
    {
      "id": "TVhYQ2hhY3JhcyBEZSBQYXlzYW5kdVRVeFZVR",
      "name": "Chacras De Paysandu"
    },
    {
      "id": "TVhYQ2hhY3JhcyBEZSBQYXlzYW5kdSBOb3J0Z",
      "name": "Chacras De Paysandu Norte"
    },
    {
      "id": "TVhYQ2hhY3JhcyBEZSBQYXlzYW5kdSBTdXJUV",
      "name": "Chacras De Paysandu Sur"
    },
    {
      "id": "TVhYQ2hhcGljdXlUVXhWVUZCQldWbzBZekV5",
      "name": "Chapicuy"
    },
    {
      "id": "TVhYQ29sb25pYSBBcnJveW8gTWFsb1RVeFZVR",
      "name": "Colonia Arroyo Malo"
    },
    {
      "id": "TVhYQ29sb25pYSBDYW5ndWVUVXhWVUZCQldWb",
      "name": "Colonia Cangue"
    },
    {
      "id": "TVhYQ29sb25pYSBKdW5jYWxUVXhWVUZCQldWb",
      "name": "Colonia Juncal"
    },
    {
      "id": "TVhYQ29sb25pYSBMYXMgRGVsaWNpYXNUVXhWV",
      "name": "Colonia Las Delicias"
    },
    {
      "id": "TVhYQ29sb25pYSBQYXlzYW5kdVRVeFZVRkJCV",
      "name": "Colonia Paysandu"
    },
    {
      "id": "TVhYQ29sb25pYSBTYW50YSBCbGFuY2FUVXhWV",
      "name": "Colonia Santa Blanca"
    },
    {
      "id": "TVhYQ29sb25pYSBVcnVndWF5YVRVeFZVRkJCV",
      "name": "Colonia Uruguaya"
    },
    {
      "id": "TVhYQ29uc3RhbmNpYVRVeFZVRkJCV1ZvMFl6R",
      "name": "Constancia"
    },
    {
      "id": "TVhYQ29zdGEgRGUgU2FjcmFUVXhWVUZCQldWb",
      "name": "Costa De Sacra"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgQnVyaWNheXVwaVRVe",
      "name": "Cuchilla De Buricayupi"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgRnVlZ29UVXhWVUZCQ",
      "name": "Cuchilla De Fuego"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgU2FuIEpvc2VUVXhWVUZCQ",
      "name": "Cuchilla San Jose"
    },
    {
      "id": "TVhYRWwgQ2hhY29UVXhWVUZCQldWbzBZekV5",
      "name": "El Chaco"
    },
    {
      "id": "TVhYRWwgRHVyYXpuYWxUVXhWVUZCQldWbzBZe",
      "name": "El Duraznal"
    },
    {
      "id": "TVhYRWwgRXVjYWxpcHR1c1RVeFZVRkJCV1ZvM",
      "name": "El Eucaliptus"
    },
    {
      "id": "TVhYRWwgSG9ybm9UVXhWVUZCQldWbzBZekV5",
      "name": "El Horno"
    },
    {
      "id": "TVhYRWwgVGFydWdvVFV4VlVGQkJXVm8wWXpFe",
      "name": "El Tarugo"
    },
    {
      "id": "TVhYRXN0YWNpb24gUG9ydmVuaXJUVXhWVUZCQ",
      "name": "Estacion Porvenir"
    },
    {
      "id": "TVhYRXRjaGVtZW5kaVRVeFZVRkJCV1ZvMFl6R",
      "name": "Etchemendi"
    },
    {
      "id": "TVhYR2FsbGluYWxUVXhWVUZCQldWbzBZekV5",
      "name": "Gallinal"
    },
    {
      "id": "TVhYR3Vhdml5dSBEZSBRdWVicmFjaG9UVXhWV",
      "name": "Guaviyu De Quebracho"
    },
    {
      "id": "TVhYR3VheWFib3NUVXhWVUZCQldWbzBZekV5",
      "name": "Guayabos"
    },
    {
      "id": "TUxVQ0dVSTgyMzA5",
      "name": "Guichón"
    },
    {
      "id": "TVhYTGEgTGF0YSBSdXRhIDMgKEttLiAzNzUpV",
      "name": "La Lata Ruta 3 (Km. 375)"
    },
    {
      "id": "TVhYTGEgUGF6IChSdXRhIDMgS20uIDM0NilUV",
      "name": "La Paz (Ruta 3 Km. 346)"
    },
    {
      "id": "TVhYTGEgVGVudGFjaW9uVFV4VlVGQkJXVm8wW",
      "name": "La Tentacion"
    },
    {
      "id": "TVhYTGFzIEZsb3Jlc1RVeFZVRkJCV1ZvMFl6R",
      "name": "Las Flores"
    },
    {
      "id": "TVhYTGFzIFBhbG1hc1RVeFZVRkJCV1ZvMFl6R",
      "name": "Las Palmas"
    },
    {
      "id": "TVhYTG9yZW56byBHZXlyZXNUVXhWVUZCQldWb",
      "name": "Lorenzo Geyres"
    },
    {
      "id": "TVhYTW9sbGVzIEdyYW5kZVRVeFZVRkJCV1ZvM",
      "name": "Molles Grande"
    },
    {
      "id": "TVhYTW9yYXRvIChUcmVzIEFyYm9sZXMpVFV4V",
      "name": "Morato (Tres Arboles)"
    },
    {
      "id": "TVhYTnVldm8gUGF5c2FuZHVUVXhWVUZCQldWb",
      "name": "Nuevo Paysandu"
    },
    {
      "id": "TVhYT3Jnb3Jvc29UVXhWVUZCQldWbzBZekV5",
      "name": "Orgoroso"
    },
    {
      "id": "TUxVQ09UUjMxNjA",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFsbWFyIERlbCBRdWVicmFjaG9UVXhWV",
      "name": "Palmar Del Quebracho"
    },
    {
      "id": "TVhYUGFyYWRhIERheW1hblRVeFZVRkJCV1ZvM",
      "name": "Parada Dayman"
    },
    {
      "id": "TVhYUGFyYWRhIFBhbmR1bGVUVXhWVUZCQldWb",
      "name": "Parada Pandule"
    },
    {
      "id": "TVhYUGFyYWRhIFJpdmFzVFV4VlVGQkJXVm8wW",
      "name": "Parada Rivas"
    },
    {
      "id": "TVhYUGFzbyBEZSBMb3MgQ2Fycm9zVFV4VlVGQ",
      "name": "Paso De Los Carros"
    },
    {
      "id": "TUxVQ1BBWTE0NmJj",
      "name": "Paysandú"
    },
    {
      "id": "TVhYUGVyaWNvIE1vcmVub1RVeFZVRkJCV1ZvM",
      "name": "Perico Moreno"
    },
    {
      "id": "TVhYUGllZHJhIFNvbGFUVXhWVUZCQldWbzBZe",
      "name": "Piedra Sola"
    },
    {
      "id": "TVhYUGllZHJhcyBDb2xvcmFkYXNUVXhWVUZCQ",
      "name": "Piedras Coloradas"
    },
    {
      "id": "TVhYUGnDsWVyYVRVeFZVRkJCV1ZvMFl6RXk",
      "name": "Piñera"
    },
    {
      "id": "TVhYUG9ydmVuaXJUVXhWVUZCQldWbzBZekV5",
      "name": "Porvenir"
    },
    {
      "id": "TVhYUHVlYmxvIEFsb256b1RVeFZVRkJCV1ZvM",
      "name": "Pueblo Alonzo"
    },
    {
      "id": "TVhYUHVlYmxvIEVzcGVyYW56YVRVeFZVRkJCV",
      "name": "Pueblo Esperanza"
    },
    {
      "id": "TVhYUHVlYmxvIEZlZGVyYWNpb25UVXhWVUZCQ",
      "name": "Pueblo Federacion"
    },
    {
      "id": "TVhYUHVudGFzIERlIEFycm95byBOZWdyb1RVe",
      "name": "Puntas De Arroyo Negro"
    },
    {
      "id": "TVhYUHVudGFzIERlIEJhY2FjdWFUVXhWVUZCQ",
      "name": "Puntas De Bacacua"
    },
    {
      "id": "TVhYUHVudGFzIERlIEJ1cmljYXl1cGlUVXhWV",
      "name": "Puntas De Buricayupi"
    },
    {
      "id": "TVhYUHVudGFzIERlIENhbmd1ZVRVeFZVRkJCV",
      "name": "Puntas De Cangue"
    },
    {
      "id": "TVhYUHVudGFzIERlIEd1YWxlZ3VheVRVeFZVR",
      "name": "Puntas De Gualeguay"
    },
    {
      "id": "TVhYUHVudGFzIERlIExhcyBJc2xldGFzVFV4V",
      "name": "Puntas De Las Isletas"
    },
    {
      "id": "TVhYUXVlYnJhY2hvVFV4VlVGQkJXVm8wWXpFe",
      "name": "Quebracho"
    },
    {
      "id": "TVhYUXVlZ3VheSBHcmFuZGVUVXhWVUZCQldWb",
      "name": "Queguay Grande"
    },
    {
      "id": "TVhYUXVlZ3VheWFyVFV4VlVGQkJXVm8wWXpFe",
      "name": "Queguayar"
    },
    {
      "id": "TVhYUmFib25UVXhWVUZCQldWbzBZekV5",
      "name": "Rabon"
    },
    {
      "id": "TVhYU2FuIEZlbGl4VFV4VlVGQkJXVm8wWXpFe",
      "name": "San Felix"
    },
    {
      "id": "TVhYU2FuIEZyYW5jaXNjb1RVeFZVRkJCV1ZvM",
      "name": "San Francisco"
    },
    {
      "id": "TVhYU2FuIE1hdXJpY2lvVFV4VlVGQkJXVm8wW",
      "name": "San Mauricio"
    },
    {
      "id": "TVhYU2FuIE1pZ3VlbFRVeFZVRkJCV1ZvMFl6R",
      "name": "San Miguel"
    },
    {
      "id": "TVhYU2FudGEgS2lsZGFUVXhWVUZCQldWbzBZe",
      "name": "Santa Kilda"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgQWJham9UVXhWVUZCQldWb",
      "name": "Sauce De Abajo"
    },
    {
      "id": "TVhYU2F1Y2UgRGVsIEJ1cmljYXl1cGlUVXhWV",
      "name": "Sauce Del Buricayupi"
    },
    {
      "id": "TVhYU2F1Y2UgRGVsIFF1ZWd1YXlUVXhWVUZCQ",
      "name": "Sauce Del Queguay"
    },
    {
      "id": "TVhYU290b1RVeFZVRkJCV1ZvMFl6RXk",
      "name": "Soto"
    },
    {
      "id": "TVhYVGFtYm9yZXNUVXhWVUZCQldWbzBZekV5",
      "name": "Tambores"
    },
    {
      "id": "TVhYVGVybWFzIERlIEFsbWlyb25UVXhWVUZCQ",
      "name": "Termas De Almiron"
    },
    {
      "id": "TVhYVGVybWFzIERlIEd1YXZpeXVUVXhWVUZCQ",
      "name": "Termas De Guaviyu"
    },
    {
      "id": "TVhYVG9tYXMgUGF6VFV4VlVGQkJXVm8wWXpFe",
      "name": "Tomas Paz"
    },
    {
      "id": "TVhYVHJlcyBCb2Nhc1RVeFZVRkJCV1ZvMFl6R",
      "name": "Tres Bocas"
    },
    {
      "id": "TVhYVmFsZGV6VFV4VlVGQkJXVm8wWXpFeQ",
      "name": "Valdez"
    },
    {
      "id": "TVhYVmlsbGEgTWFyaWEgKFRpYXR1Y3VyYSlUV",
      "name": "Villa Maria (Tiatucura)"
    },
    {
      "id": "TVhYWmViYWxsb3NUVXhWVUZCQldWbzBZekV5",
      "name": "Zeballos"
    }
  ],
  'TUxVUFRBQ280MGE5': [
    {
      "id": "TVhYQWNoYXJUVXhWVUZSQlEyODBNR0U1",
      "name": "Achar"
    },
    {
      "id": "TVhYQXJyb3lvIERlbCBNZWRpb1RVeFZVRlJCU",
      "name": "Arroyo Del Medio"
    },
    {
      "id": "TVhYQXRhcXVlVFV4VlVGUkJRMjgwTUdFNQ",
      "name": "Ataque"
    },
    {
      "id": "TVhYQmFsbmVhcmlvIElwb3JhVFV4VlVGUkJRM",
      "name": "Balneario Ipora"
    },
    {
      "id": "TVhYQmFycmlvIExhIE1hdHV0aW5hVFV4VlVGU",
      "name": "Barrio La Matutina"
    },
    {
      "id": "TVhYQmFycmlvIExpYmVydGFkVFV4VlVGUkJRM",
      "name": "Barrio Libertad"
    },
    {
      "id": "TVhYQmFycmlvIExvcGV6VFV4VlVGUkJRMjgwT",
      "name": "Barrio Lopez"
    },
    {
      "id": "TVhYQmFycmlvIFNhbnRhbmdlbG9UVXhWVUZSQ",
      "name": "Barrio Santangelo"
    },
    {
      "id": "TVhYQmFycmlvIFRvcnJlc1RVeFZVRlJCUTI4M",
      "name": "Barrio Torres"
    },
    {
      "id": "TVhYQmHDsWFkbyBEZSBDYcOxYXNUVXhWVUZSQ",
      "name": "Bañado De Cañas"
    },
    {
      "id": "TVhYQmHDsWFkbyBEZSBSb2NoYVRVeFZVRlJCU",
      "name": "Bañado De Rocha"
    },
    {
      "id": "TVhYQmxhbnF1aWxsb3NUVXhWVUZSQlEyODBNR",
      "name": "Blanquillos"
    },
    {
      "id": "TVhYQ2FyYWd1YXRhIEFsIE5vcnRlVFV4VlVGU",
      "name": "Caraguata Al Norte"
    },
    {
      "id": "TVhYQ2FyZG9zb1RVeFZVRlJCUTI4ME1HRTU",
      "name": "Cardoso"
    },
    {
      "id": "TVhYQ2FyZG96byBDaGljb1RVeFZVRlJCUTI4M",
      "name": "Cardozo Chico"
    },
    {
      "id": "TVhYQ2FycGludGVyaWFUVXhWVUZSQlEyODBNR",
      "name": "Carpinteria"
    },
    {
      "id": "TVhYQ2HDsWFkYSBEZWwgRXN0YWRvVFV4VlVGU",
      "name": "Cañada Del Estado"
    },
    {
      "id": "TVhYQ2HDsWFzVFV4VlVGUkJRMjgwTUdFNQ",
      "name": "Cañas"
    },
    {
      "id": "TVhYQ2Vycm8gQmF0b3ZpVFV4VlVGUkJRMjgwT",
      "name": "Cerro Batovi"
    },
    {
      "id": "TVhYQ2Vycm8gQ2hhdG9UVXhWVUZSQlEyODBNR",
      "name": "Cerro Chato"
    },
    {
      "id": "TVhYQ2Vycm8gRGUgUGFzdG9yZW9UVXhWVUZSQ",
      "name": "Cerro De Pastoreo"
    },
    {
      "id": "TVhYQ2Vycm8gRGUgUGVyZWlyYVRVeFZVRlJCU",
      "name": "Cerro De Pereira"
    },
    {
      "id": "TVhYQ2Vycm8gRGVsIEFyYm9saXRvVFV4VlVGU",
      "name": "Cerro Del Arbolito"
    },
    {
      "id": "TVhYQ2Vycm9zIERlIENsYXJhVFV4VlVGUkJRM",
      "name": "Cerros De Clara"
    },
    {
      "id": "TVhYQ2hhbWJlcmxhaW5UVXhWVUZSQlEyODBNR",
      "name": "Chamberlain"
    },
    {
      "id": "TVhYQ2hhcmF0YVRVeFZVRlJCUTI4ME1HRTU",
      "name": "Charata"
    },
    {
      "id": "TVhYQ2h1cmNoaWxsVFV4VlVGUkJRMjgwTUdFN",
      "name": "Churchill"
    },
    {
      "id": "TVhYQ2luY28gU2F1Y2VzVFV4VlVGUkJRMjgwT",
      "name": "Cinco Sauces"
    },
    {
      "id": "TVhYQ2xhcmFUVXhWVUZSQlEyODBNR0U1",
      "name": "Clara"
    },
    {
      "id": "TVhYQ2xhdmlqb1RVeFZVRlJCUTI4ME1HRTU",
      "name": "Clavijo"
    },
    {
      "id": "TVhYQ29sbWFuVFV4VlVGUkJRMjgwTUdFNQ",
      "name": "Colman"
    },
    {
      "id": "TVhYQ29zdGFzIERlIENhcmFndWF0YVRVeFZVR",
      "name": "Costas De Caraguata"
    },
    {
      "id": "TVhYQ29zdGFzIERlIFRyZXMgQ3J1Y2VzVFV4V",
      "name": "Costas De Tres Cruces"
    },
    {
      "id": "TVhYQ295byBNYXJ0aW5lelRVeFZVRlJCUTI4M",
      "name": "Coyo Martinez"
    },
    {
      "id": "TVhYQ3J1eiBEZSBMb3MgQ2FtaW5vc1RVeFZVR1",
      "name": "Cruz De Los Caminos"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgTGEgQ2FzYSBEZSBQa",
      "name": "Cuchilla De La Casa De Piedra"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgTGEgUGFsbWFUVXhWV",
      "name": "Cuchilla De La Palma"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgTGF1cmVsZXNUVXhWV",
      "name": "Cuchilla De Laureles"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgUGVyYWx0YVRVeFZVR",
      "name": "Cuchilla De Peralta"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGVsIE9tYnVUVXhWVUZSQ",
      "name": "Cuchilla Del Ombu"
    },
    {
      "id": "TVhYQ3VydGluYVRVeFZVRlJCUTI4ME1HRTU",
      "name": "Curtina"
    },
    {
      "id": "TVhYRWwgRW1wYWxtZVRVeFZVRlJCUTI4ME1HR",
      "name": "El Empalme"
    },
    {
      "id": "TVhYRXN0YWNpb24gTWVuZW5kZXpUVXhWVUZSQ",
      "name": "Estacion Menendez"
    },
    {
      "id": "TVhYRnJpZ29yaWZpY28gTW9kZWxvVFV4VlVGU",
      "name": "Frigorifico Modelo"
    },
    {
      "id": "TVhYSGVyaWJlcnRvVFV4VlVGUkJRMjgwTUdFN",
      "name": "Heriberto"
    },
    {
      "id": "TVhYTGEgQWxkZWFUVXhWVUZSQlEyODBNR0U1",
      "name": "La Aldea"
    },
    {
      "id": "TVhYTGEgQm9sc2EgMDFUVXhWVUZSQlEyODBNR",
      "name": "La Bolsa 01"
    },
    {
      "id": "TVhYTGEgQm9sc2EgMDJUVXhWVUZSQlEyODBNR",
      "name": "La Bolsa 02"
    },
    {
      "id": "TVhYTGEgSGlsZXJhVFV4VlVGUkJRMjgwTUdFN",
      "name": "La Hilera"
    },
    {
      "id": "TVhYTGEgUGFsbWFUVXhWVUZSQlEyODBNR0U1",
      "name": "La Palma"
    },
    {
      "id": "TVhYTGEgUGVkcmVyYVRVeFZVRlJCUTI4ME1HR",
      "name": "La Pedrera"
    },
    {
      "id": "TVhYTGFtYmFyZVRVeFZVRlJCUTI4ME1HRTU",
      "name": "Lambare"
    },
    {
      "id": "TVhYTGFycmF5b3NUVXhWVUZSQlEyODBNR0U1",
      "name": "Larrayos"
    },
    {
      "id": "TVhYTGFzIEFyZW5hc1RVeFZVRlJCUTI4ME1HR",
      "name": "Las Arenas"
    },
    {
      "id": "TVhYTGFzIENoaXJjYXNUVXhWVUZSQlEyODBNR",
      "name": "Las Chircas"
    },
    {
      "id": "TVhYTGFzIFBhamFzVFV4VlVGUkJRMjgwTUdFN",
      "name": "Las Pajas"
    },
    {
      "id": "TVhYTGFzIFRvc2NhcyBEZSBDYXJhZ3VhdGFUV",
      "name": "Las Toscas De Caraguata"
    },
    {
      "id": "TVhYTGF1cmFUVXhWVUZSQlEyODBNR0U1",
      "name": "Laura"
    },
    {
      "id": "TVhYTGF1cmVsZXNUVXhWVUZSQlEyODBNR0U1",
      "name": "Laureles"
    },
    {
      "id": "TVhYTG9zIENlcnJvc1RVeFZVRlJCUTI4ME1HR",
      "name": "Los Cerros"
    },
    {
      "id": "TVhYTG9zIENvaXRpbmhvc1RVeFZVRlJCUTI4M",
      "name": "Los Coitinhos"
    },
    {
      "id": "TVhYTG9zIEN1YWRyYWRvc1RVeFZVRlJCUTI4M",
      "name": "Los Cuadrados"
    },
    {
      "id": "TVhYTG9zIEZlb3NUVXhWVUZSQlEyODBNR0U1",
      "name": "Los Feos"
    },
    {
      "id": "TVhYTG9zIEZ1cnRhZG9zVFV4VlVGUkJRMjgwT",
      "name": "Los Furtados"
    },
    {
      "id": "TVhYTG9zIEdhcmNpYVRVeFZVRlJCUTI4ME1HR",
      "name": "Los Garcia"
    },
    {
      "id": "TVhYTG9zIEdvbWV6VFV4VlVGUkJRMjgwTUdFN",
      "name": "Los Gomez"
    },
    {
      "id": "TVhYTG9zIExhdXJlbGVzVFV4VlVGUkJRMjgwT",
      "name": "Los Laureles"
    },
    {
      "id": "TVhYTG9zIE1hbGF2YXJlc1RVeFZVRlJCUTI4M",
      "name": "Los Malavares"
    },
    {
      "id": "TVhYTG9zIE9ydGljZXNUVXhWVUZSQlEyODBNR",
      "name": "Los Ortices"
    },
    {
      "id": "TVhYTG9zIFJvZHJpZ3VlelRVeFZVRlJCUTI4M",
      "name": "Los Rodriguez"
    },
    {
      "id": "TVhYTG9zIFJvc2Fub3NUVXhWVUZSQlEyODBNR",
      "name": "Los Rosanos"
    },
    {
      "id": "TVhYTG9zIFJvc2FzVFV4VlVGUkJRMjgwTUdFN",
      "name": "Los Rosas"
    },
    {
      "id": "TVhYTG9zIFNlbXBlclRVeFZVRlJCUTI4ME1HR",
      "name": "Los Semper"
    },
    {
      "id": "TVhYTG9zIFZhenF1ZXpUVXhWVUZSQlEyODBNR",
      "name": "Los Vazquez"
    },
    {
      "id": "TVhYTWFydGlub3RlVFV4VlVGUkJRMjgwTUdFN",
      "name": "Martinote"
    },
    {
      "id": "TVhYTWludWFub1RVeFZVRlJCUTI4ME1HRTU",
      "name": "Minuano"
    },
    {
      "id": "TVhYTW9udGV2aWRlbyBDaGljb1RVeFZVRlJCU",
      "name": "Montevideo Chico"
    },
    {
      "id": "TVhYT25jZSBDZXJyb3NUVXhWVUZSQlEyODBNR",
      "name": "Once Cerros"
    },
    {
      "id": "TUxVQ09UUjQwNDk",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFtcGFUVXhWVUZSQlEyODBNR0U1",
      "name": "Pampa"
    },
    {
      "id": "TVhYUGFzbyBCb25pbGxhVFV4VlVGUkJRMjgwT",
      "name": "Paso Bonilla"
    },
    {
      "id": "TVhYUGFzbyBEZSBDZWZlcmlub1RVeFZVRlJCU",
      "name": "Paso De Ceferino"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYXMgQ2FycmV0YXNUVXhWV",
      "name": "Paso De Las Carretas"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYXMgRmxvcmVzVFV4VlVGU",
      "name": "Paso De Las Flores"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYXMgVG9zY2FzVFV4VlVGU",
      "name": "Paso De Las Toscas"
    },
    {
      "id": "TVhYUGFzbyBEZSBMb3MgTm92aWxsb3NUVXhWV0",
      "name": "Paso De Los Novillos"
    },
    {
      "id": "TVhYUGFzbyBEZSBQZXJlelRVeFZVRlJCUTI4M",
      "name": "Paso De Perez"
    },
    {
      "id": "TVhYUGFzbyBEZWwgQ2Vycm9UVXhWVUZSQlEyO",
      "name": "Paso Del Cerro"
    },
    {
      "id": "TVhYUGFzbyBEZWwgTWVkaW9UVXhWVUZSQlEyO",
      "name": "Paso Del Medio"
    },
    {
      "id": "TVhYUGFzbyBIb25kb1RVeFZVRlJCUTI4ME1HR",
      "name": "Paso Hondo"
    },
    {
      "id": "TVhYUGFzbyBMaXZpbmRvVFV4VlVGUkJRMjgwT",
      "name": "Paso Livindo"
    },
    {
      "id": "TVhYUGFzbyBWaWN0b3JUVXhWVUZSQlEyODBNR",
      "name": "Paso Victor"
    },
    {
      "id": "TUxVQ1BBU2YwN2Rl",
      "name": "Paso de los Toros"
    },
    {
      "id": "TVhYUGljYWRhIERlIEN1ZWxsb1RVeFZVRlJCU",
      "name": "Picada De Cuello"
    },
    {
      "id": "TUxVQ1BVRTMzZDIy",
      "name": "Pueblo Centenario"
    },
    {
      "id": "TVhYUHVlYmxvIENsYXZpam9UVXhWVUZSQlEyO",
      "name": "Pueblo Clavijo"
    },
    {
      "id": "TVhYUHVlYmxvIERlIEFycmliYVRVeFZVRlJCU",
      "name": "Pueblo De Arriba"
    },
    {
      "id": "TVhYUHVlYmxvIERlbCBCYXJyb1RVeFZVRlJCU",
      "name": "Pueblo Del Barro"
    },
    {
      "id": "TVhYUHVudGEgRGUgQ2FycmV0ZXJhVFV4VlVGU",
      "name": "Punta De Carretera"
    },
    {
      "id": "TVhYUHVudGFzIERlIENpbmNvIFNhdWNlc1RVe",
      "name": "Puntas De Cinco Sauces"
    },
    {
      "id": "TVhYUHVudGFzIERlIExhdXJlbGVzVFV4VlVGU",
      "name": "Puntas De Laureles"
    },
    {
      "id": "TVhYUmluY29uIERlIEZyZWl0YXNUVXhWVUZSQ",
      "name": "Rincon De Freitas"
    },
    {
      "id": "TVhYUmluY29uIERlIEdpbG9jYVRVeFZVRlJCU",
      "name": "Rincon De Giloca"
    },
    {
      "id": "TVhYUmluY29uIERlIExhIEFsZGVhVFV4VlVGU",
      "name": "Rincon De La Aldea"
    },
    {
      "id": "TVhYUmluY29uIERlIExhIEJvbHNhVFV4VlVGU",
      "name": "Rincon De La Bolsa"
    },
    {
      "id": "TVhYUmluY29uIERlIExhIExhZ3VuYVRVeFZVR",
      "name": "Rincon De La Laguna"
    },
    {
      "id": "TVhYUmluY29uIERlIExvcyBNYWNoYWRvVFV4V",
      "name": "Rincon De Los Machado"
    },
    {
      "id": "TVhYUmluY29uIERlIFBlcmVpcmFUVXhWVUZSQ",
      "name": "Rincon De Pereira"
    },
    {
      "id": "TVhYUmluY29uIERlIFphbW9yYVRVeFZVRlJCU",
      "name": "Rincon De Zamora"
    },
    {
      "id": "TVhYUmluY29uIERlbCBCb25ldGVUVXhWVUZSQ",
      "name": "Rincon Del Bonete"
    },
    {
      "id": "TVhYUml2ZXJhIENoaWNvVFV4VlVGUkJRMjgwT",
      "name": "Rivera Chico"
    },
    {
      "id": "TVhYU2FuIEJlbml0b1RVeFZVRlJCUTI4ME1HR",
      "name": "San Benito"
    },
    {
      "id": "TUxVQ1NBTjRlYmFi",
      "name": "San Gregorio de Polanco"
    },
    {
      "id": "TVhYU2FuIEpvYXF1aW5UVXhWVUZSQlEyODBNR",
      "name": "San Joaquin"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgQmF0b3ZpVFV4VlVGUkJRM",
      "name": "Sauce De Batovi"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgVHJhbnF1ZXJhc1RVeFZVR",
      "name": "Sauce De Tranqueras"
    },
    {
      "id": "TVhYU2F1Y2UgU29sb1RVeFZVRlJCUTI4ME1HR",
      "name": "Sauce Solo"
    },
    {
      "id": "TVhYU2F1Y2UgU29sbyBEZWwgUmlvIE5lZ3JvV",
      "name": "Sauce Solo Del Rio Negro"
    },
    {
      "id": "TVhYVGFjdWFyZW1ibyBDaGljb1RVeFZVRlJCU",
      "name": "Tacuarembo Chico"
    },
    {
      "id": "TUxVQ1RBQ2QxM2I4",
      "name": "Tacuarembó"
    },
    {
      "id": "TVhYVGllcnJhcyBDb2xvcmFkYXNUVXhWVUZSQ",
      "name": "Tierras Coloradas"
    },
    {
      "id": "TVhYVHJlcyBHdWl0YXJyYXNUVXhWVUZSQlEyO",
      "name": "Tres Guitarras"
    },
    {
      "id": "TVhYVHVydXBpVFV4VlVGUkJRMjgwTUdFNQ",
      "name": "Turupi"
    },
    {
      "id": "TVhYVmFsbGUgRWRlblRVeFZVRlJCUTI4ME1HR",
      "name": "Valle Eden"
    },
    {
      "id": "TVhYVmlsbGEgQW5zaW5hVFV4VlVGUkJRMjgwT",
      "name": "Villa Ansina"
    },
    {
      "id": "TVhYWmFtYnVsbG9uVFV4VlVGUkJRMjgwTUdFN",
      "name": "Zambullon"
    },
    {
      "id": "TVhYWmFwYXJhVFV4VlVGUkJRMjgwTUdFNQ",
      "name": "Zapara"
    },
    {
      "id": "TVhYWmFwdWNheVRVeFZVRlJCUTI4ME1HRTU",
      "name": "Zapucay"
    }
  ],
  'TUxVUEZMT3MxYjc': [
    {
      "id": "TVhYQWhvZ2Fkb3NUVXhWVUVaTVQzTXhZamM",
      "name": "Ahogados"
    },
    {
      "id": "TUxVQ0FORDk5MTk",
      "name": "Andresito"
    },
    {
      "id": "TVhYQXJlbmFsIENoaWNvVFV4VlVFWk1UM014W",
      "name": "Arenal Chico"
    },
    {
      "id": "TVhYQXJlbmFsIEdyYW5kZVRVeFZVRVpNVDNNe",
      "name": "Arenal Grande"
    },
    {
      "id": "TVhYQXJyb3lvIE1hbG9UVXhWVUVaTVQzTXhZa",
      "name": "Arroyo Malo"
    },
    {
      "id": "TVhYQ2HDsWFkYSBBbWlsaXZpYVRVeFZVRVpNV",
      "name": "Cañada Amilivia"
    },
    {
      "id": "TVhYQ2Vycm8gQ29sb3JhZG9UVXhWVUVaTVQzT",
      "name": "Cerro Colorado"
    },
    {
      "id": "TVhYQ2hhY3Jhc1RVeFZVRVpNVDNNeFlqYw",
      "name": "Chacras"
    },
    {
      "id": "TVhYQ2hhY3JhcyBEZSBCb3JnaGlUVXhWVUVaT",
      "name": "Chacras De Borghi"
    },
    {
      "id": "TVhYQ29sb25pYSBBbGVtYW5hVFV4VlVFWk1UM",
      "name": "Colonia Alemana"
    },
    {
      "id": "TVhYQ29zdGFzIERlIFNhbiBKb3NlVFV4VlVFW",
      "name": "Costas De San Jose"
    },
    {
      "id": "TVhYQ29zdGFzIERlbCBUYWxhVFV4VlVFWk1UM",
      "name": "Costas Del Tala"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgVmlsbGFzYm9hc1RVe",
      "name": "Cuchilla De Villasboas"
    },
    {
      "id": "TVhYRWwgQ29yb25pbGxhVFV4VlVFWk1UM014W",
      "name": "El Coronilla"
    },
    {
      "id": "TVhYRWwgVG90b3JhbFRVeFZVRVpNVDNNeFlqY",
      "name": "El Totoral"
    },
    {
      "id": "TVhYRmVycml6b1RVeFZVRVpNVDNNeFlqYw",
      "name": "Ferrizo"
    },
    {
      "id": "TUxVQ0lTTWJiMjRj",
      "name": "Ismael Cortinas"
    },
    {
      "id": "TVhYSnVhbiBKb3NlIENhc3Ryb1RVeFZVRVpNV",
      "name": "Juan Jose Castro"
    },
    {
      "id": "TVhYTGEgQWxpYW56YVRVeFZVRVpNVDNNeFlqY",
      "name": "La Alianza"
    },
    {
      "id": "TUxVQ0xBQzM3Mjc",
      "name": "La Casilla"
    },
    {
      "id": "TVhYTGEgQ29yZG9iZXNhVFV4VlVFWk1UM014W",
      "name": "La Cordobesa"
    },
    {
      "id": "TVhYTGEgR3VhcmRpYVRVeFZVRVpNVDNNeFlqY",
      "name": "La Guardia"
    },
    {
      "id": "TVhYTG9zIFB1ZW50ZXNUVXhWVUVaTVQzTXhZa",
      "name": "Los Puentes"
    },
    {
      "id": "TVhYTWFyaW5jaG9UVXhWVUVaTVQzTXhZamM",
      "name": "Marincho"
    },
    {
      "id": "TUxVQ09UUjczNDk",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFzbyBEZSBMdWdvVFV4VlVFWk1UM014W",
      "name": "Paso De Lugo"
    },
    {
      "id": "TVhYUGFzbyBIb25kb1RVeFZVRVpNVDNNeFlqY",
      "name": "Paso Hondo"
    },
    {
      "id": "TVhYUHVlYmxvIFBpbnRvc1RVeFZVRVpNVDNNe",
      "name": "Pueblo Pintos"
    },
    {
      "id": "TVhYUHVudGFzIERlIENoYW1hbmdhVFV4VlVFW",
      "name": "Puntas De Chamanga"
    },
    {
      "id": "TVhYUHVudGFzIERlIE1hcmluY2hvVFV4VlVFW",
      "name": "Puntas De Marincho"
    },
    {
      "id": "TVhYUHVudGFzIERlIFNhbiBKb3NlVFV4VlVFW",
      "name": "Puntas De San Jose"
    },
    {
      "id": "TVhYUHVudGFzIERlIFNhcmFuZGlUVXhWVUVaT",
      "name": "Puntas De Sarandi"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBDb3JyYWwgRGUgUGllZ",
      "name": "Puntas Del Corral De Piedra"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBTYXVjZVRVeFZVRVpNV",
      "name": "Puntas Del Sauce"
    },
    {
      "id": "TVhYUmluY29uIERlbCBQYWxhY2lvVFV4VlVFW",
      "name": "Rincon Del Palacio"
    },
    {
      "id": "TVhYU2FuIEdyZWdvcmlvIERlIEZsb3Jlc1RVe",
      "name": "San Gregorio De Flores"
    },
    {
      "id": "TVhYU2FudGEgQWRlbGFpZGFUVXhWVUVaTVQzT",
      "name": "Santa Adelaida"
    },
    {
      "id": "TVhYU2FyYW5kaVRVeFZVRVpNVDNNeFlqYw",
      "name": "Sarandi"
    },
    {
      "id": "TVhYVGFsYXMgRGUgTWFjaWVsVFV4VlVFWk1UM",
      "name": "Talas De Maciel"
    },
    {
      "id": "TUxVQ1RSSWI5YmVk",
      "name": "Trinidad"
    },
    {
      "id": "TVhYVmlsbGEgUGFzdG9yYVRVeFZVRVpNVDNNe",
      "name": "Villa Pastora"
    },
    {
      "id": "TVhYVmlsbGFzYm9hc1RVeFZVRVpNVDNNeFlqY",
      "name": "Villasboas"
    }
  ],
  'TUxVUEZMT1o4MWUz': [
    {
      "id": "TVhYMjUgRGUgQWdvc3RvVFV4VlVFWk1UMW80T",
      "name": "25 De Agosto"
    },
    {
      "id": "TVhYQWxlamFuZHJvIEdhbGxpbmFsVFV4VlVFW",
      "name": "Alejandro Gallinal"
    },
    {
      "id": "TVhYQXJyYXlhblRVeFZVRVpNVDFvNE1XVXo",
      "name": "Arrayan"
    },
    {
      "id": "TVhYQXJyb3lvIENoYW1pem9UVXhWVUVaTVQxb",
      "name": "Arroyo Chamizo"
    },
    {
      "id": "TVhYQXJyb3lvIERlIExvcyBOZWdyb3NUVXhWV",
      "name": "Arroyo De Los Negros"
    },
    {
      "id": "TVhYQXJyb3lvIExhdG9ycmVUVXhWVUVaTVQxb",
      "name": "Arroyo Latorre"
    },
    {
      "id": "TVhYQXJyb3lvIE1vbnpvblRVeFZVRVpNVDFvN",
      "name": "Arroyo Monzon"
    },
    {
      "id": "TVhYQXJyb3lvIFBlbGFkb1RVeFZVRVpNVDFvN",
      "name": "Arroyo Pelado"
    },
    {
      "id": "TVhYQXJ0ZWFnYVRVeFZVRVpNVDFvNE1XVXo",
      "name": "Arteaga"
    },
    {
      "id": "TVhYQmFycmEgTW9sbGVzIERlbCBUaW1vdGVUV",
      "name": "Barra Molles Del Timote"
    },
    {
      "id": "TVhYQmFycmEgU2F1Y2UgRGUgTWFuc2F2aWxsY",
      "name": "Barra Sauce De Mansavillagra"
    },
    {
      "id": "TVhYQmVycm9uZG9UVXhWVUVaTVQxbzRNV1V6",
      "name": "Berrondo"
    },
    {
      "id": "TVhYQ2FsbGVyaVRVeFZVRVpNVDFvNE1XVXo",
      "name": "Calleri"
    },
    {
      "id": "TVhYQ2FuZGlsVFV4VlVFWk1UMW80TVdVeg",
      "name": "Candil"
    },
    {
      "id": "TVhYQ2FwaWxsYSBEZWwgU2F1Y2VUVXhWVUVaT",
      "name": "Capilla Del Sauce"
    },
    {
      "id": "TVhYQ2FyZGFsVFV4VlVFWk1UMW80TVdVeg",
      "name": "Cardal"
    },
    {
      "id": "TVhYQ2FzZXJpbyBMYSBGdW5kYWNpb25UVXhWV",
      "name": "Caserio La Fundacion"
    },
    {
      "id": "TVhYQ2FzdXBhVFV4VlVFWk1UMW80TVdVeg",
      "name": "Casupa"
    },
    {
      "id": "TVhYQ2Vycm8gRGUgTGEgTWFjYW5hVFV4VlVFW",
      "name": "Cerro De La Macana"
    },
    {
      "id": "TVhYQ2Vycm9zIERlIEZsb3JpZGFUVXhWVUVaT",
      "name": "Cerros De Florida"
    },
    {
      "id": "TVhYQ2hhY3JhcyBEZSBGbG9yaWRhVFV4VlVFW",
      "name": "Chacras De Florida"
    },
    {
      "id": "TVhYQ2hhY3JhcyBEZWwgUGludGFkb1RVeFZVR",
      "name": "Chacras Del Pintado"
    },
    {
      "id": "TVhYQ2hhbWl6b1RVeFZVRVpNVDFvNE1XVXo",
      "name": "Chamizo"
    },
    {
      "id": "TVhYQ2hhbWl6byBDaGljb1RVeFZVRVpNVDFvN",
      "name": "Chamizo Chico"
    },
    {
      "id": "TVhYQ2hpbGNhc1RVeFZVRVpNVDFvNE1XVXo",
      "name": "Chilcas"
    },
    {
      "id": "TVhYQ2hpbmdvbGFzVFV4VlVFWk1UMW80TVdVe",
      "name": "Chingolas"
    },
    {
      "id": "TVhYQ29sb25pYSBTYW5jaGV6VFV4VlVFWk1UM",
      "name": "Colonia Sanchez"
    },
    {
      "id": "TVhYQ29ycmFsIERlIFBpZWRyYVRVeFZVRVpNV",
      "name": "Corral De Piedra"
    },
    {
      "id": "TVhYQ29zdGEgRGUgQXJpYXNUVXhWVUVaTVQxb",
      "name": "Costa De Arias"
    },
    {
      "id": "TVhYQ29zdGEgRGUgSWxsZXNjYXNUVXhWVUVaT",
      "name": "Costa De Illescas"
    },
    {
      "id": "TVhYQ29zdGEgRGUgTGEgQ3J1elRVeFZVRVpNV",
      "name": "Costa De La Cruz"
    },
    {
      "id": "TVhYQ29zdGEgRGUgUGFyYW5hVFV4VlVFWk1UM",
      "name": "Costa De Parana"
    },
    {
      "id": "TVhYQ29zdGEgRGVsIFRhbGFUVXhWVUVaTVQxb",
      "name": "Costa Del Tala"
    },
    {
      "id": "TVhYQ29zdGFzIERlIEFyaWFzVFV4VlVFWk1UM",
      "name": "Costas De Arias"
    },
    {
      "id": "TVhYQ29zdGFzIERlIENoYW1pem9UVXhWVUVaT",
      "name": "Costas De Chamizo"
    },
    {
      "id": "TVhYQ29zdGFzIERlIENoYW1pem8gR3JhbmRlV",
      "name": "Costas De Chamizo Grande"
    },
    {
      "id": "TVhYQ29zdGFzIERlIE1hY2llbFRVeFZVRVpNV",
      "name": "Costas De Maciel"
    },
    {
      "id": "TVhYQ29zdGFzIERlIFNhbnRhIEx1Y2lhIENoa",
      "name": "Costas De Santa Lucia Chico"
    },
    {
      "id": "TVhYQ29zdGFzIERlbCBBbWFyaWxsb1RVeFZVR",
      "name": "Costas Del Amarillo"
    },
    {
      "id": "TVhYQ29zdGFzIERlbCBQaW50YWRvVFV4VlVFW",
      "name": "Costas Del Pintado"
    },
    {
      "id": "TVhYQ29zdGFzIERlbCBTYW50YSBMdWNpYSBHc",
      "name": "Costas Del Santa Lucia Grande"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgU2FudG8gRG9taW5nb1RVe",
      "name": "Cuchilla Santo Domingo"
    },
    {
      "id": "TVhYRHIuIEEuIEdhbGxpbmFsVFV4VlVFWk1UM",
      "name": "Dr. A. Gallinal"
    },
    {
      "id": "TVhYRXN0YWNpb24gQ2FwaWxsYSBEZWwgU2F1Y",
      "name": "Estacion Capilla Del Sauce"
    },
    {
      "id": "TVhYRmVycmVyVFV4VlVFWk1UMW80TVdVeg",
      "name": "Ferrer"
    },
    {
      "id": "TUxVQ0ZMTzhjNmY1",
      "name": "Florida"
    },
    {
      "id": "TUxVQ0ZSQThlZDNk",
      "name": "Fray Marcos"
    },
    {
      "id": "TVhYR2DsWlUVXhWVUVaTVQxbzRNV1V6",
      "name": "Goñi"
    },
    {
      "id": "TVhYSGVybmFuZGFyaWFzVFV4VlVFWk1UMW80T",
      "name": "Hernandarias"
    },
    {
      "id": "TVhYSW5kZXBlbmRlbmNpYVRVeFZVRVpNVDFvN",
      "name": "Independencia"
    },
    {
      "id": "TVhYSnVuY2FsVFV4VlVFWk1UMW80TVdVeg",
      "name": "Juncal"
    },
    {
      "id": "TVhYTGEgQ2ltYnJhVFV4VlVFWk1UMW80TVdVe",
      "name": "La Cimbra"
    },
    {
      "id": "TVhYTGEgQ3J1elRVeFZVRVpNVDFvNE1XVXo",
      "name": "La Cruz"
    },
    {
      "id": "TVhYTGEgRXNjb2JpbGxhVFV4VlVFWk1UMW80T",
      "name": "La Escobilla"
    },
    {
      "id": "TVhYTGEgTWFjYW5hVFV4VlVFWk1UMW80TVdVe",
      "name": "La Macana"
    },
    {
      "id": "TVhYTGEgUGFsbWFUVXhWVUVaTVQxbzRNV1V6",
      "name": "La Palma"
    },
    {
      "id": "TVhYTGEgVmljdG9yaWFUVXhWVUVaTVQxbzRNV",
      "name": "La Victoria"
    },
    {
      "id": "TVhYTGFzIFBpZWRyaXRhc1RVeFZVRVpNVDFvN",
      "name": "Las Piedritas"
    },
    {
      "id": "TVhYTWFuc2F2aWxsYWdyYVRVeFZVRVpNVDFvN",
      "name": "Mansavillagra"
    },
    {
      "id": "TVhYTWVuZG96YSBDaGljb1RVeFZVRVpNVDFvN",
      "name": "Mendoza Chico"
    },
    {
      "id": "TVhYTWVuZG96YSBHcmFuZGVUVXhWVUVaTVQxb",
      "name": "Mendoza Grande"
    },
    {
      "id": "TVhYTW9sbGVzIERlbCBQZXNjYWRvVFV4VlVFW",
      "name": "Molles Del Pescado"
    },
    {
      "id": "TVhYTW9sbGVzIERlbCBUaW1vdGVUVXhWVUVaT",
      "name": "Molles Del Timote"
    },
    {
      "id": "TVhYTW9udGVjb3JhbFRVeFZVRVpNVDFvNE1XV",
      "name": "Montecoral"
    },
    {
      "id": "TVhYTmljbyBQZXJlelRVeFZVRVpNVDFvNE1XV",
      "name": "Nico Perez"
    },
    {
      "id": "TUxVQ09UUjMyMTA",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFsZXJtb1RVeFZVRVpNVDFvNE1XVXo",
      "name": "Palermo"
    },
    {
      "id": "TVhYUGFudGFub3NvIERlIENhc3Ryb1RVeFZVR",
      "name": "Pantanoso De Castro"
    },
    {
      "id": "TVhYUGFzbyBDYWxsZXJvc1RVeFZVRVpNVDFvN",
      "name": "Paso Calleros"
    },
    {
      "id": "TVhYUGFzbyBEZSBMb3MgTm92aWxsb3NUVXhWV",
      "name": "Paso De Los Novillos"
    },
    {
      "id": "TVhYUGFzbyBSZWFsIERlIE1hbnNhdmlsbGFnc",
      "name": "Paso Real De Mansavillagra"
    },
    {
      "id": "TVhYUGFzbyBWZWxhVFV4VlVFWk1UMW80TVdVe",
      "name": "Paso Vela"
    },
    {
      "id": "TVhYUGllZHJhIENhbXBhbmFUVXhWVUVaTVQxb",
      "name": "Piedra Campana"
    },
    {
      "id": "TVhYUGllZHJhcyBDb2xvcmFkYXNUVXhWVUVaT",
      "name": "Piedras Coloradas"
    },
    {
      "id": "TVhYUGludGFkb1RVeFZVRVpNVDFvNE1XVXo",
      "name": "Pintado"
    },
    {
      "id": "TVhYUG9sYW5jbyBEZWwgWWlUVXhWVUVaTVQxb",
      "name": "Polanco Del Yi"
    },
    {
      "id": "TVhYUHVlYmxvIERlIExvcyBNb3JvY2hvc1RVe",
      "name": "Pueblo De Los Morochos"
    },
    {
      "id": "TVhYUHVlbnRlIERlIE1lbmRvemFUVXhWVUVaT",
      "name": "Puente De Mendoza"
    },
    {
      "id": "TVhYUHVudGFzIERlIENhbGxlcm9zVFV4VlVFW",
      "name": "Puntas De Calleros"
    },
    {
      "id": "TVhYUHVudGFzIERlIENoYW1hbWVUVXhWVUVaT",
      "name": "Puntas De Chamame"
    },
    {
      "id": "TVhYUHVudGFzIERlIENoYW1pem9UVXhWVUVaT",
      "name": "Puntas De Chamizo"
    },
    {
      "id": "TVhYUHVudGFzIERlIElsbGVzY2FzVFV4VlVFW",
      "name": "Puntas De Illescas"
    },
    {
      "id": "TVhYUHVudGFzIERlIExhIEVzY29iaWxsYVRVe",
      "name": "Puntas De La Escobilla"
    },
    {
      "id": "TVhYUHVudGFzIERlIE1hY2llbFRVeFZVRVpNV",
      "name": "Puntas De Maciel"
    },
    {
      "id": "TVhYUHVudGFzIERlIE1hbnNhdmlsbGFncmFUV",
      "name": "Puntas De Mansavillagra"
    },
    {
      "id": "TVhYUHVudGFzIERlIFNhcmFuZGlUVXhWVUVaT0",
      "name": "Puntas De Sarandi"
    },
    {
      "id": "TVhYUHVudGFzIERlIFNhdWNlIERlIE1hY2llb",
      "name": "Puntas De Sauce De Maciel"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBBcnJveW8gTGF0b3JyZ",
      "name": "Puntas Del Arroyo Latorre"
    },
    {
      "id": "TVhYUmVib2xlZG9UVXhWVUVaTVQxbzRNV1V6",
      "name": "Reboledo"
    },
    {
      "id": "TVhYUmluY29uIERlIExvcyBDYW1pbG9zVFV4V",
      "name": "Rincon De Los Camilos"
    },
    {
      "id": "TVhYUmluY29uIERlIFZpZ25vbGlUVXhWVUVaT",
      "name": "Rincon De Vignoli"
    },
    {
      "id": "TVhYUmluY29uIFNhdWNlIERlbCBZaVRVeFZVR",
      "name": "Rincon Sauce Del Yi"
    },
    {
      "id": "TVhYU2FuIEdhYnJpZWxUVXhWVUVaTVQxbzRNV",
      "name": "San Gabriel"
    },
    {
      "id": "TVhYU2FuIEdlcm9uaW1vVFV4VlVFWk1UMW80T",
      "name": "San Geronimo"
    },
    {
      "id": "TVhYU2FuIEp1YW5UVXhWVUVaTVQxbzRNV1V6",
      "name": "San Juan"
    },
    {
      "id": "TVhYU2FuIFBlZHJvIERlIFRpbW90ZVRVeFZVR",
      "name": "San Pedro De Timote"
    },
    {
      "id": "TVhYU2FudGEgQ2xhcmFUVXhWVUVaTVQxbzRNV",
      "name": "Santa Clara"
    },
    {
      "id": "TVhYU2FudGEgVGVyZXNhVFV4VlVFWk1UMW80T",
      "name": "Santa Teresa"
    },
    {
      "id": "TUxVQ1NBUjM1ZTk",
      "name": "Sarandí Grande"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgTWFjaWVsVFV4VlVFWk1UM",
      "name": "Sauce De Maciel"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgVmlsbGFudWV2YVRVeFZVR",
      "name": "Sauce De Villanueva"
    },
    {
      "id": "TVhYU2F1Y2UgRGVsIFlpVFV4VlVFWk1UMW80T",
      "name": "Sauce Del Yi"
    },
    {
      "id": "TVhYVGFiYXJlVFV4VlVFWk1UMW80TVdVeg",
      "name": "Tabare"
    },
    {
      "id": "TVhYVGFsYSBEZSBDYXN0cm9UVXhWVUVaTVQxb",
      "name": "Tala De Castro"
    },
    {
      "id": "TVhYVGFsYSBEZSBNYWNpZWxUVXhWVUVaTVQxb",
      "name": "Tala De Maciel"
    },
    {
      "id": "TVhYVGFsaXRhVFV4VlVFWk1UMW80TVdVeg",
      "name": "Talita"
    },
    {
      "id": "TVhYVG9ybmVyb1RVeFZVRVpNVDFvNE1XVXo",
      "name": "Tornero"
    },
    {
      "id": "TVhYVXJpb3N0ZVRVeFZVRVpNVDFvNE1XVXo",
      "name": "Urioste"
    },
    {
      "id": "TUxVQ1ZFSTcyZGVj",
      "name": "Veinticinco de Mayo"
    },
    {
      "id": "TVhYVmlnbm9saVRVeFZVRVpNVDFvNE1XVXo",
      "name": "Vignoli"
    },
    {
      "id": "TVhYVmlsbGEgSGlwaWNhVFV4VlVFWk1UMW80T",
      "name": "Villa Hipica"
    },
    {
      "id": "TVhYVmlsbGEgVmllamFUVXhWVUVaTVQxbzRNV",
      "name": "Villa Vieja"
    }
  ],
  'TUxVUFNPUm9mOTcx': [
    {
      "id": "TVhYQWdyYWNpYWRhVFV4VlVGTlBVbTltT1Rje",
      "name": "Agraciada"
    },
    {
      "id": "TVhYQWx0b3MgRGVsIFBlcmRpZG9UVXhWVUZOU",
      "name": "Altos Del Perdido"
    },
    {
      "id": "TVhYQXJlbmFsIENoaWNvVFV4VlVGTlBVbTltT",
      "name": "Arenal Chico"
    },
    {
      "id": "TVhYQXJyb3lvIERlbCBNZWRpb1RVeFZVRk5QV",
      "name": "Arroyo Del Medio"
    },
    {
      "id": "TVhYQXJyb3lvIEdyYW5kZVRVeFZVRk5QVW05b",
      "name": "Arroyo Grande"
    },
    {
      "id": "TVhYQXNlbmNpb1RVeFZVRk5QVW05bU9UY3g",
      "name": "Asencio"
    },
    {
      "id": "TVhYQXpvdGVhIERlIFZlcmFUVXhWVUZOUFVtO",
      "name": "Azotea De Vera"
    },
    {
      "id": "TVhYQmFqb3MgRGVsIFBlcmRpZG9UVXhWVUZOU",
      "name": "Bajos Del Perdido"
    },
    {
      "id": "TVhYQmVxdWVsb1RVeFZVRk5QVW05bU9UY3g",
      "name": "Bequelo"
    },
    {
      "id": "TVhYQml6Y29jaG9UVXhWVUZOUFVtOW1PVGN4",
      "name": "Bizcocho"
    },
    {
      "id": "TVhYQnVlbmEgVmlzdGFUVXhWVUZOUFVtOW1PV",
      "name": "Buena Vista"
    },
    {
      "id": "TUxVQ0NBUjY3M2Zj",
      "name": "Cardona"
    },
    {
      "id": "TVhYQ2FzdGlsbG9zVFV4VlVGTlBVbTltT1Rje",
      "name": "Castillos"
    },
    {
      "id": "TVhYQ2HDsWFkYSBNYWdhbGxhbmVzVFV4VlVGT",
      "name": "Cañada Magallanes"
    },
    {
      "id": "TVhYQ2HDsWFkYSBOaWV0b1RVeFZVRk5QVW05b",
      "name": "Cañada Nieto"
    },
    {
      "id": "TVhYQ2HDsWFkYSBQYXJhZ3VheWFUVXhWVUZOU",
      "name": "Cañada Paraguaya"
    },
    {
      "id": "TVhYQ2Vycm8gQWxlZ3JlVFV4VlVGTlBVbTltT",
      "name": "Cerro Alegre"
    },
    {
      "id": "TVhYQ2Vycm8gVmVyYVRVeFZVRk5QVW05bU9UY",
      "name": "Cerro Vera"
    },
    {
      "id": "TVhYQ2hhY3JhcyBEZSBEb2xvcmVzVFV4VlVGT",
      "name": "Chacras De Dolores"
    },
    {
      "id": "TVhYQ2hhY3JhcyBEZSBNZXJjZWRlc1RVeFZVR",
      "name": "Chacras De Mercedes"
    },
    {
      "id": "TVhYQ29sb2xvVFV4VlVGTlBVbTltT1RjeA",
      "name": "Cololo"
    },
    {
      "id": "TVhYQ29sb25pYSBDb25jb3JkaWFUVXhWVUZOU",
      "name": "Colonia Concordia"
    },
    {
      "id": "TVhYQ29sb25pYSBEaWF6VFV4VlVGTlBVbTltT",
      "name": "Colonia Diaz"
    },
    {
      "id": "TVhYQ29sb25pYSBMYXJyYcOxYWdhVFV4VlVGT",
      "name": "Colonia Larrañaga"
    },
    {
      "id": "TVhYQ29sb25pYSBTYW50YSBDbGFyYVRVeFZVR",
      "name": "Colonia Santa Clara"
    },
    {
      "id": "TVhYQ29sb25pYSBVcnVndWF5YVRVeFZVRk5QV",
      "name": "Colonia Uruguaya"
    },
    {
      "id": "TUxVQ0NPUTI2ZjRi",
      "name": "Coquimbo"
    },
    {
      "id": "TVhYQ29ycmFsaXRvVFV4VlVGTlBVbTltT1Rje",
      "name": "Corralito"
    },
    {
      "id": "TVhYQ29zdGEgRGVsIEFndWlsYVRVeFZVRk5QV",
      "name": "Costa Del Aguila"
    },
    {
      "id": "TVhYQ29zdGFzIERlbCBQZXJkaWRvVFV4VlVGT",
      "name": "Costas Del Perdido"
    },
    {
      "id": "TVhYQ3VhdHJvIEJvY2FzIERlIEJ1ZW5hIFZpc",
      "name": "Cuatro Bocas De Buena Vista"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGVsIENvcnJhbGl0b1RVe",
      "name": "Cuchilla Del Corralito"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGVsIFBlcmRpZG9UVXhWV",
      "name": "Cuchilla Del Perdido"
    },
    {
      "id": "TVhYQ3VldmEgRGVsIFRpZ3JlVFV4VlVGTlBVb",
      "name": "Cueva Del Tigre"
    },
    {
      "id": "TUxVQ0RPTDc1ZjQ0",
      "name": "Dolores"
    },
    {
      "id": "TVhYRHVyYXpuaXRvVFV4VlVGTlBVbTltT1Rje",
      "name": "Duraznito"
    },
    {
      "id": "TVhYRWdhw7FhVFV4VlVGTlBVbTltT1RjeA",
      "name": "Egaña"
    },
    {
      "id": "TVhYRWwgQWd1aWxhVFV4VlVGTlBVbTltT1Rje",
      "name": "El Aguila"
    },
    {
      "id": "TVhYRWwgVGFsYVRVeFZVRk5QVW05bU9UY3g",
      "name": "El Tala"
    },
    {
      "id": "TVhYRXNwaW5pbGxvVFV4VlVGTlBVbTltT1Rje",
      "name": "Espinillo"
    },
    {
      "id": "TVhYR2FydWxhVFV4VlVGTlBVbTltT1RjeA",
      "name": "Garula"
    },
    {
      "id": "TVhYR3JpdG8gRGUgQXNlbmNpb1RVeFZVRk5QV",
      "name": "Grito De Asencio"
    },
    {
      "id": "TVhYSm9zZSBFbnJpcXVlIFJvZG9UVXhWVUZOU",
      "name": "Jose Enrique Rodo"
    },
    {
      "id": "TVhYTGEgQ29uY29yZGlhVFV4VlVGTlBVbTltT",
      "name": "La Concordia"
    },
    {
      "id": "TVhYTGEgTGFndW5hVFV4VlVGTlBVbTltT1Rje",
      "name": "La Laguna"
    },
    {
      "id": "TVhYTGEgTG9tYVRVeFZVRk5QVW05bU9UY3g",
      "name": "La Loma"
    },
    {
      "id": "TVhYTGEgUGFsbWFUVXhWVUZOUFVtOW1PVGN4",
      "name": "La Palma"
    },
    {
      "id": "TVhYTGEgVGFibGFUVXhWVUZOUFVtOW1PVGN4",
      "name": "La Tabla"
    },
    {
      "id": "TVhYTGFyZXNUVXhWVUZOUFVtOW1PVGN4",
      "name": "Lares"
    },
    {
      "id": "TVhYTGFzIE1hdWxhc1RVeFZVRk5QVW05bU9UY",
      "name": "Las Maulas"
    },
    {
      "id": "TVhYTGF0YSBEZWwgUGVyZGlkb1RVeFZVRk5QV",
      "name": "Lata Del Perdido"
    },
    {
      "id": "TVhYTWFjaWVsVFV4VlVGTlBVbTltT1RjeA",
      "name": "Maciel"
    },
    {
      "id": "TUxVQ01FUjI0MDA",
      "name": "Mercedes"
    },
    {
      "id": "TVhYTW9uem9uVFV4VlVGTlBVbTltT1RjeA",
      "name": "Monzon"
    },
    {
      "id": "TVhYT2xpdmVyYVRVeFZVRk5QVW05bU9UY3g",
      "name": "Olivera"
    },
    {
      "id": "TUxVQ09UUjcwNjA",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFsbWFyVFV4VlVGTlBVbTltT1RjeA",
      "name": "Palmar"
    },
    {
      "id": "TVhYUGFsbWl0YXNUVXhWVUZOUFVtOW1PVGN4",
      "name": "Palmitas"
    },
    {
      "id": "TVhYUGFsbyBTb2xvVFV4VlVGTlBVbTltT1Rje",
      "name": "Palo Solo"
    },
    {
      "id": "TVhYUGFyYWRhIFN1YXJlelRVeFZVRk5QVW05b",
      "name": "Parada Suarez"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYSBBcmVuYVRVeFZVRk5QV",
      "name": "Paso De La Arena"
    },
    {
      "id": "TVhYUGFzbyBEZSBSYW1vc1RVeFZVRk5QVW05b",
      "name": "Paso De Ramos"
    },
    {
      "id": "TVhYUGVkcm8gQ2hpY29UVXhWVUZOUFVtOW1PV",
      "name": "Pedro Chico"
    },
    {
      "id": "TVhYUGVyc2V2ZXJhbm9UVXhWVUZOUFVtOW1PV",
      "name": "Perseverano"
    },
    {
      "id": "TVhYUHJvZ3Jlc29UVXhWVUZOUFVtOW1PVGN4",
      "name": "Progreso"
    },
    {
      "id": "TVhYUHVudGFzIERlIEFyZW5hbGVzVFV4VlVGT",
      "name": "Puntas De Arenales"
    },
    {
      "id": "TVhYUHVudGFzIERlIER1cmF6bm9UVXhWVUZOU",
      "name": "Puntas De Durazno"
    },
    {
      "id": "TVhYUHVudGFzIERlIFNhbiBTYWx2YWRvclRVe",
      "name": "Puntas De San Salvador"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBUYWxhVFV4VlVGTlBVb",
      "name": "Puntas Del Tala"
    },
    {
      "id": "TVhYUmluY29uIERlIENhw7FhZGEgTmlldG9UV",
      "name": "Rincon De Cañada Nieto"
    },
    {
      "id": "TVhYUmluY29uIERlIENvbG9sb1RVeFZVRk5QV",
      "name": "Rincon De Cololo"
    },
    {
      "id": "TVhYUmluY29uIERlIFJ1aXpUVXhWVUZOUFVtO",
      "name": "Rincon De Ruiz"
    },
    {
      "id": "TUxVQ1JJUzM5ZTVl",
      "name": "Risso"
    },
    {
      "id": "TVhYU2FuIERpb3NUVXhWVUZOUFVtOW1PVGN4",
      "name": "San Dios"
    },
    {
      "id": "TVhYU2FuIE1hcnRpblRVeFZVRk5QVW05bU9UY",
      "name": "San Martin"
    },
    {
      "id": "TVhYU2FudGEgQmxhbmNhVFV4VlVGTlBVbTltT",
      "name": "Santa Blanca"
    },
    {
      "id": "TUxVQ1NBTjdjNGM4",
      "name": "Santa Catalina"
    },
    {
      "id": "TVhYU2FyYW5kaSBDaGljb1RVeFZVRk5QVW05b",
      "name": "Sarandi Chico"
    },
    {
      "id": "TVhYVW5pZGFkIENvb3BlcmFyaWEgTm8gMVRVe",
      "name": "Unidad Cooperaria No 1"
    },
    {
      "id": "TVhYVmlsbGEgQWxlamFuZHJpbmFUVXhWVUZOU",
      "name": "Villa Alejandrina"
    },
    {
      "id": "TVhYVmlsbGEgRGFyd2luVFV4VlVGTlBVbTltT",
      "name": "Villa Darwin"
    },
    {
      "id": "TUxVQ1ZJTDNhNGM3",
      "name": "Villa Soriano"
    },
    {
      "id": "TVhYWmFuamEgSG9uZGFUVXhWVUZOUFVtOW1PV",
      "name": "Zanja Honda"
    }
  ],
  'TUxVUFRSRXNiY2Zh': [
    {
      "id": "TVhYQWNvc3RhVFV4VlVGUlNSWE5pWTJaaA",
      "name": "Acosta"
    },
    {
      "id": "TVhYQXJyYXlhbmVzIERlIENlYm9sbGF0aVRVe",
      "name": "Arrayanes De Cebollati"
    },
    {
      "id": "TVhYQXJyYXlhbmVzIERlIENvcnJhbCBEZSBDZ",
      "name": "Arrayanes De Corral De Cebollati"
    },
    {
      "id": "TVhYQXJyb2NlcmEgQm9ub21vVFV4VlVGUlNSW",
      "name": "Arrocera Bonomo"
    },
    {
      "id": "TVhYQXJyb2NlcmEgRWwgVGlncmVUVXhWVUZSU",
      "name": "Arrocera El Tigre"
    },
    {
      "id": "TVhYQXJyb2NlcmEgTGEgQ2F0dW1iZXJhVFV4V",
      "name": "Arrocera La Catumbera"
    },
    {
      "id": "TVhYQXJyb2NlcmEgTGEgUXVlcmVuY2lhVFV4V",
      "name": "Arrocera La Querencia"
    },
    {
      "id": "TVhYQXJyb2NlcmEgTGFzIFBhbG1hc1RVeFZVR",
      "name": "Arrocera Las Palmas"
    },
    {
      "id": "TVhYQXJyb2NlcmEgTG9zIENlaWJvc1RVeFZVR",
      "name": "Arrocera Los Ceibos"
    },
    {
      "id": "TVhYQXJyb2NlcmEgTG9zIFRlcm9zVFV4VlVGU",
      "name": "Arrocera Los Teros"
    },
    {
      "id": "TVhYQXJyb2NlcmEgTWluaVRVeFZVRlJTUlhOa",
      "name": "Arrocera Mini"
    },
    {
      "id": "TVhYQXJyb2NlcmEgUHJvY2lwYVRVeFZVRlJTU",
      "name": "Arrocera Procipa"
    },
    {
      "id": "TVhYQXJyb2NlcmEgUmluY29uVFV4VlVGUlNSW",
      "name": "Arrocera Rincon"
    },
    {
      "id": "TVhYQXJyb2NlcmEgU2FuIEZlcm5hbmRvVFV4V",
      "name": "Arrocera San Fernando"
    },
    {
      "id": "TVhYQXJyb2NlcmEgU2FudGEgRmVUVXhWVUZSU",
      "name": "Arrocera Santa Fe"
    },
    {
      "id": "TVhYQXJyb2NlcmEgWmFwYXRhVFV4VlVGUlNSW",
      "name": "Arrocera Zapata"
    },
    {
      "id": "TVhYQXJyb3phbCBUcmVpbnRhIFkgVHJlc1RVe",
      "name": "Arrozal Treinta Y Tres"
    },
    {
      "id": "TVhYQXZlc3RydXogQ2hpY29UVXhWVUZSU1JYT",
      "name": "Avestruz Chico"
    },
    {
      "id": "TVhYQmFycmlvIEFicmV1VFV4VlVGUlNSWE5pW",
      "name": "Barrio Abreu"
    },
    {
      "id": "TVhYQmHDsWFkbyBEZSBPcm9UVXhWVUZSU1JYT",
      "name": "Bañado De Oro"
    },
    {
      "id": "TVhYQ2HDsWFkYSBDaGljYVRVeFZVRlJTUlhOa",
      "name": "Cañada Chica"
    },
    {
      "id": "TVhYQ2HDsWFkYSBEZSBMYXMgUGllZHJhc1RVe",
      "name": "Cañada De Las Piedras"
    },
    {
      "id": "TVhYQ2HDsWFkYSBEZWwgU2F1Y2VUVXhWVUZSU",
      "name": "Cañada Del Sauce"
    },
    {
      "id": "TVhYQ2Vycm8gQ2hhdG9UVXhWVUZSU1JYTmlZM",
      "name": "Cerro Chato"
    },
    {
      "id": "TVhYQ2Vycm8gUGVsYWRvVFV4VlVGUlNSWE5pW",
      "name": "Cerro Pelado"
    },
    {
      "id": "TVhYQ2Vycm9zIERlIEFtYXJvVFV4VlVGUlNSW",
      "name": "Cerros De Amaro"
    },
    {
      "id": "TVhYQ2lwYSBDZWJvbGxhdGlUVXhWVUZSU1JYT",
      "name": "Cipa Cebollati"
    },
    {
      "id": "TVhYQ2lwYSBPbGltYXJUVXhWVUZSU1JYTmlZM",
      "name": "Cipa Olimar"
    },
    {
      "id": "TVhYQ2lwYSBTZWNhZG9yVFV4VlVGUlNSWE5pW",
      "name": "Cipa Secador"
    },
    {
      "id": "TVhYQ29ycmFsZXMgRGUgQ2Vib2xsYXRpVFV4V",
      "name": "Corrales De Cebollati"
    },
    {
      "id": "TVhYQ29zdGFzIERlIFRhY3VhcmlUVXhWVUZSU",
      "name": "Costas De Tacuari"
    },
    {
      "id": "TVhYQ29zdGFzIERlbCBBcnJveW8gTWFsb1RVe",
      "name": "Costas Del Arroyo Malo"
    },
    {
      "id": "TVhYQ29zdGFzIERlbCBTYXJhbmRpVFV4VlVGU",
      "name": "Costas Del Sarandi"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgRGlvbmlzaW9UVXhWV",
      "name": "Cuchilla De Dionisio"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgT2xtb3NUVXhWVUZSU",
      "name": "Cuchilla De Olmos"
    },
    {
      "id": "TVhYRWppZG8gRGUgVHJlaW50YSBZIFRyZXNUV",
      "name": "Ejido De Treinta Y Tres"
    },
    {
      "id": "TVhYRWwgQmVsbGFjb1RVeFZVRlJTUlhOaVkyW",
      "name": "El Bellaco"
    },
    {
      "id": "TVhYRWwgQ2FybWVuVFV4VlVGUlNSWE5pWTJaa",
      "name": "El Carmen"
    },
    {
      "id": "TVhYRWwgQ2F0ZXRlVFV4VlVGUlNSWE5pWTJaa",
      "name": "El Catete"
    },
    {
      "id": "TVhYR3JhbC4gRW5yaXF1ZSBNYXJ0aW5lelRVe",
      "name": "Gral. Enrique Martinez"
    },
    {
      "id": "TVhYSGlndWVyb25lc1RVeFZVRlJTUlhOaVkyW",
      "name": "Higuerones"
    },
    {
      "id": "TVhYSnVsaW8gTWFyaWEgU2FuelRVeFZVRlJTU",
      "name": "Julio Maria Sanz"
    },
    {
      "id": "TVhYTGEgQ2FsYXZlcmFUVXhWVUZSU1JYTmlZM",
      "name": "La Calavera"
    },
    {
      "id": "TVhYTGEgQ2FsZXJhVFV4VlVGUlNSWE5pWTJaa",
      "name": "La Calera"
    },
    {
      "id": "TVhYTGEgTGF0YVRVeFZVRlJTUlhOaVkyWmg",
      "name": "La Lata"
    },
    {
      "id": "TVhYTGFzIENoYWNyYXNUVXhWVUZSU1JYTmlZM",
      "name": "Las Chacras"
    },
    {
      "id": "TVhYTGFzIFBhdmFzVFV4VlVGUlNSWE5pWTJaa",
      "name": "Las Pavas"
    },
    {
      "id": "TVhYTGVjaGlndWFuYSBEZSBDb3JyYWxlc1RVe",
      "name": "Lechiguana De Corrales"
    },
    {
      "id": "TVhYTWFyaWEgQWxiaW5hVFV4VlVGUlNSWE5pW",
      "name": "Maria Albina"
    },
    {
      "id": "TVhYTWFyaWEgSXNhYmVsVFV4VlVGUlNSWE5pW",
      "name": "Maria Isabel"
    },
    {
      "id": "TVhYTWF0ZSBEdWxjZVRVeFZVRlJTUlhOaVkyW",
      "name": "Mate Dulce"
    },
    {
      "id": "TVhYTWVuZGl6YWJhbFRVeFZVRlJTUlhOaVkyW",
      "name": "Mendizabal"
    },
    {
      "id": "TVhYTW9sbGVzIERlIE9saW1hclRVeFZVRlJTU",
      "name": "Molles De Olimar"
    },
    {
      "id": "TVhYTm9xdWVzIERlIE9saW1hciBDaGljb1RVe",
      "name": "Noques De Olimar Chico"
    },
    {
      "id": "TVhYT2xpbWFyIEdyYW5kZVRVeFZVRlJTUlhOa",
      "name": "Olimar Grande"
    },
    {
      "id": "TUxVQ09UUjkyMzI",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFsbyBBIFBpcXVlVFV4VlVGUlNSWE5pW",
      "name": "Palo A Pique"
    },
    {
      "id": "TVhYUGFzbyBBbmNob1RVeFZVRlJTUlhOaVkyW",
      "name": "Paso Ancho"
    },
    {
      "id": "TVhYUGFzbyBEZSBBdmVyaWFzVFV4VlVGUlNSW",
      "name": "Paso De Averias"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYSBBdGFob25hVFV4VlVGU",
      "name": "Paso De La Atahona"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYSBMYWd1bmFUVXhWVUZSU",
      "name": "Paso De La Laguna"
    },
    {
      "id": "TVhYUGFzbyBEZSBQaXJpelRVeFZVRlJTUlhOa",
      "name": "Paso De Piriz"
    },
    {
      "id": "TVhYUGFzbyBEZWwgU2F1Y2VUVXhWVUZSU1JYT",
      "name": "Paso Del Sauce"
    },
    {
      "id": "TVhYUG9ibGFkbyBBbG9uem9UVXhWVUZSU1JYT",
      "name": "Poblado Alonzo"
    },
    {
      "id": "TVhYUHVudGFzIERlIExlb25jaG9UVXhWVUZSU",
      "name": "Puntas De Leoncho"
    },
    {
      "id": "TVhYUHVudGFzIERlIExvcyBDZWlib3NUVXhWV",
      "name": "Puntas De Los Ceibos"
    },
    {
      "id": "TVhYUHVudGFzIERlIFF1ZWJyYWNob1RVeFZVR",
      "name": "Puntas De Quebracho"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBPcm9UVXhWVUZSU1JYT",
      "name": "Puntas Del Oro"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBQYXJhb1RVeFZVRlJTU",
      "name": "Puntas Del Parao"
    },
    {
      "id": "TVhYUmluY29uVFV4VlVGUlNSWE5pWTJaaA",
      "name": "Rincon"
    },
    {
      "id": "TVhYUmluY29uIERlIEdhZGVhVFV4VlVGUlNSW",
      "name": "Rincon De Gadea"
    },
    {
      "id": "TVhYUmluY29uIERlIElndWluaVRVeFZVRlJTU",
      "name": "Rincon De Iguini"
    },
    {
      "id": "TVhYUmluY29uIERlIExvcyBGcmFuY29zVFV4V",
      "name": "Rincon De Los Francos"
    },
    {
      "id": "TVhYUmluY29uIERlIFF1aW50YW5hVFV4VlVGU",
      "name": "Rincon De Quintana"
    },
    {
      "id": "TVhYUmluY29uIERlIFVydHViZXlUVXhWVUZSU",
      "name": "Rincon De Urtubey"
    },
    {
      "id": "TVhYU2FudGEgQ2xhcmEgRGUgT2xpbWFyVFV4V",
      "name": "Santa Clara De Olimar"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgQ29ycmFsZXNUVXhWVUZSU",
      "name": "Sauce De Corrales"
    },
    {
      "id": "TVhYU2llcnJhIERlbCBZZXJiYWxUVXhWVUZSU",
      "name": "Sierra Del Yerbal"
    },
    {
      "id": "TVhYU2lldGUgQ2FzYXNUVXhWVUZSU1JYTmlZM",
      "name": "Siete Casas"
    },
    {
      "id": "TUxVQ1RSRWE4MDFl",
      "name": "Treinta y Tres"
    },
    {
      "id": "TVhYVmFsZW50aW5lc1RVeFZVRlJTUlhOaVkyW",
      "name": "Valentines"
    },
    {
      "id": "TVhYVmVyZGUgQWx0b1RVeFZVRlJTUlhOaVkyW",
      "name": "Verde Alto"
    },
    {
      "id": "TVhYVmVyZ2FyYVRVeFZVRlJTUlhOaVkyWmg",
      "name": "Vergara"
    },
    {
      "id": "TVhYVmlsbGEgUGFzc2Fub1RVeFZVRlJTUlhOa",
      "name": "Villa Passano"
    },
    {
      "id": "TVhYVmlsbGEgU2FyYVRVeFZVRlJTUlhOaVkyW",
      "name": "Villa Sara"
    },
    {
      "id": "TVhYWWVyYmFsIENoaWNvVFV4VlVGUlNSWE5pW",
      "name": "Yerbal Chico"
    },
    {
      "id": "TVhYWWVyYmFsaXRvVFV4VlVGUlNSWE5pWTJaa",
      "name": "Yerbalito"
    }
  ],
  'TUxVUFNBTG9jMTM5': [
    {
      "id": "TVhYQXJlbml0YXMgQmxhbmNhc1RVeFZVRk5CV",
      "name": "Arenitas Blancas"
    },
    {
      "id": "TVhYQmFsbmVhcmlvIEFsYmlzdVRVeFZVRk5CV",
      "name": "Balneario Albisu"
    },
    {
      "id": "TUxVQ0JFTGRjNTQ3",
      "name": "Belén"
    },
    {
      "id": "TVhYQmlhc3NpbmlUVXhWVUZOQlRHOWpNVE01",
      "name": "Biassini"
    },
    {
      "id": "TVhYQm9yZGVuYXZlVFV4VlVGTkJURzlqTVRNN",
      "name": "Bordenave"
    },
    {
      "id": "TVhYQ2FtcG8gRGUgVG9kb3NUVXhWVUZOQlRHO",
      "name": "Campo De Todos"
    },
    {
      "id": "TVhYQ2FydW1iZVRVeFZVRk5CVEc5ak1UTTU",
      "name": "Carumbe"
    },
    {
      "id": "TVhYQ2VsZXN0ZVRVeFZVRk5CVEc5ak1UTTU",
      "name": "Celeste"
    },
    {
      "id": "TVhYQ2VycmlsbGFkYVRVeFZVRk5CVEc5ak1UT",
      "name": "Cerrillada"
    },
    {
      "id": "TVhYQ2VycmlsbGFkYXMgRGUgU2F1Y2Vkb1RVe",
      "name": "Cerrilladas De Saucedo"
    },
    {
      "id": "TVhYQ2Vycm8gQ2hhdG9UVXhWVUZOQlRHOWpNV",
      "name": "Cerro Chato"
    },
    {
      "id": "TVhYQ2Vycm9zIERlIFZlcmFUVXhWVUZOQlRHO",
      "name": "Cerros De Vera"
    },
    {
      "id": "TVhYQ2hhY3JhcyBEZSBCZWxlblRVeFZVRk5CV",
      "name": "Chacras De Belen"
    },
    {
      "id": "TVhYQ2hhY3JhcyBEZSBDb25zdGl0dWNpb25UV",
      "name": "Chacras De Constitucion"
    },
    {
      "id": "TVhYQ29sb25pYSAxOCBEZSBKdWxpb1RVeFZVR",
      "name": "Colonia 18 De Julio"
    },
    {
      "id": "TVhYQ29sb25pYSBJdGFwZWJpVFV4VlVGTkJUR",
      "name": "Colonia Itapebi"
    },
    {
      "id": "TVhYQ29sb25pYSBMYXZhbGxlamFUVXhWVUZOQ",
      "name": "Colonia Lavalleja"
    },
    {
      "id": "TVhYQ29sb25pYSBPc2ltYW5pVFV4VlVGTkJUR",
      "name": "Colonia Osimani"
    },
    {
      "id": "TVhYQ29sb25pYSBSdWJpb1RVeFZVRk5CVEc5a",
      "name": "Colonia Rubio"
    },
    {
      "id": "TUxVQ0NPTjEwMjBk",
      "name": "Constitución"
    },
    {
      "id": "TVhYQ29ycmFsIERlIFBpZWRyYVRVeFZVRk5CV",
      "name": "Corral De Piedra"
    },
    {
      "id": "TVhYQ29ycmFsaXRvVFV4VlVGTkJURzlqTVRNN",
      "name": "Corralito"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgR3Vhdml5dVRVeFZVR",
      "name": "Cuchilla De Guaviyu"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGVsIFNhbHRvVFV4VlVGT",
      "name": "Cuchilla Del Salto"
    },
    {
      "id": "TVhYRWwgRXNwaW5pbGxhclRVeFZVRk5CVEc5a",
      "name": "El Espinillar"
    },
    {
      "id": "TVhYRWwgTWVsbGFkb1RVeFZVRk5CVEc5ak1UT",
      "name": "El Mellado"
    },
    {
      "id": "TVhYRmVycmVpcmFUVXhWVUZOQlRHOWpNVE01",
      "name": "Ferreira"
    },
    {
      "id": "TVhYR2FyaWJhbGRpVFV4VlVGTkJURzlqTVRNN",
      "name": "Garibaldi"
    },
    {
      "id": "TVhYR3Vhdml5dSBEZSBBcmFwZXlUVXhWVUZOQ",
      "name": "Guaviyu De Arapey"
    },
    {
      "id": "TVhYSXRhcGViaVRVeFZVRk5CVEc5ak1UTTU",
      "name": "Itapebi"
    },
    {
      "id": "TVhYTGEgQm9sc2FUVXhWVUZOQlRHOWpNVE01",
      "name": "La Bolsa"
    },
    {
      "id": "TVhYTGEgQm9sc2EgMDJUVXhWVUZOQlRHOWpNV",
      "name": "La Bolsa 02"
    },
    {
      "id": "TVhYTGEgQm9sc2EgMDNUVXhWVUZOQlRHOWpNV",
      "name": "La Bolsa 03"
    },
    {
      "id": "TVhYTGEgQ2FiYWxsYWRhVFV4VlVGTkJURzlqT",
      "name": "La Caballada"
    },
    {
      "id": "TVhYTGEgVml0aWNvbGFUVXhWVUZOQlRHOWpNV",
      "name": "La Viticola"
    },
    {
      "id": "TVhYTGFzIEZsb3Jlc1RVeFZVRk5CVEc5ak1UT",
      "name": "Las Flores"
    },
    {
      "id": "TVhYTGF1cmVsZXNUVXhWVUZOQlRHOWpNVE01",
      "name": "Laureles"
    },
    {
      "id": "TVhYTGx1dmVyYXNUVXhWVUZOQlRHOWpNVE01",
      "name": "Lluveras"
    },
    {
      "id": "TVhYTG9zIE9yaWVudGFsZXNUVXhWVUZOQlRHO",
      "name": "Los Orientales"
    },
    {
      "id": "TVhYTWF0YW9qaXRvVFV4VlVGTkJURzlqTVRNN",
      "name": "Mataojito"
    },
    {
      "id": "TVhYTWF0YW9qbyBHcmFuZGVUVXhWVUZOQlRHO",
      "name": "Mataojo Grande"
    },
    {
      "id": "TVhYTnVldmEgSGVzcGVyaWRlc1RVeFZVRk5CV",
      "name": "Nueva Hesperides"
    },
    {
      "id": "TVhYT2xpdmVyYVRVeFZVRk5CVEc5ak1UTTU",
      "name": "Olivera"
    },
    {
      "id": "TVhYT3NpbWFuaSBZIExsZXJlbmFUVXhWVUZOQ",
      "name": "Osimani Y Llerena"
    },
    {
      "id": "TUxVQ09UUjY4Mjc",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFsb21hc1RVeFZVRk5CVEc5ak1UTTU",
      "name": "Palomas"
    },
    {
      "id": "TVhYUGFyYWRhIEhlcnJlcmlhVFV4VlVGTkJUR",
      "name": "Parada Herreria"
    },
    {
      "id": "TVhYUGFycXVlIEpvc2UgTHVpc1RVeFZVRk5CV",
      "name": "Parque Jose Luis"
    },
    {
      "id": "TVhYUGFzbyBDZW1lbnRlcmlvVFV4VlVGTkJUR",
      "name": "Paso Cementerio"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYXMgUGllZHJhcyBEZSBBc",
      "name": "Paso De Las Piedras De Arerungua"
    },
    {
      "id": "TVhYUGFzbyBEZWwgUGFycXVlIERlbCBEYXltY",
      "name": "Paso Del Parque Del Dayman"
    },
    {
      "id": "TVhYUGFzbyBEZWwgUG90cmVyb1RVeFZVRk5CV",
      "name": "Paso Del Potrero"
    },
    {
      "id": "TVhYUGFzbyBEZWwgVGFwYWRvVFV4VlVGTkJUR",
      "name": "Paso Del Tapado"
    },
    {
      "id": "TVhYUGFzbyBGaWFsaG9UVXhWVUZOQlRHOWpNV",
      "name": "Paso Fialho"
    },
    {
      "id": "TVhYUGFzbyBOdWV2byBEZWwgQXJhcGV5VFV4V",
      "name": "Paso Nuevo Del Arapey"
    },
    {
      "id": "TVhYUGFzbyBWYWxlZ2FUVXhWVUZOQlRHOWpNV",
      "name": "Paso Valega"
    },
    {
      "id": "TVhYUGVwZSBOdcOxZXpUVXhWVUZOQlRHOWpNV",
      "name": "Pepe Nuñez"
    },
    {
      "id": "TVhYUHVlYmxvIENheWV0YW5vVFV4VlVGTkJUR",
      "name": "Pueblo Cayetano"
    },
    {
      "id": "TVhYUHVlYmxvIEZhcmlhc1RVeFZVRk5CVEc5a",
      "name": "Pueblo Farias"
    },
    {
      "id": "TVhYUHVlYmxvIEZlcm5hbmRlelRVeFZVRk5CV",
      "name": "Pueblo Fernandez"
    },
    {
      "id": "TVhYUHVlYmxvIFF1aW50YW5hVFV4VlVGTkJUR",
      "name": "Pueblo Quintana"
    },
    {
      "id": "TVhYUHVlYmxvIFJhbW9zVFV4VlVGTkJURzlqT",
      "name": "Pueblo Ramos"
    },
    {
      "id": "TVhYUHVudGFzIERlIFZhbGVudGluVFV4VlVGT",
      "name": "Puntas De Valentin"
    },
    {
      "id": "TVhYUmluY29uIERlIFZhbGVudGluVFV4VlVGT",
      "name": "Rincon De Valentin"
    },
    {
      "id": "TVhYUnVzc29UVXhWVUZOQlRHOWpNVE01",
      "name": "Russo"
    },
    {
      "id": "TUxVQ1NBTDU1OGZj",
      "name": "Salto"
    },
    {
      "id": "TVhYU2FuIEFudG9uaW9UVXhWVUZOQlRHOWpNV",
      "name": "San Antonio"
    },
    {
      "id": "TVhYU2FyYW5kaSBEZSBBcmFwZXlUVXhWVUZOQ",
      "name": "Sarandi De Arapey"
    },
    {
      "id": "TVhYU2F1Y2UgQ2hpY29UVXhWVUZOQlRHOWpNV",
      "name": "Sauce Chico"
    },
    {
      "id": "TVhYU2F1Y2Vkb1RVeFZVRk5CVEc5ak1UTTU",
      "name": "Saucedo"
    },
    {
      "id": "TVhYU29wYXNUVXhWVUZOQlRHOWpNVE01",
      "name": "Sopas"
    },
    {
      "id": "TVhYVGFsYXMgRGUgSXRhcGViaVRVeFZVRk5CV",
      "name": "Talas De Itapebi"
    },
    {
      "id": "TVhYVGVybWFzIERlbCBBcmFwZXlUVXhWVUZOQ",
      "name": "Termas Del Arapey"
    },
    {
      "id": "TVhYVGVybWFzIERlbCBEYXltYW5UVXhWVUZOQ",
      "name": "Termas Del Dayman"
    },
    {
      "id": "TVhYVG9ybyBOZWdyb1RVeFZVRk5CVEc5ak1UT",
      "name": "Toro Negro"
    },
    {
      "id": "TVhYVHJvcGV6b25UVXhWVUZOQlRHOWpNVE01",
      "name": "Tropezon"
    },
    {
      "id": "TVhYVHJvcGllem9UVXhWVUZOQlRHOWpNVE01",
      "name": "Tropiezo"
    },
    {
      "id": "TVhYVmFsZW50aW4gR3JhbmRlVFV4VlVGTkJUR",
      "name": "Valentin Grande"
    },
    {
      "id": "TVhYWWFjdXlUVXhWVUZOQlRHOWpNVE01",
      "name": "Yacuy"
    },
    {
      "id": "TVhYWmFuamEgRGUgQWxjYWluVFV4VlVGTkJUR",
      "name": "Zanja De Alcain"
    },
    {
      "id": "TVhYWmFuamEgRGVsIFRpZ3JlVFV4VlVGTkJUR",
      "name": "Zanja Del Tigre"
    }
  ],
  'TUxVUFLNT1oxNTQ4MQ': [
    {
      "id": "TVhYQWxnb3J0YVRVeFZVRkxOVDFveE5UUTRNU",
      "name": "Algorta"
    },
    {
      "id": "TVhYQXJyb3lvIE5lZ3JvVFV4VlVGTE5UMW94T",
      "name": "Arroyo Negro"
    },
    {
      "id": "TVhYQmFycmlvIEFuZ2xvVFV4VlVGTE5UMW94T",
      "name": "Barrio Anglo"
    },
    {
      "id": "TVhYQmVsbGFjb1RVeFZVRkxOVDFveE5UUTRNU",
      "name": "Bellaco"
    },
    {
      "id": "TVhYQ2FyYWNvbGVzVFV4VlVGTE5UMW94TlRRN",
      "name": "Caracoles"
    },
    {
      "id": "TVhYQ2HDsWl0YXNUVXhWVUZMTlQxb3hOVFE0T",
      "name": "Cañitas"
    },
    {
      "id": "TVhYQ29sb25pYSBFbCBPbWJ1VFV4VlVGTE5UM",
      "name": "Colonia El Ombu"
    },
    {
      "id": "TVhYQ29sb25pYSBKb2huIEYuIEtlbm5lZHlUV",
      "name": "Colonia John F. Kennedy"
    },
    {
      "id": "TVhYRG9uIEVzdGViYW5UVXhWVUZMTlQxb3hOV",
      "name": "Don Esteban"
    },
    {
      "id": "TVhYRWwgQWJyb2phbFRVeFZVRkxOVDFveE5UU",
      "name": "El Abrojal"
    },
    {
      "id": "TVhYRWwgUHJvZ3Jlc29UVXhWVUZMTlQxb3hOV",
      "name": "El Progreso"
    },
    {
      "id": "TVhYRWwgU3VyY29UVXhWVUZMTlQxb3hOVFE0T",
      "name": "El Surco"
    },
    {
      "id": "TVhYRXN0YWNpb24gRnJhbmNpYVRVeFZVRkxOV",
      "name": "Estacion Francia"
    },
    {
      "id": "TVhYRXN0YW5jaWEgVmljaGFkZXJvVFV4VlVGT",
      "name": "Estancia Vichadero"
    },
    {
      "id": "TUxVQ0ZSQTY3YTFj",
      "name": "Fray Bentos"
    },
    {
      "id": "TVhYSXNsYSBEZSBBcmd1ZWxsZXNUVXhWVUZMT",
      "name": "Isla De Arguelles"
    },
    {
      "id": "TVhYTGEgQXJlbmFUVXhWVUZMTlQxb3hOVFE0T",
      "name": "La Arena"
    },
    {
      "id": "TVhYTGEgQ29yb25pbGxhVFV4VlVGTE5UMW94T",
      "name": "La Coronilla"
    },
    {
      "id": "TVhYTGEgRmxvcmlkYVRVeFZVRkxOVDFveE5UU",
      "name": "La Florida"
    },
    {
      "id": "TVhYTGEgUGFsbWFUVXhWVUZMTlQxb3hOVFE0T",
      "name": "La Palma"
    },
    {
      "id": "TVhYTGEgVW5pb25UVXhWVUZMTlQxb3hOVFE0T",
      "name": "La Union"
    },
    {
      "id": "TVhYTGFzIENhw7Fhc1RVeFZVRkxOVDFveE5UU",
      "name": "Las Cañas"
    },
    {
      "id": "TVhYTGFzIEZsb3Jlc1RVeFZVRkxOVDFveE5UU",
      "name": "Las Flores"
    },
    {
      "id": "TVhYTGFzIEZyYWNjaW9uZXNUVXhWVUZMTlQxb",
      "name": "Las Fracciones"
    },
    {
      "id": "TVhYTGFzIE1hcmdhcml0YXNUVXhWVUZMTlQxb",
      "name": "Las Margaritas"
    },
    {
      "id": "TVhYTG9zIEFycmF5YW5lc1RVeFZVRkxOVDFve",
      "name": "Los Arrayanes"
    },
    {
      "id": "TVhYTG9zIE1lbGxpem9zVFV4VlVGTE5UMW94T",
      "name": "Los Mellizos"
    },
    {
      "id": "TVhYTG9zIFJhbmNob3NUVXhWVUZMTlQxb3hOV",
      "name": "Los Ranchos"
    },
    {
      "id": "TVhYTWF0YW9qb1RVeFZVRkxOVDFveE5UUTRNU",
      "name": "Mataojo"
    },
    {
      "id": "TVhYTWVuYWZyYVRVeFZVRkxOVDFveE5UUTRNU",
      "name": "Menafra"
    },
    {
      "id": "TVhYTWVyaW5vc1RVeFZVRkxOVDFveE5UUTRNU",
      "name": "Merinos"
    },
    {
      "id": "TVhYTW9sbGVzIERlIFBvcnJ1YVRVeFZVRkxOV",
      "name": "Molles De Porrua"
    },
    {
      "id": "TUxVQ05VRTQzODNh",
      "name": "Nuevo Berlín"
    },
    {
      "id": "TVhYT21idWNpdG9zVFV4VlVGTE5UMW94TlRRN",
      "name": "Ombucitos"
    },
    {
      "id": "TUxVQ09UUjkyMDY",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFsbWFyIEdyYW5kZVRVeFZVRkxOVDFve",
      "name": "Palmar Grande"
    },
    {
      "id": "TVhYUGFzbyBEZSBCYWxidWVuYVRVeFZVRkxOV",
      "name": "Paso De Balbuena"
    },
    {
      "id": "TVhYUGFzbyBEZSBMZW9wb2xkb1RVeFZVRkxOV",
      "name": "Paso De Leopoldo"
    },
    {
      "id": "TVhYUGFzbyBEZSBMb3MgQ29icmVzVFV4VlVGT",
      "name": "Paso De Los Cobres"
    },
    {
      "id": "TVhYUGFzbyBEZSBTb2NhVFV4VlVGTE5UMW94T",
      "name": "Paso De Soca"
    },
    {
      "id": "TVhYUGFzbyBSYW1pcmV6VFV4VlVGTE5UMW94T",
      "name": "Paso Ramirez"
    },
    {
      "id": "TVhYUGF1cnVUVXhWVUZMTlQxb3hOVFE0TVE",
      "name": "Pauru"
    },
    {
      "id": "TVhYUG9ydG9uIEhhZWRvVFV4VlVGTE5UMW94T",
      "name": "Porton Haedo"
    },
    {
      "id": "TVhYUHRlLiBTYW4gTWFydGluVFV4VlVGTE5UM",
      "name": "Pte. San Martin"
    },
    {
      "id": "TVhYUHVlYmxvIEdyZWNjb1RVeFZVRkxOVDFve",
      "name": "Pueblo Grecco"
    },
    {
      "id": "TVhYUHVudGFzIERlIEF2ZXJpYXNUVXhWVUZMT",
      "name": "Puntas De Averias"
    },
    {
      "id": "TVhYUm9sb25UVXhWVUZMTlQxb3hOVFE0TVE",
      "name": "Rolon"
    },
    {
      "id": "TUxVQ1NBTmM2ZmFh",
      "name": "San Javier"
    },
    {
      "id": "TVhYU2FuIExvcmVuem9UVXhWVUZMTlQxb3hOV",
      "name": "San Lorenzo"
    },
    {
      "id": "TVhYU2FuY2hlelRVeFZVRkxOVDFveE5UUTRNU",
      "name": "Sanchez"
    },
    {
      "id": "TVhYU2FuY2hleiBDaGljb1RVeFZVRkxOVDFve",
      "name": "Sanchez Chico"
    },
    {
      "id": "TVhYU2FudGEgRWxpc2FUVXhWVUZMTlQxb3hOV",
      "name": "Santa Elisa"
    },
    {
      "id": "TVhYU2FudGEgSXNhYmVsVFV4VlVGTE5UMW94T",
      "name": "Santa Isabel"
    },
    {
      "id": "TVhYU2FudGEgUm9zYVRVeFZVRkxOVDFveE5UU",
      "name": "Santa Rosa"
    },
    {
      "id": "TVhYU2FyYW5kaVRVeFZVRkxOVDFveE5UUTRNU",
      "name": "Sarandi"
    },
    {
      "id": "TVhYU2FyYW5kaSBEZSBOYXZhcnJvVFV4VlVGT",
      "name": "Sarandi De Navarro"
    },
    {
      "id": "TVhYU2F1Y2VUVXhWVUZMTlQxb3hOVFE0TVE",
      "name": "Sauce"
    },
    {
      "id": "TVhYVHJlcyBCb2Nhc1RVeFZVRkxOVDFveE5UU",
      "name": "Tres Bocas"
    },
    {
      "id": "TVhYVWxlc3RlVFV4VlVGTE5UMW94TlRRNE1R",
      "name": "Uleste"
    },
    {
      "id": "TVhYVmFsbGUgRGUgU29iYVRVeFZVRkxOVDFve",
      "name": "Valle De Soba"
    },
    {
      "id": "TVhYVmlsbGEgR2VuZXJhbCBCb3JnZXNUVXhWV",
      "name": "Villa General Borges"
    },
    {
      "id": "TVhYVmlsbGEgTWFyaWFUVXhWVUZMTlQxb3hOV",
      "name": "Villa Maria"
    },
    {
      "id": "TVhYWWFndWFyZXRlVFV4VlVGTE5UMW94TlRRN",
      "name": "Yaguarete"
    },
    {
      "id": "TUxVQ1lPVTJiNGNi",
      "name": "Young"
    }
  ],
  'TUxVUFJJVlpjOWQ1': [
    {
      "id": "TVhYQWJyb2phbFRVeFZVRkpKVmxwak9XUTE",
      "name": "Abrojal"
    },
    {
      "id": "TVhYQWxib3JhZGFUVXhWVUZKSlZscGpPV1Ex",
      "name": "Alborada"
    },
    {
      "id": "TVhYQW1hcmlsbG9UVXhWVUZKSlZscGpPV1Ex",
      "name": "Amarillo"
    },
    {
      "id": "TVhYQXJyb3lvIEJsYW5jb1RVeFZVRkpKVmxwa",
      "name": "Arroyo Blanco"
    },
    {
      "id": "TVhYQXJyb3lvIFNhdXphbFRVeFZVRkpKVmxwa",
      "name": "Arroyo Sauzal"
    },
    {
      "id": "TVhYQXRhcXVlc1RVeFZVRkpKVmxwak9XUTE",
      "name": "Ataques"
    },
    {
      "id": "TVhYQmFycmEgRGUgQXRhcXVlc1RVeFZVRkpKV",
      "name": "Barra De Ataques"
    },
    {
      "id": "TVhYQmFycmlvIFJlY3Jlb1RVeFZVRkpKVmxwa",
      "name": "Barrio Recreo"
    },
    {
      "id": "TVhYQmF0b3ZpVFV4VlVGSkpWbHBqT1dRMQ",
      "name": "Batovi"
    },
    {
      "id": "TVhYQmHDsWFkbyBEZWwgQ2hhamFUVXhWVUZKS",
      "name": "Bañado Del Chaja"
    },
    {
      "id": "TVhYQmVycnV0aVRVeFZVRkpKVmxwak9XUTE",
      "name": "Berruti"
    },
    {
      "id": "TVhYQmxhbnF1aWxsb3NUVXhWVUZKSlZscGpPV",
      "name": "Blanquillos"
    },
    {
      "id": "TVhYQnVlbmEgT3JkZW4gQWwgTm9ydGVUVXhWV",
      "name": "Buena Orden Al Norte"
    },
    {
      "id": "TVhYQnVlbmEgVW5pb25UVXhWVUZKSlZscGpPV",
      "name": "Buena Union"
    },
    {
      "id": "TVhYQ2Fwb24gQWx0b1RVeFZVRkpKVmxwak9XU",
      "name": "Capon Alto"
    },
    {
      "id": "TVhYQ2FyYWd1YXRhVFV4VlVGSkpWbHBqT1dRM",
      "name": "Caraguata"
    },
    {
      "id": "TVhYQ2FycGludGVyaWFUVXhWVUZKSlZscGpPV",
      "name": "Carpinteria"
    },
    {
      "id": "TVhYQ2VycmlsbGFkYVRVeFZVRkpKVmxwak9XU",
      "name": "Cerrillada"
    },
    {
      "id": "TVhYQ2Vycm8gQWxlZ3JlVFV4VlVGSkpWbHBqT",
      "name": "Cerro Alegre"
    },
    {
      "id": "TVhYQ2Vycm8gQmxhbmNvIERlIEN1w7FhcGlyd",
      "name": "Cerro Blanco De Cuñapiru"
    },
    {
      "id": "TVhYQ2Vycm8gQ2FxdWVpcm9UVXhWVUZKSlZsc",
      "name": "Cerro Caqueiro"
    },
    {
      "id": "TVhYQ2Vycm8gQ2hhcGV1VFV4VlVGSkpWbHBqT",
      "name": "Cerro Chapeu"
    },
    {
      "id": "TVhYQ2Vycm8gQ2hhdG9UVXhWVUZKSlZscGpPV",
      "name": "Cerro Chato"
    },
    {
      "id": "TVhYQ2Vycm8gUGVsYWRvVFV4VlVGSkpWbHBqT",
      "name": "Cerro Pelado"
    },
    {
      "id": "TVhYQ2Vycm8gUGVsYWRvIEFsIEVzdGVUVXhWV",
      "name": "Cerro Pelado Al Este"
    },
    {
      "id": "TVhYQ2Vycm8gU29saXRvVFV4VlVGSkpWbHBqT",
      "name": "Cerro Solito"
    },
    {
      "id": "TVhYQ2Vycm9zIEJsYW5jb3NUVXhWVUZKSlZsc",
      "name": "Cerros Blancos"
    },
    {
      "id": "TVhYQ2Vycm9zIERlIExhIENhbGVyYVRVeFZVR",
      "name": "Cerros De La Calera"
    },
    {
      "id": "TVhYQ2hpcmNhIERlIENhcmFndWF0YVRVeFZVR",
      "name": "Chirca De Caraguata"
    },
    {
      "id": "TVhYQ29yb25pbGxhVFV4VlVGSkpWbHBqT1dRM",
      "name": "Coronilla"
    },
    {
      "id": "TVhYQ29yb25pbGxhIERlIENvcnJhbGVzVFV4V",
      "name": "Coronilla De Corrales"
    },
    {
      "id": "TVhYQ29zdGFzIERlIEN1w7FhcGlydVRVeFZVR",
      "name": "Costas De Cuñapiru"
    },
    {
      "id": "TVhYQ3J1eiBEZSBTYW4gUGVkcm9UVXhWVUZKS",
      "name": "Cruz De San Pedro"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgVHJlcyBDZXJyb3NUV",
      "name": "Cuchilla De Tres Cerros"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgWWFndWFyaVRVeFZVR",
      "name": "Cuchilla De Yaguari"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgTWFuZ3VlcmFzVFV4VlVGS",
      "name": "Cuchilla Mangueras"
    },
    {
      "id": "TVhYQ3VydGljZWlyYXNUVXhWVUZKSlZscGpPV",
      "name": "Curticeiras"
    },
    {
      "id": "TVhYQ3VydHVtZVRVeFZVRkpKVmxwak9XUTE",
      "name": "Curtume"
    },
    {
      "id": "TVhYQ3XDsWFwaXJ1VFV4VlVGSkpWbHBqT1dRM",
      "name": "Cuñapiru"
    },
    {
      "id": "TVhYRWwgQ2VpYm9UVXhWVUZKSlZscGpPV1Ex",
      "name": "El Ceibo"
    },
    {
      "id": "TVhYRWwgUGFsbWl0b1RVeFZVRkpKVmxwak9XU",
      "name": "El Palmito"
    },
    {
      "id": "TVhYR3Vhdml5dVRVeFZVRkpKVmxwak9XUTE",
      "name": "Guaviyu"
    },
    {
      "id": "TVhYSG9zcGl0YWxUVXhWVUZKSlZscGpPV1Ex",
      "name": "Hospital"
    },
    {
      "id": "TVhYTGEgQ2FpbGxhdmFUVXhWVUZKSlZscGpPV",
      "name": "La Caillava"
    },
    {
      "id": "TVhYTGEgQ2FsZXJhVFV4VlVGSkpWbHBqT1dRM",
      "name": "La Calera"
    },
    {
      "id": "TVhYTGEgQ2VycmlsbGFkYVRVeFZVRkpKVmxwa",
      "name": "La Cerrillada"
    },
    {
      "id": "TVhYTGEgQ2hpbGNhVFV4VlVGSkpWbHBqT1dRM",
      "name": "La Chilca"
    },
    {
      "id": "TVhYTGEgUGFsbWFUVXhWVUZKSlZscGpPV1Ex",
      "name": "La Palma"
    },
    {
      "id": "TVhYTGEgUGVkcmVyYVRVeFZVRkpKVmxwak9XU",
      "name": "La Pedrera"
    },
    {
      "id": "TVhYTGFnb3MgRGVsIE5vcnRlVFV4VlVGSkpWb",
      "name": "Lagos Del Norte"
    },
    {
      "id": "TVhYTGFndW5vblRVeFZVRkpKVmxwak9XUTE",
      "name": "Lagunon"
    },
    {
      "id": "TVhYTGFzIEZsb3Jlc1RVeFZVRkpKVmxwak9XU",
      "name": "Las Flores"
    },
    {
      "id": "TVhYTGF1cmVsZXNUVXhWVUZKSlZscGpPV1Ex",
      "name": "Laureles"
    },
    {
      "id": "TVhYTG9zIFBvdHJlcm9zVFV4VlVGSkpWbHBqT",
      "name": "Los Potreros"
    },
    {
      "id": "TVhYTHVuYXJlam9UVXhWVUZKSlZscGpPV1Ex",
      "name": "Lunarejo"
    },
    {
      "id": "TVhYTWFuZHViaVRVeFZVRkpKVmxwak9XUTE",
      "name": "Mandubi"
    },
    {
      "id": "TVhYTWFudWVsIERpYXpUVXhWVUZKSlZscGpPV",
      "name": "Manuel Diaz"
    },
    {
      "id": "TVhYTWFzb2xsZXJUVXhWVUZKSlZscGpPV1Ex",
      "name": "Masoller"
    },
    {
      "id": "TVhYTWluYXMgRGUgQ3XDsWFwaXJ1IChVc2luY",
      "name": "Minas De Cuñapiru (Usinas)"
    },
    {
      "id": "TVhYTWluYXMgRGUgWmFwdWNheVRVeFZVRkpKV",
      "name": "Minas De Zapucay"
    },
    {
      "id": "TUxVQ01JTjYyMmE",
      "name": "Minas de Corrales"
    },
    {
      "id": "TVhYTW9pcm9uZXNUVXhWVUZKSlZscGpPV1Ex",
      "name": "Moirones"
    },
    {
      "id": "TUxVQ09UUjQzMzk",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFyYWRhIE1lZGluYVRVeFZVRkpKVmxwa",
      "name": "Parada Medina"
    },
    {
      "id": "TVhYUGFzbyBBbWFyaWxsb1RVeFZVRkpKVmxwa",
      "name": "Paso Amarillo"
    },
    {
      "id": "TVhYUGFzbyBBdGFxdWVzVFV4VlVGSkpWbHBqT",
      "name": "Paso Ataques"
    },
    {
      "id": "TVhYUGFzbyBDYXNpbGRvVFV4VlVGSkpWbHBqT",
      "name": "Paso Casildo"
    },
    {
      "id": "TVhYUGFzbyBEZSBBcnJpZXJhVFV4VlVGSkpWb",
      "name": "Paso De Arriera"
    },
    {
      "id": "TVhYUGFzbyBEZSBBdGFxdWVzVFV4VlVGSkpWb",
      "name": "Paso De Ataques"
    },
    {
      "id": "TVhYUGFzbyBEZSBGcm9udGVyYVRVeFZVRkpKV",
      "name": "Paso De Frontera"
    },
    {
      "id": "TVhYUGFzbyBEZSBHYWlyZVRVeFZVRkpKVmxwa",
      "name": "Paso De Gaire"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYSBBcmVuYVRVeFZVRkpKV",
      "name": "Paso De La Arena"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYSBDYWxlcmFUVXhWVUZKS",
      "name": "Paso De La Calera"
    },
    {
      "id": "TVhYUGFzbyBEZWwgTGFndW5vblRVeFZVRkpKV",
      "name": "Paso Del Lagunon"
    },
    {
      "id": "TVhYUGFzbyBEZWwgUHVlcnRvVFV4VlVGSkpWb",
      "name": "Paso Del Puerto"
    },
    {
      "id": "TVhYUGFzbyBEZWwgVGFwYWRvVFV4VlVGSkpWb",
      "name": "Paso Del Tapado"
    },
    {
      "id": "TVhYUGFzbyBMYXB1ZW50ZVRVeFZVRkpKVmxwa",
      "name": "Paso Lapuente"
    },
    {
      "id": "TVhYUGFzbyBTZXJwYVRVeFZVRkpKVmxwak9XU",
      "name": "Paso Serpa"
    },
    {
      "id": "TVhYUGllZHJhcyBCbGFuY2FzVFV4VlVGSkpWb",
      "name": "Piedras Blancas"
    },
    {
      "id": "TVhYUGxhdG9uVFV4VlVGSkpWbHBqT1dRMQ",
      "name": "Platon"
    },
    {
      "id": "TVhYUHVlYmxvIERlIExvcyBTYW50b3NUVXhWV",
      "name": "Pueblo De Los Santos"
    },
    {
      "id": "TVhYUHVlYmxvIFNvY29ycm9UVXhWVUZKSlZsc",
      "name": "Pueblo Socorro"
    },
    {
      "id": "TVhYUHVudGFzIERlIEFicm9qYWxUVXhWVUZKS",
      "name": "Puntas De Abrojal"
    },
    {
      "id": "TVhYUHVudGFzIERlIENvcnJhbGVzVFV4VlVGS",
      "name": "Puntas De Corrales"
    },
    {
      "id": "TVhYUHVudGFzIERlIEN1w7FhcGlydVRVeFZVR",
      "name": "Puntas De Cuñapiru"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBTYXV6YWxUVXhWVUZKS",
      "name": "Puntas Del Sauzal"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBZYWd1YXJpVFV4VlVGS",
      "name": "Puntas Del Yaguari"
    },
    {
      "id": "TVhYUmluY29uIERlIEFtYXJpbGxvVFV4VlVGS",
      "name": "Rincon De Amarillo"
    },
    {
      "id": "TVhYUmluY29uIERlIERpbml6VFV4VlVGSkpWb",
      "name": "Rincon De Diniz"
    },
    {
      "id": "TVhYUmluY29uIERlIExvcyBDYXN0aWxsb3NUV",
      "name": "Rincon De Los Castillos"
    },
    {
      "id": "TVhYUmluY29uIERlIE1vcmFlc1RVeFZVRkpKV",
      "name": "Rincon De Moraes"
    },
    {
      "id": "TVhYUmluY29uIERlIFJvZHJpZ3VlelRVeFZVR",
      "name": "Rincon De Rodriguez"
    },
    {
      "id": "TVhYUmluY29uIERlIFJvbGFuZFRVeFZVRkpKV",
      "name": "Rincon De Roland"
    },
    {
      "id": "TVhYUmluY29uIERlIFRyZXMgQ2Vycm9zVFV4V",
      "name": "Rincon De Tres Cerros"
    },
    {
      "id": "TVhYUmluY29uIERlIFlhZ3VhcmlUVXhWVUZKS",
      "name": "Rincon De Yaguari"
    },
    {
      "id": "TUxVQ1JJVjkyNmMz",
      "name": "Rivera"
    },
    {
      "id": "TVhYU2FuIEdyZWdvcmlvVFV4VlVGSkpWbHBqT",
      "name": "San Gregorio"
    },
    {
      "id": "TVhYU2FudGEgRXJuZXN0aW5hVFV4VlVGSkpWb",
      "name": "Santa Ernestina"
    },
    {
      "id": "TVhYU2FudGEgSXNhYmVsVFV4VlVGSkpWbHBqT",
      "name": "Santa Isabel"
    },
    {
      "id": "TVhYU2FudGEgVGVyZXNhVFV4VlVGSkpWbHBqT",
      "name": "Santa Teresa"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgQmF0b3ZpVFV4VlVGSkpWb",
      "name": "Sauce De Batovi"
    },
    {
      "id": "TVhYU2F1emFsVFV4VlVGSkpWbHBqT1dRMQ",
      "name": "Sauzal"
    },
    {
      "id": "TVhYU2VnYXJyYVRVeFZVRkpKVmxwak9XUTE",
      "name": "Segarra"
    },
    {
      "id": "TUxVQ1RSQWI5Yjg0",
      "name": "Tranqueras"
    },
    {
      "id": "TVhYVHJlcyBDZXJyb3NUVXhWVUZKSlZscGpPV",
      "name": "Tres Cerros"
    },
    {
      "id": "TVhYVHJlcyBDcnVjZXNUVXhWVUZKSlZscGpPV",
      "name": "Tres Cruces"
    },
    {
      "id": "TVhYVHJlcyBQdWVudGVzVFV4VlVGSkpWbHBqT",
      "name": "Tres Puentes"
    },
    {
      "id": "TUxVQ1ZJQ2M2OThi",
      "name": "Vichadero"
    },
    {
      "id": "TVhYVmlsbGEgSW5kYXJ0VFV4VlVGSkpWbHBqT",
      "name": "Villa Indart"
    },
    {
      "id": "TVhYWWFndWFyaVRVeFZVRkpKVmxwak9XUTE",
      "name": "Yaguari"
    },
    {
      "id": "TVhYWmFuamEgSG9uZGFUVXhWVUZKSlZscGpPV",
      "name": "Zanja Honda"
    },
    {
      "id": "TVhYWmFuamEgSG9uZGEgRGUgVHJhbnF1ZXJhc",
      "name": "Zanja Honda De Tranqueras"
    }
  ],
  'TUxVUENFUm9mOTJl': [
    {
      "id": "TUxVQ0FDRWVmMGU1",
      "name": "Aceguá"
    },
    {
      "id": "TVhYQWd1aXJyZVRVeFZVRU5GVW05bU9USmw",
      "name": "Aguirre"
    },
    {
      "id": "TVhYQW1hcmlsbG9UVXhWVUVORlVtOW1PVEps",
      "name": "Amarillo"
    },
    {
      "id": "TVhYQXJhY2hhbmlhVFV4VlVFTkZVbTltT1RKb",
      "name": "Arachania"
    },
    {
      "id": "TVhYQXJib2xpdG9UVXhWVUVORlVtOW1PVEps",
      "name": "Arbolito"
    },
    {
      "id": "TVhYQXJldmFsb1RVeFZVRU5GVW05bU9USmw",
      "name": "Arevalo"
    },
    {
      "id": "TVhYQXJyb3lvIE1hbG9UVXhWVUVORlVtOW1PV",
      "name": "Arroyo Malo"
    },
    {
      "id": "TVhYQXJyb3phbCBDZXNhcm9uZVRVeFZVRU5GV",
      "name": "Arrozal Cesarone"
    },
    {
      "id": "TVhYQXJyb3phbCBSb3NhbGVzVFV4VlVFTkZVb",
      "name": "Arrozal Rosales"
    },
    {
      "id": "TVhYQXNwZXJlemFzVFV4VlVFTkZVbTltT1RKb",
      "name": "Asperezas"
    },
    {
      "id": "TVhYQmFycmEgRGVsIFNhdWNlVFV4VlVFTkZVb",
      "name": "Barra Del Sauce"
    },
    {
      "id": "TVhYQmFycmEgRGVsIFRhY3VhcmlUVXhWVUVOR",
      "name": "Barra Del Tacuari"
    },
    {
      "id": "TVhYQmFycmlvIExhIFZpbmNodWNhVFV4VlVFT",
      "name": "Barrio La Vinchuca"
    },
    {
      "id": "TVhYQmFycmlvIExvcGV6IEJlbml0ZXpUVXhWV",
      "name": "Barrio Lopez Benitez"
    },
    {
      "id": "TVhYQmHDsWFkbyBEZSBMYXMgUGFqYXNUVXhWV",
      "name": "Bañado De Las Pajas"
    },
    {
      "id": "TVhYQmHDsWFkbyBEZSBNZWRpbmFUVXhWVUVOR",
      "name": "Bañado De Medina"
    },
    {
      "id": "TVhYQmVyYWNoaVRVeFZVRU5GVW05bU9USmw",
      "name": "Berachi"
    },
    {
      "id": "TVhYQnVlbmEgVmlzdGFUVXhWVUVORlVtOW1PV",
      "name": "Buena Vista"
    },
    {
      "id": "TVhYQ2FsZXJhIERlIFJlY2FsZGVUVXhWVUVOR",
      "name": "Calera De Recalde"
    },
    {
      "id": "TVhYQ2FtcGFtZW50b1RVeFZVRU5GVW05bU9US",
      "name": "Campamento"
    },
    {
      "id": "TVhYQ2FzYSBEZSBMYXMgQ3JvbmljYXNUVXhWV",
      "name": "Casa De Las Cronicas"
    },
    {
      "id": "TVhYQ2FzZXJpbyBMYXMgQ2HDsWFzVFV4VlVFT",
      "name": "Caserio Las Cañas"
    },
    {
      "id": "TVhYQ2HDsWFkYSBCcmF2YVRVeFZVRU5GVW05b",
      "name": "Cañada Brava"
    },
    {
      "id": "TVhYQ2HDsWFkYSBEZSBTYW50b3NUVXhWVUVOR",
      "name": "Cañada De Santos"
    },
    {
      "id": "TVhYQ2HDsWFkYSBHcmFuZGVUVXhWVUVORlVtO",
      "name": "Cañada Grande"
    },
    {
      "id": "TVhYQ2HDsWFkYSBTYXJhbmRpVFV4VlVFTkZVb",
      "name": "Cañada Sarandi"
    },
    {
      "id": "TVhYQ2HDsWl0YXNUVXhWVUVORlVtOW1PVEps",
      "name": "Cañitas"
    },
    {
      "id": "TVhYQ2VtZW50ZXJpb1RVeFZVRU5GVW05bU9US",
      "name": "Cementerio"
    },
    {
      "id": "TVhYQ2VudHVyaW9uVFV4VlVFTkZVbTltT1RKb",
      "name": "Centurion"
    },
    {
      "id": "TVhYQ2Vycm8gRGUgTGFzIEN1ZW50YXNUVXhWV",
      "name": "Cerro De Las Cuentas"
    },
    {
      "id": "TVhYQ2hhY3JhcyBEZSBNZWxvVFV4VlVFTkZVb",
      "name": "Chacras De Melo"
    },
    {
      "id": "TVhYQ29pbWJyYVRVeFZVRU5GVW05bU9USmw",
      "name": "Coimbra"
    },
    {
      "id": "TVhYQ29sb25pYSBDZXJlc1RVeFZVRU5GVW05b",
      "name": "Colonia Ceres"
    },
    {
      "id": "TVhYQ29sb25pYSBNYXJpYSBUZXJlc2FUVXhWV",
      "name": "Colonia Maria Teresa"
    },
    {
      "id": "TVhYQ29sb25pYSBPcm96Y29UVXhWVUVORlVtO",
      "name": "Colonia Orozco"
    },
    {
      "id": "TVhYQ29udmVudG9zVFV4VlVFTkZVbTltT1RKb",
      "name": "Conventos"
    },
    {
      "id": "TVhYQ29ycmFsIERlIFBpZWRyYVRVeFZVRU5GV",
      "name": "Corral De Piedra"
    },
    {
      "id": "TVhYQ3J1eiBEZSBQaWVkcmFUVXhWVUVORlVtO",
      "name": "Cruz De Piedra"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgQ2FtYm90YVRVeFZVRU5GV",
      "name": "Cuchilla Cambota"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGUgTWVsb1RVeFZVRU5GV",
      "name": "Cuchilla De Melo"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGVsIENhcm1lblRVeFZVR",
      "name": "Cuchilla Del Carmen"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgRGVsIFBhcmFpc29UVXhWV",
      "name": "Cuchilla Del Paraiso"
    },
    {
      "id": "TVhYQ3VjaGlsbGEgUGVyYWx0YVRVeFZVRU5GV",
      "name": "Cuchilla Peralta"
    },
    {
      "id": "TVhYRHVyYXpuZXJvVFV4VlVFTkZVbTltT1RKb",
      "name": "Duraznero"
    },
    {
      "id": "TVhYRXNjdWVsYSBEZSBBZ3Jvbm9taWFUVXhWV",
      "name": "Escuela De Agronomia"
    },
    {
      "id": "TVhYRXNwZXJhbnphVFV4VlVFTkZVbTltT1RKb",
      "name": "Esperanza"
    },
    {
      "id": "TVhYRmFsZGEgRGUgU2llcnJhIERlIExvcyBSa",
      "name": "Falda De Sierra De Los Rios"
    },
    {
      "id": "TVhYRnJhaWxlIE11ZXJ0b1RVeFZVRU5GVW05b",
      "name": "Fraile Muerto"
    },
    {
      "id": "TVhYR2FuZW5UVXhWVUVORlVtOW1PVEps",
      "name": "Ganen"
    },
    {
      "id": "TVhYR2FyYW9UVXhWVUVORlVtOW1PVEps",
      "name": "Garao"
    },
    {
      "id": "TVhYR3JhbmphIERlIEFjZWd1YVRVeFZVRU5GV",
      "name": "Granja De Acegua"
    },
    {
      "id": "TVhYR3JhbmphIFBhbGxlcm9UVXhWVUVORlVtO",
      "name": "Granja Pallero"
    },
    {
      "id": "TVhYR3VhenVuYW1iaVRVeFZVRU5GVW05bU9US",
      "name": "Guazunambi"
    },
    {
      "id": "TVhYSGlwb2Ryb21vVFV4VlVFTkZVbTltT1RKb",
      "name": "Hipodromo"
    },
    {
      "id": "TVhYSW5maWVybmlsbG9UVXhWVUVORlVtOW1PV",
      "name": "Infiernillo"
    },
    {
      "id": "TVhYSXNpZG9ybyBOb2JsaWFUVXhWVUVORlVtO",
      "name": "Isidoro Noblia"
    },
    {
      "id": "TVhYTGEgQ29yb25pbGxhVFV4VlVFTkZVbTltT",
      "name": "La Coronilla"
    },
    {
      "id": "TVhYTGEgR2xvcmlhVFV4VlVFTkZVbTltT1RKb",
      "name": "La Gloria"
    },
    {
      "id": "TVhYTGEgTWljYWVsYVRVeFZVRU5GVW05bU9US",
      "name": "La Micaela"
    },
    {
      "id": "TVhYTGEgTWluYVRVeFZVRU5GVW05bU9USmw",
      "name": "La Mina"
    },
    {
      "id": "TVhYTGEgUGVkcmVyYVRVeFZVRU5GVW05bU9US",
      "name": "La Pedrera"
    },
    {
      "id": "TUxVQ0xBR2I0MzYz",
      "name": "Lago Merín"
    },
    {
      "id": "TVhYTGFndW5hIERlbCBKdW5jb1RVeFZVRU5GV",
      "name": "Laguna Del Junco"
    },
    {
      "id": "TVhYTGFzIExpbWFzVFV4VlVFTkZVbTltT1RKb",
      "name": "Las Limas"
    },
    {
      "id": "TVhYTG9zIENlcnJvc1RVeFZVRU5GVW05bU9US",
      "name": "Los Cerros"
    },
    {
      "id": "TVhYTWFuZ3J1bGxvVFV4VlVFTkZVbTltT1RKb",
      "name": "Mangrullo"
    },
    {
      "id": "TVhYTWF6YW5nYW5vVFV4VlVFTkZVbTltT1RKb",
      "name": "Mazangano"
    },
    {
      "id": "TUxVQ01FTGVlNDg2",
      "name": "Melo"
    },
    {
      "id": "TVhYTWludWFubyBEZSBBY2VndWFUVXhWVUVOR",
      "name": "Minuano De Acegua"
    },
    {
      "id": "TVhYTWlzdGVyaW9UVXhWVUVORlVtOW1PVEps",
      "name": "Misterio"
    },
    {
      "id": "TVhYTW9udGVjaXRvVFV4VlVFTkZVbTltT1RKb",
      "name": "Montecito"
    },
    {
      "id": "TVhYTmFuZG9UVXhWVUVORlVtOW1PVEps",
      "name": "Nando"
    },
    {
      "id": "TUxVQ09UUjU1NTk",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFudGVvblRVeFZVRU5GVW05bU9USmw",
      "name": "Panteon"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYSBDcnV6VFV4VlVFTkZVb",
      "name": "Paso De La Cruz"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYXMgVHJvcGFzVFV4VlVFT",
      "name": "Paso De Las Tropas"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYXMgWWVndWFzVFV4VlVFT",
      "name": "Paso De Las Yeguas"
    },
    {
      "id": "TVhYUGFzbyBEZSBMb3MgQ2Fycm9zVFV4VlVFT",
      "name": "Paso De Los Carros"
    },
    {
      "id": "TVhYUGFzbyBNZWxvVFV4VlVFTkZVbTltT1RKb",
      "name": "Paso Melo"
    },
    {
      "id": "TVhYUGFzbyBQZXJlaXJhVFV4VlVFTkZVbTltT",
      "name": "Paso Pereira"
    },
    {
      "id": "TVhYUGXDsWFyb2xUVXhWVUVORlVtOW1PVEps",
      "name": "Peñarol"
    },
    {
      "id": "TVhYUGljYWRhIERlIE1heWFUVXhWVUVORlVtO",
      "name": "Picada De Maya"
    },
    {
      "id": "TVhYUGljYWRhIERlIFNhbG9tZVRVeFZVRU5GV",
      "name": "Picada De Salome"
    },
    {
      "id": "TVhYUGllZHJhIEFsdGFUVXhWVUVORlVtOW1PV",
      "name": "Piedra Alta"
    },
    {
      "id": "TVhYUGnDsWVpcm9UVXhWVUVORlVtOW1PVEps",
      "name": "Piñeiro"
    },
    {
      "id": "TVhYUGxhY2lkbyBSb3Nhc1RVeFZVRU5GVW05b",
      "name": "Placido Rosas"
    },
    {
      "id": "TVhYUG9ibGFkbyBVcnVndWF5VFV4VlVFTkZVb",
      "name": "Poblado Uruguay"
    },
    {
      "id": "TVhYUHJlc2lkZW50ZSBEb2N0b3IgR2V0dWxpb",
      "name": "Presidente Doctor Getulio Vargas"
    },
    {
      "id": "TVhYUHVlbnRlIE5lZ3JvVFV4VlVFTkZVbTltT",
      "name": "Puente Negro"
    },
    {
      "id": "TVhYUHVudGFzIERlIEFtYXJpbGxvVFV4VlVFT",
      "name": "Puntas De Amarillo"
    },
    {
      "id": "TVhYUHVudGFzIERlIExhIE1pbmFUVXhWVUVOR",
      "name": "Puntas De La Mina"
    },
    {
      "id": "TVhYUHVudGFzIERlIE1vbGxlc1RVeFZVRU5GV",
      "name": "Puntas De Molles"
    },
    {
      "id": "TVhYUHVudGFzIERlIFBhbGxlcm9zVFV4VlVFT",
      "name": "Puntas De Palleros"
    },
    {
      "id": "TVhYUHVudGFzIERlIFRhY3VhcmlUVXhWVUVOR",
      "name": "Puntas De Tacuari"
    },
    {
      "id": "TVhYUHVudGFzIERlbCBTYXVjZVRVeFZVRU5GV",
      "name": "Puntas Del Sauce"
    },
    {
      "id": "TVhYUXVlYnJhY2hvVFV4VlVFTkZVbTltT1RKb",
      "name": "Quebracho"
    },
    {
      "id": "TVhYUmFtb24gVHJpZ29UVXhWVUVORlVtOW1PV",
      "name": "Ramon Trigo"
    },
    {
      "id": "TVhYUmluY29uIERlIENvbnRyZXJhc1RVeFZVR",
      "name": "Rincon De Contreras"
    },
    {
      "id": "TVhYUmluY29uIERlIExhIFVyYmFuYVRVeFZVR",
      "name": "Rincon De La Urbana"
    },
    {
      "id": "TVhYUmluY29uIERlIExvcyBDb3JvbmVsZXNUV",
      "name": "Rincon De Los Coroneles"
    },
    {
      "id": "TVhYUmluY29uIERlIExvcyBPbGl2ZXJhVFV4V",
      "name": "Rincon De Los Olivera"
    },
    {
      "id": "TVhYUmluY29uIERlIFBhaXZhVFV4VlVFTkZVb",
      "name": "Rincon De Paiva"
    },
    {
      "id": "TVhYUmluY29uIERlIFB5VFV4VlVFTkZVbTltT",
      "name": "Rincon De Py"
    },
    {
      "id": "TVhYUmluY29uIERlIFN1YXJlelRVeFZVRU5GV",
      "name": "Rincon De Suarez"
    },
    {
      "id": "TVhYUmluY29uIERlIFRhY3VhcmlUVXhWVUVOR",
      "name": "Rincon De Tacuari"
    },
    {
      "id": "TVhYUm9kcmlndWV6VFV4VlVFTkZVbTltT1RKb",
      "name": "Rodriguez"
    },
    {
      "id": "TUxVQ1LNTzgyMDgw",
      "name": "Río Branco"
    },
    {
      "id": "TVhYU2FsZGHDsWFzVFV4VlVFTkZVbTltT1RKb",
      "name": "Saldañas"
    },
    {
      "id": "TVhYU2FuIERpZWdvVFV4VlVFTkZVbTltT1RKb",
      "name": "San Diego"
    },
    {
      "id": "TVhYU2FuIFNlcnZhbmRvVFV4VlVFTkZVbTltT",
      "name": "San Servando"
    },
    {
      "id": "TVhYU2FuY2hlelRVeFZVRU5GVW05bU9USmw",
      "name": "Sanchez"
    },
    {
      "id": "TVhYU2FudGEgVGVyZXNhVFV4VlVFTkZVbTltT",
      "name": "Santa Teresa"
    },
    {
      "id": "TVhYU2FyYW5kaSBEZSBBY2VndWFUVXhWVUVOR",
      "name": "Sarandi De Acegua"
    },
    {
      "id": "TVhYU2FyYW5kaSBEZSBCYXJjZWxvVFV4VlVFT",
      "name": "Sarandi De Barcelo"
    },
    {
      "id": "TVhYU2FyYW5kaSBEZSBZYWd1YXJvblRVeFZVR",
      "name": "Sarandi De Yaguaron"
    },
    {
      "id": "TVhYU2F1Y2UgRGUgQ29udmVudG9zVFV4VlVFT",
      "name": "Sauce De Conventos"
    },
    {
      "id": "TVhYU290byBHb3JvVFV4VlVFTkZVbTltT1RKb",
      "name": "Soto Goro"
    },
    {
      "id": "TVhYVG9sZWRvVFV4VlVFTkZVbTltT1RKbA",
      "name": "Toledo"
    },
    {
      "id": "TVhYVHJlcyBCb2xpY2hlc1RVeFZVRU5GVW05b",
      "name": "Tres Boliches"
    },
    {
      "id": "TVhYVHJlcyBJc2xhc1RVeFZVRU5GVW05bU9US",
      "name": "Tres Islas"
    },
    {
      "id": "TUxVQ1RVUDk3YTY",
      "name": "Tupambaé"
    },
    {
      "id": "TVhYVXJ1Z3VheVRVeFZVRU5GVW05bU9USmw",
      "name": "Uruguay"
    },
    {
      "id": "TVhYVmlsbGEgVmnDsW9sZXNUVXhWVUVORlVtO",
      "name": "Villa Viñoles"
    },
    {
      "id": "TVhYV2VuY2VzbGFvIFNpbHZlcmFUVXhWVUVOR",
      "name": "Wenceslao Silvera"
    },
    {
      "id": "TVhYw5FhbmdhcGlyZVRVeFZVRU5GVW05bU9US",
      "name": "Ñangapire"
    }
  ],
  'TUxVUEFSVHMxMzQ1Mw': [
    {
      "id": "TUxVQ0FSVDE5ZjIz",
      "name": "Artigas"
    },
    {
      "id": "TUxVQ0JBTDVhODUy",
      "name": "Baltasar Brum"
    },
    {
      "id": "TUxVQ0JFTGNkOWY5",
      "name": "Bella Unión"
    },
    {
      "id": "TUxVQ0JFUjhlNWE0",
      "name": "Bernabé Rivera"
    },
    {
      "id": "TVhYQ2FpbnNhVFV4VlVFRlNWSE14TXpRMU13",
      "name": "Cainsa"
    },
    {
      "id": "TVhYQ2FpbnphIENhbXBvIDNUVXhWVUVGU1ZIT",
      "name": "Cainza Campo 3"
    },
    {
      "id": "TVhYQ2FsbnVUVXhWVUVGU1ZITXhNelExTXc",
      "name": "Calnu"
    },
    {
      "id": "TVhYQ2FtYcOxb1RVeFZVRUZTVkhNeE16UTFNd",
      "name": "Camaño"
    },
    {
      "id": "TVhYQ2F0YWxhbiBHcmFuZGVUVXhWVUVGU1ZIT",
      "name": "Catalan Grande"
    },
    {
      "id": "TVhYQ2F0YWxhbiBWb2xjYW5UVXhWVUVGU1ZIT",
      "name": "Catalan Volcan"
    },
    {
      "id": "TVhYQ2Vycml0b1RVeFZVRUZTVkhNeE16UTFNd",
      "name": "Cerrito"
    },
    {
      "id": "TVhYQ2Vycm8gRWppZG9UVXhWVUVGU1ZITXhNe",
      "name": "Cerro Ejido"
    },
    {
      "id": "TVhYQ2Vycm8gU2FuIEV1Z2VuaW9UVXhWVUVGU",
      "name": "Cerro San Eugenio"
    },
    {
      "id": "TVhYQ2Vycm8gU2lnbm9yZWxsaVRVeFZVRUZTV",
      "name": "Cerro Signorelli"
    },
    {
      "id": "TVhYQ2hpZmxlcm9UVXhWVUVGU1ZITXhNelExT",
      "name": "Chiflero"
    },
    {
      "id": "TUxVQ0NPTGIzYzYy",
      "name": "Colonia Aparicio Saravia"
    },
    {
      "id": "TVhYQ29sb25pYSBFc3Bhw7FhVFV4VlVFRlNWS",
      "name": "Colonia España"
    },
    {
      "id": "TVhYQ29sb25pYSBFc3RyZWxsYVRVeFZVRUZTV",
      "name": "Colonia Estrella"
    },
    {
      "id": "TUxVQ0NPTDRiNTU5",
      "name": "Colonia José Artigas"
    },
    {
      "id": "TUxVQ0NPTGM4MmVh",
      "name": "Colonia Palma"
    },
    {
      "id": "TVhYQ29sb25pYSBQaW50YWRvVFV4VlVFRlNWS",
      "name": "Colonia Pintado"
    },
    {
      "id": "TVhYQ29sb25pYSBWacOxYXJUVXhWVUVGU1ZIT",
      "name": "Colonia Viñar"
    },
    {
      "id": "TVhYQ29yb25hZG9UVXhWVUVGU1ZITXhNelExT",
      "name": "Coronado"
    },
    {
      "id": "TUxVQ0NPVGVjZWEw",
      "name": "Cota 205"
    },
    {
      "id": "TVhYQ3VhcmVpbVRVeFZVRUZTVkhNeE16UTFNd",
      "name": "Cuareim"
    },
    {
      "id": "TUxVQ0NVQTk5YWEw",
      "name": "Cuaró"
    },
    {
      "id": "TVhYRXN0aWJhVFV4VlVFRlNWSE14TXpRMU13",
      "name": "Estiba"
    },
    {
      "id": "TVhYRmFndW5kZXpUVXhWVUVGU1ZITXhNelExT",
      "name": "Fagundez"
    },
    {
      "id": "TVhYRnJhbnF1aWFUVXhWVUVGU1ZITXhNelExT",
      "name": "Franquia"
    },
    {
      "id": "TVhYR3V5dWJpcmFUVXhWVUVGU1ZITXhNelExT",
      "name": "Guyubira"
    },
    {
      "id": "TUxVQ0pBVjI3OWRi",
      "name": "Javier de Viana"
    },
    {
      "id": "TVhYTGEgQm9sc2FUVXhWVUVGU1ZITXhNelExT",
      "name": "La Bolsa"
    },
    {
      "id": "TUxVQ0xBUzE0OTQ",
      "name": "Las Piedras"
    },
    {
      "id": "TVhYTGVuZ3Vhem9UVXhWVUVGU1ZITXhNelExT",
      "name": "Lenguazo"
    },
    {
      "id": "TVhYTGltaXRlIENvbnRlc3RhZG9UVXhWVUVGU",
      "name": "Limite Contestado"
    },
    {
      "id": "TUxVQ01FTjgzM2Q3",
      "name": "Menezes"
    },
    {
      "id": "TUxVQ01PTjQwM2U1",
      "name": "Mones Quintela"
    },
    {
      "id": "TUxVQ09UUjEzODk",
      "name": "Otras"
    },
    {
      "id": "TVhYUGFndWVyb1RVeFZVRUZTVkhNeE16UTFNd",
      "name": "Paguero"
    },
    {
      "id": "TUxVQ1BBTGIwNDZi",
      "name": "Palma Sola"
    },
    {
      "id": "TVhYUGFyZWRvblRVeFZVRUZTVkhNeE16UTFNd",
      "name": "Paredon"
    },
    {
      "id": "TVhYUGFzbyBEZSBMYSBDcnV6VFV4VlVFRlNWS",
      "name": "Paso De La Cruz"
    },
    {
      "id": "TVhYUGFzbyBEZSBMZW9uVFV4VlVFRlNWSE14T",
      "name": "Paso De Leon"
    },
    {
      "id": "TVhYUGFzbyBEZSBSYW1vc1RVeFZVRUZTVkhNe",
      "name": "Paso De Ramos"
    },
    {
      "id": "TUxVQ1BBU2I3NGQ1",
      "name": "Paso Farías"
    },
    {
      "id": "TVhYUGF0aXRhc1RVeFZVRUZTVkhNeE16UTFNd",
      "name": "Patitas"
    },
    {
      "id": "TVhYUGllZHJhIFBpbnRhZGFUVXhWVUVGU1ZIT",
      "name": "Piedra Pintada"
    },
    {
      "id": "TUxVQ1BJTjI0MTY",
      "name": "Pintadito"
    },
    {
      "id": "TVhYUGludGFkb1RVeFZVRUZTVkhNeE16UTFNd",
      "name": "Pintado"
    },
    {
      "id": "TVhYUGludGFkbyBHcmFuZGVUVXhWVUVGU1ZIT",
      "name": "Pintado Grande"
    },
    {
      "id": "TUxVQ1BKRTMwMDNk",
      "name": "Paraje Diego Lamas"
    },
    {
      "id": "TUxVQ1BKRTg2Y2Y3",
      "name": "Pje. Paso Campamento"
    },
    {
      "id": "TVhYUG9ydG9uZXMgRGUgSGllcnJvIFkgQ2Ftc",
      "name": "Portones De Hierro Y Campodonico"
    },
    {
      "id": "TUxVQ1BVRTgzY2I0",
      "name": "Pueblo Sequeira"
    },
    {
      "id": "TVhYUmluY29uIERlIFBhY2hlY29UVXhWVUVGU",
      "name": "Rincon De Pacheco"
    },
    {
      "id": "TVhYU2FyYW5kaSBEZSBDdWFyb1RVeFZVRUZTV",
      "name": "Sarandi De Cuaro"
    },
    {
      "id": "TVhYU2FyYW5kaSBEZSBZYWN1eVRVeFZVRUZTV",
      "name": "Sarandi De Yacuy"
    },
    {
      "id": "TVhYVGFtYW5kdWFUVXhWVUVGU1ZITXhNelExT",
      "name": "Tamandua"
    },
    {
      "id": "TVhYVGFydW1hblRVeFZVRUZTVkhNeE16UTFNd",
      "name": "Taruman"
    },
    {
      "id": "TUxVQ1RPTThjYzU",
      "name": "Tomás Gomensoro"
    },
    {
      "id": "TUxVQ1RPUDYyMzBi",
      "name": "Topador"
    },
    {
      "id": "TVhYWmFuamEgQXJ1ZXJhVFV4VlVFRlNWSE14T",
      "name": "Zanja Aruera"
    }
  ],
}