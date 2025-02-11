import apiClient from '../client';

// Define types for the API response

interface User {
    _id: string;
    fullName: string;
    dateOfBirth: string; // Assuming dateOfBirth is a string (ISO date)
    phoneNumber: string;
    gender: string;
    role: string;
    createdAt: string; // ISO date string
  }
  
// Update the interface to match the response structure
interface PassengerResponse {
  success: boolean;
  message: string;
  data: User[];
}

class PassengerService {
  static async user(page: number, limit = 10) {
    try {
      const response = await apiClient.get<PassengerResponse>(`/users?page=${page}&limit=${limit}&sort=desc`);
      return response.data; // Return the actual data to avoid unnecessary nesting
    } catch (error) {
      console.error('Error fetching drivers:', (error as Error).message);
      throw error;
    }
  }

//   static async driversById(prams: { slug: string }) {
//     try {
//       const response = await apiClient.get<PassengerResponse>(`/profile/driver/${prams.slug}`);
//       return response.data; // Return the actual data to avoid unnecessary nesting


//     } catch (error) {
//       console.error('Error fetching drivers:', (error as Error).message);
//       throw error;
//     }
//   }

//   static async reject(prams: { slug: string }, rejectData: { message: string, fields: { vehicleImages: object, bluebookImages: object, licenseImage: string, avatar: string } }) {
//     try {
//       const response = await apiClient.patch<PassengerResponse>(
//         `/profile/driver/verify/reject/${prams.slug}`,
//         {
//           message: rejectData.message,
//           fields: {
//             vehicleImages: rejectData.fields.vehicleImages,
//             bluebookImages: rejectData.fields.bluebookImages,
//             licenseImage: rejectData.fields.licenseImage,
//             avatar: rejectData.fields.avatar,
//           },
//         }
//       );

//       return response.data;  // Return the actual data to avoid unnecessary nesting
//     } catch (error) {
//       console.error('Error updating rejection status:', (error as Error).message);
//       throw error;
//     }
//   }


//   static async edit(slug: string, updatedDriverDetail: object) {
//     try {
//       const response = await apiClient.patch<PassengerResponse>(
//         `/profile/driver/${slug}`,
//         updatedDriverDetail
//       );
//       return response.data; // Return the response data if needed
//     } catch (error) {
//       console.error('Error updating driver details:', error);
//       throw error; // Rethrow the error for handling in the component if needed
//     }
//   }

//   static async state(slug: string, status: string) {
//     try {
//       const response = await apiClient.patch<PassengerResponse>(
//         `/profile/driver/${slug}`, {
//         status
//       }
//       )
//       return response.data; // Return the response data if needed
//     } catch (error) {
//       console.error('Error updating driver details:', error);
//       throw error; // Rethrow the error for handling in the component if needed
//     }
//   }


//   static async deleteDriver(slug: string) {
//     try {
//       const response = await apiClient.delete<PassengerResponse>(
//         `/profile/driver/${slug}`
//       )
//       return response.data; // Return the response data if needed
//     } catch (error) {
//       console.error('Error updating driver details:', error);
//       throw error; // Rethrow the error for handling in the component if needed
//     }
//   }

}



export default PassengerService;
