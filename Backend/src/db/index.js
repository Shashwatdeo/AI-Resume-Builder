import mongoose from "mongoose";

const connnectDB=async()=>{
    try {
      const connectionInstance=  await mongoose.connect(`${process.env.MONGODB_URI}`, {
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds
      });
    //   console.log(connectionInstance);
      
      console.log(`\n MOngodb connected.`);

      // Verify critical indexes exist
      try {
        const userCollection = connectionInstance.connection.db.collection('users');
        const indexes = await userCollection.indexes();
        const hasEmailIndex = indexes.some(idx => Array.isArray(idx.key) ? idx.key.some(k => k.email === 1) : idx.key && idx.key.email === 1);
        if (!hasEmailIndex) {
          console.warn('[Startup] Missing index on users.email. Create with: db.users.createIndex({ email: 1 }, { unique: true })');
        } else {
          console.log('[Startup] users.email index present');
        }
      } catch (e) {
        console.warn('Index check failed:', e.message);
      }
      
    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1)
    }
}

export default connnectDB