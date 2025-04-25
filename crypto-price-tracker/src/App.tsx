import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CryptoTable from './components/CryptoTable';
import CryptoList from './components/CryptoList';
import { Search, RefreshCw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchCryptoData, selectCryptoStatus } from './features/crypto/cryptoSlice';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectCryptoStatus);
  const isLoading = status === 'loading';
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleRefresh = () => {
    dispatch(fetchCryptoData());
  };
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              className="bg-gray-900 border border-gray-800 text-white text-sm rounded-lg block w-full pl-10 pr-4 py-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search cryptocurrencies..."
            />
          </div> */}
          
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors disabled:opacity-70"
          >
            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
        
        {isMobile ? <CryptoList /> : <CryptoTable />}
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Data provided by CoinGecko API</p>
          <p className="mt-1">© 2025 CryptoTracker | All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
}

export default App;