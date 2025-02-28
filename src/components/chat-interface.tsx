"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Message {
  text: string
  timestamp: string
  isUser: boolean
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isInitial, setIsInitial] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const newMessage: Message = {
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    }

    setMessages([...messages, newMessage])
    setInputValue("")
    setIsInitial(false)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {isInitial ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">How can I help you with UBIQ today?</h1>
          <div className="w-full max-w-2xl">
            <form onSubmit={sendMessage} className="relative">
              <Input
                type="text"
                placeholder="Ask UBIQ about your income..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full h-14 pl-6 pr-16 text-lg rounded-full"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-2 h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-5 w-5 text-white" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-2xl mx-auto space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isUser ? "text-blue-100" : "text-gray-500"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="border-t p-4">
            <form onSubmit={sendMessage} className="max-w-2xl mx-auto relative">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full h-12 pl-6 pr-16 rounded-full"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1 h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-5 w-5 text-white" />
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

