import axios, { InternalAxiosRequestConfig } from 'axios';
import { apiConfig } from './theme';

// Base URL for all API requests
const API_URL = apiConfig.baseUrl;

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Model interfaces
export interface Category {
  id: number;
  name: string;
}

export interface Destination {
  id: number;
  title: string;
  image: string;
  categories: Category[];
  short_description: string;
  long_description: string;
  location_name?: string;
  maps_link?: string;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: number;
  title: string;
  image: string;
  short_description: string;
  long_description: string;
  tips: string;
  duration?: string;
  created_at: string;
  updated_at: string;
}

export interface Culture {
  id: number;
  title: string;
  image: string;
  short_description: string;
  long_description: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  title: string;
  image: string;
  description: string;
  date: string;
  month: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
}

export interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export interface Newsletter {
  id: number;
  subject: string;
  content: string;
  created_at: string;
  sent_at?: string;
  sent: boolean;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  inquiry_type: string;
  subject: string;
  message: string;
  reference_id?: number;
  created_at: string;
  is_read: boolean;
}

export interface OTP {
  email: string;
  otp: string;
}

export interface Reservation {
  id: number;
  user: number;
  item_type: string;
  item_id: number;
  reservation_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// API methods
export const exploreApi = {
  // Categories
  getCategories: () => api.get<Category[]>('/explore/categories/'),
  getCategory: (id: number) => api.get<Category>(`/explore/categories/${id}/`),
  createCategory: (data: Partial<Category>) => api.post<Category>('/explore/categories/', data),
  updateCategory: (id: number, data: Partial<Category>) => api.put<Category>(`/explore/categories/${id}/`, data),
  deleteCategory: (id: number) => api.delete(`/explore/categories/${id}/`),
  
  // Destinations
  getDestinations: () => api.get<Destination[]>('/explore/destinations/'),
  getDestination: (id: number) => api.get<Destination>(`/explore/destinations/${id}/`),
  createDestination: (data: Partial<Destination>) => api.post<Destination>('/explore/destinations/', data),
  updateDestination: (id: number, data: Partial<Destination>) => api.put<Destination>(`/explore/destinations/${id}/`, data),
  deleteDestination: (id: number) => api.delete(`/explore/destinations/${id}/`),
  
  // Activities
  getActivities: () => api.get<Activity[]>('/explore/activities/'),
  getActivity: (id: number) => api.get<Activity>(`/explore/activities/${id}/`),
  createActivity: (data: Partial<Activity>) => api.post<Activity>('/explore/activities/', data),
  updateActivity: (id: number, data: Partial<Activity>) => api.put<Activity>(`/explore/activities/${id}/`, data),
  deleteActivity: (id: number) => api.delete(`/explore/activities/${id}/`),
  
  // Cultures
  getCultures: () => api.get<Culture[]>('/explore/cultures/'),
  getCulture: (id: number) => api.get<Culture>(`/explore/cultures/${id}/`),
  createCulture: (data: Partial<Culture>) => api.post<Culture>('/explore/cultures/', data),
  updateCulture: (id: number, data: Partial<Culture>) => api.put<Culture>(`/explore/cultures/${id}/`, data),
  deleteCulture: (id: number) => api.delete(`/explore/cultures/${id}/`),
  
  // Favorites
  getFavorites: () => api.get('/explore/favorites/'),
  toggleFavorite: (data: { item_type: string; item_id: number }) => 
    api.post('/explore/favorites/toggle/', data),
};

export const eventsApi = {
  getEvents: () => api.get<Event[]>('/events/'),
  getEvent: (id: number) => api.get<Event>(`/events/${id}/`),
  getEventsByMonth: (month: string) => api.get<Event[]>(`/events/?month=${month}`),
  createEvent: (data: Partial<Event>) => api.post<Event>('/events/', data),
  updateEvent: (id: number, data: Partial<Event>) => api.put<Event>(`/events/${id}/`, data),
  deleteEvent: (id: number) => api.delete(`/events/${id}/`),
};

export const usersApi = {
  // Users
  getUsers: () => api.get<User[]>('/auth/users/'),
  getUser: (id: number) => api.get<User>(`/auth/users/${id}/`),
  createUser: (data: Partial<User>) => api.post<User>('/auth/users/', data),
  updateUser: (id: number, data: Partial<User>) => api.put<User>(`/auth/users/${id}/`, data),
  deleteUser: (id: number) => api.delete(`/auth/users/${id}/`),
  
  // Auth
  register: (userData: { username: string; email: string; password: string; password_confirm: string; first_name?: string; last_name?: string }) =>
    api.post('/auth/register/', userData),
  login: (credentials: { username: string; password: string }) =>
    api.post('/auth/token/', credentials),
  refreshToken: (refresh: string) =>
    api.post('/auth/token/refresh/', { refresh }),
  
  // Subscribers
  getSubscribers: () => api.get<Subscriber[]>('/auth/subscribers/'),
  getSubscriber: (id: number) => api.get<Subscriber>(`/auth/subscribers/${id}/`),
  subscribe: (email: string) => api.post<Subscriber>('/auth/subscribers/', { email }),
  resubscribe: (email: string) => api.post<Subscriber>('/auth/subscribers/resubscribe/', { email }),
  updateSubscriber: (id: number, data: Partial<Subscriber>) => api.put<Subscriber>(`/auth/subscribers/${id}/`, data),
  unsubscribe: (id: number) => api.delete(`/auth/subscribers/${id}/`),
  unsubscribeByEmail: (email: string) => api.post('/auth/subscribers/unsubscribe/', { email }),
  
  // Newsletters
  getNewsletters: () => api.get<Newsletter[]>('/auth/newsletters/'),
  getNewsletter: (id: number) => api.get<Newsletter>(`/auth/newsletters/${id}/`),
  createNewsletter: (data: Partial<Newsletter>) => api.post<Newsletter>('/auth/newsletters/', data),
  updateNewsletter: (id: number, data: Partial<Newsletter>) => api.put<Newsletter>(`/auth/newsletters/${id}/`, data),
  deleteNewsletter: (id: number) => api.delete(`/auth/newsletters/${id}/`),
  sendNewsletter: (id: number) => api.post(`/auth/newsletters/${id}/send/`, {}),
  
  // Contacts
  getContacts: () => api.get<Contact[]>('/auth/contacts/'),
  getContact: (id: number) => api.get<Contact>(`/auth/contacts/${id}/`),
  sendContact: (data: Partial<Contact>) => api.post<Contact>('/auth/contacts/', data),
  updateContact: (id: number, data: Partial<Contact>) => api.put<Contact>(`/auth/contacts/${id}/`, data),
  deleteContact: (id: number) => api.delete(`/auth/contacts/${id}/`),
};

// Auth API - adding this to fix the missing export errors
export const authApi = {
  // Auth
  register: usersApi.register,
  login: usersApi.login,
  refreshToken: usersApi.refreshToken,
  // Profile
  updateProfile: (data: Partial<User>) => api.patch('/auth/profile/', data),
  // Subscribers
  subscribe: usersApi.subscribe,
  resubscribe: usersApi.resubscribe,
  unsubscribe: usersApi.unsubscribe,
  unsubscribeByEmail: usersApi.unsubscribeByEmail,
  getSubscribers: usersApi.getSubscribers,
  // Newsletters
  getNewsletters: usersApi.getNewsletters,
  getNewsletter: usersApi.getNewsletter,
  createNewsletter: usersApi.createNewsletter,
  updateNewsletter: usersApi.updateNewsletter,
  deleteNewsletter: usersApi.deleteNewsletter,
  sendNewsletter: usersApi.sendNewsletter,
  // Contacts
  sendContact: usersApi.sendContact,
};

// Reservation API
export const reservationApi = {
  getUserReservations: (userId: number) => api.get<Reservation[]>(`/auth/users/reservations/?user=${userId}`),
  getReservation: (id: number) => api.get<Reservation>(`/auth/users/reservations/${id}/`),
  createReservation: (data: Partial<Reservation>) => api.post<Reservation>('/auth/users/reservations/', data),
  updateReservation: (id: number, data: Partial<Reservation>) => api.put<Reservation>(`/auth/users/reservations/${id}/`, data),
  deleteReservation: (id: number) => api.delete(`/auth/users/reservations/${id}/`),
};

// Navigation utility
export const navigationUtils = {
  redirectToHome: () => window.location.href = '/',
  redirectToDestination: (id: number) => window.location.href = `/details/destination/${id}`,
  redirectToActivity: (id: number) => window.location.href = `/details/activity/${id}`,
  redirectToCulture: (id: number) => window.location.href = `/details/culture/${id}`,
  redirectToEvent: (id: number) => window.location.href = `/details/event/${id}`,
  redirectToProfile: () => window.location.href = '/profile',
  redirectToDestinations: () => window.location.href = '/destinations',
  redirectToActivities: () => window.location.href = '/activities',
  redirectToCultures: () => window.location.href = '/cultures',
  redirectToEvents: () => window.location.href = '/events',
};

export default {
  explore: exploreApi,
  events: eventsApi,
  users: usersApi,
  auth: authApi,
  reservation: reservationApi,
  navigation: navigationUtils,
};
