'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Film, 
  Users, 
  MessageCircle, 
  Star, 
  Heart, 
  Play, 
  Upload, 
  Eye,
  Award,
  Shield,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Upload,
    title: "Showcase Your Films",
    description: "Upload short films, video essays, and behind-the-scenes content with rich metadata and creator context."
  },
  {
    icon: MessageCircle,
    title: "Guided Feedback",
    description: "Receive structured, constructive feedback through guided prompts instead of empty comment boxes."
  },
  {
    icon: Eye,
    title: "Smart Discovery",
    description: "Find films through human-curated lists, mood tags, and connections from real film lovers."
  },
  {
    icon: Users,
    title: "Safe Communities",
    description: "Join private feedback rooms and genre-specific pods for honest, supportive collaboration."
  },
  {
    icon: Shield,
    title: "Privacy Controls",
    description: "Control who sees your work with options for public, private, or support-only feedback modes."
  },
  {
    icon: Award,
    title: "Creator Recognition",
    description: "Build reputation through helpful reviews and gain recognition for supporting other filmmakers."
  }
]

const stats = [
  { label: "Filmmakers", value: "2.5K+" },
  { label: "Films Shared", value: "12K+" },
  { label: "Reviews Written", value: "45K+" },
  { label: "Feedback Given", value: "78K+" }
]

const testimonials = [
  {
    quote: "The guided feedback system helped me improve my storytelling dramatically. Instead of vague comments, I got specific, actionable notes.",
    author: "Sarah Chen",
    role: "Independent Filmmaker"
  },
  {
    quote: "Finally, a platform that values constructive criticism over likes. The community here actually cares about helping you grow.",
    author: "Marcus Rodriguez", 
    role: "Film Student"
  },
  {
    quote: "The private feedback rooms are perfect for early cuts. I can get honest opinions without the pressure of public scrutiny.",
    author: "Aisha Patel",
    role: "Documentary Director"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-cinema-500" />
              <span className="text-xl font-bold font-heading text-gradient">CineCorner</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-cinema-500 transition-colors">
                Features
              </Link>
              <Link href="#community" className="text-gray-600 hover:text-cinema-500 transition-colors">
                Community  
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-cinema-500 transition-colors">
                Pricing
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="cinema">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6">
              <span className="text-gradient">Watch. Share.</span>
              <br />
              <span className="text-gradient">Review. Create.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              A social platform for film lovers and filmmakers, fostering honest, supportive, 
              and growth-oriented feedback for creators of all backgrounds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/sign-up">
                <Button size="lg" variant="cinema" className="text-lg px-8 py-4">
                  <Play className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  <Eye className="mr-2 h-5 w-5" />
                  Explore Films
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-cinema-500 mb-1">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">
              Built for <span className="text-gradient">Creative Growth</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Every feature designed to foster meaningful connections and constructive feedback 
              in the filmmaking community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full card-hover">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-cinema-500 mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">
              Join a <span className="text-gradient">Supportive Community</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Connect with filmmakers and film lovers who share your passion for storytelling 
              and creative growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-gray-600 dark:text-gray-300 mb-4 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cinema-500 to-cinema-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Ready to Transform Your Filmmaking?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of filmmakers who are growing their craft through 
              meaningful feedback and community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Creating Today
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-cinema-600">
                  Explore the Platform
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Film className="h-8 w-8 text-cinema-500" />
                <span className="text-xl font-bold font-heading">CineCorner</span>
              </div>
              <p className="text-gray-400 mb-4">
                A safe space for filmmakers to grow through honest, supportive feedback.
              </p>
              <div className="flex space-x-4">
                <Heart className="h-5 w-5 text-cinema-500" />
                <span className="text-sm text-gray-400">Made with love for creators</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/explore" className="hover:text-white transition-colors">Explore Films</Link></li>
                <li><Link href="/upload" className="hover:text-white transition-colors">Upload Film</Link></li>
                <li><Link href="/feedback" className="hover:text-white transition-colors">Give Feedback</Link></li>
                <li><Link href="/rooms" className="hover:text-white transition-colors">Feedback Rooms</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/guidelines" className="hover:text-white transition-colors">Community Guidelines</Link></li>
                <li><Link href="/safety" className="hover:text-white transition-colors">Safety Center</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CineCorner. All rights reserved. Built for the filmmaking community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}