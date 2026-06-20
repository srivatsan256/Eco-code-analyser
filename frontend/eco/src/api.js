// src/api.js
const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Helper to get auth headers cleanly
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  if (!token || token === 'undefined') {
    return { 'Content-Type': 'application/json' };
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

/**
 * Base fetch function that handles JSON parsing and error throwing
 */
async function fetchApi(endpoint, options = {}, includeAuth = true) {
  const url = `${API_BASE_URL}${endpoint}`;

  // Conditionally apply authentication headers to prevent CORS preflight crashes on open views
  const headers = {
    'Content-Type': 'application/json',
    ...(includeAuth ? getAuthHeaders() : {}),
    ...options.headers
  };

  const config = {
    ...options,
    headers,
    mode: 'cors'
  };

  const response = await fetch(url, config);

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = (data && data.error) || response.statusText;
    throw new Error(error);
  }

  return data;
}

export const api = {
  // Auth Endpoints (No initial auth token validation headers required)
  register: (data) => fetchApi('/auth/register/', { method: 'POST', body: JSON.stringify(data) }, false),
  login: (data) => fetchApi('/auth/login/', { method: 'POST', body: JSON.stringify(data) }, false),

  // Analysis Endpoints (includeAuth explicitly set to false to respect Django's @authentication_classes([]))
  analyze: (data) => fetchApi('/analysis/analyze/', { method: 'POST', body: JSON.stringify(data) }, false),

  // Authenticated Dashboard & Data Views
  getDashboard: () => fetchApi('/dashboard/', { method: 'GET' }, true),
  getHistory: () => fetchApi('/history/', { method: 'GET' }, true),
  getReport: (id) => fetchApi(`/report/${id}/`, { method: 'GET' }, true),
  deleteReport: (id) => fetchApi(`/report/${id}/`, { method: 'DELETE' }, true),
};