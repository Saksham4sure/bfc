import { Router } from 'express'
import {
  getPageContent,
  getAllPagesContent,
  updatePageContent,
} from '../controllers/pages.controller.js'
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js'

const router = Router()

// Public read endpoints
router.get('/', getAllPagesContent)
router.get('/:slug', getPageContent)

// Protected CMS update endpoint (ADMIN or SUPER_ADMIN)
router.put('/:slug', authenticate, authorizeRoles('ADMIN', 'SUPER_ADMIN'), updatePageContent)

export default router
