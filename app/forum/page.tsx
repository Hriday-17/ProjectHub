"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Users, MessageSquare, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { forums } from "@/lib/data/forums"

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredForums = forums.filter(forum => 
    forum.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    forum.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-[#1e3a3a]">Project Forums</h1>
                <p className="text-gray-600">Join discussions and collaborate with your project team</p>
              </div>
              <Button asChild className="bg-[#6b3e7c] hover:bg-[#5a2e6b] whitespace-nowrap">
                <Link href="/forum/create" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Forum
                </Link>
              </Button>
            </div>

            {/* Search Section */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Input
                  type="text"
                  placeholder="Search forums..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            {/* Forums Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredForums.map((forum, index) => (
                <motion.div
                  key={forum.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="flex flex-col h-full min-h-[260px] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex flex-col space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-[#1e3a3a] line-clamp-2">{forum.projectTitle}</h3>
                          <Badge variant="secondary" className="bg-[#f0e5ff] text-[#6b3e7c]">
                            {forum.category}
                          </Badge>
                        </div>
                        {forum.unreadCount ? (
                          <Badge className="bg-[#6b3e7c] text-white shrink-0">
                            {forum.unreadCount} new
                          </Badge>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {forum.participants.length}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {forum.messages.length}
                        </div>
                      </div>

                      <p className="text-sm text-gray-500">
                        Last active: {forum.lastActive}
                      </p>
                    </div>

                    <div className="mt-auto pt-4">
                      <Button
                        asChild
                        className="w-full bg-[#213635] hover:bg-[#1a2b2b] text-white"
                      >
                        <Link href={`/forum/${forum.slug}`}>
                          Join Discussion
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredForums.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">No forums match your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}