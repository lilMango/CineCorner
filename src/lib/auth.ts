import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // On sign in, add user info to token
      if (user) {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            username: true,
            firstName: true,
            lastName: true,
            bio: true,
            location: true,
            website: true,
            isFilmmaker: true,
            createdAt: true,
          },
        })

        if (dbUser) {
          // If username is missing, generate one
          if (!dbUser.username) {
            const baseUsername = 
              dbUser.name?.toLowerCase().replace(/\s+/g, '') || 
              dbUser.email?.split('@')[0] || 
              'user'
            
            let username = baseUsername
            let counter = 1
            while (await db.user.findUnique({ where: { username } })) {
              username = `${baseUsername}${counter}`
              counter++
            }

            // Update the user with username
            await db.user.update({
              where: { id: user.id },
              data: { username },
            })
            dbUser.username = username
          }
          
          token.user = dbUser
        }
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token.user) {
        session.user = token.user as any
      }
      return session
    },
    async signIn({ user, account, profile }) {
      return true // Let Prisma adapter handle user creation
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}