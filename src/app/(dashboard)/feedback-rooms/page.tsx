'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users,
  Plus,
  Lock,
  Globe,
  Settings,
  Crown,
  User,
  Calendar,
  MessageCircle,
  Eye,
  Star,
  Search,
  Filter,
  Shield,
  Heart,
  Camera
} from 'lucide-react'
import { motion } from 'framer-motion'

// Mock data for feedback rooms
const myRooms = [
  {
    id: '1',
    name: 'First-Time Filmmakers',
    description: 'A supportive space for new creators to get gentle feedback on their early work',
    memberCount: 8,
    role: 'OWNER',
    isPrivate: true,
    recentActivity: '2 hours ago',
    pendingFilms: 2,
    members: [
      { name: 'Alex Rivera', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=faces' },
      { name: 'Sarah Chen', imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=faces' },
      { name: 'Maya Johnson', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=faces' }
    ]
  },
  {
    id: '2',
    name: 'Experimental Film Lab',
    description: 'Push boundaries and explore unconventional storytelling techniques',
    memberCount: 12,
    role: 'MEMBER',
    isPrivate: false,
    recentActivity: '1 day ago',
    pendingFilms: 0,
    members: [
      { name: 'Jordan Kim', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=faces' },
      { name: 'Maria Garcia', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=faces' },
      { name: 'David Park', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=faces' }
    ]
  },
  {
    id: '3',
    name: 'Horror Short Specialists',
    description: 'Master the art of fear in short form content',
    memberCount: 6,
    role: 'MODERATOR',
    isPrivate: true,
    recentActivity: '3 days ago',
    pendingFilms: 1,
    members: [
      { name: 'Emma Wilson', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=faces' },
      { name: 'Chris Brown', imageUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=50&h=50&fit=crop&crop=faces' }
    ]
  }
]

const discoverRooms = [
  {
    id: '4',
    name: 'Documentary Storytellers',
    description: 'Real stories, real impact - feedback for documentary filmmakers',
    memberCount: 24,
    isPrivate: false,
    tags: ['documentary', 'social-impact', 'interviews'],
    recentActivity: '30 minutes ago',
    owner: 'Marcus Rodriguez'
  },
  {
    id: '5',
    name: 'Animation Corner',
    description: 'From 2D to 3D, traditional to digital - all animation welcome',
    memberCount: 18,
    isPrivate: false,
    tags: ['animation', '2d', '3d', 'stop-motion'],
    recentActivity: '4 hours ago',
    owner: 'Yuki Tanaka'
  },
  {
    id: '6',
    name: 'Music Video Collective',
    description: 'Visual storytelling meets musical expression',
    memberCount: 15,
    isPrivate: false,
    tags: ['music-video', 'performance', 'editing'],
    recentActivity: '6 hours ago',
    owner: 'Nina Petrov'
  },
  {
    id: '7',
    name: 'Student Film Network',
    description: 'Connect with fellow film students and share academic projects',
    memberCount: 42,
    isPrivate: false,
    tags: ['student', 'academic', 'learning'],
    recentActivity: '1 hour ago',
    owner: 'Film School Network'
  },
  {
    id: '8',
    name: 'Queer Cinema Collective',
    description: 'LGBTQ+ stories deserve authentic, supportive feedback',
    memberCount: 31,
    isPrivate: true,
    tags: ['lgbtq', 'representation', 'inclusive'],
    recentActivity: '2 hours ago',
    owner: 'Pride Films'
  }
]

const roomTemplates = [
  {
    id: 'supportive',
    name: 'Supportive Circle',
    description: 'Gentle feedback for sensitive creators',
    icon: Heart,
    color: 'text-pink-500 bg-pink-50 border-pink-200'
  },
  {
    id: 'professional',
    name: 'Professional Review',
    description: 'Industry-standard critique',
    icon: Star,
    color: 'text-blue-500 bg-blue-50 border-blue-200'
  },
  {
    id: 'collaborative',
    name: 'Collaboration Hub',
    description: 'Find partners and grow together',
    icon: Users,
    color: 'text-green-500 bg-green-50 border-green-200'
  },
  {
    id: 'genre',
    name: 'Genre-Specific',
    description: 'Focus on particular film styles',
    icon: Camera,
    color: 'text-purple-500 bg-purple-50 border-purple-200'
  }
]

export default function FeedbackRoomsPage() {
  const [activeTab, setActiveTab] = useState('my-rooms')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const tabs = [
    { id: 'my-rooms', label: 'My Rooms', count: myRooms.length },
    { id: 'discover', label: 'Discover', count: discoverRooms.length },
    { id: 'invites', label: 'Invites', count: 3 }
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'OWNER': return <Crown className="h-4 w-4 text-yellow-500" />
      case 'MODERATOR': return <Shield className="h-4 w-4 text-blue-500" />
      default: return <User className="h-4 w-4 text-gray-500" />
    }
  }

  const formatTimeAgo = (timeStr: string) => {
    return timeStr
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-heading text-gray-900 dark:text-white flex items-center">
                <Users className="mr-3 h-7 w-7 text-cinema-500" />
                Feedback Rooms
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Safe spaces for honest, constructive feedback and collaboration
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="cinema" onClick={() => setShowCreateModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Room
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
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'my-rooms' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-cinema-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{myRooms.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rooms Joined</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {myRooms.filter(room => room.role === 'OWNER').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rooms Owned</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {myRooms.reduce((sum, room) => sum + room.pendingFilms, 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pending Reviews</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Review Rating</div>
                </CardContent>
              </Card>
            </div>

            {/* My Rooms */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center">
                            {room.isPrivate ? (
                              <Lock className="mr-2 h-4 w-4 text-gray-500" />
                            ) : (
                              <Globe className="mr-2 h-4 w-4 text-green-500" />
                            )}
                            {room.name}
                          </CardTitle>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getRoleIcon(room.role)}
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        {room.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      {/* Members Preview */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-2">
                            {room.members.slice(0, 3).map((member, i) => (
                              <img 
                                key={i}
                                src={member.imageUrl} 
                                alt={member.name}
                                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                                title={member.name}
                              />
                            ))}
                            {room.memberCount > 3 && (
                              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                  +{room.memberCount - 3}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {room.memberCount} members
                          </span>
                        </div>
                      </div>

                      {/* Activity & Status */}
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {formatTimeAgo(room.recentActivity)}
                        </span>
                        {room.pendingFilms > 0 && (
                          <span className="flex items-center text-cinema-600">
                            <Eye className="mr-1 h-3 w-3" />
                            {room.pendingFilms} pending
                          </span>
                        )}
                      </div>

                      <Button variant="outline" className="w-full">
                        Enter Room
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'discover' && (
          <div className="space-y-6">
            {/* Room Templates */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Create Your Own Room
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {roomTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-all hover:scale-105 ${template.color}`}
                  >
                    <template.icon className="h-6 w-6 mb-2" />
                    <h3 className="font-semibold text-sm">{template.name}</h3>
                    <p className="text-xs opacity-80">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Discover Rooms */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Discover Communities
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {discoverRooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center">
                          {room.isPrivate ? (
                            <Lock className="mr-2 h-4 w-4 text-gray-500" />
                          ) : (
                            <Globe className="mr-2 h-4 w-4 text-green-500" />
                          )}
                          {room.name}
                        </CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                          {room.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {room.tags.slice(0, 3).map(tag => (
                            <span 
                              key={tag}
                              className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <span className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            {room.memberCount} members
                          </span>
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {formatTimeAgo(room.recentActivity)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Created by {room.owner}
                          </span>
                        </div>

                        <Button variant="cinema" className="w-full">
                          {room.isPrivate ? 'Request to Join' : 'Join Room'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'invites' && (
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No pending invites
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              When someone invites you to their feedback room, it will appear here.
            </p>
            <Button variant="outline">
              Browse Public Rooms
            </Button>
          </div>
        )}
      </div>

      {/* Create Room Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCreateModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md mx-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Create Feedback Room</CardTitle>
                <CardDescription>
                  Set up a safe space for constructive feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room Name
                  </label>
                  <Input placeholder="e.g., First-Time Filmmakers" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground form-input"
                    rows={3}
                    placeholder="Describe the purpose and guidelines for your room..."
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="private" className="rounded" />
                  <label htmlFor="private" className="text-sm text-gray-700 dark:text-gray-300">
                    Make this room private (invite-only)
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="cinema" className="flex-1">
                    Create Room
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  )
}