import React, { useState } from "react";
import { NavLink } from "react-router-dom"

//styles
import Slideshow from "./slideshow";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./Home.css";
import ConsultsForm from "../../components/consults/consultsForm";

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
  padding: "5%"
};

export default function Home() {
  //states
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const images = [
    "/resources/image1.jpg",
    "/resources/image2.jpg",
    "/resources/image3.jpg",
    // Add more image URLs as needed
  ];
  const videos = [
    "/resources/truck_video.mp4", // Update with your actual video file
  ];
  return (
    <div>
      <header>{/* Include your header content here */}</header>

      {/* Include the slideshow */}
      <div className="slideshow-container">
        <Slideshow images={images} interval={3000} />
        {/* Centered white bold letters over the slideshow */}
        <div className="slogan-overlay">
          <Typography component={'span'} className="slogan-text">¡Rápido, Confiable, y Sin Estrés! </Typography>
        </div>
      </div>

      {/* Include the description of the webpage */}
      <div className="webpage-description">
        <h2>Bienvenido a Swift Moves!</h2>
        <Typography component={'span'} variant={'body2'}>
          Encuentre la solución perfecta para su tus transportes con nuestras
          opciones de alquiler de camiones y servicios de conductores
          profesionales.
          </Typography>

        <Button onClick={handleOpen} variant="contained" color="success">
          Cotiza con nosotros!
        </Button>
      </div>

      {/* Include the second description without a card */}
      <div className="second-description">
        <h2>Su carga comienza con Swift Moves.</h2>
        <Typography component={'span'} variant={'body2'}>
          Explore soluciones eficientes para su carga con solo un clic de
          distancia.
          </Typography>
        <button
          className="green-button"
          onClick={() => (window.location.href = "/contact")}
        >
          Contact Us
        </button>
      </div>

      <div className="image-container">
        <img src="/resources/Truck-Driver.jpeg" alt="Your Image" />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h2" component="h2">
            Ingresa tu informacion y cotiza con nosotros
          </Typography>
          <Typography component={'span'} variant={'body2'}>
          
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sapien nulla, scelerisque non viverra eu, convallis quis erat. Quisque auctor.
          
          
          </Typography>

          <ConsultsForm />
         
        </Box>
      </Modal>
    </div>
  );
}
