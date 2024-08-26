import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AddCreator from './pages/AddCreator';
import ViewCreators from './pages/ViewCreators';
import EditCreator from './pages/EditCreator'; 
import ShowCreator from './pages/ShowCreator';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-creator" element={<AddCreator />} />
        <Route path="/view-creators" element={<ViewCreators />} />
        <Route path="/edit-creator/:id" element={<EditCreator />} /> 
        <Route path="/show-creator/:id" element={<ShowCreator />} />
      </Routes>
    </Router>
  );
}
