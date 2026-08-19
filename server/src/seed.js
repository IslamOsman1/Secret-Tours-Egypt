import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Tour from './models/Tour.js';
import { connectDB } from './config/db.js';

const tours=[
 {title:'8 Days Cairo & Nile Cruise',slug:'8-days-cairo-nile-cruise',category:'classic-tours',city:'Cairo, Luxor & Aswan',duration:'8 Days / 7 Nights',price:1140,rating:4.9,reviews:128,featured:true,badge:'Best Seller',image:'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=85',excerpt:'Discover Cairo’s icons and sail the Nile between Luxor and Aswan with private guided visits.',highlights:['Private Egyptologist guide','4 nights Nile cruise','Airport assistance','Daily breakfast']},
 {title:'5 Days Luxury Nile Cruise',slug:'luxury-nile-cruise-5-days',category:'nile-cruises',city:'Luxor to Aswan',duration:'5 Days / 4 Nights',price:790,rating:4.8,reviews:94,featured:true,badge:'Luxury',image:'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=85',excerpt:'A refined Nile journey with elegant cabins, full-board dining and expert-guided sightseeing.'},
 {title:'Private Cairo Highlights Day Tour',slug:'cairo-private-day-tour',category:'day-trips',city:'Cairo & Giza',duration:'10 Hours',price:135,rating:5,reviews:72,featured:true,badge:'Top Rated',image:'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=85',excerpt:'See the Pyramids, Sphinx and Cairo highlights with your own Egyptologist.'}
];
await connectDB();
await Tour.deleteMany({}); await Tour.insertMany(tours);
const email=process.env.ADMIN_EMAIL; const password=process.env.ADMIN_PASSWORD;
await User.findOneAndUpdate({email},{email,password:await bcrypt.hash(password,12),role:'admin'},{upsert:true,new:true});
console.log('Seed complete');await mongoose.disconnect();
