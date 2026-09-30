// Dynamic API base URL configuration for local dev and live deployment
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:5005';
  }
  // Default to relative /api or custom backend URL if set
  return 'http://localhost:5005';
};

export const API_BASE_URL = getApiBaseUrl();
