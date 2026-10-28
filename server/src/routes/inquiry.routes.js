import { Router } from 'express'
import {
  submitInquiry,
  getAllInquiries,
  markInquiryAsRead,
} from '../controllers/inquiry.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = Router()

// Public
router.post('/', submitInquiry)

// Protected (Admin)
router.get('/', authenticate, getAllInquiries)
router.patch('/:id/read', authenticate, markInquiryAsRead)

export default router
