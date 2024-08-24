import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client'; // Adjust import path as necessary

interface Creator {
  id: string;
  name: string;
  description: string;
  url: string;
  imageURL?: string;
}

export default function ShowCreator() {
  const { id } = useParams<{ id: string }>();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreator = async () => {
      if (!id || id === 'undefined') {
        setError('No ID provided');
        setLoading(false);
        return;
      }

      console.log('Fetching creator with ID:', id); // Log the ID to debug

      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error.message || error);
        setError(error.message || 'Unknown error occurred');
      } else {
        setCreator(data || null);
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (!creator) return <div className="text-center">Creator not found.</div>;

  return (
    <div className="bg-blue-500 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white text-black p-12 rounded-lg shadow-lg">
        <h1 className="text-4xl mb-6">{creator.name}</h1>
        {creator.imageURL && (
          <div className="w-full h-85 mb-6 relative">
            <img
              src={creator.imageURL}
              alt={`${creator.name}'s picture`}
              className="w-full h-full object-cover rounded-lg"
              style={{ aspectRatio: '1 / 1' }} // Ensures the image is square
            />
          </div>
        )}
        <p className="text-lg mb-6">{creator.description}</p>
        <a
          href={creator.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline text-lg"
        >
          Visit Socials
        </a>
      </div>
    </div>
  );
}
