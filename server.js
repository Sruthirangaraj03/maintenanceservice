const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const url = 'mongodb://localhost:27017/';
const dbName = 'webtech'; // Replace with your actual database name

let db;

MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to Database');
    db = client.db(dbName);
  })
  .catch((error) => console.error(error));

// Create a new maintenance service
app.post('/api/maintenance', async (req, res) => {
  const { id, name, description } = req.body;
  if (!id || !name || !description) {
    return res.status(400).send({ error: 'All fields are required.' });
  }

  try {
    const newService = { id, name, description };
    const result = await db.collection('machine').insertOne(newService);
    res.status(201).send(result.ops[0]);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all maintenance services
app.get('/api/maintenance', async (req, res) => {
  try {
    const services = await db.collection('machine').find().toArray();
    res.status(200).send(services);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update an existing maintenance service by ID
app.put('/api/maintenance/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).send({ error: 'Name and description are required.' });
  }

  try {
    const updatedService = { name, description };
    const result = await db.collection('machine').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedService }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ error: 'Service not found.' });
    }

    res.status(200).send({ message: 'Service updated successfully.' });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an existing maintenance service by ID
app.delete('/api/maintenance/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.collection('machine').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ error: 'Service not found.' });
    }

    res.status(200).send({ message: 'Service deleted successfully.' });
  } catch (error) {
    res.status(400).send(error);
  }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
