import React from 'react';

const ComparableSection = ({ filters, modifyFilter, handleSubmit }) => {
  const availableFilters = [
    {
      "id": "price",
      "name": "Precio (en dolares)",
      "type": "range",
      "values": [
        {
          "id": "*-3000000.0",
          "name": "Hasta $ 3.000.000",
          "results": 73427
        },
        {
          "id": "3000000.0-1.0E7",
          "name": "$3.000.000 a $10.000.000",
          "results": 74746
        },
        {
          "id": "1.0E7-*",
          "name": "Más de $10.000.000",
          "results": 74884
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
          "results": 27
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
          "results": 855
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
          "results": 795
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
          "results": 84242
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
          "results": 221752
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
          "results": 213001
        },
        {
          "id": "private_seller",
          "name": "Dueño",
          "results": 10056
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
          "results": 10752
        },
        {
          "id": "[1-1]",
          "name": "1 dormitorio",
          "results": 26932
        },
        {
          "id": "[2-2]",
          "name": "2 dormitorios",
          "results": 41272
        },
        {
          "id": "[3-3]",
          "name": "3 dormitorios",
          "results": 34280
        },
        {
          "id": "[4-*)",
          "name": "4 dormitorios o más",
          "results": 17824
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
          "results": 33338
        },
        {
          "id": "[40m²-65m²]",
          "name": "40 a 65 m² cubiertos",
          "results": 33100
        },
        {
          "id": "[65m²-150m²]",
          "name": "65 a 150 m² cubiertos",
          "results": 45960
        },
        {
          "id": "[150m²-*)",
          "name": "150 m² cubiertos o más",
          "results": 30722
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
          "results": 57954
        },
        {
          "id": "[2-2]",
          "name": "2 baños",
          "results": 40436
        },
        {
          "id": "[3-3]",
          "name": "3 baños",
          "results": 19700
        },
        {
          "id": "[4-4]",
          "name": "4 baños",
          "results": 8280
        },
        {
          "id": "[5-*)",
          "name": "5 baños o más",
          "results": 5250
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
          "results": 19452
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
          "results": 39658
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
          "results": 14816
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
          "results": 48508
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
          "results": 116872
        },
        {
          "id": "TUxVUE1PTlo2MDIy",
          "name": "Montevideo",
          "results": 77786
        },
        {
          "id": "TUxVUENBTnMxNzliYw",
          "name": "Canelones",
          "results": 14259
        },
        {
          "id": "TUxVUENPTGExMTUwOQ",
          "name": "Colonia",
          "results": 5455
        },
        {
          "id": "TUxVUFJPQ1ozNWRm",
          "name": "Rocha",
          "results": 4050
        },
        {
          "id": "TUxVUFNBTloxMDk2NQ",
          "name": "San José",
          "results": 1170
        },
        {
          "id": "TUxVUExBVlpkNTI0",
          "name": "Lavalleja",
          "results": 870
        },
        {
          "id": "TUxVUERVUm9kZDA1",
          "name": "Durazno",
          "results": 387
        },
        {
          "id": "TUxVUFBBWVo0YzEy",
          "name": "Paysandú",
          "results": 384
        },
        {
          "id": "TUxVUFRBQ280MGE5",
          "name": "Tacuarembó",
          "results": 300
        },
        {
          "id": "TUxVUEZMT3MxYjc",
          "name": "Flores",
          "results": 252
        },
        {
          "id": "TUxVUEZMT1o4MWUz",
          "name": "Florida",
          "results": 246
        },
        {
          "id": "TUxVUFNPUm9mOTcx",
          "name": "Soriano",
          "results": 231
        },
        {
          "id": "TUxVUFRSRXNiY2Zh",
          "name": "Treinta y Tres",
          "results": 195
        },
        {
          "id": "TUxVUFNBTG9jMTM5",
          "name": "Salto",
          "results": 177
        },
        {
          "id": "TUxVUFLNT1oxNTQ4MQ",
          "name": "Río Negro",
          "results": 102
        },
        {
          "id": "TUxVUFJJVlpjOWQ1",
          "name": "Rivera",
          "results": 99
        },
        {
          "id": "TUxVUENFUm9mOTJl",
          "name": "Cerro Largo",
          "results": 75
        },
        {
          "id": "TUxVUEFSVHMxMzQ1Mw",
          "name": "Artigas",
          "results": 42
        }
      ]
    },
    {
      "id": "ITEM_CONDITION",
      "name": "Condición",
      "type": "STRING",
      "values": [
        {
          "id": "2230581",
          "name": "Usado",
          "results": 93506
        },
        {
          "id": "2230284",
          "name": "Nuevo",
          "results": 43570
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
          "results": 106216
        },
        {
          "id": "242074",
          "name": "Alquiler temporada",
          "results": 24500
        },
        {
          "id": "242073",
          "name": "Alquiler",
          "results": 18116
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
          "results": 103216
        },
        {
          "id": "245034",
          "name": "Emprendimientos",
          "results": 258
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
          "results": 63788
        },
        {
          "id": "[1-1]",
          "name": "1 cochera",
          "results": 56648
        },
        {
          "id": "[2-2]",
          "name": "2 cocheras",
          "results": 10406
        },
        {
          "id": "[3-3]",
          "name": "3 cocheras",
          "results": 1736
        },
        {
          "id": "[4-*)",
          "name": "4 cocheras o más",
          "results": 2004
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
          "results": 39378
        },
        {
          "id": "[1años-3años]",
          "name": "1 a 3 años",
          "results": 14032
        },
        {
          "id": "[3años-15años]",
          "name": "3 a 15 años",
          "results": 12210
        },
        {
          "id": "[15años-50años]",
          "name": "15 a 50 años",
          "results": 13026
        },
        {
          "id": "[50años-*)",
          "name": "50 años o más",
          "results": 7862
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
          "results": 86676
        },
        {
          "id": "242060",
          "name": "Casas",
          "results": 38190
        },
        {
          "id": "245004",
          "name": "Terrenos",
          "results": 10626
        },
        {
          "id": "242065",
          "name": "Locales",
          "results": 3548
        },
        {
          "id": "242070",
          "name": "Quintas",
          "results": 2740
        },
        {
          "id": "242059",
          "name": "Campos",
          "results": 2468
        },
        {
          "id": "242067",
          "name": "Oficinas",
          "results": 1938
        },
        {
          "id": "242068",
          "name": "Otros inmuebles",
          "results": 1206
        },
        {
          "id": "245003",
          "name": "Depósitos y galpones",
          "results": 758
        },
        {
          "id": "267200",
          "name": "Llave de negocio",
          "results": 284
        },
        {
          "id": "267198",
          "name": "Cocheras",
          "results": 270
        },
        {
          "id": "267195",
          "name": "Habitaciones",
          "results": 128
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
          "results": 31790
        },
        {
          "id": "[60m²-150m²]",
          "name": "60 a 150 m² totales",
          "results": 45966
        },
        {
          "id": "[150m²-550m²]",
          "name": "150 a 550 m² totales",
          "results": 29760
        },
        {
          "id": "[550m²-*)",
          "name": "550 m² totales o más",
          "results": 31798
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
          "results": 1472
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
          "results": 57229
        },
        {
          "id": "67106",
          "name": "Altius Group",
          "results": 21
        },
        {
          "id": "933",
          "name": "NICOLAS DE MODENA INMOBILIARIA",
          "results": 11224
        },
        {
          "id": "54462",
          "name": "Vitrium Capital",
          "results": 7
        },
        {
          "id": "961",
          "name": "Golf Inmobiliaria",
          "results": 2145
        },
        {
          "id": "1142",
          "name": "Parolin Asoc Propiedades",
          "results": 2118
        },
        {
          "id": "889",
          "name": "Punta Ballena Inmobiliaria",
          "results": 1509
        },
        {
          "id": "1168",
          "name": "HHO BROKER",
          "results": 456
        },
        {
          "id": "705",
          "name": "Poggio Propiedades",
          "results": 408
        },
        {
          "id": "1161",
          "name": "Kopel Sanchez",
          "results": 138
        },
        {
          "id": "53241",
          "name": "Pres",
          "results": 3
        },
        {
          "id": "53561",
          "name": "Calyptus Desarrollos",
          "results": 3
        },
        {
          "id": "758",
          "name": "Abate Propiedades",
          "results": 1172
        },
        {
          "id": "896",
          "name": "REMAX FOCUS",
          "results": 923
        },
        {
          "id": "915",
          "name": "SURES REAL ESTATE",
          "results": 587
        },
        {
          "id": "60006",
          "name": "SI SERVICIOS INMOBILIARIOS",
          "results": 164
        },
        {
          "id": "937",
          "name": "POINTER",
          "results": 107
        },
        {
          "id": "59650",
          "name": "Campiglia Construcciones",
          "results": 68
        },
        {
          "id": "60030",
          "name": "Justany Desarrollos",
          "results": 8
        },
        {
          "id": "1049",
          "name": "Capital Real Estate",
          "results": 3544
        },
        {
          "id": "911",
          "name": "Caetano Negocios Inmobiliarios",
          "results": 2866
        },
        {
          "id": "1087",
          "name": "Beba Paez Vilaro",
          "results": 2332
        },
        {
          "id": "992",
          "name": "SALAYA ROMERA Propiedades",
          "results": 967
        },
        {
          "id": "841",
          "name": "Gasalla Negocios Inmobiliarios",
          "results": 961
        },
        {
          "id": "1085",
          "name": "Antonio Mieres",
          "results": 955
        },
        {
          "id": "1055",
          "name": "AFILIA Propiedades",
          "results": 703
        },
        {
          "id": "1149",
          "name": "Engel Volkers Montevideo",
          "results": 484
        },
        {
          "id": "737",
          "name": "PROP",
          "results": 478
        },
        {
          "id": "77122",
          "name": "Plaza Mayor Propiedades",
          "results": 295
        },
        {
          "id": "1097",
          "name": "ESTUDIO SM",
          "results": 235
        },
        {
          "id": "57569",
          "name": "Century 21 Premier",
          "results": 139
        }
      ]
    }
  ];

  const [shownFilters, setShownFilters] = React.useState(false);

  return (
    <div className="border p-4 rounded-lg mb-4 bg-white w-full">
      <div className="flex flex-col items-start space-y-4 w-full">
        <ShowFiltersButton className="mb-4" shownFilters={shownFilters} setShownFilters={setShownFilters} />
        {shownFilters && (
          <div className="grid grid-cols-12 gap-4">
            {availableFilters.map((filter) => (
              <div key={filter.id} className="col-span-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {filter.name}
                </label>
                {filter.type === "range" ? (
                  <div className="flex items-center">
                    <input
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
                      name={filter.id}
                      onChange={(e) => modifyFilter(filter.id, e.target.value, { range: 0, subtype: filter.subtype })}

                    />
                    <label> — </label>
                    <input
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
                      name={filter.id}
                      onChange={(e) => modifyFilter(filter.id, e.target.value, { range: 1, subtype: filter.subtype })}
                    />
                  </div>
                ) : null}
                {filter.type === "text" || filter.type === "STRING" ? (
                  <select
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
                    onChange={(e) => modifyFilter(filter.id, e.target.value)}
                  >
                    <option value={filters?.[filter.id] ?? ""}>Seleccionar {filter.name.toLowerCase()}</option>
                    {filter.values.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : null}
                {filter.type === "boolean" ? (
                  <input
                    type="checkbox"
                    className="mr-2"
                    value={filters?.[filter.id] ?? ""}
                    onChange={(e) => modifyFilter(filter.id, e.target.checked)}
                  />
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type='button'
        onClick={handleSubmit}
        className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 w-1/6 "
      >
        Aplicar filtros
      </button>
    </div>
  );
};

const ShowFiltersButton = ({ className, shownFilters, setShownFilters }) => {
  return (
    <button
      type='button'
      onClick={() => setShownFilters((prev) => !prev)}
      className={className + " text-green-900 hover:text-green-700"}
    >
      {shownFilters ? "Ocultar filtros" : "Mostrar filtros"}
    </button>
  );
};

export default ComparableSection;