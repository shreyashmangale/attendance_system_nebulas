const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv').config();

const uri = process.env.MONGODB_CONNECTION;
//console.log(uri)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    return client;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Connect immediately
connectDB();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  try {
    await client.close();
    //console.log('🛑 MongoDB connection closed gracefully');
    process.exit(0);
  } catch (error) {
    console.error('❗ Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

module.exports = { connectDB, client };
