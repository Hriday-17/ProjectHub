"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowLeft, Send, Users } from "lucide-react"
import { forums, type ForumMessage } from "@/lib/data/forums"

export default function ForumChatPage() {
  const params = useParams()
  const slug = params?.slug as string
  const forum = forums.find(f => f.slug === slug)
  
  const [messages, setMessages] = useState<ForumMessage[]>(forum?.messages || [])
  const [newMessage, setNewMessage] = useState("")

  if (!forum) {
    return <div>Forum not found</div>
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ForumMessage = {
      id: Date.now().toString(),
      sender: {
        name: "You",
        avatar: "/placeholder.svg",
        role: "student"
      },
      content: newMessage,
      timestamp: "Just now"
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col bg-gray-50">
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
                        <Avatar>
                          <img src={participant.avatar} alt={participant.name} />
                        </Avatar>
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-sm text-gray-500 capitalize">{participant.role}</p>
                        </div>
                        {participant.online && (
                          <Badge variant="secondary" className="ml-auto">Online</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-16rem)]">
            <div className="flex flex-col h-full">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.sender.name === "You" ? "flex-row-reverse" : ""}`}
                    >
                      <Avatar>
                        <img src={message.sender.avatar} alt={message.sender.name} />
                      </Avatar>
                      <div className={`flex-1 space-y-1 ${message.sender.name === "You" ? "items-end" : ""}`}>
                        <div className={`flex items-center gap-2 ${message.sender.name === "You" ? "flex-row-reverse" : ""}`}>
                          <p className="font-medium">{message.sender.name}</p>
                          <p className="text-xs text-gray-500">{message.timestamp}</p>
                        </div>
                        <div className={`rounded-lg p-3 max-w-[80%] ${
                          message.sender.name === "You"
                            ? "bg-[#6b3e7c] text-white ml-auto"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          <p>{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-[#6b3e7c] hover:bg-[#5a2e6b]"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}