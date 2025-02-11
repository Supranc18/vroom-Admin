import apiClient from '../client';





interface Response {
  success: boolean;
  message: string;
  data: []
}


class VehicleRegisterService {
// Post Brand
  static async addbrand(name: string, logo: File) {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("logo", logo);
      const response = await apiClient.post<Response>('/profile/brands', formData);
      return response; // Return the response data
    } catch (error) {
      console.error('Failed to add Brands:', (error as Error).message); // Handle errors
      throw error; // Rethrow or handle as needed
    }
  }
// Get Brand
  static async brand( page:number=1, limit:number = 10) {
    try {
      const response = await apiClient.get<Response>(`/profile/brands?limit=${limit}&page=${page}&sort=asc`);
      return response.data; // Return the actual data to avoid unnecessary nesting
    } catch (error) {
      console.error('Error fetching colors:', (error as Error).message);
      throw error;
    }
  }
  // Edit brand
  static async editBrand(slug: string, updatedBrand: object) {
    try {
      const response = await apiClient.patch<Response>(
        `/profile/brands/${slug}`,
        updatedBrand
      );
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error( error);
      throw error; // Rethrow the error for handling in the component if needed
    }
  }
// Delete brand
  static async deleteBrands(slug: string) {
    try {
      const response = await apiClient.delete<Response>(
        `/profile/brands/${slug}`
      )
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Error updating driver details:', error);
      throw error; // Rethrow the error for handling in the component if needed
    }
  }


  //Post model
  static async addmodel(name: string, vehicleType: string, brandId:string) {
    try {
      const response = await apiClient.post<Response>('/profile/models', {
        name, vehicleType,brandId // Include the request data 
      });
      return response; // Return the response data
    } catch (error) {
      console.error('Failed to add color:', (error as Error).message); // Handle errors
      throw error; // Rethrow or handle as needed
    }
  }
  // Get model
  static async model(page:number=1, limit:number = 10) {
    try {
      const response = await apiClient.get<Response>(`/profile/models?limit=${limit}&page=${page}&sort=asc`);
      return response.data; // Return the actual data to avoid unnecessary nesting
    } catch (error) {
      console.error('Error fetching colors:', (error as Error).message);
      throw error;
    }
  }
// Edit model
  static async editModel(slug: string, updatedModel: object) {
    try {
      const response = await apiClient.patch<Response>(
        `/profile/models/${slug}`,
        updatedModel
      );
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error( error);
      throw error; // Rethrow the error for handling in the component if needed
    }
  }
// Deletemodel
  static async deleteModel(slug: string) {
    try {
      const response = await apiClient.delete<Response>(
        `/profile/models/${slug}`
      )
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Error updating driver details:', error);
      throw error; // Rethrow the error for handling in the component if needed
    }
  }

  //Post color
  static async addcolor(name: string, hex: string) {
    try {
      const response = await apiClient.post<Response>('/profile/colors', {
        name, hex // Include the request data (e.g., phone number)
      });
      return response; // Return the response data
    } catch (error) {
      console.error('Failed to add color:', (error as Error).message); // Handle errors
      throw error; // Rethrow or handle as needed
    }
  }
  // Get Color
  static async colors(page:number=1, limit:number = 10) {
    try {
      const response = await apiClient.get<Response>(`/profile/colors?limit=${limit}&page=${page}&sort=asc`);
      return response.data; // Return the actual data to avoid unnecessary nesting
    } catch (error) {
      console.error('Error fetching colors:', (error as Error).message);
      throw error;
    }
  }
// Edit Color
  static async edit(slug: string, updatedColor: object) {
    try {
      const response = await apiClient.patch<Response>(
        `/profile/colors/${slug}`,
        updatedColor
      );
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error( error);
      throw error; // Rethrow the error for handling in the component if needed
    }
  }
// DeleteColor
  static async deleteColor(slug: string) {
    try {
      const response = await apiClient.delete<Response>(
        `/profile/colors/${slug}`
      )
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Error updating driver details:', error);
      throw error; // Rethrow the error for handling in the component if needed
    }
  }


}






export default VehicleRegisterService;