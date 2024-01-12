import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecordList from './components/telephoneList';
import Create from './components/create';
import Edit from './components/edit';
import Navbar from './components/navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
};

export default App;
