"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProjectChat } from "@/components/ProjectChat"
import { ArrowLeft, Users } from "lucide-react"
import { forums } from "@/lib/data/forums"

export default function ForumChatPage() {
  const params = useParams()
  const slug = params?.slug as string
  const forum = forums.find(f => f.slug === slug)
  
  if (!forum) {
    return <div>Forum not found</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href="/forum"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                  <h1 className="text-xl font-bold">{forum.projectTitle}</h1>
                  <Badge variant="secondary">{forum.category}</Badge>
                </div>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Users className="h-4 w-4" />
                    Participants ({forum.participants.length})
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Participants</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {forum.participants.map((participant) => (
                      <div key={participant.name} className="flex items-center gap-3">
                        <Badge variant="secondary" className="capitalize">{participant.role}</Badge>
                        <span className="font-medium">{participant.name}</span>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="container mx-auto px-4 py-6">
          <ProjectChat slug={slug} />
        </div>
      </main>
    </div>
  )
}