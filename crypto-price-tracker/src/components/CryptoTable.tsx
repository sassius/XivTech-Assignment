import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { 
  fetchCryptoData, 
  selectAllCoins, 
  selectCryptoStatus, 
  selectCryptoError,
  selectUpdatedCoins,
  clearUpdatedCoins,
} from '../features/crypto/cryptoSlice';
import CryptoRow from './CryptoRow';
import LoadingSpinner from './LoadingSpinner';
import { ArrowUpDown } from 'lucide-react';

const CryptoTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(selectAllCoins);
  const status = useAppSelector(selectCryptoStatus);
  const error = useAppSelector(selectCryptoError);
  const updatedCoins = useAppSelector(selectUpdatedCoins);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCryptoData());
    }
    
    const intervalId = setInterval(() => {
      dispatch(fetchCryptoData());
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [dispatch, status]);
  
  // Clear the updated coins highlight after a delay
  useEffect(() => {
    if (updatedCoins.length > 0) {
      const timer = setTimeout(() => {
        dispatch(clearUpdatedCoins());
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [updatedCoins, dispatch]);
  
  // Show loading state
  if (status === 'loading' && coins.length === 0) {
    return <LoadingSpinner />;
  }
  
  // Show error state
  if (status === 'failed') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading cryptocurrency data</p>
          <p className="text-gray-400">{error}</p>
          <button 
            onClick={() => dispatch(fetchCryptoData())}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  const headerClasses = "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider";
  const headerClassesRight = `${headerClasses} text-right`;
  
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-900">
          <tr>
            <th scope="col" className={headerClasses}>#</th>
            <th scope="col" className={headerClasses}>Name</th>
            <th scope="col" className={headerClassesRight}>Price</th>
            <th scope="col" className={headerClasses}>
              <div className="flex items-center gap-1">
                1h % <ArrowUpDown size={12} />
              </div>
            </th>
            <th scope="col" className={headerClasses}>
              <div className="flex items-center gap-1">
                24h % <ArrowUpDown size={12} />
              </div>
            </th>
            <th scope="col" className={headerClasses}>
              <div className="flex items-center gap-1">
                7d % <ArrowUpDown size={12} />
              </div>
            </th>
            <th scope="col" className={headerClassesRight}>Market Cap</th>
            <th scope="col" className={headerClassesRight}>Volume (24h)</th>
            <th scope="col" className={headerClassesRight}>Circulating Supply</th>
            <th scope="col" className={headerClassesRight}>Max Supply</th>
            <th scope="col" className={`${headerClasses} text-center`}>Last 7d</th>
          </tr>
        </thead>
        <tbody className="bg-gray-950 divide-y divide-gray-800">
          {coins.map(coin => (
            <CryptoRow 
              key={coin.id} 
              coin={coin} 
              isUpdated={updatedCoins.includes(coin.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;