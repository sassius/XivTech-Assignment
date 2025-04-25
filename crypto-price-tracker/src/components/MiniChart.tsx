import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ChartOptions,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

interface MiniChartProps {
  prices: number[];
  isPositive: boolean;
  className?: string;
}

const MiniChart: React.FC<MiniChartProps> = ({ prices, isPositive, className = '' }) => {
  const chartColor = isPositive ? 'rgba(34, 197, 94, 1)' : 'rgba(239, 68, 68, 1)';
  const gradientColor = isPositive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)';
  
  const data = {
    labels: Array(prices.length).fill(''),
    datasets: [
      {
        data: prices,
        borderColor: chartColor,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        fill: true,
        backgroundColor: (context: any) => {
          if (!context.chart.chartArea) {
            return;
          }
          
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(
            0, 0, 0, context.chart.height
          );
          gradient.addColorStop(0, gradientColor);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          return gradient;
        },
      },
    ],
  };
  
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };
  
  return (
    <div className={`h-16 w-full ${className}`}>
      <Line data={data} options={options} />
    </div>
  );
};

export default MiniChart;