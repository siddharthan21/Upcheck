const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://siddharthan44:MYrHu4EdzWvRLJDk@login.g6kvaie.mongodb.net/?retryWrites=true&w=majority&appName=Login";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");
    return client.db('Loginnn'); // Replace 'Login' with your actual database name
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }Loginnn
}

module.exports = connectToDatabase;
