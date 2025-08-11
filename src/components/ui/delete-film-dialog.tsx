'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DeleteFilmDialogProps {
  filmId: string
  filmTitle: string
  isOpen: boolean
  onClose: () => void
  onDeleted: () => void
}

export function DeleteFilmDialog({ 
  filmId, 
  filmTitle, 
  isOpen, 
  onClose, 
  onDeleted 
}: DeleteFilmDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const expectedConfirmText = `DELETE ${filmTitle}`
  const canDelete = confirmText === expectedConfirmText

  const handleDelete = async () => {
    if (!canDelete) return

    setIsDeleting(true)
    setError(null)

    try {
      const response = await fetch(`/api/films/${filmId}/delete`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || 'Failed to delete film')
      }

      const result = await response.json()
      
      // Show success message briefly
      alert('🗑️ Film deleted successfully!')
      
      // Close dialog and notify parent
      onClose()
      onDeleted()

    } catch (error) {
      console.error('Delete failed:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete film')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleClose = () => {
    if (isDeleting) return // Prevent closing during deletion
    setConfirmText('')
    setError(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md"
          >
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <CardTitle className="text-red-900 dark:text-red-100">
                        Delete Film
                      </CardTitle>
                      <CardDescription className="text-red-700 dark:text-red-300">
                        This action cannot be undone
                      </CardDescription>
                    </div>
                  </div>
                  {!isDeleting && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClose}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-800 dark:text-red-200 mb-2">
                    You are about to permanently delete:
                  </p>
                  <p className="font-semibold text-red-900 dark:text-red-100 break-words">
                    "{filmTitle}"
                  </p>
                  <div className="mt-3 text-xs text-red-600 dark:text-red-400 space-y-1">
                    <div>• Video file will be removed from storage</div>
                    <div>• Thumbnail will be deleted</div>
                    <div>• All feedback and reviews will be lost</div>
                    <div>• All comments will be deleted</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">
                      DELETE {filmTitle}
                    </span> to confirm:
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder={`DELETE ${filmTitle}`}
                    disabled={isDeleting}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                  </div>
                )}

                <div className="flex space-x-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    disabled={isDeleting}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={!canDelete || isDeleting}
                    className="flex-1"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Forever
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}