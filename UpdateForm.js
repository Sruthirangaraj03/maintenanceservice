// import React, { useState } from 'react';
// import axios from 'axios';

// const UpdateForm = ({ service, onUpdate }) => {
//   const [name, setName] = useState(service.name);
//   const [description, setDescription] = useState(service.description);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!name || !description) {
//       setMessage('All fields are required.');
//       return;
//     }

//     try {
//       await axios.put(`http://localhost:5003/api/maintenance/${service._id}`, { name, description });
//       setMessage('Service updated successfully');
//       onUpdate(); // Trigger parent component update
//     } catch (error) {
//       setMessage('Error updating service');
//     }
//   };

//   return (
//     <div>
//       <h2>Update Service</h2>
//       <form onSubmit={handleSubmit}>
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
//         <button type="submit">Update Service</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default UpdateForm;
