import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all films created by the current user
    const films = await db.film.findMany({
      where: {
        creatorId: session.user.id
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
          }
        },
        reviews: {
          select: {
            rating: true
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate average ratings and format response
    const filmsWithStats = films.map(film => ({
      ...film,
      averageRating: film.reviews.length > 0 
        ? film.reviews.reduce((sum, review) => sum + review.rating, 0) / film.reviews.length
        : null,
      stats: {
        reviews: film._count.reviews,
        comments: film._count.comments,
        feedback: film._count.feedback,
        views: film._count.watchlogs
      }
    }))

    return NextResponse.json(filmsWithStats)

  } catch (error) {
    console.error('Failed to fetch user films:', error)
    return NextResponse.json(
      { error: 'Failed to fetch films' },
      { status: 500 }
    )
  }
}