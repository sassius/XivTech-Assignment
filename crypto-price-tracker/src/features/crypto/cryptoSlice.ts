import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchTopCoins, Coin } from '../../services/api';
import { RootState } from '../../store/store';

interface CryptoState {
  coins: Coin[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  lastUpdated: number | null;
  updatedCoins: string[];
}

const initialState: CryptoState = {
  coins: [],
  status: 'idle',
  error: null,
  lastUpdated: null,
  updatedCoins: [],
};

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async () => {
    return await fetchTopCoins();
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    markCoinsAsUpdated(state, action: PayloadAction<string[]>) {
      state.updatedCoins = action.payload;
    },
    clearUpdatedCoins(state) {
      state.updatedCoins = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        // Identify which coins have price changes
        const updatedCoinIds: string[] = [];
        
        if (state.coins.length > 0) {
          action.payload.forEach((newCoin) => {
            const existingCoin = state.coins.find(coin => coin.id === newCoin.id);
            if (existingCoin && existingCoin.current_price !== newCoin.current_price) {
              updatedCoinIds.push(newCoin.id);
            }
          });
        }
        
        state.coins = action.payload;
        state.lastUpdated = Date.now();
        state.updatedCoins = updatedCoinIds;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

// Selectors
export const selectAllCoins = (state: RootState) => state.crypto.coins;
export const selectCryptoStatus = (state: RootState) => state.crypto.status;
export const selectCryptoError = (state: RootState) => state.crypto.error;
export const selectLastUpdated = (state: RootState) => state.crypto.lastUpdated;
export const selectUpdatedCoins = (state: RootState) => state.crypto.updatedCoins;

export const { markCoinsAsUpdated, clearUpdatedCoins } = cryptoSlice.actions;

export default cryptoSlice.reducer;