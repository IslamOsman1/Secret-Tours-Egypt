import app from '../server/src/app.js';
import { connectDB } from '../server/src/config/db.js';

const dbReady = connectDB();

export default async function handler(req, res) {
  await dbReady;
  return app(req, res);
}
