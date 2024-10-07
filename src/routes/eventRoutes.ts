import express from 'express';
import { createEventHandler, updateEventHandler, deleteEventHandler, getEventsHandler } from '../controllers/eventController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createEventHandler);
router.put('/:id', updateEventHandler);
router.delete('/:id', deleteEventHandler);
router.get('/', getEventsHandler);

export default router;