import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  // During build time, this is acceptable - MongoDB will be configured in Vercel
  if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
    console.error('⚠️  MONGODB_URI is not defined in environment variables');
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local or in Vercel dashboard'
    );
  } else {
    console.warn('⚠️  MONGODB_URI not set - build will continue but runtime will fail without it');
  }
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
  // Skip connection if no URI provided (during build)
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
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
