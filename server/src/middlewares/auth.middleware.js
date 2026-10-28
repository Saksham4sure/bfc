import { verifyToken } from '../utils/jwt.js'
import prisma from '../config/db.js'
import { sendError } from '../utils/apiResponse.js'

export const authenticate = async (req, res, next) => {
  try {
    let token = null

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token
    }

    if (!token) {
      return sendError(res, 'Authentication token required', 401)
    }

    const decoded = verifyToken(token)

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
      },
    })

    if (!user) {
      return sendError(res, 'User no longer exists', 401)
    }

    req.user = user
    next()
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401)
  }
}

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, 'Access denied: insufficient permissions', 403)
    }
    next()
  }
}
