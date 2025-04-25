import React, { useEffect, useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, MinusCircle } from 'lucide-react';
import { formatPercentage } from '../utils/formatters';

interface PriceChangeProps {
  value: number;
  isUpdated?: boolean;
}

const PriceChange: React.FC<PriceChangeProps> = ({ value, isUpdated = false }) => {
  const [highlight, setHighlight] = useState(false);
  
  useEffect(() => {
    if (isUpdated) {
      setHighlight(true);
      const timer = setTimeout(() => {
        setHighlight(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [value, isUpdated]);
  
  const baseClasses = "flex items-center gap-1 font-medium transition-colors duration-500";
  
  if (value > 0) {
    const colorClass = highlight 
      ? "text-green-300 bg-green-900/30" 
      : "text-green-500";
    return (
      <span className={`${baseClasses} ${colorClass} rounded px-1`}>
        <ArrowUpCircle size={16} />
        {formatPercentage(value)}
      </span>
    );
  } else if (value < 0) {
    const colorClass = highlight 
      ? "text-red-300 bg-red-900/30" 
      : "text-red-500";
    return (
      <span className={`${baseClasses} ${colorClass} rounded px-1`}>
        <ArrowDownCircle size={16} />
        {formatPercentage(value)}
      </span>
    );
  }
  
  return (
    <span className="flex items-center gap-1 text-gray-400 font-medium">
      <MinusCircle size={16} />
      0.00%
    </span>
  );
};

export default PriceChange;