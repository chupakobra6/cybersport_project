import api from './axios'

// Fetch all news items
export function fetchNews() {
  return api.get('news/')
}

// Create a new news item
export function createNews(data) {
  return api.post('news/', data)
} 