'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  X, 
  Heart, 
  ThumbsUp, 
  MessageCircle, 
  HelpCircle, 
  Lightbulb,
  Clock,
  Lock,
  Eye,
  Send
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  filmTitle: string
  filmId: string
  currentTime?: number
}

interface FeedbackPrompt {
  id: string
  icon: any
  title: string
  description: string
  placeholder: string
  color: string
  type: 'POSITIVE' | 'CONSTRUCTIVE' | 'QUESTION' | 'SUGGESTION' | 'TECHNICAL'
}

const feedbackPrompts: FeedbackPrompt[] = [
  {
    id: 'liked',
    icon: Heart,
    title: 'What did you like?',
    description: 'Share what resonated with you emotionally or technically',
    placeholder: 'The cinematography in the opening scene was breathtaking because...',
    color: 'text-pink-500 bg-pink-50 border-pink-200',
    type: 'POSITIVE'
  },
  {
    id: 'emotional',
    icon: ThumbsUp,
    title: 'What worked emotionally?',
    description: 'Describe moments that made you feel something',
    placeholder: 'I felt really connected to the character when...',
    color: 'text-green-500 bg-green-50 border-green-200',
    type: 'POSITIVE'
  },
  {
    id: 'memorable',
    icon: MessageCircle,
    title: 'What moment stuck with you?',
    description: 'Highlight scenes or details that were memorable',
    placeholder: 'The scene where [character] [action] really stayed with me because...',
    color: 'text-blue-500 bg-blue-50 border-blue-200',
    type: 'POSITIVE'
  },
  {
    id: 'confused',
    icon: HelpCircle,
    title: 'Anything you were confused by?',
    description: 'Point out unclear story elements or technical issues',
    placeholder: 'I wasn\'t sure why the character decided to... or what happened when...',
    color: 'text-orange-500 bg-orange-50 border-orange-200',
    type: 'QUESTION'
  },
  {
    id: 'suggestion',
    icon: Lightbulb,
    title: 'One idea for the next cut?',
    description: 'Suggest specific improvements or alternatives',
    placeholder: 'Consider adding a close-up during [moment] to emphasize...',
    color: 'text-purple-500 bg-purple-50 border-purple-200',
    type: 'SUGGESTION'
  }
]

export default function FeedbackModal({ isOpen, onClose, filmTitle, filmId, currentTime }: FeedbackModalProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<FeedbackPrompt | null>(null)
  const [feedbackText, setFeedbackText] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isTimestamped, setIsTimestamped] = useState(!!currentTime)
  const [step, setStep] = useState<'select' | 'write' | 'options'>('select')

  const handlePromptSelect = (prompt: FeedbackPrompt) => {
    setSelectedPrompt(prompt)
    setStep('write')
  }

  const handleSubmit = async () => {
    if (!selectedPrompt || !feedbackText.trim()) return

    const feedbackData = {
      filmId,
      content: feedbackText,
      type: selectedPrompt.type,
      promptType: selectedPrompt.id,
      isPrivate,
      isAnonymous,
      timestamp: isTimestamped ? currentTime : null,
    }

    try {
      // Submit feedback logic here
      console.log('Submitting feedback:', feedbackData)
      onClose()
      resetForm()
    } catch (error) {
      console.error('Error submitting feedback:', error)
    }
  }

  const resetForm = () => {
    setSelectedPrompt(null)
    setFeedbackText('')
    setIsPrivate(false)
    setIsAnonymous(false)
    setIsTimestamped(!!currentTime)
    setStep('select')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
      >
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-cinema-500" />
                  Give Feedback
                </CardTitle>
                <CardDescription>
                  Help "{filmTitle}" grow with constructive feedback
                  {currentTime && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-cinema-100 text-cinema-700">
                      <Clock className="mr-1 h-3 w-3" />
                      {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')}
                    </span>
                  )}
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {step === 'select' && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Choose a feedback prompt
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      These prompts help you give specific, actionable feedback
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {feedbackPrompts.map((prompt) => (
                      <button
                        key={prompt.id}
                        onClick={() => handlePromptSelect(prompt)}
                        className={`p-4 border-2 rounded-lg text-left transition-all hover:scale-105 ${prompt.color} hover:shadow-md`}
                      >
                        <div className="flex items-start space-x-3">
                          <prompt.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold">{prompt.title}</h4>
                            <p className="text-sm opacity-80">{prompt.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Tip:</strong> Specific feedback helps filmmakers understand what's working 
                      and what could be improved. Try to be constructive and encouraging!
                    </p>
                  </div>
                </motion.div>
              )}

              {step === 'write' && selectedPrompt && (
                <motion.div
                  key="write"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className={`p-4 border-2 rounded-lg ${selectedPrompt.color}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <selectedPrompt.icon className="h-5 w-5" />
                      <h3 className="font-semibold">{selectedPrompt.title}</h3>
                    </div>
                    <p className="text-sm opacity-80">{selectedPrompt.description}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your feedback
                    </label>
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder={selectedPrompt.placeholder}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground form-input"
                      rows={6}
                      autoFocus
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-500">
                        {feedbackText.length}/500 characters
                      </p>
                      <p className="text-xs text-gray-500">
                        Be specific and constructive
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setStep('select')}
                    >
                      Back
                    </Button>
                    <Button 
                      variant="cinema"
                      onClick={() => setStep('options')}
                      disabled={!feedbackText.trim()}
                    >
                      Continue
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 'options' && (
                <motion.div
                  key="options"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Feedback Options
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Privacy Option */}
                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <input
                          type="checkbox"
                          id="private"
                          checked={isPrivate}
                          onChange={(e) => setIsPrivate(e.target.checked)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Lock className="h-4 w-4 text-gray-600" />
                            <label htmlFor="private" className="font-medium text-gray-900 dark:text-white cursor-pointer">
                              Private feedback
                            </label>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Only visible to the filmmaker, not public viewers
                          </p>
                        </div>
                      </div>

                      {/* Anonymous Option */}
                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <input
                          type="checkbox"
                          id="anonymous"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4 text-gray-600" />
                            <label htmlFor="anonymous" className="font-medium text-gray-900 dark:text-white cursor-pointer">
                              Anonymous feedback
                            </label>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Your name won't be shown with this feedback
                          </p>
                        </div>
                      </div>

                      {/* Timestamp Option */}
                      {currentTime && (
                        <div className="flex items-start space-x-3 p-4 border rounded-lg">
                          <input
                            type="checkbox"
                            id="timestamp"
                            checked={isTimestamped}
                            onChange={(e) => setIsTimestamped(e.target.checked)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-600" />
                              <label htmlFor="timestamp" className="font-medium text-gray-900 dark:text-white cursor-pointer">
                                Link to timestamp
                              </label>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Connect this feedback to {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')} in the film
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Preview
                    </h4>
                    <div className={`p-3 border rounded ${selectedPrompt?.color}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        {selectedPrompt && <selectedPrompt.icon className="h-4 w-4" />}
                        <span className="font-medium text-sm">{selectedPrompt?.title}</span>
                        {isTimestamped && currentTime && (
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                            {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')}
                          </span>
                        )}
                      </div>
                      <p className="text-sm">{feedbackText}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>
                          {isAnonymous ? 'Anonymous' : 'Your Name'} • 
                          {isPrivate ? ' Private' : ' Public'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setStep('write')}
                    >
                      Back
                    </Button>
                    <Button 
                      variant="cinema"
                      onClick={handleSubmit}
                      className="flex items-center"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Feedback
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}