import { Router } from 'express'
import {
  getPublicSlides,
  getAllSlides,
  createSlide,
  updateSlide,
  deleteSlide,
} from '../controllers/slider.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/upload.middleware.js'

const router = Router()

// Public
router.get('/', getPublicSlides)

// Protected (Admin)
router.get('/all', authenticate, getAllSlides)
router.post('/', authenticate, upload.single('image'), createSlide)
router.put('/:id', authenticate, upload.single('image'), updateSlide)
router.delete('/:id', authenticate, deleteSlide)

export default router
