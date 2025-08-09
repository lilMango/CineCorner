'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Upload, 
  Film, 
  Eye, 
  Star, 
  MessageCircle, 
  Users, 
  TrendingUp,
  Camera,
  Award,
  Calendar
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalFilms: 0,
    totalViews: 0,
    totalReviews: 0,
    averageRating: 0,
    followers: 0,
    following: 0,
  })

  // Mock data for now
  useEffect(() => {
    setUser({
      firstName: 'Alex',
      lastName: 'Rivera',
      username: 'alexfilms',
      isFilmmaker: true,
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces'
    })
    
    setStats({
      totalFilms: 8,
      totalViews: 2140,
      totalReviews: 45,
      averageRating: 4.2,
      followers: 127,
      following: 89,
    })
  }, [])

  const recentFilms = [
    {
      id: 1,
      title: "The Last Frame",
      views: 342,
      rating: 4.5,
      thumbnail: "https://images.unsplash.com/photo-1489599828711-a2db3012b49d?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Urban Echoes",
      views: 256,
      rating: 4.2,
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Midnight Coffee",
      views: 189,
      rating: 4.8,
      thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=200&fit=crop"
    }
  ]

  const recentActivity = [
    {
      type: 'review',
      message: 'Sarah Chen left a review on "The Last Frame"',
      time: '2 hours ago'
    },
    {
      type: 'follow',
      message: 'Marcus Rodriguez started following you',
      time: '5 hours ago'
    },
    {
      type: 'feedback',
      message: 'You received timestamped feedback on "Urban Echoes"',
      time: '1 day ago'
    }
  ]

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-heading text-gray-900 dark:text-white">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Ready to create something amazing today?
              </p>
            </div>
            <Link href="/upload">
              <Button variant="cinema" size="lg">
                <Upload className="mr-2 h-5 w-5" />
                Upload Film
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <Film className="h-8 w-8 text-cinema-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalFilms}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Films</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <Eye className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Views</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.averageRating}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <MessageCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalReviews}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Reviews</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.followers}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.following}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Films */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Camera className="mr-2 h-5 w-5" />
                    Your Recent Films
                  </CardTitle>
                  <Link href="/my-films">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFilms.map((film, index) => (
                    <motion.div
                      key={film.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      <img 
                        src={film.thumbnail} 
                        alt={film.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {film.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center">
                            <Eye className="mr-1 h-4 w-4" />
                            {film.views}
                          </span>
                          <span className="flex items-center">
                            <Star className="mr-1 h-4 w-4 text-yellow-500" />
                            {film.rating}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/upload">
                  <Button variant="cinema" className="w-full justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Film
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="mr-2 h-4 w-4" />
                    Explore Films
                  </Button>
                </Link>
                <Link href="/feedback-rooms">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Join Feedback Room
                  </Button>
                </Link>
                <Link href="/challenges">
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="mr-2 h-4 w-4" />
                    View Challenges
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cinema-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievement Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Next Achievement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>First 10 Films</span>
                      <span>8/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-cinema-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Upload 2 more films to earn the "Rising Creator" badge!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}