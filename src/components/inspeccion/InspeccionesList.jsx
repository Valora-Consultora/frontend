import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
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
  Modal,
} from "@mui/material";

import { useSelector } from "react-redux";
import orderService from "../../api/OrderService";
import EmptyList from "../utils/EmptyList";
import { ArrowForward, ArrowRight, Check, Delete, Person } from "@mui/icons-material";
import InspeccionService from "../../api/InspeccionService";

const InspeccionesList = () => {
  const usuario = useSelector(state => state.user);
  const tasadorId = usuario.id;
  const privileged = ["ADMINISTRADOR", "SECRETARIA"].includes(usuario.tipoUsuario);

  const [inspecciones, setInspecciones] = useState([]);
  const [assignModalOpen, setAssignModalOpen] = useState(null);

  useEffect(() => {
    const fetchInspecciones = async () => {
      try {
        var response;
        if (privileged) {
          response = await InspeccionService.getAllInspecciones();
        } else {
          response = await InspeccionService.getInspeccionesByTasadorId(tasadorId);
        }
        setInspecciones(response);
      } catch (error) {
        console.error("Error al obtener las inspecciones:", error);
      }
    };
    fetchInspecciones();
  }, [assignModalOpen]);

  const columns = [
    { accessorKey: 'calle', header: 'Calle' },
    { accessorKey: 'fechaAvalador', header: 'Fecha Avalador' },
    { accessorKey: 'solicitante', header: 'Solicitante' },
    { accessorKey: 'observaciones', header: 'Observaciones' },
    { accessorKey: 'tasador', header: 'Tasador', cell: ({ row }) => row.original.nombreTasador || 'No asignado' },
    {
      accessorKey: 'acciones',
      header: 'Informe',
      cell: ({ row }) => (
        <a href={`/informe/inspeccion/${row.original.id}`} style={{ textDecoration: 'none', color: 'white' }}>
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
          >
            <ArrowForward sx={{ fontSize: 18 }} />
          </Button>
        </a>
      ),
    },
  ];

  if (privileged) {
    columns.push({
      accessorKey: 'asignar',
      header: 'Asignar',
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
          onClick={() => {
            setAssignModalOpen(row.original)
          }}
        >
          <Person sx={{ fontSize: 18 }} />
        </Button>
      ),
    });
  }

  const table = useReactTable({
    data: inspecciones,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (<>
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className="bg-white shadow-md p-0 mx-auto mt-4 mb-4 rounded-lg">
        {inspecciones && inspecciones.length === 0 ? (
          <EmptyList Icon={Check} message="No hay nada que mostrar" />
        ) : <Table>
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
        }
      </div>
      <ModalAssign
        modalAssignOpen={assignModalOpen}
        setModalAssignOpen={setAssignModalOpen}
      />
    </Box></>
  )
}

const ModalAssign = ({ modalAssignOpen, setModalAssignOpen }) => {
  const [tasadores, setTasadores] = useState([]);
  const [selectedTasador, setSelectedTasador] = useState(modalAssignOpen?.tasador);

  useEffect(() => {
    (async function fetchTasadores() {
      try {
        const response = await orderService.getTasadores();
        setTasadores(response);
      } catch (error) {
        console.error("Error al obtener los tasadores:", error);
      }
    })();
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSelectedTasador(value);
  }

  const handleSubmit = async () => {
    try {
      if (!selectedTasador) {
        return;
      }
      await InspeccionService.assignTasador(modalAssignOpen.id, Number(selectedTasador));
      setModalAssignOpen(null);
    } catch (error) {
      console.error("Error al asignar tasador:", error);
    } finally {
      setModalAssignOpen(null);
    }
  }
  
  return <Modal
    open={modalAssignOpen !== null}
    onRequestClose={() => setModalAssignOpen(false)}
    contentLabel="Editar homologación"
    className="fixed inset-0 flex items-center justify-center z-50"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
  >
    <div className="bg-gray-100 w-2/5 rounded-lg">
      {/* Editar homologacion, campos: piso, ubicacion */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 space-y-4 border p-3 rounded">
            <h4 className="text-xl text-green-900">Asignar tasador</h4>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="tasador"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Tasador:
              </label>
              <select
                id="tasador"
                name="tasador"
                value={selectedTasador}
                onChange={handleInputChange}
                className="col-span-10 border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Seleccione un tasador</option>
                {tasadores.map((tasador) => (
                  <option key={tasador.id} value={tasador.id}>
                    {tasador.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-2 justify-center mt-4">
          <div className="text-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Guardar
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setModalAssignOpen(null)}
              className="bg-red-900 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

    </div>
  </Modal>;
}

export default InspeccionesList;