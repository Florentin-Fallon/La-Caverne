import axios from 'axios';
import { API_BASE_URL } from './config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export const sellerService = {
  // Profil vendeur
  createSellerProfile: (data) => api.post('/sellers/create', data),
  getMySellerProfile: () => api.get('/sellers/me'),
  updateSellerProfile: (data) => api.put('/sellers/me', data),
  getSellerById: (id) => api.get(`/sellers/${id}`),

  // Articles
  createArticle: (data) => api.post('/articles', data),
  updateArticle: (id, data) => api.put(`/articles/${id}`, data),
  deleteArticle: (id) => api.delete(`/articles/${id}`),
  uploadArticleImage: (id, imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return api.post(`/articles/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getArticle: (id) => api.get(`/articles/${id}`),

  // Notations
  rateArticle: (id, data) => api.post(`/notations/articles/${id}`, data),
  getArticleRatings: (id) => api.get(`/notations/articles/${id}`),
  getArticleOverallRating: (id) => api.get(`/notations/articles/${id}/overall`)
};