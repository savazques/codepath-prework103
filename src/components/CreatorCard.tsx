import React from 'react';

interface CreatorCardProps {
  name: string;
  description: string;
  url: string;
  imageURL?: string;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ name, description, url, imageURL }) => {
  return (
    <div className="bg-white text-black p-4 rounded shadow-md w-80">
      {imageURL && (
        <img
          src={imageURL}
          alt={name}
          className="w-full h-40 object-cover rounded-t"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="mb-2">{description}</p>
        <a href={url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </div>
    </div>
  );
};

export default CreatorCard;
