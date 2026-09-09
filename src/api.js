// API Configuration for Tanabana Fabrics Node.js Backend Server
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API requests
async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('tanabana_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Auth
  register: (userData) => fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) => fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getProfile: () => fetchAPI('/auth/me'),

  // Products
  getProducts: (params = '') => fetchAPI(`/products?${params}`),
  getProductBySlug: (slug) => fetchAPI(`/products/${slug}`),

  // Categories & Collections
  getCategories: () => fetchAPI('/categories'),
  getCollections: () => fetchAPI('/collections'),

  // Checkout & Orders
  createOrder: (orderData) => fetchAPI('/orders/checkout', { method: 'POST', body: JSON.stringify(orderData) }),
  getMyOrders: () => fetchAPI('/orders/my-orders'),
  validateCoupon: (code, subtotal) => fetchAPI('/coupons/validate', { method: 'POST', body: JSON.stringify({ code, subtotal }) }),

  // Reviews
  getProductReviews: (productId) => fetchAPI(`/reviews/product/${productId}`),
  submitReview: (reviewData) => fetchAPI('/reviews', { method: 'POST', body: JSON.stringify(reviewData) }),

  // Admin Dashboard
  getAdminDashboard: () => fetchAPI('/admin/dashboard'),
  getAdminOrders: () => fetchAPI('/orders/admin/all'),
  updateOrderStatus: (id, statusData) => fetchAPI(`/orders/admin/${id}/status`, { method: 'PUT', body: JSON.stringify(statusData) }),
};

export default api;
