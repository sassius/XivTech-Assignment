// Format large numbers with commas and appropriate precision
export const formatNumber = (num: number, maximumFractionDigits = 2): string => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
  }).format(num);
};

// Format currency with dollar sign
export const formatCurrency = (num: number, maximumFractionDigits = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
  }).format(num);
};

// Format percentage values with appropriate sign
export const formatPercentage = (num: number): string => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'exceptZero',
  }).format(num / 100);
  
  return formatted;
};

// Format a timestamp into a human-readable date/time
export const formatDateTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

// Determine the appropriate decimal places for price display
export const getPriceDecimals = (price: number): number => {
  if (price < 0.01) return 6;
  if (price < 1) return 4;
  if (price < 10) return 3;
  return 2;
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};