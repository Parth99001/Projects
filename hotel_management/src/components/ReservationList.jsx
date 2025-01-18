import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reservations');
        setReservations(response.data); 
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/reservations/${id}`);
      setReservations(reservations.filter(reservation => reservation.id !== id)); 
      alert('Reservation deleted successfully');
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert('Failed to delete reservation');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/reservations/${id}`, updatedData);
      const updatedReservations = reservations.map((reservation) =>
        reservation.id === id ? { ...reservation, ...updatedData } : reservation
      );
      setReservations(updatedReservations); 
      alert('Reservation updated successfully');
    } catch (error) {
      console.error('Error updating reservation:', error);
      alert('Failed to update reservation');
    }
  };

  return (
    <div>
      <h2 id='three'>Reservation List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Room ID</th>
            <th>User Name</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.roomId}</td>
                <td>{reservation.userName}</td>
                <td>{reservation.checkInDate}</td>
                <td>{reservation.checkOutDate}</td>
                <td>{reservation.status}</td>
                <td>
                
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      const updatedData = {
                        userName: prompt('Enter new user name', reservation.userName),
                        checkInDate: prompt('Enter new check-in date', reservation.checkInDate),
                        checkOutDate: prompt('Enter new check-out date', reservation.checkOutDate),
                        status: prompt('Enter new status', reservation.status),
                      };
                      handleUpdate(reservation.id, updatedData); 
                    }}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(reservation.id)} 
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No reservations available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
