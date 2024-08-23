import React, { useState } from 'react';
import { supabase } from '../client'; // Adjusted import path

export default function AddCreator() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('creators')
      .insert([{ name, description, url, imageURL }]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Creator added:', data);
      setName('');
      setDescription('');
      setUrl('');
      setImageURL('');
    }
  };

  return (
    <div className="bg-blue-500 text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-8">Add a New Creator</h1>
      <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">URL to Socials</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Image URL (optional)</label>
          <input
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Creator
        </button>
      </form>
    </div>
  );
}
