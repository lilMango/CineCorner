import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
})

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user exists in database
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

    const { id } = params

    // Get the film with all necessary data for deletion
    const film = await db.film.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        creatorId: true,
        videoKey: true,
        thumbnailKey: true,
        _count: {
          select: {
            feedback: true,
            reviews: true,
            comments: true,
          },
        },
      },
    })

    if (!film) {
      return NextResponse.json({ error: 'Film not found' }, { status: 404 })
    }

    // Check if user is the creator
    if (film.creatorId !== session.user.id) {
      return NextResponse.json(
        { error: 'Only the film creator can delete this film' },
        { status: 403 }
      )
    }

    // Delete files from R2 storage
    const deletePromises = []

    if (film.videoKey) {
      deletePromises.push(
        s3Client.send(new DeleteObjectCommand({
          Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
          Key: film.videoKey,
        }))
      )
    }

    if (film.thumbnailKey) {
      deletePromises.push(
        s3Client.send(new DeleteObjectCommand({
          Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
          Key: film.thumbnailKey,
        }))
      )
    }

    // Execute file deletions (non-blocking - continue even if files fail to delete)
    try {
      await Promise.all(deletePromises)
    } catch (fileError) {
      console.warn('Some files could not be deleted from R2:', fileError)
      // Continue with database deletion even if file deletion fails
    }

    // Delete the film from database (this will cascade delete related records)
    await db.film.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: `Film "${film.title}" deleted successfully`,
      deletedCounts: {
        feedback: film._count.feedback,
        reviews: film._count.reviews,
        comments: film._count.comments,
      },
    })

  } catch (error) {
    console.error('Delete film error:', error)
    return NextResponse.json(
      { error: 'Failed to delete film' },
      { status: 500 }
    )
  }
}