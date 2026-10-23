// Dynamic API base URL configuration for local dev, LAN testing, and live deployment
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    const { hostname, protocol } = window.location;
    // Local dev: connect directly to backend on port 5005
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//127.0.0.1:5005`;
    }
    // Local network (LAN): e.g. phone or another computer accessing http://192.168.x.x:5173
    if (/^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(hostname)) {
      return `${protocol}//${hostname}:5005`;
    }
    // Production/Vercel fallback: relative /api or custom proxy
    return '';
  }
  return 'http://127.0.0.1:5005';
};

export const API_BASE_URL = getApiBaseUrl();
