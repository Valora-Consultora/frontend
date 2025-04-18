import React, { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import reporteService from '../../api/ReporteService';
import tasadorService from '../../api/TasadorService';
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
    TextField,
    MenuItem,
    Grid,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Chip } from '@mui/material';

const ReporteSeguimiento = () => {
    const [tasadores, setTasadores] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroUsuario, setFiltroUsuario] = useState('');
    const [filtroBanco, setFiltroBanco] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinalizacion, setFechaFinalizacion] = useState('');

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
            id: 2,
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
            id: 3,
            banco: "Bbva",
            estadoInforme: "Aprobado",
            fechaFinalizacion: "2025-02-15 11:00:00",
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
                const formattedData = data.map((informe) => ({
                    ...informe,
                    estadoInforme: capitalize(informe.estadoInforme),
                    tasadorNombre: capitalize(informe.tasadorNombre),
                    banco: capitalize(informe.banco),
                }));
                setInformes(formattedData);
            } catch (error) {
                console.error('Error al obtener los informes:', error);
            }
        };

        const fetchTasadores = async () => {
            try {
                const data = await tasadorService.obtenerTasadores();
                setTasadores(data);
            } catch (error) {
                console.error('Error al obtener tasadores:', error);
            }
        };

        fetchInformes();
        fetchTasadores();
    }, []);

    const capitalize = (string) => {
        if (!string) return 'Sin asignar';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const downloadPDF = (id) => {
        //console.log(`Descargando informe con ID: ${id}`);
    };

    const getEstadoChipProps = (estado) => {
        switch (estado.toUpperCase()) {
            case 'BORRADOR':
                return { label: 'Borrador', color: 'warning' };
            case 'APROBADO':
                return { label: 'Aprobado', color: 'success' };
            case 'PENDIENTE':
                return { label: 'Pendiente', color: 'primary' };
            default:
                return { label: 'Desconocido', color: 'default' };
        }
    };

    const filteredInformes = informes.filter((informe) => {
        const matchEstado = filtroEstado === '' || informe.estadoInforme === filtroEstado;
        const matchUsuario = filtroUsuario === '' || informe.tasadorNombre === filtroUsuario;
        const matchBanco = filtroBanco === '' || informe.banco === filtroBanco;
        const matchFechaInicio =
            !fechaInicio || new Date(informe.fechaInicio) >= new Date(fechaInicio);
        const matchFechaFinalizacion =
            !fechaFinalizacion ||
            new Date(informe.fechaFinalizacion) <= new Date(fechaFinalizacion);

        return (
            matchEstado &&
            matchUsuario &&
            matchBanco &&
            matchFechaInicio &&
            matchFechaFinalizacion
        );
    });

    const columns = [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'banco', header: 'Banco' },
        {
            accessorKey: 'estadoInforme',
            header: 'Estado',
            cell: ({ row }) => {
                const estadoProps = getEstadoChipProps(row.original.estadoInforme);
                return <Chip label={estadoProps.label} color={estadoProps.color} variant="outlined" />;
            },
        },
        { accessorKey: 'tasadorNombre', header: 'Usuario' },
        { accessorKey: 'fechaInicio', header: 'Fecha Inicio' },
        { accessorKey: 'fechaFinalizacion', header: 'Fecha Finalización' },
        {
            accessorKey: 'acciones',
            header: 'Descargar',
            cell: ({ row }) => (
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        minWidth: '32px',
                        padding: '5px',
                        justifyContent: 'center',
                        '&:hover': { backgroundColor: '#14532d' },
                    }}
                    onClick={() => downloadPDF(row.original.id)}
                >
                    <PictureAsPdfIcon sx={{ fontSize: 18 }} />
                </Button>
            ),
        },
    ];

    const table = useReactTable({
        data: filteredInformes,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
            <h2 className="text-center text-5xl text-green-900 font-light mx-auto my-10">
                SEGUIMIENTO DE INFORMES
            </h2>

            {/* Reporte con filtros incluidos dentro */}
            <Paper elevation={3} sx={{ width: '90%', padding: 4, bgcolor: '#ffffff', borderRadius: 2 }}>
                {/* Filtros arriba de la tabla */}
                <Grid container spacing={2} sx={{ mb: 3, flexWrap: "nowrap" }}>
                    {/* Fecha Inicio */}
                    <Grid item xs={12} sm={6} md={2.4}>
                        <TextField
                            fullWidth
                            label="Fecha Inicio"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            size="small"
                            sx={{ borderRadius: 2 }}
                        />
                    </Grid>

                    {/* Fecha Finalización */}
                    <Grid item xs={12} sm={6} md={2.4}>
                        <TextField
                            fullWidth
                            label="Fecha Finalización"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={fechaFinalizacion}
                            onChange={(e) => setFechaFinalizacion(e.target.value)}
                            size="small"
                            sx={{ borderRadius: 2 }}
                        />
                    </Grid>

                    {/* Tasador */}
                    <Grid item xs={12} sm={6} md={2.4}>
                        <TextField
                            fullWidth
                            label="Tasador"
                            select
                            value={filtroUsuario}
                            onChange={(e) => setFiltroUsuario(e.target.value)}
                            size="small"
                        >
                            <MenuItem value="">Todos</MenuItem>
                            {tasadores.map((tasador) => (
                                <MenuItem key={tasador.id} value={tasador.nombre}>
                                    {tasador.nombre}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Banco */}
                    <Grid item xs={12} sm={6} md={2.4}>
                        <TextField
                            fullWidth
                            label="Banco"
                            value={filtroBanco}
                            onChange={(e) => setFiltroBanco(e.target.value)}
                            size="small"
                        />
                    </Grid>

                    {/* Estado */}
                    <Grid item xs={12} sm={6} md={2.4}>
                        <TextField
                            fullWidth
                            label="Estado"
                            select
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                            size="small"
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="BORRADOR">Borrador</MenuItem>
                            <MenuItem value="APROBADO">Aprobado</MenuItem>
                            <MenuItem value="PENDIENTE">Pendiente</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>


                {/* Tabla */}
                <Table>
                    <TableHead sx={{ overflow: 'hidden' }}>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            {table.getHeaderGroups().map((headerGroup) =>
                                headerGroup.headers.map((column, index, array) => (
                                    <TableCell
                                        key={column.id}
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#424242',
                                            backgroundColor: '#f5f5f5',
                                            borderTopLeftRadius: index === 0 ? '10px' : 0,
                                            borderTopRightRadius: index === array.length - 1 ? '10px' : 0,
                                            textAlign: 'center',
                                        }}
                                    >
                                        {flexRender(column.column.columnDef.header, column.getContext())}
                                    </TableCell>
                                ))
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                hover
                                sx={{
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                    },
                                }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        sx={{
                                            color: '#616161',
                                            textAlign: 'center',
                                            padding: '10px',
                                            border: 'none',
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
