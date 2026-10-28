import prisma from '../config/db.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

export const getAllFaculty = async (req, res, next) => {
  try {
    const { department } = req.query

    const where = department ? { department } : {}

    const faculty = await prisma.faculty.findMany({
      where,
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    })

    return sendSuccess(res, 'Faculty members retrieved successfully', { faculty })
  } catch (error) {
    next(error)
  }
}

export const getFacultyById = async (req, res, next) => {
  try {
    const { id } = req.params

    const member = await prisma.faculty.findUnique({ where: { id } })
    if (!member) {
      return sendError(res, 'Faculty member not found', 404)
    }

    return sendSuccess(res, 'Faculty member retrieved successfully', { faculty: member })
  } catch (error) {
    next(error)
  }
}

export const createFaculty = async (req, res, next) => {
  try {
    const { name, designation, department, email, phone, bio, imageUrl, order } = req.body

    if (!name || !designation || !department) {
      return sendError(res, 'Name, designation, and department are required', 400)
    }

    const member = await prisma.faculty.create({
      data: {
        name,
        designation,
        department,
        email,
        phone,
        bio,
        imageUrl,
        order: order !== undefined ? parseInt(order, 10) : 0,
      },
    })

    return sendSuccess(res, 'Faculty member created successfully', { faculty: member }, 201)
  } catch (error) {
    next(error)
  }
}

export const updateFaculty = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, designation, department, email, phone, bio, imageUrl, order } = req.body

    const existing = await prisma.faculty.findUnique({ where: { id } })
    if (!existing) {
      return sendError(res, 'Faculty member not found', 404)
    }

    const updated = await prisma.faculty.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(designation !== undefined && { designation }),
        ...(department !== undefined && { department }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(bio !== undefined && { bio }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(order !== undefined && { order: parseInt(order, 10) }),
      },
    })

    return sendSuccess(res, 'Faculty member updated successfully', { faculty: updated })
  } catch (error) {
    next(error)
  }
}

export const deleteFaculty = async (req, res, next) => {
  try {
    const { id } = req.params

    const existing = await prisma.faculty.findUnique({ where: { id } })
    if (!existing) {
      return sendError(res, 'Faculty member not found', 404)
    }

    await prisma.faculty.delete({ where: { id } })

    return sendSuccess(res, 'Faculty member deleted successfully')
  } catch (error) {
    next(error)
  }
}
