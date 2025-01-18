import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router'; 
import axios from 'axios';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [userName, setUserName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/rooms/${id}`);
        setRoom(response.data);
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const handleReservation = async () => {
    if (!userName || !checkInDate || !checkOutDate) {
      alert('Please fill in all the fields');
      return;
    }

    const reservationData = {
      roomId: id,
      userName,
      checkInDate,
      checkOutDate,
      status: 'Pending',
    };

    try {
     
      await axios.post('http://localhost:3000/reservations', reservationData);
      alert('Reservation created successfully!');
      navigate('/reservations'); 
    } catch (error) {
      console.error('Error making reservation:', error);
      alert('Failed to make reservation');
    }
  };

  return (
    <div>
      {room ? (
        <>
          <h3>{room.name} - Details</h3>
          <div className="card">
            <img src={room.imageUrl} className="card-img-top" alt={room.name} />
            <div className="card-body">
              <h5 className="card-title">{room.name}</h5>
              <p className="card-text">{room.description}</p>
              <p className="card-text"><strong>Price:</strong> ${room.price}</p>
            </div>
          </div>

  
          <h4>Make a Reservation</h4>
          <form onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Check-in Date</label>
              <input
                type="date"
                className="form-control"
                value={checkInDate}
                onChange={e => setCheckInDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Check-out Date</label>
              <input
                type="date"
                className="form-control"
                value={checkOutDate}
                onChange={e => setCheckOutDate(e.target.value)}
              />
            </div>

            <button type="button" className="btn btn-primary mt-3" onClick={handleReservation}>
              Reserve this Room
            </button>
          </form>
        </>
      ) : (
        <p>Loading room details...</p>
      )}
    </div>
  );
};

export default RoomDetails;
