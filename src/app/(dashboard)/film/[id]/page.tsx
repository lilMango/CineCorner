'use client'

import { useState, useRef } from 'react'
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
  Plus
} from 'lucide-react'
import { motion } from 'framer-motion'
import ReactPlayer from 'react-player'

// Mock data - in real app this would come from API
const mockFilm = {
  id: '1',
  title: 'The Last Frame',
  description: 'A contemplative short film about a photographer discovering forgotten memories in an old camera. Shot entirely in natural light with minimal dialogue, it explores themes of nostalgia, loss, and the power of visual storytelling.',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  thumbnailUrl: 'https://images.unsplash.com/photo-1489599828711-a2db3012b49d?w=800&h=450&fit=crop',
  duration: 480, // 8 minutes
  genre: 'Drama',
  tags: ['minimal', 'photography', 'memory', 'experimental'],
  creator: {
    id: '1',
    name: 'Alex Rivera',
    username: 'alexfilms',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    location: 'Los Angeles, CA',
    isFollowing: false,
    followerCount: 127
  },
  stats: {
    views: 342,
    averageRating: 4.5,
    reviewCount: 12,
    bookmarkCount: 28
  },
  feedbackMode: 'OPEN',
  creatorNote: 'This is my first attempt at minimal storytelling. I\'m curious how the pacing feels and whether the emotion comes through without dialogue.',
  castCrew: [
    { name: 'Alex Rivera', role: 'Director' },
    { name: 'Maya Chen', role: 'Cinematographer' },
    { name: 'Jamie Torres', role: 'Lead Actor' },
    { name: 'Sam Wilson', role: 'Editor' }
  ],
  createdAt: new Date('2024-01-15'),
  hasWatched: false,
  userRating: null,
  isBookmarked: false
}

const mockFeedback = [
  {
    id: '1',
    content: 'The opening sequence is absolutely stunning. The way you use natural light to create mood is masterful - especially the scene where the protagonist first picks up the camera. The golden hour lighting perfectly captures the nostalgic feeling you\'re going for.',
    type: 'POSITIVE' as const,
    promptType: 'liked',
    author: {
      id: '2',
      name: 'Sarah Chen',
      username: 'sarahc',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=faces',
      isAnonymous: false
    },
    timestamp: 45,
    isPrivate: false,
    createdAt: new Date('2024-01-16'),
    helpfulVotes: 8,
    hasVoted: false
  },
  {
    id: '2',
    content: 'I felt really connected to the character when they discovered the old photographs. The close-up on their eyes at 3:24 conveys so much emotion without any dialogue - that\'s powerful filmmaking.',
    type: 'POSITIVE' as const,
    promptType: 'emotional',
    author: {
      id: '3',
      name: 'Marcus Rodriguez',
      username: 'marcusfilm',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
      isAnonymous: false
    },
    timestamp: 204,
    isPrivate: false,
    createdAt: new Date('2024-01-17'),
    helpfulVotes: 12,
    hasVoted: true
  },
  {
    id: '3',
    content: 'The pacing in the middle section (around 4-5 minutes) feels a bit slow. While I appreciate the contemplative nature, consider adding some subtle visual movement or changing the shot composition to maintain engagement during the reflection scenes.',
    type: 'SUGGESTION' as const,
    promptType: 'suggestion',
    author: {
      id: '4',
      name: 'Anonymous',
      username: 'anonymous',
      isAnonymous: true
    },
    isPrivate: false,
    createdAt: new Date('2024-01-18'),
    helpfulVotes: 5,
    hasVoted: false
  }
]

export default function FilmPage({ params }: { params: { id: string } }) {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasRated, setHasRated] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(mockFilm.isBookmarked)
  const [isFollowing, setIsFollowing] = useState(mockFilm.creator.isFollowing)
  const playerRef = useRef<ReactPlayer>(null)

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

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
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
                  url={mockFilm.videoUrl}
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
                    <CardTitle className="text-2xl mb-2">{mockFilm.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {formatDuration(mockFilm.duration)}
                      </span>
                      <span className="flex items-center">
                        <Eye className="mr-1 h-4 w-4" />
                        {mockFilm.stats.views} views
                      </span>
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {mockFilm.createdAt.toLocaleDateString()}
                      </span>
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
                            star <= (userRating || mockFilm.stats.averageRating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 group-hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {mockFilm.stats.averageRating} ({mockFilm.stats.reviewCount} reviews)
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-base leading-relaxed mb-4">
                  {mockFilm.description}
                </CardDescription>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mockFilm.tags.map(tag => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Creator Note */}
                {mockFilm.creatorNote && (
                  <div className="p-4 bg-cinema-50 dark:bg-cinema-900/20 rounded-lg border border-cinema-200 dark:border-cinema-800">
                    <h4 className="font-semibold text-cinema-800 dark:text-cinema-200 mb-2">
                      Creator's Note
                    </h4>
                    <p className="text-cinema-700 dark:text-cinema-300 text-sm">
                      {mockFilm.creatorNote}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cast & Crew */}
            <Card>
              <CardHeader>
                <CardTitle>Cast & Crew</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockFilm.castCrew.map((person, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {person.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {person.role}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feedback Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Community Feedback ({mockFeedback.length})
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
                <FeedbackList 
                  feedback={mockFeedback}
                  onReply={(id) => console.log('Reply to:', id)}
                  onVote={(id, helpful) => console.log('Vote:', id, helpful)}
                  onReport={(id) => console.log('Report:', id)}
                />
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
                  <img 
                    src={mockFilm.creator.imageUrl} 
                    alt={mockFilm.creator.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {mockFilm.creator.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      @{mockFilm.creator.username}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {mockFilm.creator.location}
                  </span>
                  <span className="flex items-center">
                    <User className="mr-1 h-4 w-4" />
                    {mockFilm.creator.followerCount} followers
                  </span>
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
                  <span className="font-medium">{mockFilm.stats.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Average Rating</span>
                  <span className="font-medium">{mockFilm.stats.averageRating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Reviews</span>
                  <span className="font-medium">{mockFilm.stats.reviewCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Bookmarks</span>
                  <span className="font-medium">{mockFilm.stats.bookmarkCount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Related Films */}
            <Card>
              <CardHeader>
                <CardTitle>More from {mockFilm.creator.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="flex space-x-3">
                    <img 
                      src={`https://images.unsplash.com/photo-${1440000000000 + i}?w=80&h=60&fit=crop`}
                      alt="Film thumbnail"
                      className="w-20 h-15 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                        Sample Film {i}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        3:24 • 4.2★
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        filmTitle={mockFilm.title}
        filmId={mockFilm.id}
        currentTime={currentTime}
      />
    </div>
  )
}