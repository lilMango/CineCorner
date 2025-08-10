'use client'

import { useState, useRef, useEffect } from 'react'
import { useFeedback } from '@/hooks/useFeedback'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import FeedbackModal from '@/features/feedback/components/FeedbackModal'
import FeedbackList from '@/features/feedback/components/FeedbackList'
import { 
  Play, 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark,
  Star,
  Eye,
  Calendar,
  User,
  MapPin,
  Tag,
  Clock,
  ChevronRight,
  Plus,
  Film
} from 'lucide-react'
import { motion } from 'framer-motion'
import ReactPlayer from 'react-player'

interface Film {
  id: string
  title: string
  description?: string
  videoUrl: string
  videoKey: string
  thumbnailUrl?: string
  duration?: number
  genre?: string
  tags: string[]
  feedbackMode: string
  creatorNote?: string
  isPublic: boolean
  viewCount: number
  createdAt: string
  updatedAt: string
  creator: {
    id: string
    name?: string
    username?: string
    email: string
    image?: string
  }
  feedback: Array<{
    id: string
    content: string
    type: string
    promptType?: string
    timestamp?: number
    isPrivate: boolean
    isAnonymous: boolean
    createdAt: string
    author: {
      id: string
      name?: string
      username?: string
      image?: string
    } | null
  }>
  stats: {
    views: number
    averageRating?: number
    reviewCount: number
    feedbackCount: number
    commentCount: number
    bookmarkCount: number
  }
}

export default function FilmPage({ params }: { params: { id: string } }) {
  const [film, setFilm] = useState<Film | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasRated, setHasRated] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const playerRef = useRef<ReactPlayer>(null)
  
  // Use our feedback hook
  const { feedback, isLoading: feedbackLoading, refreshFeedback } = useFeedback(params.id)

  // Fetch film data
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/films/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch film')
        }
        const filmData = await response.json()
        setFilm(filmData)
      } catch (error) {
        console.error('Error fetching film:', error)
        setError('Failed to load film')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchFilm()
    }
  }, [params.id])

  const handleFeedbackClick = () => {
    const player = playerRef.current
    const currentTime = player ? player.getCurrentTime() : 0
    setCurrentTime(currentTime)
    setShowFeedbackModal(true)
  }

  const handleRating = (rating: number) => {
    setUserRating(rating)
    setHasRated(true)
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
      month: 'long',
      day: 'numeric'
    })
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Film className="h-12 w-12 text-cinema-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-400">Loading film...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !film) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Film className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400">{error || 'Film not found'}</p>
          <Button onClick={() => window.history.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-black relative">
                <ReactPlayer
                  ref={playerRef}
                  url={film.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
                />
                
                {/* Feedback Button Overlay */}
                <div className="absolute bottom-4 right-4">
                  <Button
                    onClick={handleFeedbackClick}
                    variant="cinema"
                    size="sm"
                    className="shadow-lg"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Give Feedback
                  </Button>
                </div>
              </div>
            </Card>

            {/* Film Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{film.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {formatDuration(film.duration)}
                      </span>
                      <span className="flex items-center">
                        <Eye className="mr-1 h-4 w-4" />
                        {film.stats.views} views
                      </span>
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {formatDate(film.createdAt)}
                      </span>
                      {film.genre && (
                        <span className="flex items-center">
                          <Film className="mr-1 h-4 w-4" />
                          {film.genre}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={isBookmarked ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                      <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      {isBookmarked ? 'Saved' : 'Save'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        className="group"
                      >
                        <Star 
                          className={`h-6 w-6 transition-colors ${
                            star <= (userRating || film.stats.averageRating || 0)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 group-hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {film.stats.averageRating ? film.stats.averageRating.toFixed(1) : 'No rating'} ({film.stats.reviewCount} reviews)
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-base leading-relaxed mb-4">
                  {film.description || 'No description provided'}
                </CardDescription>

                {/* Tags */}
                {film.tags && film.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {film.tags.map(tag => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Creator Note */}
                {film.creatorNote && (
                  <div className="p-4 bg-cinema-50 dark:bg-cinema-900/20 rounded-lg border border-cinema-200 dark:border-cinema-800">
                    <h4 className="font-semibold text-cinema-800 dark:text-cinema-200 mb-2">
                      Creator's Note
                    </h4>
                    <p className="text-cinema-700 dark:text-cinema-300 text-sm">
                      {film.creatorNote}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>



            {/* Feedback Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Community Feedback ({film.feedback.length})
                  </CardTitle>
                  <Button variant="cinema" onClick={handleFeedbackClick}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feedback
                  </Button>
                </div>
                <CardDescription>
                  Constructive feedback from the CineCorner community
                </CardDescription>
              </CardHeader>
              <CardContent>
                {film.feedback.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      No feedback yet. Be the first to share your thoughts!
                    </p>
                  </div>
                ) : (
                  <FeedbackList 
                    feedback={film.feedback.map(item => ({
                      ...item,
                      type: (item.type as "POSITIVE" | "CONSTRUCTIVE" | "QUESTION" | "SUGGESTION" | "TECHNICAL") || "CONSTRUCTIVE",
                      author: item.author ? {
                        ...item.author,
                        imageUrl: item.author.image,
                        isAnonymous: item.isAnonymous
                      } : {
                        id: 'anonymous',
                        name: 'Anonymous',
                        username: 'anonymous',
                        isAnonymous: true
                      },
                      createdAt: new Date(item.createdAt),
                      helpfulVotes: 0, // TODO: Implement helpful votes
                      hasVoted: false  // TODO: Implement user vote tracking
                    }))}
                    onReply={(id) => console.log('Reply to:', id)}
                    onVote={(id, helpful) => console.log('Vote:', id, helpful)}
                    onReport={(id) => console.log('Report:', id)}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Creator Info */}
            <Card>
              <CardHeader>
                <CardTitle>Filmmaker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-cinema-500 flex items-center justify-center text-white font-semibold">
                    {film.creator.name ? film.creator.name.charAt(0).toUpperCase() : film.creator.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {film.creator.name || film.creator.email}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      @{film.creator.username || film.creator.email.split('@')[0]}
                    </p>
                  </div>
                </div>

                <Button 
                  variant={isFollowing ? "outline" : "cinema"} 
                  className="w-full"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Film Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Views</span>
                  <span className="font-medium">{film.stats.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Average Rating</span>
                  <span className="font-medium">
                    {film.stats.averageRating ? film.stats.averageRating.toFixed(1) : 'No rating'}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Reviews</span>
                  <span className="font-medium">{film.stats.reviewCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Feedback</span>
                  <span className="font-medium">{film.stats.feedbackCount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-cinema-500" />
                    Feedback ({feedback.length})
                  </CardTitle>
                  <Button 
                    variant="cinema"
                    size="sm"
                    onClick={handleFeedbackClick}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Give Feedback
                  </Button>
                </div>
                <CardDescription>
                  Share specific, constructive feedback to help this film grow
                </CardDescription>
              </CardHeader>
              <CardContent>
                {feedbackLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cinema-500 mx-auto"></div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Loading feedback...</p>
                  </div>
                ) : (
                  <FeedbackList 
                    feedback={feedback.map(item => ({
                      ...item,
                      author: item.author ? {
                        ...item.author,
                        imageUrl: item.author.image,
                        isAnonymous: item.isAnonymous
                      } : {
                        id: 'anonymous',
                        name: 'Anonymous',
                        username: 'anonymous',
                        isAnonymous: true
                      },
                      createdAt: new Date(item.createdAt),
                      helpfulVotes: 0, // TODO: Implement helpful votes
                      hasVoted: false  // TODO: Implement user vote tracking
                    }))}
                    onReply={(feedbackId) => {
                      // TODO: Implement reply functionality
                      console.log('Reply to feedback:', feedbackId)
                    }}
                    onVote={(feedbackId, helpful) => {
                      // TODO: Implement voting functionality
                      console.log('Vote on feedback:', feedbackId, helpful)
                    }}
                    onReport={(feedbackId) => {
                      // TODO: Implement report functionality
                      console.log('Report feedback:', feedbackId)
                    }}
                  />
                )}
              </CardContent>
            </Card>

            {/* Related Films */}
            <Card>
              <CardHeader>
                <CardTitle>More from {film.creator.name || film.creator.email}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <Film className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No other films yet
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => {
          setShowFeedbackModal(false)
          refreshFeedback() // Refresh feedback list when modal closes
        }}
        filmTitle={film.title}
        filmId={film.id}
        currentTime={currentTime}
      />
    </div>
  )
}