import ExcelJS from 'exceljs';

// const exportToExactExcelTemplate = (formData, templateFileName) => {
//   fetch(`/xlsx/${templateFileName}.xlsx`)
//     .then(response => response.arrayBuffer())
//     .then(buffer => {
//       // Parse the template file
//       const templateWorkbook = XLSX.read(buffer, { type: 'buffer', cellStyles: true });

//       // Get the first worksheet
//       const worksheetName = templateWorkbook.SheetNames[0];
//       const worksheet = templateWorkbook.Sheets[worksheetName];

//       // Mapping of JSON keys to Excel cell locations
//       const cellMappings = {
//         solicitante: 'D10',
//         banco: 'D11',
//         contactoSolicitante: 'L10',
//         contactoBanco: 'L11',
//         telefonos: 'P10', // Puede haber mas de uno?
//         sucursal: 'P11',
//         calle: 'D13',
//         esquina: 'D14',
//         localidad: 'D15',
//         // numero: '',
//         // seccionJudicial: '',
//         // departamento: '',
//         // unidad: '',
//         // padron: '',

//         // /// Aspectos urbanos
//         // identificacionCatastral: [], // Unico?
//         // caracteristicas: [],
//         // densidad: [], // Unico?
//         // servicios: [],
//         // indiceCrecimiento: [], // Unico?
//         // oferta: [], // Unico?
//         // descripcionZona: '',
//         // /// Descripcion del predio
//         // topografia: '',
//         // forma: '',
//         // retiros: [], // Unico?
//         // // Deslinde
//         // deslindeFrente: '',
//         // deslindeFondo: '',
//         // descripcionPredio: '',
//         // entornoUrbano: '', // TODO: FOTO

//         // /// Descripcion del bien
//         // // Comodidades - ambiente
//         // livingComedor: 0,
//         // cocina: 0,
//         // dormitorio: 0,
//         // banio: 0, // ñ?
//         // escritorio: 0,
//         // toilette: 0,
//         // terraza: 0,
//         // garajeBox: 0,
//         // // Consideraciones
//         // categorizacion: '',
//         // conservacion: '',
//         // // Caracteristicas constructivas
//         // estructura: [],
//         // cubierta: [],
//         // carpinteria: [],
//         // muros: [],
//         // terminaciones: [],
//         // revestimientos: [],
//         // pisos: [],
//         // // Servicios - instalaciones
//         // instalacionAgua: [],
//         // instalacionSanitaria: [],
//         // instalacionElectrica: [],
//         // instalacionTermica: [],
//         // // Relevamiento fotografico
//         // superficieTerreno: '',
//         // //   Ver como colocar estos, tenemos que obtenerlos de la lista de cosas que coloco
//         // bienesPropios: [],
//         // bienesComunes: [],
//         // superficieEdificada: '',
//         // anio: '',
//         // vistaExterior: '', // FOTO
//         // vistasInteriores: [], // FOTOS
//         // // TODO: COMPARABLES
//         // comparables: [],

//         // /// Calculo de avaluo
//         // // ...
//         // descripcion: '',
//       };

//       debugger

//       // Fill in the cells
//       Object.entries(cellMappings).forEach(([key, cell]) => {
//         if (formData[key]) {
//           const originalCell = worksheet[cell];
//           worksheet[cell] = { ...originalCell, v: formData[key] };
//         }
//       });

//       // Handle list fields (if needed)
//       const handleListField = (listKey, sheetName, startRow = 2) => {
//         if (formData[listKey] && formData[listKey].length > 0) {
//           // Create or get the sheet
//           let listWorksheet = templateWorkbook.Sheets[sheetName];

//           // If sheet doesn't exist, you might need to add it
//           if (!listWorksheet) {
//             listWorksheet = {};
//             templateWorkbook.Sheets[sheetName] = listWorksheet;
//             templateWorkbook.SheetNames.push(sheetName);
//           }

//           // Populate the list
//           formData[listKey].forEach((item, index) => {
//             const row = startRow + index;
//             // Adjust cell references based on your template's structure
//             listWorksheet[`A${row}`] = { v: item };
//           });
//         }
//       };

//       // Handle specific list fields
//       // handleListField('fotos', 'Fotos');
//       // handleListField('comparables', 'Comparables');
//       // handleListField('anexos', 'Anexos');
//       // handleListField('seguroIncendio', 'Seguro de Incendio');

//       // Write the modified workbook
//       XLSX.writeFile(templateWorkbook, 'informe_completado.xlsx', {
//         bookType: 'xlsx',
//         bookSST: true,
//         type: 'binary',
//         cellStyles: true,
//       });
//     })
//     .catch(err => console.error(err));
// };

const exportToExactExcelTemplateExcelJS = (formData, templateFileName) => {
  fetch(`/xlsx/${templateFileName}.xlsx`)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx.load(arrayBuffer)
        .then(() => {
          const worksheet = workbook.worksheets[0];

          const checkBoxes = [
            'identificacionCatastral', 
            'caracteristicas', 
            'densidad', 
            'servicios', 
            'indiceCrecimiento', 
            'oferta',
            'retiros',
            'estructura',
            'cubierta',
            'carpinteria',
            'muros',
            'terminaciones',
            'revestimientos',
            'pisos',
            'instalacionAgua',
            'instalacionSanitaria',
            'instalacionElectrica',
            'instalacionTermica',
          ];
          const radios = [
            'topografia',
            'forma',
            'conservacion',
            'categorizacion'
          ];

          // Mapping of JSON keys to Excel cell locations
          const cellMappings = {
            solicitante: 'D10',
            banco: 'D11',
            contactoSolicitante: 'L10',
            contactoBanco: 'L11',
            telefonos: 'P10',
            sucursal: 'P11',
            calle: 'D13',
            esquina: 'D14',
            localidad: 'D15',
            numero: 'L13',
            seccionJudicial: 'L14',
            departamento: 'L15',
            unidad: 'P13',
            padron: 'P14',

            /// Aspectos urbanos
            identificacionCatastral: {
              'Urbana': 'C20',
              'Suburbana': 'E20',
              'Rural': 'G20',
              'Balneario': 'I20',
            }, // Unico?
            caracteristicas: {
              'Residencial': 'C22',
              'Comercial': 'E22',
              'Industrial': 'G22',
              'Rural': 'I22',
            },
            densidad: {
              'Compacta': 'K20',
              'Media': 'M20',
              'Poco densa': 'O20',
              'Rala': 'R20',
            }, // Unico?
            servicios: {
              "Agua - OSE": 'C24',
              "Agua-otros": 'E24',
              "Alumbrado Público": 'G24',
              "Red eléctrica": 'I24',
              "Instalación de Gas": 'K24',
              "Saneamiento": 'M24',
              "Seguridad": 'O24',
              "Otros": 'R24',
            },
            indiceCrecimiento: {
              'Creciente': 'C26',
              'Estable': 'E26',
              'Decreciente': 'G26',
              'Variable': 'I26'
            }, // Unico?
            oferta: {
              'Escasa': 'K26',
              'Equilibrada': 'M26',
              'Exceso de Oferta': 'O26',
              'Exceso de Demanda': 'R26',
            },
            descripcionZona: 'D28',
            /// Descripcion del predio
            topografia: {
              'Alto': 'C33',
              'Bajo': 'E33',
              'A nivel': 'G33',
              'Inundable': 'I33', 
            },
            forma: {
              'Regular': 'E35',
              'Irregular': 'I35',
            },
            retiros: {
              'Frontales': 'E37',
              'Laterales': 'I37'
            },
            // Deslinde
            deslindeFrente: 'D39',
            deslindeFondo: 'H39',
            descripcionPredio: 'D40',
            // entornoUrbano: '', // TODO: FOTO

            /// Descripcion del bien
            // Comodidades - ambiente
            livingComedor: 'E46',
            cocina: 'I46',
            dormitorio: 'M46',
            banio: 'R46',
            escritorio: 'E47',
            toilette: 'I47',
            terraza: 'M47',
            garajeBox: 'R47',
            // Consideraciones
            categorizacion: {
              "Modesta": 'C52',
              "Económica": 'E52',
              "Buena": 'G52',
              "Muy buena": 'I52',
              "Confortable": 'K52',
              "Confortable con calefacción": 'M52',
              "Muy confortable": 'O52',
              "Suntuosa": 'R52',
            },
            conservacion: {
              "Demoler": 'C54',
              "Malo": 'E54',
              "Regular": 'G54',
              "Bueno": 'I54',
              "Muy bueno": 'K54',
              "Excelente": 'M54',
              "Ampliación": 'O54',
              "En obra": 'R54',
            },
            // Caracteristicas constructivas
            estructura: {
              'Hormigón Armado': 'C59',
              'Muro portante': 'E59',
              'Mixta': 'G59',
              'Steel Framing': 'I59',
            },
            cubierta: {
              'Hormigón Armado': 'C61',
              'Liviana': 'E61',
              'Con cielorraso': 'G61',
              'Sin cielorraso': 'I61',
            },
            carpinteria: {
              'Madera': 'C63',
              'Hierro': 'E63',
              'Aluminio': 'G63',
              'Blindex': 'I63'
            },
            muros: {
              'Cerámicos': 'K59',
              'Bloques': 'M59',
              'Yeso': 'O59',
              'Steel Framing': 'R59',
            },
            terminaciones: {
              'Revoque': 'K61',
              'Pintura al agua': 'M61',
              'Enduido': 'O61',
              'Ladrillo visto': 'R61',
            },
            revestimientos: {
              'Cerámicos': 'K63',
              'Azulejos': 'M63',
              'Estuco': 'O63',
              'Porcelanato': 'R63',
            },
            pisos: {
              'Flotantes': 'C65',
              'Cerámico': 'E65',
              'Porcelanato': 'G65',
              'Parquet': 'I65',
              'Moquette': 'K65',
              'Lajota': 'M65',
              'Vinílico': 'O65',
              'Piedra laja': 'R65',
            },
            // Servicios - instalaciones
            instalacionAgua: {
              'Baño': 'C70',
              'Cocina': 'E70',
              'Fria': 'G70',
              'Caliente': 'I70'
            },
            instalacionSanitaria: {
              'Colector': 'C72',
              'Cámara séptica': 'E72',
              'Pozo negro': 'G72',
              'Otros': 'I72',
            },
            instalacionElectrica: {
              'Embutida': 'K70',
              'Exterior': 'M70',
              'Mixta': 'O70',
              'Otros': 'R70'
            },
            instalacionTermica: {
              'Losa radiante': 'K72',
              'Aire acondicionado': 'M72',
              'Calefactores eléctricos': 'O72',
              'Estufa a leña': 'R72',
            },
            // Relevamiento fotografico
            // superficieTerreno: '',
            // //   Ver como colocar estos, tenemos que obtenerlos de la lista de cosas que coloco
            // bienesPropios: [],
            // bienesComunes: [],
            // superficieEdificada: '',
            // anio: '',
            // vistaExterior: '', // FOTO
            // vistasInteriores: [], // FOTOS
            // // TODO: COMPARABLES
            // comparables: [],

            // /// Calculo de avaluo
            // // ...
            // descripcion: '',
          };

          debugger

          // Fill in the cells while preserving original formatting
          Object.entries(cellMappings).forEach(([key, cellAddress]) => {
            if (checkBoxes.includes(key)) {
              Object.entries(cellMappings[key] as { [key: string]: string }).forEach(([value, checkAddress]: [string, string]) => {
                if (formData[key].includes(value)) {
                  const cell = worksheet.getCell(checkAddress);
                  const newStyle = { ...cell.style };
                  newStyle.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF808080' }
                  };
                  cell.style = newStyle;
                }
              });
            } else if (radios.includes(key)) {
              const radioValue = formData[key]
              if (radioValue) {
                const radioAddress = (cellMappings[key] as { [key: string]: string })[radioValue];
                const cell = worksheet.getCell(radioAddress);
                const newStyle = { ...cell.style };
                newStyle.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'FF808080' }
                };
                cell.style = newStyle;
              }
            } else if (formData[key]) {
              const cell = worksheet.getCell(cellAddress as string);
              cell.value = formData[key];
            }

          });

          // Generate the file
          const buffer = workbook.xlsx.writeBuffer()
            .then(buffer => {
              const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
              // Create and trigger download
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = 'informe_completado.xlsx';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            });
        });
    });
};

export { exportToExactExcelTemplateExcelJS };