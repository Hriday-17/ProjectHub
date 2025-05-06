"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { Send } from "lucide-react"
import { chatData, type ChatMessage } from "@/lib/data/chatMessages"

interface ProjectChatProps {
  slug: string
}

export function ProjectChat({ slug }: ProjectChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(chatData[slug] || [])
  const [newMessage, setNewMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Update messages when chatData changes
    setMessages(chatData[slug] || [])
  }, [slug])

  useEffect(() => {
    // Scroll to bottom when messages update
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: {
        name: "You",
        avatar: "/placeholder.svg",
        role: "student"
      },
      content: newMessage,
      timestamp: new Date().toISOString()
    }

    // Update both local state and shared data
    const updatedMessages = [...messages, message]
    setMessages(updatedMessages)
    chatData[slug] = updatedMessages
    setNewMessage("")
  }

  const formatTimestamp = (timestamp: string) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date(timestamp))
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.sender.name === "You" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="h-8 w-8">
                <img src={message.sender.avatar} alt={message.sender.name} />
              </Avatar>
              <div className={`flex-1 space-y-1 ${message.sender.name === "You" ? "items-end" : ""}`}>
                <div className={`flex items-center gap-2 ${message.sender.name === "You" ? "flex-row-reverse" : ""}`}>
                  <p className="text-sm font-medium">{message.sender.name}</p>
                  <p className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</p>
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

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
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
    </Card>
  )
}