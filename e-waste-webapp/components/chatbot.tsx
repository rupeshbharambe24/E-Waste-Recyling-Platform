"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, Send, X, MessageSquare, Languages } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm EcoBot, your e-waste recycling assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [language, setLanguage] = useState("english")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = async () => {
  if (inputValue.trim() === "") return

  const userMessage: Message = {
    id: Date.now().toString(),
    content: inputValue,
    sender: "user",
    timestamp: new Date(),
  }
  setMessages([...messages, userMessage])
  setInputValue("")

  try {
    const res = await fetch("http://127.0.0.1:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: inputValue,
        language: language,
      }),
    })

    const data = await res.json()

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: data.response,
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prevMessages) => [...prevMessages, botMessage])
  } catch (error) {
    console.error("Error calling chatbot API:", error)
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: (Date.now() + 1).toString(),
        content: "Sorry, something went wrong. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }
}

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("pickup") || lowerInput.includes("collect")) {
      return "We offer free pickup services for e-waste. You can schedule a pickup through our 'Donate' page or directly from your dashboard."
    } else if (lowerInput.includes("recycle") || lowerInput.includes("dispose")) {
      return "We ensure all e-waste is recycled responsibly. Our certified recycling partners extract valuable materials and safely dispose of hazardous components."
    } else if (lowerInput.includes("donate") || lowerInput.includes("working")) {
      return "Working electronics can be donated to our NGO partners who provide technology to underserved communities. Visit our 'Donate' page to get started."
    } else if (lowerInput.includes("reward") || lowerInput.includes("point")) {
      return "You earn EcoPoints for every item you recycle or donate. These points can be redeemed for discounts, gift cards, or even tree plantations in your name!"
    } else if (lowerInput.includes("data") || lowerInput.includes("privacy")) {
      return "We take data security seriously. All devices are wiped according to industry standards, and you'll receive a data destruction certificate for your records."
    } else {
      return "I'm here to help with any questions about e-waste recycling, donations, or our services. Feel free to ask about pickups, recycling process, rewards, or data security."
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real implementation, this would use the Web Speech API
    if (!isRecording) {
      // Start recording
      setTimeout(() => {
        setInputValue("How do I schedule a pickup?")
        setIsRecording(false)
      }, 2000)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-xl border-green-200/50">
          <CardHeader className="bg-green-50 dark:bg-green-950/20 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-green-600">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="EcoBot" />
                  <AvatarFallback className="bg-green-600 text-white">EB</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">EcoBot</CardTitle>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[130px] h-8 text-xs">
                  <Languages className="h-3.5 w-3.5 mr-1" />
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[350px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        message.sender === "user" ? "bg-green-600 text-white" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user" ? "text-green-100" : "text-muted-foreground"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <div className="flex w-full items-center space-x-2">
              <Button
                size="icon"
                variant="ghost"
                className={isRecording ? "text-red-500 animate-pulse" : ""}
                onClick={toggleRecording}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend} disabled={inputValue.trim() === ""}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
