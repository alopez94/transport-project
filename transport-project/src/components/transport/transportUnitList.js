import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';



const TransportUnitList = ({ vehicles, onEdit, onDelete }) => {


  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Marca</TableCell>
          <TableCell>Tipo</TableCell>
          <TableCell>Información</TableCell>
          <TableCell>Peso Máx.</TableCell>
          <TableCell>Velocidad Máx.</TableCell>
          <TableCell>Transmisión</TableCell>
          <TableCell>Precio Base</TableCell>
          <TableCell>Conductor Requerido</TableCell>
          <TableCell>Disponible</TableCell>
          <TableCell>Imagen</TableCell>
          <TableCell>Fecha Inicio Disponibilidad</TableCell>
          <TableCell>Fecha Finalizacion Disponibilidad</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell>{vehicle.brand}</TableCell>
            <TableCell>{vehicle.type}</TableCell>
            <TableCell>{vehicle.info}</TableCell>
            <TableCell>{vehicle.maxweight}</TableCell>
            <TableCell>{vehicle.maxspeed}</TableCell>
            <TableCell>{vehicle.transmission}</TableCell>
            <TableCell>{vehicle.rentpricebase}</TableCell>
            <TableCell>{vehicle.driverrequired}</TableCell>
            <TableCell>{vehicle.isAvailable ? 'Sí' : 'No'}</TableCell>
            <TableCell>{vehicle.image}</TableCell>
            <TableCell>{vehicle.startDateAvailable}</TableCell>
            <TableCell>{vehicle.endDateAvailable}</TableCell>
            <TableCell>
              <Button variant="contained" color="primary" onClick={() => onEdit(vehicle)}>
                Editar
              </Button>
              <Button variant="contained" color="secondary" onClick={() => onDelete(vehicle.id)}>
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransportUnitList;
