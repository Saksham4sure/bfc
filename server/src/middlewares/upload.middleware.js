import multer from 'multer'

// Use memory storage for direct streaming to Cloudinary
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  // Allow images and documents (PDF, DOC)
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Unsupported file type. Only images and PDF/DOC documents are allowed.'), false)
  }
}

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter,
})
