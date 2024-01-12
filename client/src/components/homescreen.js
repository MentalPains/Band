import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    return (
      <div className="container" style={{ height: '100vh', backgroundImage: 'url("your-background-image.jpg")', backgroundSize: 'cover' }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Home Pages</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/attendance">Attendance</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/event">Event</Link>
              </li>
              {/* Add more navigation links here if needed */}
            </ul>
          </div>
        </nav>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80%' }}>
          <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
        </div>
      </div>
    );
  };

export default HomeScreen;
