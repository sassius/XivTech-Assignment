import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { selectAllCoins, selectUpdatedCoins } from '../features/crypto/cryptoSlice';
import MobileRow from './MobileRow';

const CryptoList: React.FC = () => {
  const coins = useAppSelector(selectAllCoins);
  const updatedCoins = useAppSelector(selectUpdatedCoins);
  
  return (
    <div className="space-y-4">
      {coins.map(coin => (
        <MobileRow 
          key={coin.id} 
          coin={coin} 
          isUpdated={updatedCoins.includes(coin.id)}
        />
      ))}
    </div>
  );
};

export default CryptoList;