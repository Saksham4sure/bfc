import bcrypt from 'bcrypt'
import prisma from '../config/db.js'
import { generateToken } from '../utils/jwt.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

export const registerAdmin = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body

    if (!email || !password || !name) {
      return sendError(res, 'Email, password, and name are required', 400)
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return sendError(res, 'User with this email already exists', 409)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        role: role || 'ADMIN',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    const token = generateToken({ userId: user.id, role: user.role })

    return sendSuccess(res, 'Admin registered successfully', { user, token }, 201)
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return sendError(res, 'Email and password are required', 400)
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      return sendError(res, 'Invalid email or password', 401)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return sendError(res, 'Invalid email or password', 401)
    }

    const token = generateToken({ userId: user.id, role: user.role })

    // Optional: set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    const userSafe = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    }

    return sendSuccess(res, 'Logged in successfully', { user: userSafe, token })
  } catch (error) {
    next(error)
  }
}

export const getMe = async (req, res, next) => {
  try {
    return sendSuccess(res, 'Current authenticated user profile', { user: req.user })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    res.clearCookie('token')
    return sendSuccess(res, 'Logged out successfully')
  } catch (error) {
    next(error)
  }
}
