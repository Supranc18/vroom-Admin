

class UserService{
    

// Create an instance of the HttpClient with a base URL


static  searchDriver = async (name:string) => {
  try {
    const data = await apiClient.get('/driver/name=${name}');
    console.log(data); // handle the response data
  } catch (error) {
    console.error(error.message); // handle errors
  }
};

// Example of a GET request
static  fetchData = async () => {
  try {
    const data = await apiClient.get('/driver/{id}');
    console.log(data); // handle the response data
  } catch (error) {
    console.error(error.message); // handle errors
  }
};

// Example of a POST request
const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/users', userData);
    console.log(response); // handle the response data
  } catch (error) {
    console.error(error.message); // handle errors
  }
};

// Example of a PUT request
const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, userData);
    console.log(response); // handle the response data
  } catch (error) {
    console.error(error.message); // handle errors
  }
};

// Example of a DELETE request
const deleteUser = async (userId) => {
  try {
    await apiClient.delete(`/users/${userId}`);
    console.log('User deleted successfully');
  } catch (error) {
    console.error(error.message); // handle errors
  }
};

}



module.exports = UserService;