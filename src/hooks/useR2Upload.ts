import { useState } from 'react'

interface UploadResult {
  key: string
  publicUrl: string
}

export function useR2Upload() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const uploadFile = async (file: File): Promise<UploadResult> => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Get presigned URL
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to get upload URL')
      }

      const { uploadUrl, key, publicUrl } = await response.json()

      // Upload file to R2 with progress tracking
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100)
            setUploadProgress(progress)
          }
        })

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            setIsUploading(false)
            setUploadProgress(100)
            resolve({ key, publicUrl })
          } else {
            setIsUploading(false)
            setUploadProgress(0)
            reject(new Error('Upload failed'))
          }
        })

        xhr.addEventListener('error', () => {
          setIsUploading(false)
          setUploadProgress(0)
          reject(new Error('Upload failed'))
        })

        xhr.open('PUT', uploadUrl)
        xhr.setRequestHeader('Content-Type', file.type)
        xhr.send(file)
      })

    } catch (error) {
      setIsUploading(false)
      setUploadProgress(0)
      throw error
    }
  }

  return {
    uploadFile,
    isUploading,
    uploadProgress,
  }
}