import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// Route Imports
import authRoutes from './routes/auth.routes.js'
import noticeRoutes from './routes/notice.routes.js'
import eventRoutes from './routes/event.routes.js'
import galleryRoutes from './routes/gallery.routes.js'
import facultyRoutes from './routes/faculty.routes.js'
import admissionRoutes from './routes/admission.routes.js'
import inquiryRoutes from './routes/inquiry.routes.js'
import settingsRoutes from './routes/settings.routes.js'
import navRoutes from './routes/nav.routes.js'
import sliderRoutes from './routes/slider.routes.js'
import pagesRoutes from './routes/pages.routes.js'

// Middlewares
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js'

const app = express()

// Global Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Bright Future School/College API server is operational',
    timestamp: new Date().toISOString(),
  })
})

// Mount API Routes
app.use('/api/auth', authRoutes)
app.use('/api/notices', noticeRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/faculty', facultyRoutes)
app.use('/api/admissions', admissionRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/nav', navRoutes)
app.use('/api/sliders', sliderRoutes)
app.use('/api/pages', pagesRoutes)

// 404 & Centralized Error Handlers
app.use(notFoundHandler)
app.use(errorHandler)

export default app
