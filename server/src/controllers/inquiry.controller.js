import prisma from '../config/db.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

export const submitInquiry = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return sendError(res, 'Name, email, subject, and message are required', 400)
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    })

    return sendSuccess(res, 'Inquiry sent successfully', { inquiry }, 201)
  } catch (error) {
    next(error)
  }
}

export const getAllInquiries = async (req, res, next) => {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return sendSuccess(res, 'Inquiries retrieved successfully', { inquiries })
  } catch (error) {
    next(error)
  }
}

export const markInquiryAsRead = async (req, res, next) => {
  try {
    const { id } = req.params

    const inquiry = await prisma.contactInquiry.update({
      where: { id },
      data: { isRead: true },
    })

    return sendSuccess(res, 'Inquiry marked as read', { inquiry })
  } catch (error) {
    next(error)
  }
}
