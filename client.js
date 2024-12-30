// HttpClient.js
import axios from 'axios';

class HttpClient {
  constructor(baseURL, defaultHeaders = {}) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
      },
    });

    this._addInterceptors();
  }

  _addInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized! Redirecting to login...');
        }
        return Promise.reject(error);
      }
    );
  }

  async request(method, url, data = {}, config = {}) {
    try {
      const response = await this.client({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  _handleError(error) {
    if (error.response) {
      throw new Error(`Request failed: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }

  async get(url, config = {}) {
    return this.request('GET', url, {}, config);
  }

  async post(url, data, config = {}) {
    return this.request('POST', url, data, config);
  }

  async put(url, data, config = {}) {
    return this.request('PUT', url, data, config);
  }

  async delete(url, config = {}) {
    return this.request('DELETE', url, {}, config);
  }
}


const apiClient = new HttpClient('https://api.example.com/v1');
export default apiClient;


