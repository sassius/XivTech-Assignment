import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  last_updated: string;
  sparkline_in_7d: {
    price: number[];
  };
}

export const fetchTopCoins = async (limit = 20): Promise<Coin[]> => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
        sparkline: true,
        price_change_percentage: '1h,24h,7d',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top coins:', error);
    throw error;
  }
};

export const fetchCoinHistory = async (coinId: string, days = 7): Promise<{ prices: [number, number][] }> => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching history for ${coinId}:`, error);
    throw error;
  }
};