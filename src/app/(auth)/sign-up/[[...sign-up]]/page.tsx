'use client'

import { SignUp } from '@clerk/nextjs'
import { Film, Camera, Users, Star } from 'lucide-react'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8">
        {/* Sign Up Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
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

          {/* Clerk Sign Up Component */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: 'cinema-gradient hover:opacity-90',
                  card: 'shadow-none',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton: 'border-gray-200 hover:bg-gray-50',
                  formFieldInput: 'form-input',
                }
              }}
              redirectUrl="/onboarding"
            />
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Already have an account? 
              <Link href="/sign-in" className="text-cinema-500 hover:text-cinema-600 font-medium ml-1">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="hidden lg:block space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-4">
              Why Join <span className="text-gradient">CineCorner?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              A platform designed by filmmakers, for filmmakers
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="bg-cinema-100 dark:bg-cinema-900 p-3 rounded-lg">
                  <Camera className="h-6 w-6 text-cinema-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Showcase Your Work
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Upload short films, behind-the-scenes content, and video essays. 
                    Build a portfolio that tells your story as a filmmaker.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="bg-cinema-100 dark:bg-cinema-900 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-cinema-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Constructive Community
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Get guided feedback from fellow creators. Our structured approach 
                    ensures you receive actionable, growth-oriented criticism.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="bg-cinema-100 dark:bg-cinema-900 p-3 rounded-lg">
                  <Star className="h-6 w-6 text-cinema-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Safe Space to Grow
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Private feedback rooms, anonymous options, and community guidelines 
                    that prioritize emotional safety and creative growth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cinema-500 to-cinema-600 rounded-lg p-6 text-white text-center">
            <h3 className="font-bold mb-2">Join 2,500+ Filmmakers</h3>
            <p className="text-cinema-100 text-sm">
              From film students to industry professionals, our community 
              is dedicated to helping each other grow.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}