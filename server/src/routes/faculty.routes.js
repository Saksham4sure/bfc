import { Router } from 'express'
import {
  getAllFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from '../controllers/faculty.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/upload.middleware.js'

const router = Router()

// Public
router.get('/', getAllFaculty)
router.get('/:id', getFacultyById)

// Protected (Admin)
router.post('/', authenticate, upload.single('image'), createFaculty)
router.put('/:id', authenticate, upload.single('image'), updateFaculty)
router.delete('/:id', authenticate, deleteFaculty)

export default router
