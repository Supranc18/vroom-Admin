import apiClient from '../client';

// Define types for the API response
interface LoginResponse {
  success: boolean;
  message: string;
  refreshToken?: string; // Optional token field if successful login
}


class AuthService {
  // Example of a POST request for sending OTP
  static async sendotp(phoneNumber: string) {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        phoneNumber: phoneNumber, // Include the request data (e.g., phone number)
      });
      return response; // Return the response data
    } catch (error) {
      console.error('Login failed:', (error as Error).message); // Handle errors
      throw error; // Rethrow or handle as needed
    }
  }

  // Example of a POST request for Login verification
  static async Login(phoneNumber: string, otp: string) {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login/verify', {
        phoneNumber: phoneNumber, // Include the phone number
        otp: otp, // Include the OTP
      });
      return response; // Return the response data
    } catch (error) {
      console.error('Login failed:', (error as Error).message); // Handle errors
      throw error; // Rethrow or handle as needed
    }
  }
  static async Signup(formData: {
    fullName: string;
    dateOfBirth: string;
    phoneNumber: string;
    gender: string;
  })  {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/signup', 
        formData
      );
      return response; // Return the response data
    } catch (error) {
      console.error('Login failed:', (error as Error).message); // Handle errors
      throw error; // Rethrow or handle as needed
    }
  }
}

export default AuthService;
