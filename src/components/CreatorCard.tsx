import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faLink } from '@fortawesome/free-solid-svg-icons';

interface CreatorCardProps {
  id: string;
  name: string;
  description: string;
  url: string;
  imageURL?: string;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ id, name, description, url, imageURL }) => {
  return (
    <div className="bg-white text-black p-4 rounded shadow-md w-80">
      {imageURL && (
        <img
          src={imageURL}
          alt={`${name}'s picture`}
          className="w-full h-48 object-cover mb-4 rounded"
        />
      )}
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex justify-between items-center mb-4">
        <Link
          to={`/edit-creator/${id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Edit
        </Link>
        <Link
          to={`/show-creator/${id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FontAwesomeIcon icon={faEye} className="mr-2" />
          View Details
        </Link>
      </div>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FontAwesomeIcon icon={faLink} className="mr-2" />
          Visit Socials
        </a>
      )}
    </div>
  );
};

export default CreatorCard;

