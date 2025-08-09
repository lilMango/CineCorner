'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Upload, 
  Film, 
  Settings, 
  Users, 
  Lock, 
  Heart,
  MessageCircle,
  UserPlus,
  X,
  Plus,
  Video,
  Image as ImageIcon
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function UploadPage() {
  const [uploadStep, setUploadStep] = useState(1)
  const [filmData, setFilmData] = useState({
    title: '',
    description: '',
    genre: '',
    duration: '',
    tags: [] as string[],
    feedbackMode: 'OPEN',
    creatorNote: '',
    castCrew: [] as { name: string; role: string }[],
  })
  
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const feedbackModes = [
    {
      value: 'OPEN',
      label: 'Open to Feedback',
      description: 'Anyone can leave constructive feedback and reviews',
      icon: MessageCircle,
      color: 'text-green-500'
    },
    {
      value: 'REACTIONS',
      label: 'Reactions Only',
      description: 'Viewers can react but no detailed criticism',
      icon: Heart,
      color: 'text-pink-500'
    },
    {
      value: 'PRIVATE',
      label: 'Private Feedback',
      description: 'Only invited reviewers can give feedback',
      icon: Lock,
      color: 'text-blue-500'
    },
    {
      value: 'COLLABORATORS',
      label: 'Looking for Collaborators',
      description: 'Open to feedback and collaboration opportunities',
      icon: UserPlus,
      color: 'text-purple-500'
    }
  ]

  const genres = [
    'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Documentary', 'Animation',
    'Thriller', 'Romance', 'Action', 'Experimental', 'Music Video', 'Other'
  ]

  const addTag = (tag: string) => {
    if (tag && !filmData.tags.includes(tag)) {
      setFilmData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFilmData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addCastCrew = () => {
    setFilmData(prev => ({
      ...prev,
      castCrew: [...prev.castCrew, { name: '', role: '' }]
    }))
  }

  const updateCastCrew = (index: number, field: 'name' | 'role', value: string) => {
    setFilmData(prev => ({
      ...prev,
      castCrew: prev.castCrew.map((person, i) => 
        i === index ? { ...person, [field]: value } : person
      )
    }))
  }

  const removeCastCrew = (index: number) => {
    setFilmData(prev => ({
      ...prev,
      castCrew: prev.castCrew.filter((_, i) => i !== index)
    }))
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    // Handle file upload logic here
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadStep(2)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-heading text-gray-900 dark:text-white flex items-center">
                <Upload className="mr-3 h-7 w-7 text-cinema-500" />
                Upload Your Film
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Share your story with the CineCorner community
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className={`flex items-center space-x-1 ${uploadStep >= 1 ? 'text-cinema-500' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  uploadStep >= 1 ? 'bg-cinema-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <span>Upload</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-200"></div>
              <div className={`flex items-center space-x-1 ${uploadStep >= 2 ? 'text-cinema-500' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  uploadStep >= 2 ? 'bg-cinema-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <span>Details</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-200"></div>
              <div className={`flex items-center space-x-1 ${uploadStep >= 3 ? 'text-cinema-500' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  uploadStep >= 3 ? 'bg-cinema-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
                <span>Settings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {uploadStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-5 w-5" />
                  Upload Video File
                </CardTitle>
                <CardDescription>
                  Upload your film file. Supported formats: MP4, MOV, AVI (max 500MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isUploading ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                      dragActive 
                        ? 'border-cinema-500 bg-cinema-50 dark:bg-cinema-900/20' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-cinema-400'
                    }`}
                    onDragEnter={() => setDragActive(true)}
                    onDragLeave={() => setDragActive(false)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                  >
                    <Video className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Drop your video file here
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      or click to browse your files
                    </p>
                    <Button variant="cinema" onClick={simulateUpload}>
                      Choose File
                    </Button>
                    <p className="text-xs text-gray-500 mt-4">
                      Maximum file size: 500MB. Recommended: 1920x1080, H.264 encoding
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Video className="mx-auto h-16 w-16 text-cinema-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Uploading your film...
                    </h3>
                    <div className="w-full max-w-md mx-auto mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-cinema-500 h-3 rounded-full transition-all duration-300" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {uploadProgress}% complete
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {uploadStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Film className="mr-2 h-5 w-5" />
                  Film Details
                </CardTitle>
                <CardDescription>
                  Help viewers discover and understand your film
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <Input
                    placeholder="Enter your film title..."
                    value={filmData.title}
                    onChange={(e) => setFilmData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground form-input"
                    rows={4}
                    placeholder="Describe your film, its themes, or what inspired you to create it..."
                    value={filmData.description}
                    onChange={(e) => setFilmData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Genre
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground form-input"
                      value={filmData.genre}
                      onChange={(e) => setFilmData(prev => ({ ...prev, genre: e.target.value }))}
                    >
                      <option value="">Select genre...</option>
                      {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration (minutes)
                    </label>
                    <Input
                      type="number"
                      placeholder="5"
                      value={filmData.duration}
                      onChange={(e) => setFilmData(prev => ({ ...prev, duration: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {filmData.tags.map(tag => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-cinema-100 text-cinema-800 dark:bg-cinema-900 dark:text-cinema-100"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 hover:text-cinema-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <Input
                    placeholder="Add tags (press Enter)..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag(e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Add tags like "low-budget", "experimental", "student-film", etc.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cast & Crew */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Cast & Crew
                  </span>
                  <Button variant="outline" size="sm" onClick={addCastCrew}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add Person
                  </Button>
                </CardTitle>
                <CardDescription>
                  Credit the people who helped bring your film to life
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filmData.castCrew.map((person, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Input
                        placeholder="Name"
                        value={person.name}
                        onChange={(e) => updateCastCrew(index, 'name', e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Role (e.g., Director, Actor)"
                        value={person.role}
                        onChange={(e) => updateCastCrew(index, 'role', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCastCrew(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {filmData.castCrew.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      No cast or crew added yet. Click "Add Person" to get started.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setUploadStep(1)}>
                Back
              </Button>
              <Button variant="cinema" onClick={() => setUploadStep(3)}>
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {uploadStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Feedback Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Feedback Settings
                </CardTitle>
                <CardDescription>
                  Choose how you'd like to receive feedback on your film
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feedbackModes.map(mode => (
                    <div 
                      key={mode.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        filmData.feedbackMode === mode.value
                          ? 'border-cinema-500 bg-cinema-50 dark:bg-cinema-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                      onClick={() => setFilmData(prev => ({ ...prev, feedbackMode: mode.value }))}
                    >
                      <div className="flex items-center space-x-3">
                        <mode.icon className={`h-6 w-6 ${mode.color}`} />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {mode.label}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {mode.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Creator Note */}
            <Card>
              <CardHeader>
                <CardTitle>Creator Note (Optional)</CardTitle>
                <CardDescription>
                  Provide context for viewers and reviewers about your film
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground form-input"
                  rows={3}
                  placeholder="e.g., 'This is a first draft - curious how the pacing feels' or 'Made this as a sound design experiment'"
                  value={filmData.creatorNote}
                  onChange={(e) => setFilmData(prev => ({ ...prev, creatorNote: e.target.value }))}
                />
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setUploadStep(2)}>
                Back
              </Button>
              <Button variant="cinema" size="lg">
                Publish Film
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}