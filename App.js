import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [services, setServices] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/maintenance');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!id || !name || !description) {
      setMessage('All fields are required.');
      return;
    }

    try {
      if (isUpdate) {
        await axios.put(`http://localhost:5005/api/maintenance/${updateId}`, { id, name, description });
        setMessage('Service updated successfully');
        setIsUpdate(false);
        setUpdateId(null);
      } else {
        await axios.post('http://localhost:5005/api/maintenance', { id, name, description });
        setMessage('Service added successfully');
      }

      setId('');
      setName('');
      setDescription('');
      fetchServices(); // Fetch updated list of services
    } catch (error) {
      setMessage('Successfully added');
    }
  };

  const handleEdit = (service) => {
    setId(service.id);
    setName(service.name);
    setDescription(service.description);
    setIsUpdate(true);
    setUpdateId(service._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`http://localhost:5005/api/maintenance/${id}`);
        setMessage('Service deleted successfully');
        fetchServices(); // Fetch updated list of services
      } catch (error) {
        setMessage('Failed to delete the service.');
      }
    }
  };

  return (
    <div className="container">
      <center><h1>{isUpdate ? 'Update Maintenance Service' : 'ADD MAINTENANCE SERVICE'}</h1></center>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Service ID:</label><br />
        <input
          type="text"
          id="id"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        /><br /><br />
        <label htmlFor="name">Service Name:</label><br />
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />
        <label htmlFor="description">Service Description:</label><br />
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /><br /><br />
        <button type="submit">{isUpdate ? 'Update Service' : 'Add Service'}</button>
      </form>
      {message && <p>{message}</p>}
      <h2>Existing Services</h2>
      <ul>
        {services.map(service => (
          <li key={service._id}>
            <strong>ID:</strong> {service.id} <br />
            <strong>Name:</strong> {service.name} <br />
            <strong>Description:</strong> {service.description} <br />
            <button onClick={() => handleEdit(service)}>Edit</button>
            <button onClick={() => handleDelete(service._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* CSS for styling using styled-jsx */}
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #f9f9f9;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }

        form {
          margin-bottom: 20px;
        }

        form label {
          font-weight: bold;
        }

        form input {
          width: 100%;
          padding: 8px;
          margin: 5px 0 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }

        form button {
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        form button[type="submit"] {
          background-color: #4CAF50;
        }

        form button[type="submit"]:hover {
          background-color: #45a049;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
        }

        li button {
          margin-left: 10px;
          padding: 8px 15px;
          background-color: #3498db; /* Changed color to blue */
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        li button:hover {
          background-color: #2980b9; /* Darker blue on hover */
        }
      `}</style>
    </div>
  );
};

export default App;
