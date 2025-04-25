import React, { useState, useEffect } from 'react';
import { Coin } from '../services/api';
import PriceChange from './PriceChange';
import MiniChart from './MiniChart';
import { formatCurrency, formatNumber, getPriceDecimals } from '../utils/formatters';

interface CryptoRowProps {
  coin: Coin;
  isUpdated: boolean;
}

const CryptoRow: React.FC<CryptoRowProps> = ({ coin, isUpdated }) => {
  const [highlight, setHighlight] = useState(false);
  
  useEffect(() => {
    if (isUpdated) {
      setHighlight(true);
      const timer = setTimeout(() => {
        setHighlight(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [coin.current_price, isUpdated]);
  
  const priceDecimals = getPriceDecimals(coin.current_price);
  const priceChangeIsPositive = coin.price_change_percentage_7d_in_currency >= 0;
  
  return (
    <tr className={`border-b border-gray-800 transition-colors duration-300 hover:bg-gray-800/30 ${highlight ? 'bg-gray-800/50' : ''}`}>
      <td className="py-4 pl-6 whitespace-nowrap">
        <span className="text-gray-400">{coin.market_cap_rank}</span>
      </td>
      
      <td className="py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <img src={coin.image} alt={coin.name} className="w-8 h-8" />
          <div>
            <div className="font-medium">{coin.name}</div>
            <div className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</div>
          </div>
        </div>
      </td>
      
      <td className={`py-4 whitespace-nowrap font-medium text-right ${highlight ? (priceChangeIsPositive ? 'text-green-300' : 'text-red-300') : ''}`}>
        {formatCurrency(coin.current_price, priceDecimals)}
      </td>
      
      <td className="py-4 whitespace-nowrap">
        <PriceChange 
          value={coin.price_change_percentage_1h_in_currency} 
          isUpdated={isUpdated} 
        />
      </td>
      
      <td className="py-4 whitespace-nowrap">
        <PriceChange 
          value={coin.price_change_percentage_24h_in_currency} 
          isUpdated={isUpdated} 
        />
      </td>
      
      <td className="py-4 whitespace-nowrap">
        <PriceChange 
          value={coin.price_change_percentage_7d_in_currency} 
          isUpdated={isUpdated} 
        />
      </td>
      
      <td className="py-4 whitespace-nowrap text-right">
        {formatCurrency(coin.market_cap, 0)}
      </td>
      
      <td className="py-4 whitespace-nowrap text-right">
        {formatCurrency(coin.total_volume, 0)}
      </td>
      
      <td className="py-4 whitespace-nowrap text-right">
        {formatNumber(coin.circulating_supply, 0)}
        {coin.symbol.toUpperCase()}
      </td>
      
      <td className="py-4 whitespace-nowrap text-right">
        {coin.max_supply 
          ? `${formatNumber(coin.max_supply, 0)} ${coin.symbol.toUpperCase()}`
          : '∞'}
      </td>
      
      <td className="py-4 pr-6">
        <MiniChart 
          prices={coin.sparkline_in_7d.price} 
          isPositive={priceChangeIsPositive} 
        />
      </td>
    </tr>
  );
};

export default CryptoRow;