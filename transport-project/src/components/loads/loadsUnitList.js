import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

const LoadsUnitList = ({ loads, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableCell>Creado Por</TableCell>
        <TableCell>Fecha Inicio</TableCell>
        <TableCell>Fecha Finalizacion</TableCell>
        <TableCell>Partida</TableCell>
        <TableCell>Destino</TableCell>
        <TableCell>Vehiculo</TableCell>
        <TableCell>Estado</TableCell>
        <TableCell>Acciones</TableCell>
      </TableHead>
      <TableBody>
        {loads.map((load) => (
          <TableRow key={load.id}>
            <TableCell> {load.createdby} </TableCell>
            <TableCell> {load.startDate} </TableCell>
            <TableCell> {load.endDate} </TableCell>
            <TableCell> {load.departure} </TableCell>
            <TableCell> {load.destination} </TableCell>
            <TableCell> {load.vehicle.brand} </TableCell>
            <TableCell> {load.status} </TableCell>
            <TableCell>
              
              <Button
               variant="outlined" 
               color="error"
               onClick={() => onDelete(load.id)}
              >
                Cancelar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LoadsUnitList;