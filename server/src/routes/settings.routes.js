import { Router } from 'express'
import { getAllSettings, updateSettings } from '../controllers/settings.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = Router()

// Public: get institution settings
router.get('/', getAllSettings)

// Protected (Admin): update institution settings
router.put('/', authenticate, updateSettings)

export default router
