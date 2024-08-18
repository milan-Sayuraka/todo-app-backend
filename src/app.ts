import express from 'express';
import cors from 'cors';  // Import the CORS middleware
import todoRoutes from './routes/todoRoutes';
import logger from './utils/logger';

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api', todoRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
