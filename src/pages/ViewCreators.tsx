import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client'; // Adjust the import path as necessary
import CreatorCard from '../components/CreatorCard'; // Adjust the import path as necessary

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
      {creators.length === 0 ? (
        <div className="text-center">
          <p>No creators found.</p>
          <Link to="/add-creator" className="bg-green-500 text-white font-bold py-2 px-4 rounded">
            Add Creator
          </Link>
        </div>
      ) : (
        <div className="relative">
          <Link
            to="/add-creator"
            className="absolute top-4 right-4 bg-green-500 text-white font-bold py-2 px-4 rounded"
          >
            Add Creator
          </Link>
          <div className="flex flex-wrap gap-4 justify-center">
            {creators.map(creator => (
              <CreatorCard
                key={creator.id}
                id={creator.id}
                name={creator.name}
                description={creator.description}
                url={creator.url}
                imageURL={creator.imageURL}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



