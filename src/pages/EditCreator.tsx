import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client'; 

export default function EditCreator() {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreator = async () => {
      if (!id) {
        setError('No ID provided');
        setLoading(false);
        return;
      }

      console.log('Fetching creator with ID:', id); 

      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error.message || error);
        setError(error.message || 'Unknown error occurred');
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

    if (!id) {
      setError('No ID provided');
      return;
    }

    const { error } = await supabase
      .from('creators')
      .update({ name, description, url, imageURL })
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error.message || error);
      setError(error.message || 'Unknown error occurred');
    } else {
      navigate('/view-creators');
    }
  };

  const handleDelete = async () => {
    if (!id) {
      setError('No ID provided');
      return;
    }

    // Confirm deletion
    const confirmed = window.confirm('Are you sure you want to delete this creator?');
    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting creator:', error.message || error);
      setError(error.message || 'Unknown error occurred');
    } else {
      navigate('/view-creators');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-blue-500 text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-8">Edit Creator</h1>
      <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded shadow-md w-80">
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Delete Creator
          </button>
        </div>
      </form>
    </div>
  );
}
