import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const filmId = params.id

    if (!filmId) {
      return NextResponse.json({ error: 'Film ID is required' }, { status: 400 })
    }

    const film = await db.film.findUnique({
      where: {
        id: filmId
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            image: true,
            // Add any other creator fields you want to include
          }
        },
        reviews: {
          select: {
            rating: true
          }
        },
        feedback: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            reviews: true,
            comments: true,
            feedback: true,
            watchlogs: true
          }
        }
      }
    })

    if (!film) {
      return NextResponse.json({ error: 'Film not found' }, { status: 404 })
    }

    // Calculate average rating
    const averageRating = film.reviews.length > 0 
      ? film.reviews.reduce((sum, review) => sum + review.rating, 0) / film.reviews.length
      : null

    // Format the response
    const formattedFilm = {
      ...film,
      averageRating,
      stats: {
        views: film._count.watchlogs,
        averageRating,
        reviewCount: film._count.reviews,
        feedbackCount: film._count.feedback,
        commentCount: film._count.comments,
        bookmarkCount: 0 // TODO: Implement bookmarks if needed
      }
    }

    return NextResponse.json(formattedFilm)

  } catch (error) {
    console.error('Failed to fetch film:', error)
    return NextResponse.json(
      { error: 'Failed to fetch film' },
      { status: 500 }
    )
  }
}