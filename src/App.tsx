import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AddCreator from './pages/AddCreator';
import ViewCreators from './pages/ViewCreators'; // Adjusted import path

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-creator" element={<AddCreator />} />
        <Route path="/view-creators" element={<ViewCreators />} />
      </Routes>
    </Router>
  );
}

