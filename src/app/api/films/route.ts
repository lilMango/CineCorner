import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Check authentication - use real session
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user exists in database (after DB reset, JWT tokens may reference deleted users)
    const userExists = await db.user.findUnique({
      where: { id: session.user.id },
      select: { id: true }
    })
    
    if (!userExists) {
      return NextResponse.json(
        { error: 'User not found. Please sign out and sign in again.' },
        { status: 401 }
      )
    }

    const {
      title,
      description,
      genre,
      duration,
      videoUrl,
      videoKey,
      tags,
      feedbackMode,
      creatorNote,
      castCrew
    } = await request.json()

    // Validate required fields
    if (!title || !videoUrl) {
      return NextResponse.json(
        { error: 'Title and video URL are required' },
        { status: 400 }
      )
    }

    // Create the film in the database
    const film = await db.film.create({
      data: {
        title,
        description: description || null,
        genre: genre || null,
        duration: duration || null,
        videoUrl,
        // Note: We don't have a videoKey field in the schema, so we'll skip it for now
        tags: tags || [],
        feedbackMode: feedbackMode || 'OPEN',
        creatorNote: creatorNote || null,
        creatorId: session.user.id,
        isPublic: true,
        // Cast & crew will need to be created separately if needed
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    // Create cast & crew entries if provided
    if (castCrew && castCrew.length > 0) {
      await db.castCrew.createMany({
        data: castCrew.map((person: any) => ({
          filmId: film.id,
          name: person.name,
          role: person.role,
          // userId can be null if the person isn't on the platform
        }))
      })
    }

    return NextResponse.json(film)

  } catch (error) {
    console.error('Film creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create film' },
      { status: 500 }
    )
  }
}