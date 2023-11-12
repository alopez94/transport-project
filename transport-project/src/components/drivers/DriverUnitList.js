import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

const DriverUnitList = ({ drivers, onEdit, onDelete }) => {

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Apellido</TableCell>
          <TableCell>No.Identidad</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Telefono</TableCell>
          <TableCell>Direccion</TableCell>
          <TableCell>Activo</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {drivers.map((driver) => (
          <TableRow key={driver.id}>
            <TableCell>{driver.name}</TableCell>
            <TableCell>{driver.lastname}</TableCell>
            <TableCell>{driver.dni}</TableCell>
            <TableCell>{driver.email}</TableCell>
            <TableCell>{driver.cellphone}</TableCell>
            <TableCell>{driver.address}</TableCell>
            <TableCell>{driver.isactive? 'Sí' : 'No'}</TableCell>
            <TableCell>
              <Button variant="contained" color="primary" onClick={() => onEdit(driver)}>
                Editar
              </Button>
              <Button variant="contained" color="secondary" onClick={() => onDelete(driver.id)}>
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DriverUnitList;