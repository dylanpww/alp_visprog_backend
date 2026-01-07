import { Router } from 'express';
import eventRoutes from './event.routes';
import reviewRoutes from './review.routes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
router.use('/events', eventRoutes);
router.use('/reviews', reviewRoutes);

export default router;
