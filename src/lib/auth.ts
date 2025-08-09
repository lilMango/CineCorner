import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'

export async function getCurrentUser() {
  const { userId } = auth()
  
  if (!userId) {
    return null
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        films: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
        },
        reviews: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
        },
        followers: true,
        following: true,
        badges: {
          include: {
            badge: true,
          },
        },
      },
    })

    return user
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}

export async function createUserIfNotExists(clerkUser: any) {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    })

    if (existingUser) {
      return existingUser
    }

    const user = await db.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        username: clerkUser.username || `user_${clerkUser.id.slice(-8)}`,
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
        imageUrl: clerkUser.imageUrl || '',
      },
    })

    return user
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export async function updateUserProfile(userId: string, data: {
  firstName?: string
  lastName?: string
  bio?: string
  location?: string
  website?: string
  isFilmmaker?: boolean
}) {
  try {
    const user = await db.user.update({
      where: {
        clerkId: userId,
      },
      data,
    })

    return user
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}