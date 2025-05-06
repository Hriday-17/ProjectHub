"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function NewsPage() {
  // Mock data for news articles
  const featuredNews = {
    id: "1",
    title: "ProjectHub Launches AI-Powered Project Recommendation System",
    date: "May 15, 2023",
    category: "Technology",
    excerpt:
      "Our new AI-powered recommendation system matches students with projects that align with their skills, interests, and academic goals, enhancing the educational experience.",
    image: "/placeholder.svg?height=400&width=600&text=AI+Recommendation+System",
  }

  const newsArticles = [
    {
      id: "2",
      title: "Student Team Wins National Innovation Challenge",
      date: "April 28, 2023",
      category: "Student Success",
      excerpt:
        "A team of five students from our Engineering department won the National Innovation Challenge with their project on sustainable urban mobility solutions.",
      image: "/placeholder.svg?height=200&width=300&text=Innovation+Challenge",
    },
    {
      id: "3",
      title: "New Industry Partnerships Announced",
      date: "April 15, 2023",
      category: "Partnerships",
      excerpt:
        "We're excited to announce new partnerships with leading technology companies that will provide students with real-world project opportunities.",
      image: "/placeholder.svg?height=200&width=300&text=Industry+Partnerships",
    },
    {
      id: "4",
      title: "ProjectHub Expands to Three New Universities",
      date: "March 22, 2023",
      category: "Expansion",
      excerpt:
        "Following its success, ProjectHub is expanding to three additional universities, bringing project-based learning to more students across the country.",
      image: "/placeholder.svg?height=200&width=300&text=Expansion+News",
    },
    {
      id: "5",
      title: "Annual Project Showcase Scheduled for June",
      date: "March 10, 2023",
      category: "Events",
      excerpt:
        "Mark your calendars for our annual Project Showcase, where students will present their innovative projects to industry professionals and the academic community.",
      image: "/placeholder.svg?height=200&width=300&text=Project+Showcase",
    },
    {
      id: "6",
      title: "New Mentorship Program Launches Next Semester",
      date: "February 28, 2023",
      category: "Programs",
      excerpt:
        "Our enhanced mentorship program will connect students with industry professionals for guidance throughout their project journey.",
      image: "/placeholder.svg?height=200&width=300&text=Mentorship+Program",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl font-bold mb-12 text-[#1e3a3a]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            News & Updates
          </motion.h1>

          {/* Featured News */}
          <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-md mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="order-2 md:order-1 p-8">
                <Badge className="bg-[#f0e5ff] text-[#6b3e7c] hover:bg-[#e5d5ff] mb-4">{featuredNews.category}</Badge>
                <h2 className="text-2xl font-bold mb-4 text-[#1e3a3a]">{featuredNews.title}</h2>
                <div className="flex items-center text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{featuredNews.date}</span>
                </div>
                <p className="text-gray-600 mb-6">{featuredNews.excerpt}</p>
                <Button asChild className="bg-[#6b3e7c] hover:bg-[#5a2e6b]">
                  <Link href={`/news/${featuredNews.id}`}>
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src={featuredNews.image || "/placeholder.svg"}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover min-h-[300px]"
                />
              </div>
            </div>
          </motion.div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <motion.div
                key={article.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <Badge className="bg-[#f0e5ff] text-[#6b3e7c] hover:bg-[#e5d5ff] mb-3">{article.category}</Badge>
                  <h3 className="text-xl font-bold mb-2 text-[#1e3a3a]">{article.title}</h3>
                  <div className="flex items-center text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{article.date}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Button asChild variant="link" className="p-0 text-[#6b3e7c] hover:text-[#5a2e6b]">
                    <Link href={`/news/${article.id}`}>
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            className="mt-16 bg-[#1e3a3a] text-white p-8 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                <p className="mb-0">
                  Subscribe to our newsletter to receive the latest news and updates about ProjectHub.
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6b3e7c]"
                />
                <Button className="bg-[#6b3e7c] hover:bg-[#5a2e6b] whitespace-nowrap">Subscribe</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} ProjectHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
