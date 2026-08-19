import mongoose from 'mongoose';
export async function connectDB(){
  if(!process.env.MONGODB_URI){console.warn('MONGODB_URI not set. API will run without database connectivity.');return;}
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');
}
