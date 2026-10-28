import { Router } from 'express'
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/event.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = Router()

// Public
router.get('/', getAllEvents)
router.get('/:id', getEventById)

// Protected (Admin)
router.post('/', authenticate, createEvent)
router.put('/:id', authenticate, updateEvent)
router.delete('/:id', authenticate, deleteEvent)

export default router
