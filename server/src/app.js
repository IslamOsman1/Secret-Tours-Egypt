import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import tourRoutes from './routes/tours.js';
import inquiryRoutes from './routes/inquiries.js';
import uploadRoutes from './routes/upload.js';
import settingsRoutes from './routes/settings.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : true, credentials: true }));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'Secret Tours Egypt API' }));
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Server error' });
});

export default app;
