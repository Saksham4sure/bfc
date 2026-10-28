import prisma from '../config/db.js'
import cloudinary from '../config/cloudinary.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

export const DEFAULT_SLIDES = [
  {
    id: 'default-1',
    badge: 'Welcome to Bright Future School & College',
    title: 'Nurturing Potential, Inspiring Excellence',
    subtitle: 'Providing state-of-the-art education, modern laboratory facilities, and empowering future leaders in Nepal.',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=85',
    buttonText: 'Explore Academics',
    buttonLink: '/academics',
    order: 0,
    isActive: true,
  },
  {
    id: 'default-2',
    badge: 'Admissions Open 2026/2027',
    title: '+2 Science, Management & Humanities Streams',
    subtitle: 'Join an institution dedicated to academic achievement, character integrity, and top NEB board performance.',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1920&q=85',
    buttonText: 'Apply For Admission',
    buttonLink: '/admissions',
    order: 1,
    isActive: true,
  },
  {
    id: 'default-3',
    badge: 'Holistic Campus Life',
    title: 'World-Class Infrastructure & Vibrant Extracurriculars',
    subtitle: 'From robotics and science research exhibitions to competitive athletics and cultural forums.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=85',
    buttonText: 'View Gallery',
    buttonLink: '/gallery',
    order: 2,
    isActive: true,
  },
]

export const getPublicSlides = async (req, res, next) => {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })

    if (slides.length === 0) {
      return sendSuccess(res, 'Default hero slides loaded', { slides: DEFAULT_SLIDES })
    }

    return sendSuccess(res, 'Hero slides retrieved successfully', { slides })
  } catch (error) {
    next(error)
  }
}

export const getAllSlides = async (req, res, next) => {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: 'asc' },
    })

    return sendSuccess(res, 'All hero slides retrieved', { slides })
  } catch (error) {
    next(error)
  }
}

export const createSlide = async (req, res, next) => {
  try {
    const { title, subtitle, badge, buttonText, buttonLink, order, isActive } = req.body
    const file = req.file

    if (!title) {
      return sendError(res, 'Slide title is required', 400)
    }

    let imageUrl = req.body.imageUrl

    if (file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'bright-future/sliders' },
          (error, result) => {
            if (error) return reject(error)
            resolve(result)
          }
        )
        stream.end(file.buffer)
      })
      imageUrl = uploadResult.secure_url
    }

    if (!imageUrl) {
      return sendError(res, 'Slide image (file or URL) is required', 400)
    }

    const slide = await prisma.heroSlide.create({
      data: {
        title,
        subtitle: subtitle || null,
        badge: badge || null,
        imageUrl,
        buttonText: buttonText || 'Learn More',
        buttonLink: buttonLink || '/admissions',
        order: order !== undefined ? parseInt(order, 10) : 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    })

    return sendSuccess(res, 'Slide created successfully', { slide }, 201)
  } catch (error) {
    next(error)
  }
}

export const updateSlide = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, subtitle, badge, buttonText, buttonLink, order, isActive } = req.body
    const file = req.file

    const existing = await prisma.heroSlide.findUnique({ where: { id } })
    if (!existing) {
      return sendError(res, 'Slide not found', 404)
    }

    let imageUrl = req.body.imageUrl || existing.imageUrl

    if (file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'bright-future/sliders' },
          (error, result) => {
            if (error) return reject(error)
            resolve(result)
          }
        )
        stream.end(file.buffer)
      })
      imageUrl = uploadResult.secure_url
    }

    const updated = await prisma.heroSlide.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(badge !== undefined && { badge }),
        imageUrl,
        ...(buttonText !== undefined && { buttonText }),
        ...(buttonLink !== undefined && { buttonLink }),
        ...(order !== undefined && { order: parseInt(order, 10) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
      },
    })

    return sendSuccess(res, 'Slide updated successfully', { slide: updated })
  } catch (error) {
    next(error)
  }
}

export const deleteSlide = async (req, res, next) => {
  try {
    const { id } = req.params

    const existing = await prisma.heroSlide.findUnique({ where: { id } })
    if (!existing) {
      return sendError(res, 'Slide not found', 404)
    }

    await prisma.heroSlide.delete({ where: { id } })

    return sendSuccess(res, 'Slide deleted successfully')
  } catch (error) {
    next(error)
  }
}
