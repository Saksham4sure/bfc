import prisma from '../config/db.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

export const submitApplication = async (req, res, next) => {
  try {
    const { fullName, email, phone, program, previousSchool, gpaScore, message } = req.body

    if (!fullName || !email || !phone || !program) {
      return sendError(res, 'Full name, email, phone, and program are required', 400)
    }

    const application = await prisma.admissionApplication.create({
      data: {
        fullName,
        email,
        phone,
        program,
        previousSchool,
        gpaScore,
        message,
      },
    })

    return sendSuccess(res, 'Admission application submitted successfully', { application }, 201)
  } catch (error) {
    next(error)
  }
}

export const getAllApplications = async (req, res, next) => {
  try {
    const { status, program } = req.query

    const where = {
      ...(status ? { status } : {}),
      ...(program ? { program } : {}),
    }

    const applications = await prisma.admissionApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return sendSuccess(res, 'Applications retrieved successfully', { applications })
  } catch (error) {
    next(error)
  }
}

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const validStatuses = ['PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED']
    if (!validStatuses.includes(status)) {
      return sendError(res, `Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400)
    }

    const application = await prisma.admissionApplication.update({
      where: { id },
      data: { status },
    })

    return sendSuccess(res, 'Application status updated successfully', { application })
  } catch (error) {
    next(error)
  }
}
