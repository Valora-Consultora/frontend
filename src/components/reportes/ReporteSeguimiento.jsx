import React, { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import reporteService from '../../api/ReporteService';
import tasadorService from '../../api/TasadorService'; // Importamos TasadorService
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Chip } from "@mui/material";

const ReporteSeguimiento = () => {
    //const [informes, setInformes] = useState([]);
    const [tasadores, setTasadores] = useState({});
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroUsuario, setFiltroUsuario] = useState('');


    const [informes, setInformes] = useState([
        {
            id: 1,
            banco: "Scotia",
            estadoInforme: "BORRADOR",
            fechaFinalizacion: "N/A",
            fechaInicio: "2025-02-08 11:44:12",
            calculo_id: "",
            inspeccion_id: "",
            orden_id: "",
            tasador_id: 3,
            tasadorNombre: "Juan" // ✅ Agregamos un nombre por si es necesario en la tabla
        },
        {
            id: 1,
            banco: "Itau",
            estadoInforme: "Pendiente",
            fechaFinalizacion: "N/A",
            fechaInicio: "2025-02-08 11:44:12",
            calculo_id: "",
            inspeccion_id: "",
            orden_id: "",
            tasador_id: 3,
            tasadorNombre: "Vicente" // ✅ Agregamos un nombre por si es necesario en la tabla
        },
        {
            id: 1,
            banco: "Bbva",
            estadoInforme: "Aprobado",
            fechaFinalizacion: "N/A",
            fechaInicio: "2025-02-08 11:44:12",
            calculo_id: "",
            inspeccion_id: "",
            orden_id: "",
            tasador_id: 3,
            tasadorNombre: "Lucio" // ✅ Agregamos un nombre por si es necesario en la tabla
        }
    ]);



    useEffect(() => {
        const fetchInformes = async () => {
            try {
                const data = await reporteService.obtenerInformes();

                // Formatear los datos para mostrar en el reporte
                const formattedData = data.map((informe) => ({
                    ...informe,
                    estadoInforme: capitalize(informe.estadoInforme), // Formatear estado
                    tasadorNombre: capitalize(informe.tasadorNombre), // Formatear tasador
                    banco: capitalize(informe.banco), // Formatear banco
                }));

                setInformes(formattedData);
            } catch (error) {
                console.error("Error al obtener los informes:", error);
            }
        };

        fetchInformes();
    }, []);




    // Función para formatear la fecha en "dd/mm/yyyy hh:mm"
    const formatFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }) + ' ' + fecha.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const capitalize = (string) => {
        if (!string) return "Sin asignar";
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const downloadPDF = (id) => {
        console.log(`Descargando informe con ID: ${id}`);
        // Aquí iría la lógica real para descargar el PDF
    };

    const getEstadoChipProps = (estado) => {
        switch (estado.toUpperCase()) {
            case "BORRADOR":
                return { label: "Borrador", color: "warning" }; // 🟠 Naranja suave
            case "APROBADO":
                return { label: "Aprobado", color: "success" }; // ✅ Verde
            case "PENDIENTE":
                return { label: "Pendiente", color: "primary" }; // 🔵 Azul
            default:
                return { label: "Desconocido", color: "default" }; // ⚪ Gris
        }
    };

    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "banco", header: "Banco" },
        {
            accessorKey: "estadoInforme",
            header: "Estado",
            cell: ({ row }) => {
                const estadoProps = getEstadoChipProps(row.original.estadoInforme);
                return <Chip label={estadoProps.label} color={estadoProps.color} variant="outlined" />;
            }
        },
        { accessorKey: "tasadorNombre", header: "Usuario" },
        { accessorKey: "fechaInicio", header: "Fecha Inicio" },
        { accessorKey: "fechaFinalizacion", header: "Fecha Finalización" },
        {
            accessorKey: "acciones",
            header: "Descargar",
            cell: ({ row }) => (
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "black", color: "white", minWidth: "32px", padding: "5px", justifyContent: "center", "&:hover":{backgroundColor:"#14532d"}  }}
                    onClick={() => downloadPDF(row.original.id)}
                >
                    <PictureAsPdfIcon sx={{ fontSize: 18 }} />
                </Button>
            ),
        },
    ];



    const table = useReactTable({
        data: informes.filter(informe =>
            (filtroEstado === '' || informe.estado === filtroEstado) &&
            (filtroUsuario === '' || informe.tasador === filtroUsuario)
        ),
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
            <h2 className="text-center text-5xl text-green-900 font-light mx-auto my-10">
                SEGUIMIENTO DE INFORMES
            </h2>

            <Paper elevation={3} sx={{ width: '90%', padding: 4, bgcolor: '#ffffff', borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ overflow: 'hidden' }}>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            {table.getHeaderGroups().map(headerGroup =>
                                headerGroup.headers.map((column, index, array) => (
                                    <TableCell
                                        key={column.id}
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#424242',
                                            backgroundColor: '#f5f5f5',
                                            borderTopLeftRadius: index === 0 ? '10px' : 0,
                                            borderTopRightRadius: index === array.length - 1 ? '10px' : 0,
                                            borderBottomLeftRadius: index === 0 ? '10px' : 0,
                                            borderBottomRightRadius: index === array.length - 1 ? '10px' : 0,
                                            borderBottom: 'none',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {flexRender(column.column.columnDef.header, column.getContext())}
                                    </TableCell>
                                ))
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row, rowIndex) => (
                            <TableRow
                                key={row.id}
                                hover
                                sx={{
                                    borderRadius: '10px', // Bordes redondeados
                                    overflow: 'hidden', // Asegura que el contenido respete los bordes
                                    transition: 'all 0.3s ease-in-out', // Animación suave en el hover
                                    '&:hover': {
                                        backgroundColor: 'primary.light',  // Un color del tema de MUI
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Agregar sombra al hover
                                    },
                                }}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <TableCell
                                        key={cell.id}
                                        sx={{
                                            color: '#616161',
                                            textAlign: 'center',
                                            padding: '10px',
                                            border: 'none', // Eliminar bordes entre celdas
                                        }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </Paper>
        </Box>
    );
};

export default ReporteSeguimiento;
