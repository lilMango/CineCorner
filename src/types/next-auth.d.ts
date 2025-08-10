import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      image?: string
      username?: string
      firstName?: string
      lastName?: string
      bio?: string
      location?: string
      website?: string
      isFilmmaker?: boolean
      createdAt?: Date
    }
  }

  interface User {
    id: string
    email: string
    name?: string
    image?: string
    username?: string
    firstName?: string
    lastName?: string
    bio?: string
    location?: string
    website?: string
    isFilmmaker?: boolean
    createdAt?: Date
  }
}