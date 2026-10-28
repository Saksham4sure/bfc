import prisma from '../config/db.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

// Default fallback items if database has not yet been seeded
export const DEFAULT_NAV_ITEMS = [
  { label: 'Home', path: '/', order: 0, children: [] },
  { label: 'About Us', path: '/about', order: 1, children: [] },
  {
    label: 'Academics & Programs',
    path: '/academics',
    order: 2,
    children: [
      { label: 'School (Grades 1 - 10)', path: '/academics#school', order: 0 },
      { label: '+2 Science Stream', path: '/academics#science', order: 1 },
      { label: '+2 Management Stream', path: '/academics#management', order: 2 },
      { label: '+2 Humanities & Law', path: '/academics#humanities', order: 3 },
    ],
  },
  { label: 'Admissions', path: '/admissions', order: 3, children: [] },
  { label: 'Notices', path: '/notices', order: 4, children: [] },
  { label: 'Gallery', path: '/gallery', order: 5, children: [] },
  { label: 'Contact', path: '/contact', order: 6, children: [] },
]

export const getPublicNavItems = async (req, res, next) => {
  try {
    const items = await prisma.navItem.findMany({
      where: {
        parentId: null,
        isActive: true,
      },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    })

    if (items.length === 0) {
      return sendSuccess(res, 'Default navigation loaded', { navItems: DEFAULT_NAV_ITEMS })
    }

    return sendSuccess(res, 'Navigation items retrieved successfully', { navItems: items })
  } catch (error) {
    next(error)
  }
}

export const getAllNavItems = async (req, res, next) => {
  try {
    const items = await prisma.navItem.findMany({
      where: { parentId: null },
      include: {
        children: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    })

    return sendSuccess(res, 'All nav items retrieved', { navItems: items })
  } catch (error) {
    next(error)
  }
}

export const createNavItem = async (req, res, next) => {
  try {
    const { label, path, order, parentId, isActive } = req.body

    if (!label) {
      return sendError(res, 'Label is required', 400)
    }

    const item = await prisma.navItem.create({
      data: {
        label,
        path: path || null,
        order: order !== undefined ? parseInt(order, 10) : 0,
        parentId: parentId || null,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
      include: {
        children: true,
      },
    })

    return sendSuccess(res, 'Navigation item created successfully', { navItem: item }, 201)
  } catch (error) {
    next(error)
  }
}

export const updateNavItem = async (req, res, next) => {
  try {
    const { id } = req.params
    const { label, path, order, parentId, isActive } = req.body

    const existing = await prisma.navItem.findUnique({ where: { id } })
    if (!existing) {
      return sendError(res, 'Navigation item not found', 404)
    }

    const updated = await prisma.navItem.update({
      where: { id },
      data: {
        ...(label !== undefined && { label }),
        ...(path !== undefined && { path }),
        ...(order !== undefined && { order: parseInt(order, 10) }),
        ...(parentId !== undefined && { parentId: parentId || null }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
      },
      include: {
        children: true,
      },
    })

    return sendSuccess(res, 'Navigation item updated successfully', { navItem: updated })
  } catch (error) {
    next(error)
  }
}

export const deleteNavItem = async (req, res, next) => {
  try {
    const { id } = req.params

    const existing = await prisma.navItem.findUnique({ where: { id } })
    if (!existing) {
      return sendError(res, 'Navigation item not found', 404)
    }

    await prisma.navItem.delete({ where: { id } })

    return sendSuccess(res, 'Navigation item deleted successfully')
  } catch (error) {
    next(error)
  }
}
