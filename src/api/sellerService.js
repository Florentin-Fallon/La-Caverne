import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const sellerService = {
  // ProfilVendeur vendeur
  createSellerProfile: (data) => api.post("/sellers/create", data),
  getMySellerProfile: () => api.get("/sellers/me"),
  updateSellerProfile: (data) => api.put("/sellers/me", data),
  getSellerById: (id) => api.get(`/sellers/${id}`),

  // Articles
  createArticle: (data) => api.post("/articles", data),
  updateArticle: (id, data) => api.put(`/articles/${id}`, data),
  deleteArticle: (id) => api.delete(`/articles/${id}`),
  uploadArticleImage: (id, imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    return api.post(`/articles/${id}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getArticle: (id) => api.get(`/articles/${id}`),

  // Images
  getArticleImage: (articleId, imageId) =>
    api.get(`/articles/${articleId}/images/${imageId}`),
  updateArticleImage: (articleId, imageId, data) =>
    api.put(`/articles/${articleId}/images/${imageId}`, data),

  // Likes
  toggleArticleLike: (id) => api.post(`/articles/${id}/like`),

  // Notations
  rateArticle: (id, data) => api.post(`/notations/articles/${id}`, data),
  getArticleRatings: (id) => api.get(`/notations/articles/${id}`),
  getArticleOverallRating: (id) => api.get(`/notations/articles/${id}/overall`),

  // Catégories
  getCategories: () => api.get("/categories"),
};
