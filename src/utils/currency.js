// Currency formatting utilities for Indonesian Rupiah (IDR)

/**
 * Formats a number as Indonesian Rupiah currency
 * @param {number} amount - The amount to format
 * @param {object} options - Formatting options
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, options = {}) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Rp 0';
  }

  const defaultOptions = {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options
  };

  try {
    return new Intl.NumberFormat('id-ID', defaultOptions)?.format(amount);
  } catch (error) {
    // Fallback formatting if Intl fails
    const formatted = amount?.toLocaleString('id-ID');
    return `Rp ${formatted}`;
  }
};

/**
 * Formats a number as a compact Indonesian Rupiah currency (e.g., Rp 1.2M)
 * For large numbers, uses compact notation
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted compact currency string
 */
export const formatCompactCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Rp 0';
  }

  try {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      notation: 'compact',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    })?.format(amount);
  } catch (error) {
    // Fallback for browsers that don't support compact notation
    if (amount >= 1000000000) {
      return `Rp ${(amount / 1000000000)?.toFixed(1)}M`;
    } else if (amount >= 1000000) {
      return `Rp ${(amount / 1000000)?.toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `Rp ${(amount / 1000)?.toFixed(1)}K`;
    }
    return formatCurrency(amount);
  }
};

/**
 * Converts USD values to IDR (mock conversion for demonstration)
 * In production, you would use real exchange rates
 * @param {number} usdAmount - Amount in USD
 * @param {number} exchangeRate - USD to IDR exchange rate (default: 15000)
 * @returns {number} - Amount in IDR
 */
export const convertUSDToIDR = (usdAmount, exchangeRate = 15000) => {
  if (typeof usdAmount !== 'number' || isNaN(usdAmount)) {
    return 0;
  }
  return Math.round(usdAmount * exchangeRate);
};

/**
 * Parses a currency string and returns the numeric value
 * Handles both USD ($1,234) and IDR (Rp 1.234) formats
 * @param {string} currencyString - Currency string to parse
 * @returns {number} - Numeric value
 */
export const parseCurrency = (currencyString) => {
  if (typeof currencyString !== 'string') {
    return 0;
  }
  
  // Remove currency symbols and spaces, then parse
  const cleanString = currencyString?.replace(/[Rp$,.\s]/g, '');
  const parsed = parseInt(cleanString, 10);
  return isNaN(parsed) ? 0 : parsed;
};