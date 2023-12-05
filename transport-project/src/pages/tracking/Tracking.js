import "./Tracking.css";
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { projectFirestore } from '../../firebase/config';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Tracking() {
  const [inProgressTrips, setInProgressTrips] = useState([]);
  const mapRef = useRef(null); // Reference for the map container

  useEffect(() => {
    const map = L.map('map').setView([14.1, -87.2167], 13);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
    // Fetch in-progress trips
    const unsubscribe = projectFirestore.collection('loads')
      .where("status", "==", "inProgress")
      .onSnapshot(snapshot => {
        const tripsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setInProgressTrips(tripsData);
      });

    // Cleanup on component unmount
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  const handleTrack = (trip) => {
    // tracking logic
  };

  return (
    <Container fixed>
      <Typography variant="h6" color="primary" gutterBottom>
        Viajes en Progreso
      </Typography>
      <div className="trip-table-container">
        <table className="trip-table">
          <thead>
            <tr>
              <th>Fecha Inicio</th>
              <th>Fecha Finalizacion</th>
              <th>Partida</th>
              <th>Destino</th>
              <th>Vehiculo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inProgressTrips.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.startDate}</td>
                <td>{trip.endDate}</td>
                <td>{trip.departure}</td>
                <td>{trip.destination}</td>
                <td>{trip.vehicle.type} - {trip.vehicle.brand}</td>
                <td>{trip.status}</td>
                <td>
                  <Button className="track-button" variant="contained" color="primary" onClick={() => handleTrack(trip)}>
                    Track
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="map" className="tracking-map" ref={mapRef} style={{ height: '400px' }} />
    </Container>
  );
}
