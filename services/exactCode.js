import React, { useState, useEffect } from 'react';
import HttpClient from './HttpClient'; // Import the HttpClient class

const App = () => {
  // State to hold data from the API
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
  });

  // Create an instance of the HttpClient
  const userService = new UserService();

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await userService.fetchData()
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once after initial render

  // Handle form submission to create a new user
  const handleCreateUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/users', newUser);
      setUsers((prevUsers) => [...prevUsers, response]);
      setNewUser({ name: '', email: '' }); // Clear the form
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Users</h1>

      {/* Display loading or error state */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display users */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      {/* Form to create a new user */}
      <h2>Create User</h2>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default App;
