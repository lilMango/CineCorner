'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Home, LogIn } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <CardHeader className="pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </motion.div>
            
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Successfully Signed Out
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              You have been securely signed out of CineCorner
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Thank you for using CineCorner. We hope to see you again soon!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              
              <Link href="/auth/signin" className="flex-1">
                <Button variant="cinema" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In Again
                </Button>
              </Link>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Redirecting to home page in 5 seconds...
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}