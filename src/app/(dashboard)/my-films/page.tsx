'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Film, 
  Play, 
  Eye, 
  MessageCircle, 
  Star, 
  Edit, 
  Trash2, 
  Plus,
  Calendar,
  Clock,
  TrendingUp
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface FilmStats {
  reviews: number
  comments: number
  feedback: number
  views: number
}

interface MyFilm {
  id: string
  title: string
  description?: string
  genre?: string
  duration?: number
  videoUrl: string
  thumbnailUrl?: string
  feedbackMode: string
  isPublic: boolean
  viewCount: number
  averageRating?: number
  createdAt: string
  updatedAt: string
  stats: FilmStats
}

export default function MyFilmsPage() {
  const { data: session, status } = useSession()
  const [films, setFilms] = useState<MyFilm[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMyFilms()
    }
  }, [status])

  const fetchMyFilms = async () => {
    try {
      const response = await fetch('/api/films/my-films')
      if (!response.ok) {
        throw new Error('Failed to fetch films')
      }
      const data = await response.json()
      setFilms(data)
    } catch (error) {
      console.error('Error fetching films:', error)
      setError('Failed to load your films')
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'Unknown'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Film className="h-12 w-12 text-cinema-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-400">Loading your films...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    window.location.href = '/auth/signin'
    return null
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Film className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Button onClick={fetchMyFilms} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-heading text-gray-900 dark:text-white flex items-center">
                <Film className="mr-3 h-7 w-7 text-cinema-500" />
                My Films
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage and track your uploaded films
              </p>
            </div>
            <Link href="/upload">
              <Button variant="cinema" size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Upload New Film
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {films.length === 0 ? (
          // Empty state
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Film className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No films yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Start sharing your creative work with the CineCorner community. Upload your first film to get feedback and connect with other filmmakers.
            </p>
            <Link href="/upload">
              <Button variant="cinema" size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Upload Your First Film
              </Button>
            </Link>
          </motion.div>
        ) : (
          // Films grid
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Film className="h-8 w-8 text-cinema-500" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {films.length}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Films
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {films.reduce((sum, film) => sum + film.stats.views, 0)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Views
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {films.reduce((sum, film) => sum + film.stats.feedback, 0)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Feedback
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {films.reduce((sum, film) => sum + film.stats.reviews, 0)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Reviews
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Films List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {films.map((film, index) => (
                <motion.div
                  key={film.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="flex items-center space-x-2">
                            <span>{film.title}</span>
                            {!film.isPublic && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                Private
                              </span>
                            )}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {film.description || 'No description provided'}
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {/* Film metadata */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                          {film.genre && (
                            <span className="flex items-center">
                              <Film className="h-4 w-4 mr-1" />
                              {film.genre}
                            </span>
                          )}
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatDuration(film.duration)}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(film.createdAt)}
                          </span>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-4 text-sm">
                            <span className="flex items-center text-gray-600 dark:text-gray-400">
                              <Eye className="h-4 w-4 mr-1" />
                              {film.stats.views}
                            </span>
                            <span className="flex items-center text-gray-600 dark:text-gray-400">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {film.stats.feedback}
                            </span>
                            <span className="flex items-center text-gray-600 dark:text-gray-400">
                              <Star className="h-4 w-4 mr-1" />
                              {film.stats.reviews}
                            </span>
                          </div>
                          
                          {film.averageRating && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">
                                {film.averageRating.toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2 pt-2">
                          <Link href={`/film/${film.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              <Play className="mr-2 h-4 w-4" />
                              View Film
                            </Button>
                          </Link>
                          <Button variant="cinema" className="flex-1">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Analytics
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}