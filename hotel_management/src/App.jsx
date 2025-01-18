import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router'; 
import Navbar from './components/Navbar'; 
import Roomlist from './components/Roomlist';
import RoomDetails from './components/RoomDetails';
import Reservationform from './components/Reservationform';
import ReservationList from './components/ReservationList'; 

const App = () => {
  return (
    <div className="App" style={{backgroundColor:"rgb(3, 80, 80)"}}>
    <Navbar />

    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Roomlist />} />
        <Route path="/rooms/:id" element={<RoomDetails />} /> 
        <Route path="/reservations/new" element={<Reservationform />} /> 
        <Route path="/reservations" element={<ReservationList />} />  
      </Routes>
    </div>
  </div>
  );
};

export default App;
