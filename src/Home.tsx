import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleViewCreators = () => {
    navigate('/view-creators');
  };

  const handleAddCreator = () => {
    navigate('/add-creator');
  };

  return (
    <div className="bg-blue-500 text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-8">Welcome to the Creator Dashboard</h1>
      <div className="flex space-x-4">
        <button
          onClick={handleViewCreators}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          View Creators
        </button>
        <button
          onClick={handleAddCreator}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Creator
        </button>
      </div>
    </div>
  );
}
