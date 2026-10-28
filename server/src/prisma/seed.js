import bcrypt from 'bcrypt'
import prisma from '../config/db.js'

async function main() {
  console.log('Seeding initial data for Bright Future School/College...')

  // 1. Seed Super Admin
  const defaultAdminEmail = 'admin@brightfuture.edu.np'
  const existingAdmin = await prisma.user.findUnique({
    where: { email: defaultAdminEmail },
  })

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('admin123', salt)

    await prisma.user.create({
      data: {
        email: defaultAdminEmail,
        password: hashedPassword,
        name: 'Super Admin',
        role: 'SUPER_ADMIN',
      },
    })
    console.log(`Default Super Admin created: ${defaultAdminEmail} (password: admin123)`)
  } else {
    console.log('Admin user already exists.')
  }

  // 2. Seed Default Site Settings
  const defaultSettings = [
    { key: 'school_name', value: 'Bright Future School / College' },
    { key: 'school_tagline', value: 'Empowering Young Minds for a Brighter Tomorrow' },
    { key: 'school_phone', value: '+977-1-4XXXXXX' },
    { key: 'school_email', value: 'info@brightfuture.edu.np' },
    { key: 'school_address', value: 'Kathmandu, Nepal' },
    { key: 'admissions_open', value: 'true' },
  ]

  for (const item of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: item.key },
      update: {},
      create: item,
    })
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
