# CryptoTracker - Real-Time Cryptocurrency Price Tracker

![CryptoTracker Demo]
https://xiv-tech-assignment-git-main-samarjeets-projects.vercel.app/

CryptoTracker is a real-time cryptocurrency price tracking application built with React and Redux Toolkit. It provides live updates of cryptocurrency prices, market caps, and trends with a beautiful, responsive interface.

## 🚀 Features

- Real-time price updates from CoinGecko API
- Responsive design (desktop table & mobile cards)
- Interactive price charts
- Visual price change indicators
- Automatic data refresh every 30 seconds
- Search functionality
- Dark mode UI

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: CoinGecko

## 🏗️ Architecture

The application follows a modern React architecture with the following structure:

```
src/
├── components/         # React components
├── features/          # Redux slices and features
├── hooks/             # Custom hooks
├── services/          # API services
├── store/            # Redux store configuration
└── utils/            # Utility functions
```

### Key Components

- **CryptoTable**: Desktop view with detailed cryptocurrency information
- **CryptoList**: Mobile-optimized card view
- **MiniChart**: 7-day price trend visualization
- **PriceChange**: Price change indicator with animations

### State Management

- Redux Toolkit for centralized state management
- Optimized selectors to prevent unnecessary re-renders
- Automatic data refresh with WebSocket-like updates

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-tracker.git
   cd crypto-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🌐 API Integration

The application uses the CoinGecko API to fetch cryptocurrency data:
- Top cryptocurrencies by market cap
- Price changes (1h, 24h, 7d)
- Market statistics
- Historical price data for charts

## 📱 Responsive Design

- **Desktop**: Full-featured table with all cryptocurrency information
- **Mobile**: Card-based layout with essential information
- **Breakpoints**: Optimized for all screen sizes
- **Animations**: Smooth transitions and loading states

## 🎨 UI/UX Features

- Dark mode optimized for financial data
- Interactive hover states
- Price change animations
- Loading indicators
- Error handling with retry options
- Custom scrollbars
- Responsive typography

## 🔄 Real-Time Updates

- Automatic data refresh every 30 seconds
- Visual indicators for price changes
- Optimized to prevent unnecessary re-renders
- Smooth animations for value changes

## 📈 Performance

- Lazy loading of components
- Optimized Redux selectors
- Debounced search input
- Efficient re-render management
- Responsive image loading

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Data provided by [CoinGecko API](https://www.coingecko.com/en/api)
- Icons by [Lucide](https://lucide.dev)
- Built with [Vite](https://vitejs.dev)