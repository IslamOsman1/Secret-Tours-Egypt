import 'dotenv/config';
import { connectDB } from './config/db.js';
import app from './app.js';
const port=process.env.PORT||5000;
connectDB().then(()=>app.listen(port,()=>console.log(`API running on :${port}`))).catch(err=>{console.error('DB connection failed:',err.message);process.exit(1)});
