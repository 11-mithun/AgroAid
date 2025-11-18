import React from 'react';
import { LeafIcon } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md border-b border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <LeafIcon />
        <h1 className="text-xl font-bold ml-2 text-white">AgroAid Inspector</h1>
      </div>
    </header>
  );
};