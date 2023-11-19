import React from 'react';
import Slideshow from './slideshow'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import './Home.css';

export default function Home() {
  const images = [
    '/resources/image1.jpg',
    '/resources/image2.jpg',
    '/resources/image3.jpg',
    // Add more image URLs as needed
  ];
  const videos = [
    '/resources/truck_video.mp4', // Update with your actual video file
     
  ];
  return (
    <div>
      <header>
        {/* Include your header content here */}
      </header>

      {/* Include the slideshow */}
      <div className="slideshow-container">
        <Slideshow images={images} interval={3000} />
         {/* Centered white bold letters over the slideshow */}
         <div className="slogan-overlay">
          <p className="slogan-text">¡Rápido, Confiable, y Sin Estrés! </p>
        </div>
      </div>

      {/* Include the description of the webpage */}
      <div className="webpage-description">
        <h2>Bienvenido a Swift Moves!</h2>
        <p>
        Encuentre la solución perfecta para su tus transportes con nuestras opciones de alquiler de camiones
         y servicios de conductores profesionales.</p>
      </div>

     {/* Include the second description without a card */}
     <div className="second-description">
        <h2>Su carga comienza con Swift Moves.</h2>
        <p>Explore soluciones eficientes para su carga con solo un clic de distancia.</p>
        <button className="green-button" onClick={() => window.location.href='/contact'}>
          Contact Us
        </button>
      </div>

      
      <div className="image-container">
        <img src="/resources/Truck-Driver.jpeg" alt="Your Image" />
      </div>

    </div>

    
  );
}
