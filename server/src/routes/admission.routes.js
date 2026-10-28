import { Router } from 'express'
import {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
} from '../controllers/admission.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = Router()

// Public
router.post('/apply', submitApplication)

// Protected (Admin)
router.get('/', authenticate, getAllApplications)
router.patch('/:id/status', authenticate, updateApplicationStatus)

export default router
