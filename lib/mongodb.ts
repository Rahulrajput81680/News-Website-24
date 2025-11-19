import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

// Don't throw error during build time - only warn
if (!MONGODB_URI && process.env.NODE_ENV !== 'production') {
  console.warn('⚠️  MONGODB_URI not set - API routes will fail at runtime');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Throw error at runtime if no URI (not during build/import)
  if (!MONGODB_URI) {
    const error = new Error(
      'MONGODB_URI is not defined. Please add it to your Vercel environment variables or .env.local file'
    );
    console.error('❌', error.message);
    throw error;
  }
  
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log('🔄 Connecting to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB Connected Successfully');
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB Connection Error:', error.message);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ Failed to establish MongoDB connection');
    throw e;
  }

  return cached.conn;
}

export default connectDB;
