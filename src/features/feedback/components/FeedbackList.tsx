'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Heart, 
  ThumbsUp, 
  MessageCircle, 
  HelpCircle, 
  Lightbulb,
  Clock,
  Lock,
  Eye,
  MoreVertical,
  Flag,
  ThumbsDown,
  Reply
} from 'lucide-react'
import { formatTimeAgo } from '@/lib/utils'

interface Feedback {
  id: string
  content: string
  type: 'POSITIVE' | 'CONSTRUCTIVE' | 'QUESTION' | 'SUGGESTION' | 'TECHNICAL'
  promptType: string
  author: {
    id: string
    name: string
    username: string
    imageUrl?: string
    isAnonymous: boolean
  }
  timestamp?: number
  isPrivate: boolean
  createdAt: Date
  helpfulVotes: number
  hasVoted: boolean
}

interface FeedbackListProps {
  feedback: Feedback[]
  onReply?: (feedbackId: string) => void
  onVote?: (feedbackId: string, helpful: boolean) => void
  onReport?: (feedbackId: string) => void
  canModerate?: boolean
}

const promptIcons = {
  liked: Heart,
  emotional: ThumbsUp,
  memorable: MessageCircle,
  confused: HelpCircle,
  suggestion: Lightbulb,
}

const promptColors = {
  liked: 'text-pink-500 bg-pink-50 border-pink-200',
  emotional: 'text-green-500 bg-green-50 border-green-200',
  memorable: 'text-blue-500 bg-blue-50 border-blue-200',
  confused: 'text-orange-500 bg-orange-50 border-orange-200',
  suggestion: 'text-purple-500 bg-purple-50 border-purple-200',
}

export default function FeedbackList({ 
  feedback, 
  onReply, 
  onVote, 
  onReport, 
  canModerate = false 
}: FeedbackListProps) {
  const [expandedFeedback, setExpandedFeedback] = useState<Set<string>>(new Set())
  const [showDropdown, setShowDropdown] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedFeedback)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedFeedback(newExpanded)
  }

  const formatTimestamp = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getPromptIcon = (promptType: string) => {
    return promptIcons[promptType as keyof typeof promptIcons] || MessageCircle
  }

  const getPromptColor = (promptType: string) => {
    return promptColors[promptType as keyof typeof promptColors] || 'text-gray-500 bg-gray-50 border-gray-200'
  }

  if (feedback.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No feedback yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Be the first to share constructive feedback on this film!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {feedback.map((item) => {
        const PromptIcon = getPromptIcon(item.promptType)
        const isExpanded = expandedFeedback.has(item.id)
        const shouldTruncate = item.content.length > 200

        return (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Timestamp indicator */}
              {item.timestamp && (
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    At {formatTimestamp(item.timestamp)}
                  </span>
                </div>
              )}

              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    {/* Author Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      {item.author.imageUrl ? (
                        <img 
                          src={item.author.imageUrl} 
                          alt={item.author.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {item.author.isAnonymous ? '?' : item.author.name.charAt(0)}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      {/* Author info */}
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {item.author.isAnonymous ? 'Anonymous' : item.author.name}
                        </span>
                        {!item.author.isAnonymous && (
                          <span className="text-gray-500 text-sm">
                            @{item.author.username}
                          </span>
                        )}
                        {item.isPrivate && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                            <Lock className="mr-1 h-3 w-3" />
                            Private
                          </span>
                        )}
                      </div>

                      {/* Prompt type */}
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getPromptColor(item.promptType)}`}>
                        <PromptIcon className="mr-1 h-3 w-3" />
                        <span className="capitalize">{item.promptType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions dropdown */}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDropdown(showDropdown === item.id ? null : item.id)}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>

                    {showDropdown === item.id && (
                      <div className="absolute right-0 top-8 z-10 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                        <div className="py-1">
                          {onReport && (
                            <button
                              onClick={() => {
                                onReport(item.id)
                                setShowDropdown(null)
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Flag className="mr-2 h-4 w-4" />
                              Report
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-3">
                  <p className="text-gray-900 dark:text-white leading-relaxed">
                    {shouldTruncate && !isExpanded 
                      ? `${item.content.slice(0, 200)}...`
                      : item.content
                    }
                  </p>
                  
                  {shouldTruncate && (
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="text-cinema-500 text-sm font-medium mt-1 hover:text-cinema-600"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{formatTimeAgo(item.createdAt)}</span>
                  
                  <div className="flex items-center space-x-4">
                    {/* Helpful votes */}
                    {onVote && (
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onVote(item.id, true)}
                          className={`h-8 px-2 ${item.hasVoted ? 'text-green-600' : ''}`}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {item.helpfulVotes}
                        </Button>
                        <span className="text-gray-300">|</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onVote(item.id, false)}
                          className="h-8 px-2"
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {/* Reply */}
                    {onReply && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onReply(item.id)}
                        className="h-8 px-2"
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}