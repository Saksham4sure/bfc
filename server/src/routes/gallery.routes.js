import { Router } from 'express'
import {
  getAllGalleryItems,
  uploadGalleryItem,
  deleteGalleryItem,
} from '../controllers/gallery.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/upload.middleware.js'

const router = Router()

// Public
router.get('/', getAllGalleryItems)

// Protected (Admin)
router.post('/', authenticate, upload.single('image'), uploadGalleryItem)
router.delete('/:id', authenticate, deleteGalleryItem)

export default router
