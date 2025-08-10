# 🚀 Cloudflare R2 Setup Guide

This guide will help you set up Cloudflare R2 for CineCorner's file storage.

## Step 1: Create Cloudflare Account & R2 Bucket

1. **Sign up at [Cloudflare](https://dash.cloudflare.com/sign-up)**
   - Free account works fine to start

2. **Enable R2 Storage**
   - Go to R2 Object Storage in your dashboard
   - Click "Create bucket"
   - Choose bucket name: `cinecorner-films` (or your preference)
   - Select location closest to your users

3. **Configure Public Access (Optional)**
   - In bucket settings, enable "Public access"
   - This gives you a public URL like: `https://pub-{bucket-id}.r2.dev`
   - Or set up a custom domain for cleaner URLs

## Step 2: Create API Tokens

1. **Go to R2 API Tokens**
   - In R2 dashboard, click "Manage R2 API tokens"
   
2. **Create Custom Token**
   - Click "Create API token"
   - **Permissions**: `Object Read & Write`
   - **Resources**: Include your specific bucket
   - **Token name**: `cinecorner-uploads`

3. **Save Credentials**
   - Copy the **Access Key ID**
   - Copy the **Secret Access Key**
   - Note your **Account ID** (in the URL or dashboard)

## Step 3: Update Environment Variables

Update your `.env.local` file:

```bash
# Remove old UploadThing variables
# UPLOADTHING_SECRET=sk_live_...
# UPLOADTHING_APP_ID=your-app-id

# Add Cloudflare R2 variables
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_from_step2
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key_from_step2
CLOUDFLARE_R2_BUCKET_NAME=cinecorner-films
CLOUDFLARE_R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
CLOUDFLARE_R2_PUBLIC_URL=https://pub-your-bucket-id.r2.dev
```

**Replace:**
- `your-account-id` with your actual Cloudflare account ID
- `your-bucket-id` with your bucket's public ID
- `your_access_key_from_step2` with the access key you copied
- `your_secret_key_from_step2` with the secret key you copied

## Step 4: Update Next.js Config

Update `next.config.js` with your actual R2 domains:

```javascript
images: {
  domains: [
    'pub-your-bucket-id.r2.dev',  // Replace with your actual bucket domain
    'your-custom-domain.com',     // If you set up a custom domain
    'img.clerk.com',
    'images.unsplash.com',
  ],
},
```

## Step 5: Test the Upload

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to:** `http://localhost:7070/upload`

3. **Try uploading a small video or image file**

4. **Check the Cloudflare R2 dashboard** to see if the file appears in your bucket

## 🎯 Cost Optimization Tips

### Free Tier Limits (per month):
- **10 GB storage** 
- **1 million Class A operations** (uploads, lists)
- **10 million Class B operations** (downloads)
- **Zero egress fees** (this is the big win!)

### Beyond Free Tier:
- **Storage**: $0.015/GB/month (very cheap)
- **Class A ops**: $4.50/million (uploads)
- **Class B ops**: $0.36/million (downloads)

### Estimated Costs:
- **100GB + 1M video views**: ~$1.50/month
- **1TB + 10M video views**: ~$15/month
- **10TB + 100M video views**: ~$150/month

## 🔧 Troubleshooting

### Common Issues:

1. **"Access Denied" errors**
   - Check your API token permissions
   - Ensure the token includes your specific bucket
   - Verify the account ID in your endpoint URL

2. **"Bucket not found"**
   - Double-check the bucket name in your env vars
   - Ensure the bucket exists in your account

3. **CORS errors in browser**
   - Configure CORS in your R2 bucket settings
   - Add your domain to allowed origins [localhost:7070], allowed Methods[GET,POST,PUT], and allowed headers [*]

4. **File not appearing publicly**
   - Enable public access on your bucket
   - Check the public URL format

### Test API Connection:

You can test your R2 connection with this simple script:

```javascript
// test-r2-connection.js
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

async function testConnection() {
  try {
    const response = await s3Client.send(new ListBucketsCommand({}));
    console.log('✅ R2 connection successful!');
    console.log('Buckets:', response.Buckets.map(b => b.Name));
  } catch (error) {
    console.error('❌ R2 connection failed:', error.message);
  }
}

testConnection();
```

Run with: `node test-r2-connection.js`

## 🚀 Next Steps

Once R2 is working:

1. **Set up a custom domain** for cleaner URLs
2. **Configure CORS** for browser uploads  
3. **Add image optimization** with Cloudflare Images (optional)
4. **Set up video transcoding** with Cloudflare Stream (for multiple qualities)
5. **Implement file cleanup** for unused uploads

## 📞 Need Help?

- Check the [Cloudflare R2 docs](https://developers.cloudflare.com/r2/)
- View your R2 analytics in the Cloudflare dashboard
- Test uploads work in development before deploying

---

**Total migration time**: ~15-30 minutes
**Monthly savings**: 90%+ vs UploadThing for video platforms!