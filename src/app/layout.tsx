import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'CineCorner - Social Platform for Film Lovers & Filmmakers',
  description: 'Watch. Share. Review. Create. A safe space for honest, supportive, and growth-oriented feedback for filmmakers.',
  keywords: ['film', 'movies', 'filmmaking', 'short films', 'reviews', 'social', 'feedback', 'community'],
  authors: [{ name: 'CineCorner Team' }],
  creator: 'CineCorner',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cinecorner.app',
    title: 'CineCorner - Social Platform for Film Lovers & Filmmakers',
    description: 'Watch. Share. Review. Create. A safe space for honest, supportive, and growth-oriented feedback for filmmakers.',
    siteName: 'CineCorner',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineCorner - Social Platform for Film Lovers & Filmmakers',
    description: 'Watch. Share. Review. Create. A safe space for honest, supportive, and growth-oriented feedback for filmmakers.',
    creator: '@cinecorner',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}