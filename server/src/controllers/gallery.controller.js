import prisma from '../config/db.js'
import cloudinary from '../config/cloudinary.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

export const getAllGalleryItems = async (req, res, next) => {
  try {
    const { category } = req.query

    const where = category && category !== 'All' ? { category } : {}

    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return sendSuccess(res, 'Gallery items retrieved successfully', { items })
  } catch (error) {
    next(error)
  }
}

export const uploadGalleryItem = async (req, res, next) => {
  try {
    const { title, category } = req.body
    const file = req.file

    if (!title) {
      return sendError(res, 'Title is required', 400)
    }

    let imageUrl = req.body.imageUrl
    let publicId = null

    // If file is provided via Multer, upload directly to Cloudinary
    if (file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'bright-future/gallery' },
          (error, result) => {
            if (error) return reject(error)
            resolve(result)
          }
        )
        stream.end(file.buffer)
      })

      imageUrl = uploadResult.secure_url
      publicId = uploadResult.public_id
    }

    if (!imageUrl) {
      return sendError(res, 'Image file or imageUrl is required', 400)
    }

    const item = await prisma.galleryItem.create({
      data: {
        title,
        category: category || 'Campus',
        imageUrl,
        publicId,
      },
    })

    return sendSuccess(res, 'Gallery item uploaded successfully', { item }, 201)
  } catch (error) {
    next(error)
  }
}

export const deleteGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params

    const item = await prisma.galleryItem.findUnique({ where: { id } })
    if (!item) {
      return sendError(res, 'Gallery item not found', 404)
    }

    // If item was stored on Cloudinary, remove it
    if (item.publicId) {
      try {
        await cloudinary.uploader.destroy(item.publicId)
      } catch (err) {
        console.warn('Could not delete file from Cloudinary:', err)
      }
    }

    await prisma.galleryItem.delete({ where: { id } })

    return sendSuccess(res, 'Gallery item deleted successfully')
  } catch (error) {
    next(error)
  }
}
