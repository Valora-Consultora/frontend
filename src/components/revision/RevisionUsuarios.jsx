import React, { useState, useEffect, useRef } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import usuarioService from '../../api/UsuarioService';
import {
  Box,
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
import Modal from 'react-modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { Chip } from '@mui/material';
import '../../App.css'

const ReporteSeguimiento = () => {
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);

  const nombreRef = useRef();
  const usuarioRef = useRef();
  const tipoRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        var response = await usuarioService.getUsuarios();
        setUsuarios(response);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  useEffect(() => {
    const filteredUsuarios = usuarios.filter((usuario) => {
      const matchTipo = filtroTipo === '' || usuario.tipoUsuario === filtroTipo;
      const matchNombre = filtroNombre === '' || usuario.nombre.toLowerCase().includes(filtroNombre.toLowerCase());

      return (
        matchTipo &&
        matchNombre
      );
    });

    console.log(filteredUsuarios);

    setFilteredUsuarios(filteredUsuarios);
  }, [filtroTipo, filtroNombre, usuarios]);

  const addUser = () => {
    const newUser = {
      nombre: nombreRef.current.value,
      tipoUsuario: tipoRef.current.value,
      username: usuarioRef.current.value,
      password: passwordRef.current.value,
    };

    usuarioService.createUsuario(newUser)
      .then((response) => {
        setUsuarios([...usuarios, response]);
        setIsAddModalOpen(false);
      })
      .catch(error => {
        console.error("Error al añadir el usuario:", error);
      });
  }

  const deleteUser = (id) => {
    usuarioService.deleteUsuario(id)
      .then(() => {
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
      })
      .catch(error => {
        console.error("Error al eliminar el usuario:", error);
      });
  }

  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'nombre', header: 'Nombre' },
    { accessorKey: 'tipoUsuario', header: 'Tipo de Usuario' },
    { accessorKey: 'username', header: 'Usuario/Email' },
    {
      accessorKey: 'acciones',
      header: 'Borrar',
      cell: ({ row }) => row.original.tipoUsuario === "ADMINISTRADOR" ? null : (
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
          onClick={() => deleteUser(row.original.id)}
        >
          <DeleteIcon sx={{ fontSize: 18 }} />
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredUsuarios,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
        <h2 className="text-center text-5xl text-green-900 font-light mx-auto my-10">
          SEGUIMIENTO DE USUARIOS
        </h2>

        {/* Reporte con filtros incluidos dentro */}
        <Paper elevation={3} sx={{ width: '90%', padding: 4, bgcolor: '#ffffff', borderRadius: 2 }}>
          {/* Filtros arriba de la tabla */}
          <Grid container spacing={2} sx={{ mb: 3, flexWrap: "nowrap" }}>
            {/* Nombre */}
            <Grid item xs={12} sm={6} md={2.4}>
              <TextField
                fullWidth
                label="Nombre"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                size="small"
              />
            </Grid>

            {/* Tipo */}
            <Grid item xs={12} sm={6} md={2.4}>
              <TextField
                fullWidth
                label="Tipo"
                select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                size="small"
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="SECRETARIA">Secretaria</MenuItem>
                <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
                <MenuItem value="TASADOR">Tasador</MenuItem>
                <MenuItem value="GERENCIA">Gerencia</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs className="flex flex-row justify-end">
              <Button className="
                        bg-green-900 text-white hover:bg-green-800 rounded-lg px-4 py-2"
                variant="contained"
                sx={{
                  backgroundColor: '#14532d',
                  color: 'white',
                  '&:hover': { backgroundColor: '#14532d' },
                }}
                onClick={() => setIsAddModalOpen(true)}
              >Añadir</Button>
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
      <Modal
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        contentLabel="Editar comparable"
        // style={modalStyle}
        className="fixed modal-center"
        // overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-51"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-center text-2xl text-green-900 font-light my-4">
            Añadir Usuario
          </h2>
          <TextField inputRef={nombreRef} label="Nombre" fullWidth margin="normal" />
          <TextField inputRef={usuarioRef} label="Usuario/Email" fullWidth margin="normal" />
          <TextField inputRef={passwordRef} label="Contraseña" fullWidth margin="normal" />
          <TextField inputRef={tipoRef} label="Tipo de Usuario" fullWidth margin="normal" select>
            <MenuItem value="SECRETARIA">Secretaria</MenuItem>
            <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
            <MenuItem value="TASADOR">Tasador</MenuItem>
            <MenuItem value="GERENCIA">Gerencia</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" onClick={addUser} fullWidth>
            Añadir
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ReporteSeguimiento;
