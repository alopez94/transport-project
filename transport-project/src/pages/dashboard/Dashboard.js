import React, { useEffect, useState } from "react";
import Script from "react-load-script";
import {
  addLoad,
  deleteLoad,
  getCollections,
  updateLoads,
} from "../../firebase/Loads";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

//styles
import "./Dashboard.css";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CardVehicules } from "../../components/cardVehicules";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import ConsultsForm from "../../components/consults/consultsForm";
import CardStruct from "../../components/cards/cardStruct";

export default function Dashboard() {
  const { authIsReady, user } = useAuthContext();  
  const [driverRequired, setDriverRequired] = useState(false);
  const [loadingLoad, setLoadingLoad] = useState();
  const [createdByConst, setCreatedByConst] = useState();
  const [createdByIDConst, setCreatedByIDConst] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [requestStartDate, setRequestStartDate] = useState()
  const [requestEndDate, setRequestEndDate] = useState()
  const [selectedCard, setSelectedCard] = useState(null);
  const [costCalculation, setCostCalculation] = useState();
  const [filteredVehicles, setFilteredVehicles] = useState([]);


  const { documents: vehicles, error: errorVehicles } = useCollection("vehicles");


  const style = {
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

  const initialLoadState = {
    createdby: "",
    createdByID: "",
    startDate: "",
    endDate: "",
    departure: "",
    destination: "",
    vehicle: "",
    status: "",
    cost: 0,
    driverrequired: "",
  };
  const [load, setLoad] = useState(initialLoadState);


  useEffect(() => {
    const name = user.displayName;
    const uid = user.uid;
    setCreatedByConst(name);
    setCreatedByIDConst(uid);
    console.log("variables :>> ", selectedCard, load);
    const dpriceconver = load.vehicle.rentpricebase;
    const cost = calcCost(load.startDate, load.endDate, dpriceconver);
    setCostCalculation(cost);
    console.log("cost on useEffect :>> ", cost);
    setDriverRequired(load.driverrequired);
  }, [selectedCard, load, createdByConst, costCalculation]);

  const handleLoadData = (item) => {  
    
    setRequestStartDate(item.startDate)
    setRequestEndDate(item.endDate)
    

    setLoad({
      ...load,
      createdByID: createdByIDConst,
      createdby: createdByConst,
      isActive: true,
      driverrequired: item.driverrequired,
      departure: item.departure,
      destination: item.destination,
      startDate: item.startDate,
      endDate: item.endDate,
      status: "Cotizacion",
    });
  };

  const calcCost = (date1, date2, dailyprice) => {
    const dateA = new Date(date1);
    const dateB = new Date(date2);
    const convertDailyPrice = parseFloat(dailyprice);
    if (isNaN(dateA) || isNaN(dateB)) {
      console.error("Invalid date format");
      return; // Exit the function if the dates are invalid
    }
    const difference = dateB - dateA;
    if (difference < 0) {
      console.error("End date is before start date");
      return; // Exit the function if end date is before start date
    }
    const days = Math.ceil(difference / (1000 * 3600 * 24));

    if (isNaN(days)) {
      console.error("Invalid date range");
      return; // Exit the function if days is NaN
    }
    if (isNaN(convertDailyPrice)) {
      console.error("daily price is not a number");
    }
    console.log("object for calculation :>> ", dateA, dateB, convertDailyPrice);
    const cost = days * convertDailyPrice;
    console.log("cost", cost);
    return cost;
  };
  const handleSelectCard = (item) => {
    setSelectedCard(item);
    setCostCalculation(0);
    handleOpen();
    setLoad({ ...load, vehicle: item });
  };

  useEffect(() => {
    const delay = 5000;
    setTimeout(() => {
      setLoadingLoad(false); // Set loading to false after the delay
    }, delay);
  }, []);

  useEffect(() => {
    if (vehicles) {
      const filtered = filterVehiclesByDate(vehicles, requestStartDate, requestEndDate);
      setFilteredVehicles(filtered);
     
    }
    
  }, [vehicles, requestStartDate, requestEndDate]);

  const handleCreateLoad = async (loaditem) => {
    loaditem = load;
    await addLoad(loaditem);
    handleClose();
    navigate("/mytrips");
  };

 
  const filterVehiclesByDate = (vehicles, startDate, endDate) => {
    if (!startDate || !endDate) return vehicles; 

    const startCriteria = new Date(startDate)
    const endCriteria = new Date(endDate)

    return vehicles.filter(vehicle => {
      const startAvailable = new Date(vehicle.startDateAvailable)
      const endAvailable = new Date(vehicle.endDateAvailable)      
      
      return startAvailable <= endCriteria && endAvailable >= startCriteria;
    });
  };
    


  return (
    <div>
      <Container fixed maxWidth="lg" >
        <Grid sx={{ mt: 2, mb: 2 }}>
          <ConsultsForm onSelect={handleLoadData} />
        </Grid>

        <Grid sx={{ mt: 2, mb: 2 }}>
          {!vehicles && <div>Loading...</div>}
          {!vehicles && <div>errorVehicles.message</div>}
          {filteredVehicles  && (
            <CardVehicules vehicles={filteredVehicles } onSelect={handleSelectCard} />
          )}
        </Grid>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Container sx={style}>
            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 4 }}>
              <Grid item xs={6}>
                {selectedCard ? (
                  <div>
                    <CardStruct
                      image={selectedCard.image}
                      brand={selectedCard.brand}
                      info={selectedCard.info}
                      maxweight={selectedCard.maxweight}
                      type={selectedCard.type}
                      rentpricebase={selectedCard.rentpricebase}
                    />
                  </div>
                ) : (
                  <Typography variant="body1">No vehicle selected</Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" gutterBottom>
                  Usted ha seleccionado:
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Desde: {load.departure} a: {load.destination}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  En {load.startDate} hasta {load.endDate}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  El costo antes de impuesto es de L.{costCalculation}
                </Typography>

                <Button
                  onClick={handleCreateLoad}
                  type="submit"
                  variant="contained"
                  color="success"
                >
                  {!loadingLoad ? (
                    <div>Solicitar Cotizacion Final</div>
                  ) : (
                    <div>Cargando...</div>
                  )}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Modal>
    </div>
  );
}
