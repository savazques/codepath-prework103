import React from 'react';
import { Link } from 'react-router-dom';

interface CreatorCardProps {
  id: string;
  name: string;
  description: string;
  url: string;
  imageURL?: string;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ id, name, description, url, imageURL }) => {
  return (
    <Link to={`/show-creator/${id}`} className="block bg-white text-black p-4 rounded shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      {imageURL && (
        <img
          src={imageURL}
          alt={`${name}'s picture`}
          className="w-full h-32 object-cover mb-2 rounded"
        />
      )}
      <p className="text-sm">{description}</p>
    </Link>
  );
};

export default CreatorCard;
