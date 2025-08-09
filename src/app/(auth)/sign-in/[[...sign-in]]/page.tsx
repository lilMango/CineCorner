'use client'

import { SignIn } from '@clerk/nextjs'
import { Film } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
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
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Continue your filmmaking journey
          </p>
        </div>

        {/* Clerk Sign In Component */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <SignIn 
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
            redirectUrl="/dashboard"
          />
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>New to CineCorner? 
            <Link href="/sign-up" className="text-cinema-500 hover:text-cinema-600 font-medium ml-1">
              Create an account
            </Link>
          </p>
        </div>

        {/* Features Reminder */}
        <div className="mt-8 bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Join the Community
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Share and discover amazing short films</li>
            <li>• Get constructive feedback from fellow filmmakers</li>
            <li>• Build your reputation as a trusted reviewer</li>
            <li>• Connect with collaborators and mentors</li>
          </ul>
        </div>
      </div>
    </div>
  )
}