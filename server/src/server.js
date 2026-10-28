import dotenv from 'dotenv'
import app from './app.js'
import prisma from './config/db.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`===============================================`)
  console.log(`  Bright Future School/College Backend API`)
  console.log(`  Mode: ${process.env.NODE_ENV || 'development'}`)
  console.log(`  Port: ${PORT}`)
  console.log(`  URL:  http://localhost:${PORT}`)
  console.log(`===============================================`)
})

// Graceful shutdown handling
const handleShutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Gracefully shutting down...`)
  server.close(async () => {
    await prisma.$disconnect()
    console.log('Database connections closed. Process terminating.')
    process.exit(0)
  })
}

process.on('SIGINT', () => handleShutdown('SIGINT'))
process.on('SIGTERM', () => handleShutdown('SIGTERM'))
