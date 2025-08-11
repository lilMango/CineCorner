import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuidv4 } from 'uuid'
import { getServerSession } from 'next-auth'

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
})

export async function POST(request: NextRequest) {
  try {
    // Check authentication - uploads require valid session
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    
    const userEmail = session.user.email

    const { fileName, fileType, fileSize } = await request.json()

    // Validate file type (videos and images)
    const allowedTypes = [
      'video/mp4', 'video/mov', 'video/avi', 'video/quicktime',
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp'
    ]
    
    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json({ error: 'File type not allowed' }, { status: 400 })
    }

    // Validate file size (500MB max for videos, 10MB for images)
    const maxSize = fileType.startsWith('video/') ? 500 * 1024 * 1024 : 10 * 1024 * 1024
    if (fileSize > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    // Generate unique file key
    const fileExtension = fileName.split('.').pop()
    const uniqueFileName = `${uuidv4()}.${fileExtension}`
    const key = `uploads/${userEmail}/${uniqueFileName}`

    // Generate presigned URL for upload
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    })

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

    // Return the upload URL and file info
    return NextResponse.json({
      uploadUrl,
      key,
      publicUrl: `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`
    })

  } catch (error) {
    console.error('Upload URL generation failed:', error)
    return NextResponse.json({ error: 'Failed to generate upload URL' }, { status: 500 })
  }
}