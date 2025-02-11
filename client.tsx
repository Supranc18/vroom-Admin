import axios, { AxiosResponse,AxiosError } from 'axios';

class HttpClient {
  client;

  constructor(baseURL: string, defaultHeaders = {}) {
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
        const token = localStorage.getItem('Token');
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

  // Updated method to support generics
  async request<T>(method: string, url: string, data: object = {}, config = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      this._handleError(error as AxiosError);
      throw error;
    }
  }

  _handleError(error: AxiosError) {
    if (error.response) {
      const responseData = error.response.data as { message?: string }; // Specify expected type
      throw new Error(
        `Request failed: ${error.response.status} - ${responseData?.message || error.response.statusText}`
      );
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }

  async get<T>(url: string, config = {}): Promise<T> {
    return this.request<T>('GET', url, {}, config);
  }

  async post<T>(url: string, data: object, config = {}): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  async patch<T>(url: string, data: object, config = {}): Promise<T> {
    return this.request<T>('patch', url, data, config);
  }

  async delete<T>(url: string, config = {}): Promise<T> {
    return this.request<T>('DELETE', url, {}, config);
  }
}
// const apiClient = new HttpClient('http://45.115.217.220/api/v1')
const apiClient = new HttpClient('http://localhost:3000/api/v1');
export default apiClient;






