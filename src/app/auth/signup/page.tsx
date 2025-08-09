'use client'

import { signIn, getSession } from 'next-auth/react'
import { Film } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignUpPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push('/dashboard')
      }
    })
  }, [router])

  const handleGoogleSignUp = async () => {
    try {
      await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: true 
      })
    } catch (error) {
      console.error('Sign up error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <Film className="h-10 w-10 text-cinema-500" />
            <span className="text-2xl font-bold font-heading text-gradient">CineCorner</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Join CineCorner
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Start your filmmaking journey today
          </p>
        </div>

        {/* Sign Up Card */}
        <Card className="p-8">
          <div className="space-y-4">
            <Button
              onClick={handleGoogleSignUp}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 h-12"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </Button>
            
            <div className="text-xs text-gray-500 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Already have an account? 
            <Link href="/auth/signin" className="text-cinema-500 hover:text-cinema-600 font-medium ml-1">
              Sign in
            </Link>
          </p>
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            What you'll get:
          </p>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-cinema-500 rounded-full"></span>
              <span>Upload and showcase your short films</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-cinema-500 rounded-full"></span>
              <span>Get constructive feedback from the community</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-cinema-500 rounded-full"></span>
              <span>Discover amazing films from fellow creators</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-cinema-500 rounded-full"></span>
              <span>Join a supportive filmmaking community</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}