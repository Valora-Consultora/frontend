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
} from "@mui/material";

import { useSelector } from "react-redux";
import orderService from "../../api/OrderService";
import EmptyList from "../utils/EmptyList";
import { ArrowForward, ArrowRight, Check, Delete } from "@mui/icons-material";
import InspeccionService from "../../api/InspeccionService";

const InspeccionesList = () => {
  const usuario = useSelector(state => state.user);
  const tasadorId = usuario.id;

  const [inspecciones, setInspecciones] = useState([]);

  useEffect(() => {
    const fetchInspecciones = async () => {
      try {
        var response = await InspeccionService.getInspeccionesByTasadorId(tasadorId);
        setInspecciones(response);
      } catch (error) {
        console.error("Error al obtener las inspecciones:", error);
      }
    };
    fetchInspecciones();
  }, []);

  const columns = [
    { accessorKey: 'calle', header: 'Calle' },
    { accessorKey: 'fechaAvalador', header: 'Fecha Avalador' },
    { accessorKey: 'solicitante', header: 'Solicitante' },
    { accessorKey: 'observaciones', header: 'Observaciones' },
    {
      accessorKey: 'acciones',
      header: 'Informe',
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
          onClick={() => {  }}
        >
          <a href={`/informe/inspeccion/${row.original.id}`} style={{ textDecoration: 'none', color: 'white' }}>
            <ArrowForward sx={{ fontSize: 18 }} />
          </a>
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: inspecciones,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className="bg-white shadow-md p-0 mx-auto mt-4 mb-4 rounded-lg">
        {inspecciones && inspecciones.length === 0 ? (
          <EmptyList Icon={Check} message="Ya terminaste todo el laburo loco bien ahi" />
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
    </Box>
  )
}

export default InspeccionesList;