// Component: Replicates community collaboration chat UI
"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar } from "./ui/avatar"
import { Send, Paperclip, Plus } from "lucide-react"

interface Message {
  id: string
  sender: string
  avatar: string
  content: string
  timestamp: string
}

// Mock data for messages
const initialMessages: Message[] = [
  {
    id: "1",
    sender: "Dr. Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Hello team! I hope everyone is doing well. Let's discuss the project timeline for this week.",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    sender: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Hi Dr. Johnson! I've completed the initial research and will share my findings later today.",
    timestamp: "10:35 AM",
  },
  {
    id: "3",
    sender: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "I'm working on the prototype design. Should have something to show by tomorrow.",
    timestamp: "10:40 AM",
  },
  {
    id: "4",
    sender: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "I have a question about the data collection methodology. Can we schedule a quick call?",
    timestamp: "10:45 AM",
  },
  {
    id: "5",
    sender: "Dr. Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Sure, James. Let's have a call at 2 PM today. I'll send a calendar invite.",
    timestamp: "10:50 AM",
  },
]

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="border rounded-xl shadow-sm overflow-hidden bg-white">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-xl font-bold">Project Discussion</h2>
        <p className="text-gray-500 text-sm">AI-Powered Healthcare Assistant</p>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[80%] ${message.sender === "You" ? "flex-row-reverse" : "flex-row"}`}>
              <Avatar className="h-10 w-10 mr-2">
                <img src={message.avatar || "/placeholder.svg"} alt={message.sender} />
              </Avatar>
              <div
                className={`rounded-lg p-3 ${message.sender === "You" ? "bg-[#6b3e7c] text-white mr-2" : "bg-gray-100 ml-2"}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-medium text-sm ${message.sender === "You" ? "text-white" : "text-gray-700"}`}>
                    {message.sender}
                  </span>
                  <span className={`text-xs ${message.sender === "You" ? "text-white/80" : "text-gray-500"}`}>
                    {message.timestamp}
                  </span>
                </div>
                <p className={`text-sm ${message.sender === "You" ? "text-white" : "text-gray-800"}`}>
                  {message.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-[#6b3e7c] hover:bg-[#5a2e6b]" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
