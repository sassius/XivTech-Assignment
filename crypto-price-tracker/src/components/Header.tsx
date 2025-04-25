import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { selectLastUpdated } from '../features/crypto/cryptoSlice';
import { Coins, Github } from 'lucide-react';

const Header: React.FC = () => {
  const lastUpdated = useAppSelector(selectLastUpdated);
  
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Coins size={32} className="text-blue-500" />
          <h1 className="text-2xl md:text-3xl font-bold">CryptoTracker</h1>
        </div>
        
        <div className="flex items-center mt-2 md:mt-0">
          <a 
            href="https://github.com/sassius/XivTech-Assignment" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <Github size={16} />
            <span>Source Code</span>
          </a>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <p className="text-gray-400">
          Track real-time cryptocurrency prices, market cap, and more
        </p>
        
        {lastUpdated && (
          <p className="text-gray-500 text-sm mt-1 md:mt-0">
            Last updated: {new Date(lastUpdated).toLocaleTimeString()}
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;