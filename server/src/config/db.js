import mongoose from 'mongoose';
let isConnected = false;

export async function connectDB(){
  if(isConnected) return mongoose.connection;
  if(!process.env.MONGODB_URI){console.warn('MONGODB_URI not set. API will run without database connectivity.');return null;}
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log('MongoDB connected');
  return mongoose.connection;
}
