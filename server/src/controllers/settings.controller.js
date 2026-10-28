import prisma from '../config/db.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

export const getAllSettings = async (req, res, next) => {
  try {
    const settings = await prisma.siteSetting.findMany()

    // Transform array of key-value pairs into an object
    const settingsObj = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value
      return acc
    }, {})

    return sendSuccess(res, 'Settings retrieved successfully', { settings: settingsObj })
  } catch (error) {
    next(error)
  }
}

export const updateSettings = async (req, res, next) => {
  try {
    const updates = req.body // Object of key-value pairs

    if (!updates || typeof updates !== 'object') {
      return sendError(res, 'Invalid settings payload', 400)
    }

    const promises = Object.entries(updates).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    )

    await Promise.all(promises)

    return sendSuccess(res, 'Settings updated successfully')
  } catch (error) {
    next(error)
  }
}
