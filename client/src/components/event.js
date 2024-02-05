import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Event = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const events = [
    { date: '10 Mar', details: 'Events' },
    { date: '11 Apr', details: 'Events' },
    { date: '12 May', details: 'Events' },
    { date: '13 Jun', details: 'Events' },
  ];

  const handleCreateEventClick = () => {
    navigate('/create-event');
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Upcoming Events</h2>
        <button 
          style={{
            backgroundColor: '#007bff', 
            color: 'white', 
            borderRadius: '5px', 
            padding: '10px 20px', 
            border: 'none', 
            cursor: 'pointer'
          }}
          onClick={handleCreateEventClick}
        >
          Create Event
        </button>
      </div>
      {showPopup && (
        <div style={{
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '5px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)', 
          zIndex: 1000
        }}>
          {/* Content of the popup */}
          <p>Event Details</p>
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
      <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        {events.map((event, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{
              backgroundColor: '#007bff', 
              color: 'white', 
              borderRadius: '15px', 
              padding: '10px 20px', 
              marginRight: '20px', 
              fontSize: '1em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '75px', 
              minHeight: '75px',
            }}>
              {event.date}
            </div>
            <span 
              style={{ fontSize: '1.2em', cursor: 'pointer' }}
              onClick={togglePopup}
            >
              {event.details}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
