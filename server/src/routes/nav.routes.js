import { Router } from 'express'
import {
  getPublicNavItems,
  getAllNavItems,
  createNavItem,
  updateNavItem,
  deleteNavItem,
} from '../controllers/nav.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = Router()

// Public
router.get('/', getPublicNavItems)

// Protected (Admin)
router.get('/all', authenticate, getAllNavItems)
router.post('/', authenticate, createNavItem)
router.put('/:id', authenticate, updateNavItem)
router.delete('/:id', authenticate, deleteNavItem)

export default router
