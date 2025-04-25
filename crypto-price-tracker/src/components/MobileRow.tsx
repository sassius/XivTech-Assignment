import React from 'react';
import { Coin } from '../services/api';
import PriceChange from './PriceChange';
import MiniChart from './MiniChart';
import { formatCurrency, formatNumber, getPriceDecimals } from '../utils/formatters';

interface MobileRowProps {
  coin: Coin;
  isUpdated: boolean;
}

const MobileRow: React.FC<MobileRowProps> = ({ coin, isUpdated }) => {
  const priceDecimals = getPriceDecimals(coin.current_price);
  const priceChangeIsPositive = coin.price_change_percentage_7d_in_currency >= 0;

  return (
    <div className="bg-gray-900 p-4 rounded-lg mb-4 border border-gray-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">#{coin.market_cap_rank}</span>
          <div className="flex items-center gap-2">
            <img src={coin.image} alt={coin.name} className="w-6 h-6" />
            <span className="font-medium">{coin.name}</span>
            <span className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</span>
          </div>
        </div>
        <div className="font-semibold">
          {formatCurrency(coin.current_price, priceDecimals)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">1h %</span>
            <PriceChange value={coin.price_change_percentage_1h_in_currency} isUpdated={isUpdated} />
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">24h %</span>
            <PriceChange value={coin.price_change_percentage_24h_in_currency} isUpdated={isUpdated} />
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">7d %</span>
            <PriceChange value={coin.price_change_percentage_7d_in_currency} isUpdated={isUpdated} />
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Market Cap</span>
            <span className="text-sm">{formatCurrency(coin.market_cap, 0)}</span>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <MiniChart prices={coin.sparkline_in_7d.price} isPositive={priceChangeIsPositive} />
      </div>
    </div>
  );
};

export default MobileRow;