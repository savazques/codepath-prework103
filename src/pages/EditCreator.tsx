import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client'; // Adjust the import path as necessary

export default function EditCreator() {
  const { id } = useParams<{ id: string }>(); // Get the creator ID from the URL
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else if (data) {
        setName(data.name);
        setDescription(data.description);
        setUrl(data.url);
        setImageURL(data.imageURL || '');
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
      .from('creators')
      .update({ name, description, url, imageURL })
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error);
    } else {
      navigate('/view-creators');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-blue-500 text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-8">Edit Creator</h1>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}
