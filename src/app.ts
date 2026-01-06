import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import routes from './routes';
import { errorHandler } from './middlewares/error-handler';

const app: Application = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// API routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Event API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      events: '/api/events',
      reviews: '/api/reviews'
    }
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
