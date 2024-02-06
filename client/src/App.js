import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MemberList from './components/memberlist';
import Create from './components/create';
import Edit from './components/edit';
import Navbar from './components/navbar';
import Event from './components/event';
import Attendance from './components/attendance';
import Contact from './components/contact';


const App = () => {
  return (
    <div>

      <Navbar />
      <Routes>
        <Route path="/" element={<MemberList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/event" element={<Event />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
