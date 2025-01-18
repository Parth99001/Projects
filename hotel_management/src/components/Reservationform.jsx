import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reservationform = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [userName, setUserName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [status, setStatus] = useState('Confirmed'); 


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/rooms');
        setRooms(response.data); 
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedRoom && userName && checkInDate && checkOutDate) {
      
      const reservationData = {
        roomId: selectedRoom,
        userName: userName,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        status: status,
      };

      try {
  
        await axios.post('http://localhost:3000/reservations', reservationData);
        alert('Thank You For Reservation');
        
        
       
      } catch (error) {
        console.error('Error making reservation:', error);
        alert('Sorry Try Again Latter!');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div id='three'>
      <h2 id='three'>Create Reservation</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Room</label>
          <select
            className="form-control"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} - ${room.price}
              </option>
            ))}
          </select>
        </div>

   
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Check-in Date</label>
          <input
            type="date"
            className="form-control"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>


        <div className="form-group">
          <label>Check-out Date</label>
          <input
            type="date"
            className="form-control"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>


        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Make Reservation
        </button>
      </form>
    </div>
  );
};

export default Reservationform;

