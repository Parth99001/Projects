import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Roomlist = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredRooms = rooms.filter(room => 
    room.name && room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          id='onee'
          className="form-control"
          placeholder="Search rooms by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredRooms.map(room => (
          <div className="col-md-4 mb-4" key={room.id}>
            <div className="card">
              <img src={room.imageUrl} className="card-img-top" alt={room.name} />
              <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text">{room.description}</p>
                <p className="card-text"><strong>Price:</strong> ${room.price}</p>
                <a href={`/rooms/${room.id}`} className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roomlist;
