// AboutUs.js

import React from 'react';
import './About.css';

export default function AboutUs() {
  return (
    <div>
      <header>
        {/* Include your header content here */}
      </header>

      <div className="video-container">
        {/* Content inside the video container */}
        <div className="About">
          <div className="Us">
            <h2>Nosotros</h2>
            <p>Empoderando los sueños de aquellos que entregan a Estados Unidos.</p>
          </div>
        </div>

        {/* Display the truck video */}
        <video className="background-video" autoPlay loop muted>
          <source src="/resources/truck_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="swift-moves-description">
          <h3>¿Qué es Swift Moves?</h3>
          <p>
            Swift Moves es una plataforma dedicada a facilitar y mejorar su experiencia de transporte de carga. 
            Con un enfoque en el servicio al cliente, la innovación y la colaboración, nos esforzamos 
            por brindar soluciones eficientes y creativas para satisfacer sus necesidades de mudanza.
            En Swift Moves, consideramos a nuestros clientes como parte de nuestra familia, y trabajamos 
            en estrecha colaboración con ellos y nuestros socios para garantizar el éxito en cada paso del camino.
            ¡Descubra cómo Swift Moves puede hacer que su mudanza sea más fácil y exitosa!
          </p>
        </div>
      </div>

      {/* Container without background image */}
      <div className="about-container">
        <div className="about-content">
          {/* Qué nos define */}
          <div className="about-definition">
            <h3>Qué nos define</h3>
          </div>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis sem quis lorem sodales, eget dictum velit scelerisque. Proin nulla eros, elementum a augue in, pharetra accumsan ex. Sed scelerisque turpis sed lectus aliquam placerat. Nam luctus ornare nisl. Praesent at aliquam massa. Morbi ut ullamcorper felis, sed viverra lectus.
            </p>
          {/* Table for Service, Innovación, Alianzas, Fuerza, Familia, Community */}
          <div className="about-table">
            <table>
              {/* Table content goes here */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
