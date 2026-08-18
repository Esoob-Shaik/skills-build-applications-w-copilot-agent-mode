import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker Backend is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
