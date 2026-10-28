import { Router } from 'express'
import {
  getAllNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
} from '../controllers/notice.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = Router()

// Public
router.get('/', getAllNotices)
router.get('/:id', getNoticeById)

// Protected (Admin)
router.post('/', authenticate, createNotice)
router.put('/:id', authenticate, updateNotice)
router.delete('/:id', authenticate, deleteNotice)

export default router
