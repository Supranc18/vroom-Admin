import apiClient from '../client';

// Define types for the API response
interface Driver {
  _id: string;
  fullName: string;
  wheelCount: number;
  status: string;
  timeAgo: string;
  createdAt: string;
}

// Update the interface to match the response structure
interface DriverResponse {
  success: boolean;
  message: string;
  data: Driver[]
}

class DriverService {
  static async drivers(page: number, state: { status: string }, limit = 10) {
    try {
      const response = await apiClient.get<DriverResponse>(`/profile/drivers?page=${page}&limit=${limit}&sort=desc&status=${state.status}`);  
      return response.data; // Return the actual data to avoid unnecessary nesting
    } catch (error) {
      console.error('Error fetching drivers:', (error as Error).message);
      throw error;
    }
  }

  static async driversById(prams: { slug: string }) {
    try {
      const response = await apiClient.get<DriverResponse>(`/profile/drivers/${prams.slug}`);
      return response.data; // Return the actual data to avoid unnecessary nesting


    } catch (error) {
      console.error('Error fetching drivers:', (error as Error).message);
      throw error;
    }
  }

  static async reject(prams: { slug: string }, rejectData: { message: string, fields: { vehicleImages: object, bluebookImages: object, licenseImage: string, avatar: string } }) {
    try {
      const response = await apiClient.patch<DriverResponse>(
        `/profile/driver/verify/reject/${prams.slug}`,
        {
          message: rejectData.message,
          fields: {
            vehicleImages: rejectData.fields.vehicleImages,
            bluebookImages: rejectData.fields.bluebookImages,
            licenseImage: rejectData.fields.licenseImage,
            avatar: rejectData.fields.avatar,
          },
        }
      );

      return response.data;  // Return the actual data to avoid unnecessary nesting
    } catch (error) {
      console.error('Error updating rejection status:', (error as Error).message);
      throw error;
    }
  }


  static async edit(slug: string, updatedDriverDetail: object) {
    try {
      const response = await apiClient.patch<DriverResponse>(
        `/profile/drivers/${slug}`,
        updatedDriverDetail
      );
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error( error);
      throw error; // Rethrow the error for handling in the component if needed
    }
  }

  static async state(slug: string, status: string) {
    try {
      const response = await apiClient.patch<DriverResponse>(
        `/profile/drivers/${slug}`, {
        status
      }
      )
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Error updating driver details:', error);
      throw error; // Rethrow the error for handling in the component if needed
    }
  }


  static async deleteDriver(slug: string) {
    try {
      const response = await apiClient.delete<DriverResponse>(
        `/profile/drivers/${slug}`
      )
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Error updating driver details:', error);
      throw error; // Rethrow the error for handling in the component if needed
    }
  }

}



export default DriverService;
