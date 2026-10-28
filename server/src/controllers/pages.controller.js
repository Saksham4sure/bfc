import prisma from '../config/db.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

/**
 * Get content for a specific page slug (e.g. 'home', 'about', 'academics')
 */
export const getPageContent = async (req, res, next) => {
  try {
    const { slug } = req.params
    const key = `page_${slug}`

    const record = await prisma.siteSetting.findUnique({
      where: { key },
    })

    if (!record) {
      return sendSuccess(res, `No custom content found for page: ${slug}`, {
        slug,
        content: null,
      })
    }

    let parsedContent = null
    try {
      parsedContent = JSON.parse(record.value)
    } catch {
      parsedContent = record.value
    }

    return sendSuccess(res, `Page content for ${slug} retrieved`, {
      slug,
      content: parsedContent,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get all CMS pages content
 */
export const getAllPagesContent = async (req, res, next) => {
  try {
    const records = await prisma.siteSetting.findMany({
      where: {
        key: {
          startsWith: 'page_',
        },
      },
    })

    const pages = {}
    for (const rec of records) {
      const slug = rec.key.replace(/^page_/, '')
      try {
        pages[slug] = JSON.parse(rec.value)
      } catch {
        pages[slug] = rec.value
      }
    }

    return sendSuccess(res, 'All pages content retrieved', { pages })
  } catch (error) {
    next(error)
  }
}

/**
 * Update content for a specific page slug
 */
export const updatePageContent = async (req, res, next) => {
  try {
    const { slug } = req.params
    const content = req.body
    const key = `page_${slug}`

    if (!content || typeof content !== 'object') {
      return sendError(res, 'Content payload must be a valid JSON object', 400)
    }

    const valueString = JSON.stringify(content)

    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: valueString },
      create: { key, value: valueString },
    })

    return sendSuccess(res, `Page content for ${slug} updated successfully`, {
      slug,
      content,
    })
  } catch (error) {
    next(error)
  }
}
