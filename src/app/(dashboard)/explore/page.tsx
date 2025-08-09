'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search,
  Filter,
  TrendingUp,
  Star,
  Eye,
  Clock,
  User,
  Play,
  Bookmark,
  Heart,
  MessageCircle,
  Calendar,
  Award,
  Film,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Mock data for films
const featuredFilms = [
  {
    id: '1',
    title: 'The Last Frame',
    description: 'A contemplative short about memory and photography',
    thumbnailUrl: 'https://images.unsplash.com/photo-1489599828711-a2db3012b49d?w=400&h=300&fit=crop',
    creator: { name: 'Alex Rivera', username: 'alexfilms' },
    duration: 480,
    views: 342,
    rating: 4.5,
    genre: 'Drama',
    tags: ['minimal', 'photography', 'memory'],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Urban Echoes',
    description: 'Sound design exploration in the concrete jungle',
    thumbnailUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop',
    creator: { name: 'Maya Chen', username: 'mayac' },
    duration: 360,
    views: 256,
    rating: 4.2,
    genre: 'Experimental',
    tags: ['sound', 'urban', 'experimental'],
    createdAt: new Date('2024-01-12')
  },
  {
    id: '3',
    title: 'Coffee & Dreams',
    description: 'Late night conversations in a 24-hour diner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop',
    creator: { name: 'Jordan Kim', username: 'jordanfilms' },
    duration: 720,
    views: 189,
    rating: 4.8,
    genre: 'Drama',
    tags: ['dialogue', 'character-study', 'intimate'],
    createdAt: new Date('2024-01-10')
  }
]

const curatedLists = [
  {
    id: '1',
    title: 'Microbudget Masterpieces',
    description: 'Incredible films made for under $1000',
    curator: 'Sarah Chen',
    filmCount: 12,
    thumbnails: [
      'https://images.unsplash.com/photo-1489599828711-a2db3012b49d?w=100&h=75&fit=crop',
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=100&h=75&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=75&fit=crop'
    ]
  },
  {
    id: '2',
    title: 'Student Film Showcase',
    description: 'Best films from film schools worldwide',
    curator: 'Marcus Rodriguez',
    filmCount: 8,
    thumbnails: [
      'https://images.unsplash.com/photo-1489599828711-a2db3012b49d?w=100&h=75&fit=crop',
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=100&h=75&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=75&fit=crop'
    ]
  },
  {
    id: '3',
    title: 'Emotional Journeys',
    description: 'Films that make you feel everything',
    curator: 'Aisha Patel',
    filmCount: 15,
    thumbnails: [
      'https://images.unsplash.com/photo-1489599828711-a2db3012b49d?w=100&h=75&fit=crop',
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=100&h=75&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=75&fit=crop'
    ]
  }
]

const trendingCreators = [
  {
    id: '1',
    name: 'Alex Rivera',
    username: 'alexfilms',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    filmCount: 8,
    totalViews: 2140,
    followers: 127,
    latestFilm: 'The Last Frame'
  },
  {
    id: '2',
    name: 'Maya Chen',
    username: 'mayac',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=faces',
    filmCount: 12,
    totalViews: 3240,
    followers: 89,
    latestFilm: 'Urban Echoes'
  },
  {
    id: '3',
    name: 'Jordan Kim',
    username: 'jordanfilms',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    filmCount: 6,
    totalViews: 1890,
    followers: 156,
    latestFilm: 'Coffee & Dreams'
  }
]

const challenges = [
  {
    id: '1',
    title: 'One Location Challenge',
    description: 'Create a compelling story using only one location',
    deadline: new Date('2024-02-15'),
    participants: 34,
    prize: 'Featured on homepage'
  },
  {
    id: '2',
    title: 'No Dialogue February',
    description: 'Tell a story without any spoken words',
    deadline: new Date('2024-02-28'),
    participants: 18,
    prize: 'Community choice award'
  }
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('films')

  const tabs = [
    { id: 'films', label: 'Films', icon: Film },
    { id: 'creators', label: 'Creators', icon: User },
    { id: 'lists', label: 'Lists', icon: Bookmark },
    { id: 'challenges', label: 'Challenges', icon: Award }
  ]

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'drama', label: 'Drama' },
    { id: 'comedy', label: 'Comedy' },
    { id: 'experimental', label: 'Experimental' },
    { id: 'documentary', label: 'Documentary' },
    { id: 'animation', label: 'Animation' }
  ]

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m`
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-heading text-gray-900 dark:text-white flex items-center">
                <Search className="mr-3 h-7 w-7 text-cinema-500" />
                Explore
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Discover amazing films and connect with creators
              </p>
            </div>

            {/* Search */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search films, creators, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-800 text-cinema-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'films' && (
          <div className="space-y-8">
            {/* Featured Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-heading text-gray-900 dark:text-white flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-cinema-500" />
                  Trending This Week
                </h2>
                <Link href="/trending">
                  <Button variant="ghost" size="sm">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredFilms.map((film, index) => (
                  <motion.div
                    key={film.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                      <div className="relative">
                        <img 
                          src={film.thumbnailUrl} 
                          alt={film.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                          {formatDuration(film.duration)}
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                          {film.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {film.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                          <span className="flex items-center">
                            <User className="mr-1 h-3 w-3" />
                            {film.creator.name}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {formatTimeAgo(film.createdAt)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-400">
                            <span className="flex items-center">
                              <Eye className="mr-1 h-3 w-3" />
                              {film.views}
                            </span>
                            <span className="flex items-center">
                              <Star className="mr-1 h-3 w-3 text-yellow-500" />
                              {film.rating}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {film.tags.slice(0, 2).map(tag => (
                            <span 
                              key={tag}
                              className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {film.tags.length > 2 && (
                            <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                              +{film.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Genre Filters */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">Filter by genre:</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedFilter === filter.id
                          ? 'bg-cinema-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'creators' && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-2">
                Trending Creators
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover filmmakers making waves in the community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingCreators.map((creator, index) => (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <img 
                      src={creator.imageUrl} 
                      alt={creator.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {creator.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      @{creator.username}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {creator.filmCount}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Films</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {creator.totalViews.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Views</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {creator.followers}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Followers</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Latest: <span className="text-cinema-600">{creator.latestFilm}</span>
                    </p>
                    
                    <Button variant="cinema" size="sm" className="w-full">
                      Follow
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'lists' && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-2">
                Curated Collections
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Hand-picked film collections by community members
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {curatedLists.map((list, index) => (
                <motion.div
                  key={list.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-4 pb-0">
                      <div className="flex -space-x-2 mb-4">
                        {list.thumbnails.map((thumb, i) => (
                          <img 
                            key={i}
                            src={thumb} 
                            alt="Film thumbnail"
                            className="w-16 h-12 object-cover rounded border-2 border-white dark:border-gray-800"
                          />
                        ))}
                        <div className="w-16 h-12 bg-gray-100 dark:bg-gray-700 rounded border-2 border-white dark:border-gray-800 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            +{list.filmCount - 3}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="pt-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {list.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {list.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          By {list.curator}
                        </span>
                        <span className="text-cinema-600 font-medium">
                          {list.filmCount} films
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'challenges' && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-2">
                Community Challenges
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Join creative challenges and grow your skills
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Award className="h-8 w-8 text-cinema-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {challenge.participants} participants
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {challenge.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Prize: {challenge.prize}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Deadline: {challenge.deadline.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="cinema" className="w-full">
                      Join Challenge
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}