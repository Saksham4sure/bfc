import prisma from '../config/db.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

export const getAllNotices = async (req, res, next) => {
  try {
    const { category, search, limit } = req.query

    const where = {
      isPublished: true,
      ...(category ? { category } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    }

    const notices = await prisma.notice.findMany({
      where,
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      take: limit ? parseInt(limit, 10) : undefined,
    })

    return sendSuccess(res, 'Notices retrieved successfully', { notices })
  } catch (error) {
    next(error)
  }
}

export const getNoticeById = async (req, res, next) => {
  try {
    const { id } = req.params
    const notice = await prisma.notice.findUnique({
      where: { id },
    })

    if (!notice) {
      return sendError(res, 'Notice not found', 404)
    }

    return sendSuccess(res, 'Notice retrieved successfully', { notice })
  } catch (error) {
    next(error)
  }
}

export const createNotice = async (req, res, next) => {
  try {
    const { title, category, content, fileUrl, isPinned, isPublished } = req.body

    if (!title || !content) {
      return sendError(res, 'Title and content are required', 400)
    }

    const notice = await prisma.notice.create({
      data: {
        title,
        category: category || 'General',
        content,
        fileUrl,
        isPinned: Boolean(isPinned),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    })

    return sendSuccess(res, 'Notice created successfully', { notice }, 201)
  } catch (error) {
    next(error)
  }
}

export const updateNotice = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, category, content, fileUrl, isPinned, isPublished } = req.body

    const existingNotice = await prisma.notice.findUnique({ where: { id } })
    if (!existingNotice) {
      return sendError(res, 'Notice not found', 404)
    }

    const updated = await prisma.notice.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(category !== undefined && { category }),
        ...(content !== undefined && { content }),
        ...(fileUrl !== undefined && { fileUrl }),
        ...(isPinned !== undefined && { isPinned: Boolean(isPinned) }),
        ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
      },
    })

    return sendSuccess(res, 'Notice updated successfully', { notice: updated })
  } catch (error) {
    next(error)
  }
}

export const deleteNotice = async (req, res, next) => {
  try {
    const { id } = req.params

    const existingNotice = await prisma.notice.findUnique({ where: { id } })
    if (!existingNotice) {
      return sendError(res, 'Notice not found', 404)
    }

    await prisma.notice.delete({ where: { id } })

    return sendSuccess(res, 'Notice deleted successfully')
  } catch (error) {
    next(error)
  }
}
