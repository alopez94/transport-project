import React, { useState, useEffect } from "react";
import { projectAuthentication, projectFirestore } from "../../firebase/config";

import "./MyTrips.css";
import Container from "@mui/material/Container";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import LoadsUnitList from "../../components/loads/loadsUnitList";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { updateLoads } from "../../firebase/Loads";
import Modal from "@mui/material/Modal";
import CardStruct from "../../components/cards/cardStruct";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const modalStyle = {
  position: "fixed",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "5%",
  display: "flexbox",
};

const initialStateSelectedLoad = {
  cost: 0,
  createdBy: "",
  departure: "",
  destination: "",
  driverrequired: false,
  endDate: "",
  isActive: false,
  isDriverRequired: "no",
  startDate: "",
  status: "",
  vehicle: [],
};

export default function MyTrips() {
  //states
  const [selectedLoad, setSelectedLoad] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState(false)

  let query = null;
  let query2 = null;
  if (user.uid === "Lpf71y075pXItSjf9wL224RPlCp1") {
    query = ["isActive", "==", true];
    query2 = null;
  } else {
    query = ["createdByID", "==", user.uid];
    query2 = ["isActive", "==", true];
  }

  const { documents: loads, error: errorLoads } = useCollection(
    "loads",
    query,
    query2
  );

  useEffect(() => {
    console.log("selectedLoad :>> ", selectedLoad);
    console.log("loads :>> ", loads); // Check what 'loads' contains
  }, [selectedLoad, loads]);

  const clickedRow = (rowLoad) => {   
    if(user.uid === "Lpf71y075pXItSjf9wL224RPlCp1"){
    setSelectedLoad(rowLoad);
    handleOpen()
    console.log("selectedLoad :>> ", rowLoad);
  }
   
  };

  const handleDeleteLoad = async (id) => {
    await updateLoads(id, { isActive: false });
  };

  const handleUpdateStatus = async (load) => {
    console.log(selectedLoad.status)
    console.log('load.id :>> ', load.id);
   await updateLoads(selectedLoad.id, {status:selectedLoad.status})
  }

  return (
    <div>
      <Container fixed>
        <Typography variant="h6" color="primary" gutterBottom>
          <p>Tus viajes!</p>
          Aqui puedes ver los viajes que has solicitado
        </Typography>
        {loads && (
          <Box sx={{ height: "100vh" }}>
            <LoadsUnitList
              loads={loads}
              onDelete={handleDeleteLoad}
              onSelect={clickedRow}
            />
          </Box>
        )}
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Container sx={modalStyle}>
            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 4 }}>
              <Grid item xs={6}>
                {selectedLoad &&  (
                  <div>
                    <CardStruct
                      image={selectedLoad.vehicle.image}
                      brand={selectedLoad.vehicle.brand}
                      info={selectedLoad.vehicle.info}
                      maxweight={selectedLoad.vehicle.maxweight}
                      type={selectedLoad.vehicle.type}
                      rentpricebase={selectedLoad.vehicle.rentpricebase}
                    />
                  </div>
                )}
              </Grid>

              {selectedLoad && <Grid item xs={6}>
                <Typography variant="h4" gutterBottom>
                  Usted ha seleccionado:
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Desde: {selectedLoad.departure} a: {selectedLoad.destination}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  En {selectedLoad.startDate} hasta {selectedLoad.endDate}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  El costo antes de impuesto es de L.{selectedLoad.cost}
                </Typography>

                  <div>
                <TextField
                  select
                  required
                  fullWidth
                  name="status"
                  label="Status de la carga" 
                  value={selectedLoad.status}
                  onChange={(e)=>{setSelectedLoad({...selectedLoad, status: e.target.value})}}
                >
                  <MenuItem  value="rejected">Rechazado</MenuItem>
                  <MenuItem value="acepted">Aceptado</MenuItem>
                  <MenuItem value="inProgress">En progreso</MenuItem>
                  <MenuItem value="completed">Completado</MenuItem>
                </TextField>

                <Button type="submit" variant="contained" color="success" onClick={handleUpdateStatus} >
                  Guardar
                </Button>
                </div>
              </Grid>}
            </Grid>
          </Container>
        </div>
      </Modal>
    </div>
  );
}
