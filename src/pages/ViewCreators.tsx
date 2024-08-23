import React, { useEffect, useState } from 'react';
import { supabase } from '../client'; // Adjust the import path as necessary
import CreatorCard from '../components/CreatorCard'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';

interface Creator {
  id: string;
  name: string;
  description: string;
  url: string;
  imageURL?: string;
}

export default function ViewCreators() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*');

      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data || []);
      }
      setLoading(false);
    };

    fetchCreators();
  }, []);

  return (
    <div className="bg-blue-500 text-white min-h-screen p-4">
      <h1 className="text-3xl mb-8 text-center">View Creators</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {creators.map(creator => (
            <div key={creator.id} className="relative">
              <CreatorCard
                name={creator.name}
                description={creator.description}
                url={creator.url}
                imageURL={creator.imageURL}
              />
              <Link
                to={`/edit-creator/${creator.id}`}
                className="absolute top-2 right-2 bg-blue-500 text-white font-bold py-1 px-2 rounded"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
