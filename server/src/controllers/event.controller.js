import prisma from '../config/db.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

export const getAllEvents = async (req, res, next) => {
  try {
    const { upcoming, limit } = req.query

    const where = {
      isPublished: true,
      ...(upcoming === 'true' ? { date: { gte: new Date() } } : {}),
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: 'asc' },
      take: limit ? parseInt(limit, 10) : undefined,
    })

    return sendSuccess(res, 'Events retrieved successfully', { events })
  } catch (error) {
    next(error)
  }
}

export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params
    const event = await prisma.event.findUnique({
      where: { id },
    })

    if (!event) {
      return sendError(res, 'Event not found', 404)
    }

    return sendSuccess(res, 'Event retrieved successfully', { event })
  } catch (error) {
    next(error)
  }
}

export const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, imageUrl, isPublished } = req.body

    if (!title || !description || !date) {
      return sendError(res, 'Title, description, and date are required', 400)
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        imageUrl,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    })

    return sendSuccess(res, 'Event created successfully', { event }, 201)
  } catch (error) {
    next(error)
  }
}

export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description, date, location, imageUrl, isPublished } = req.body

    const existing = await prisma.event.findUnique({ where: { id } })
    if (!existing) {
      return sendError(res, 'Event not found', 404)
    }

    const updated = await prisma.event.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(date !== undefined && { date: new Date(date) }),
        ...(location !== undefined && { location }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
      },
    })

    return sendSuccess(res, 'Event updated successfully', { event: updated })
  } catch (error) {
    next(error)
  }
}

export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params

    const existing = await prisma.event.findUnique({ where: { id } })
    if (!existing) {
      return sendError(res, 'Event not found', 404)
    }

    await prisma.event.delete({ where: { id } })

    return sendSuccess(res, 'Event deleted successfully')
  } catch (error) {
    next(error)
  }
}
