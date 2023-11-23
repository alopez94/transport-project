import React, { useEffect, useState } from "react";
import { projectAuthentication, projectFirestore } from "../../firebase/config";
import Script from "react-load-script";
import {
  addLoad,
  deleteLoad,
  getCollections,
  updateLoads,
} from "../../firebase/Loads";

import { useCollection } from "../../hooks/useCollection";

//styles
import "./Dashboard.css";
import { Container, colors } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
  const [autocompleteInstances, setAutocompleteInstances] = useState({});
  const [driverRequired, setDriverRequired] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [departure, setDeparture] = useState();
  const [arrival, setArrival] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingLoad, setLoadingLoad] = useState();

  const [vehicles, setVehicles] = useState([]);
  const [createdByConst, setCreatedByConst] = useState();
  const [createdByIDConst, setCreatedByIDConst] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const { documents, error } = useCollection("vehicles");

  const [selectedCard, setSelectedCard] = useState(null);
  const [costCalculation, setCostCalculation] = useState();

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

  const handleScriptLoad = () => {
    const inputFields = document.querySelectorAll(".autocomplete-input");

    const instances = Array.from(inputFields).reduce((acc, input) => {
      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ["(cities)"],
      });

      autocomplete.addListener("place_changed", () =>
        handlePlaceSelect(autocomplete)
      );
      acc[input.id] = autocomplete;
      return acc;
    }, {});

    setAutocompleteInstances(instances);
    console.log("Script loaded, initializing autocomplete instances...");
  };

  useEffect(() => {
    // Check if the Google Maps JavaScript API script is already loaded
    if (!window.google) {
      // Load the Google Maps JavaScript API script with a callback
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDLtGQQEO4Meam3ns19cuf_DA4yl9gwaps&libraries=places&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);

      // Define the callback function
      window.initMap = handleScriptLoad;
    } else {
      // If the API is already loaded, simply initialize the Autocomplete instances
      handleScriptLoad();
    }
  }, []);

  const handlePlaceSelect = (autocomplete) => {
    const addressObject = autocomplete.getPlace();
    const address = addressObject.address_components;
    if (address) {
      // Handle the selected place details
      console.log(address);
    }
  };

  useEffect(() => {

    const name = projectAuthentication.currentUser.displayName;
    const uid = projectAuthentication.currentUser.uid;
    setCreatedByConst(name);
    setCreatedByIDConst(uid)
    console.log("variables :>> ", selectedCard, load);
    const dpriceconver = load.vehicle.rentpricebase    
    const cost = calcCost(load.startDate, load.endDate, dpriceconver)
    setCostCalculation(cost)
    console.log('cost on useEffect :>> ', cost);
    setDriverRequired(load.driverrequired)

  }, [selectedCard, load, createdByConst, costCalculation]);

  const handleLoadData = (item) => {   
    
    setLoad({
      ...load,
      createdByID: createdByIDConst,
      createdby: createdByConst,
      driverrequired: driverRequired,
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
    console.log('object for calculation :>> ', dateA, dateB, convertDailyPrice);
    const cost = days * convertDailyPrice;
    console.log("cost", cost);
    return cost;
  };
  const handleSelectCard = (item) => {
    
    setSelectedCard(item);
    setCostCalculation(0)
    handleOpen();      
    setLoad({ ...load, vehicle: item});
    
  };

  useEffect(() => {
    const delay = 5000;
    setTimeout(() => {
      setLoadingLoad(false); // Set loading to false after the delay
    }, delay);
  }, []);

  const handleCreateLoad = async (loaditem) => {
    loaditem = load;
    await addLoad(loaditem);
    handleClose();
    navigate("/mytrips");
  };

  return (
    <div>
      <Container fixed>
        <Grid sx={{ mt: 2, mb: 2 }}>
          <ConsultsForm onSelect={handleLoadData} />
        </Grid>

        <Grid sx={{ mt: 2, mb: 2 }}>
          {!documents && <div>Loading</div>}
          {error && <div>error.message</div>}
          {documents && (
            <CardVehicules vehicles={documents} onSelect={handleSelectCard} />
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

                <Typography variant="subtitle1" gutterBottom>
                  Desea agregar un conductor a su viaje?
                </Typography>

                <TextField
                  select
                  required
                  fullWidth
                  name="isDriverRequired"
                  label="Require Conductor"
                  value={driverRequired}    
                  onChange={() => setLoad({...load,cost: costCalculation})}            
                >
                  <MenuItem
                    value={false}
                    onSelect={() => setDriverRequired(false)}                    
                  >
                    No. Usare mi propio personal
                  </MenuItem>
                  <MenuItem
                    value={true}
                    onSelect={() => setDriverRequired(true)}
                  >
                    Si, deseo solicitar un transportista
                  </MenuItem>
                </TextField>

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
