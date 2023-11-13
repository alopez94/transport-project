// AboutUs.js

import React from 'react';
import Slideshow from './slideshow_video';
import './About.module.css';

export default function AboutUs() {
  const videos = [
    '/resources/truck_video.mp4', // Update with your actual video file
  ];

  return (
    <div>
      <header>
        {/* Include your header content here */}
      </header>

      {/* Video slideshow container */}
      <div className="video-container">
        <Slideshow videos={videos} />

        {/* Content inside the video container */}
        <div className="About">
          <div className="Us">
            <h2>Nosotros</h2>
            <p>Empoderando los sueños de aquellos que entregan a Estados Unidos.</p>
          </div>

          <div className="swift-moves-description">
            <h3>¿Qué es Swift Moves?</h3>
            <p>
              Swift Moves es una plataforma dedicada a facilitar y mejorar su experiencia de mudanza. 
              Con un enfoque en el servicio al cliente, la innovación y la colaboración, nos esforzamos 
              por brindar soluciones eficientes y creativas para satisfacer sus necesidades de mudanza.
              En Swift Moves, consideramos a nuestros clientes como parte de nuestra familia, y trabajamos 
              en estrecha colaboración con ellos y nuestros socios para garantizar el éxito en cada paso del camino.
              ¡Descubra cómo Swift Moves puede hacer que su mudanza sea más fácil y exitosa!
            </p>
          </div>
        </div>
      </div>

      {/* Container without background image */}
      <div className="about-container">
        <div className="about-content">
          {/* Qué nos define */}
          <div className="about-definition">
            <h3>Qué nos define</h3>
          </div>

          {/* Table for Service, Innovación, Alianzas, Fuerza, Familia, Community */}
          <div className="about-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Servicio</strong>
                    <br />
                    <small>Nuestros clientes son nuestra prioridad.</small>
                  </td>
                  <td>
                    <strong>Innovación</strong>
                    <br />
                    <small>Proveemos soluciones creativas.</small>
                  </td>
                  <td>
                    <strong>Alianzas</strong>
                    <br />
                    <small>Para ofrecerles lo mejor a nuestros clientes.</small>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Fuerza</strong>
                    <br />
                    <small>Invertimos en nuestro equipo y en nuestra organización, para apoyar mejor a nuestros clientes.</small>
                  </td>
                  <td>
                    <strong>Familia</strong>
                    <br />
                    <small>Nuestros clientes y socios merecen atención y respeto.</small>
                  </td>
                  <td>
                    <strong>Community</strong>
                    <br />
                    <small>Cuando somos solidarios, todos ganamos.</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
