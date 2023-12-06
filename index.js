// server.js
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const PORT = 3000;

// middle Ware
app.use(cors());
app.use(express.json());

// MongodB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://protfolio:N9v58CvmxzbeeEHS@atlascluster.loneswk.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


//Collection in database

const skillsCollection = client.db("protfolio").collection("skills");
const projectsCollection = client.db("protfolio").collection("projects");
   
  // get all class data
  app.get('/skills', async (req, res) => {
    const result = await skillsCollection.find().toArray();
    res.send(result)
})

  // get all class data
  app.get('/projects', async (req, res) => {
    const result = await projectsCollection.find().toArray();
    res.send(result)
})

// //post skills
//   app.post('/skills', async (req, res) => {
//     const item = req.body;
//     const result = await skillsCollection.insertOne(item);
//      res.send(result);
// })

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


