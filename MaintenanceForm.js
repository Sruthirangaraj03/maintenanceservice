// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import UpdateForm from '/UpdateForm'; // Adjust the path if necessary

// const MaintenanceForm = () => {
//   const [id, setId] = useState('');
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [message, setMessage] = useState('');
//   const [services, setServices] = useState([]);
//   const [editServiceId, setEditServiceId] = useState(null); // Track which service is being edited

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get('http://localhost:5003/api/maintenance');
//         setServices(response.data);
//       } catch (error) {
//         console.error('Error fetching services', error);
//       }
//     };

//     fetchServices();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!id || !name || !description) {
//       setMessage('All fields are required.');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:5003/api/maintenance', { id, name, description });
//       setMessage('Service added successfully');
//       setId('');
//       setName('');
//       setDescription('');
//       fetchServices(); // Fetch updated list of services after adding
//     } catch (error) {
//       setMessage('Error adding service');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5003/api/maintenance/${id}`);
//       setMessage('Service deleted successfully');
//       fetchServices(); // Fetch updated list of services after deletion
//     } catch (error) {
//       setMessage('Error deleting service');
//     }
//   };

//   const handleEdit = (serviceId) => {
//     setEditServiceId(serviceId);
//   };

//   const handleUpdate = async () => {
//     try {
//       const response = await axios.get('http://localhost:5003/api/maintenance');
//       setServices(response.data);
//       setEditServiceId(null); // Reset edit mode after successful update
//     } catch (error) {
//       console.error('Error fetching updated services', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Add Maintenance Service</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="id">Service ID:</label><br />
//         <input
//           type="text"
//           id="id"
//           name="id"
//           value={id}
//           onChange={(e) => setId(e.target.value)}
//           required
//         /><br /><br />
//         <label htmlFor="name">Service Name:</label><br />
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         /><br /><br />
//         <label htmlFor="description">Service Description:</label><br />
//         <input
//           type="text"
//           id="description"
//           name="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         /><br /><br />
//         <button type="submit">Add Service</button>
//       </form>
//       {message && <p>{message}</p>}
//       <h2>Existing Services</h2>
//       <ul>
//         {services.map(service => (
//           <li key={service._id}>
//             <strong>ID:</strong> {service.id} <br />
//             <strong>Name:</strong> {service.name} <br />
//             <strong>Description:</strong> {service.description} <br />
//             {editServiceId === service._id ? (
//               <UpdateForm service={service} onUpdate={handleUpdate} />
//             ) : (
//               <button onClick={() => handleEdit(service._id)}>Edit</button>
//             )}
//             <button onClick={() => handleDelete(service._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MaintenanceForm;
