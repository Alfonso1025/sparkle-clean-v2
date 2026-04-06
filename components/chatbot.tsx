"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Sparkles } from "lucide-react"

interface Message {
  id: string
  role: "user" | "bot"
  content: string
  timestamp: Date
}



const BOT_RESPONSE =
  "Hi! In the full version I can answer questions about services, provide instant quotes and help book appointments 24/7 — even while the team is on a job. This is a preview of the feature. Speak with your web developer to see a live demo."

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function ChatWidget() {

 const [messages, setMessages] = useState<Message[]>(() => [
        {
          id: "initial",
          role: "bot",
          content: "Hi, I'm the Sparkle Clean virtual assistant. How can I help you today?",
          timestamp: new Date(),
        }
      ])

  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isDemoComplete, setIsDemoComplete] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleToggle = () => {
    if (!isOpen) {
      setMessages([{
        id: "initial",
        role: "bot",
        content: "Hi, I'm the Sparkle Clean virtual assistant. How can I help you today?",
        timestamp: new Date(),
      }])
      setIsDemoComplete(false)
      setInput("")
    }
    setIsOpen(!isOpen)
  }

  const handleSend = () => {
    if (!input.trim() || isDemoComplete || isTyping) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content: BOT_RESPONSE,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsDemoComplete(true)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-amber-400 flex items-center justify-center shadow-lg transition-colors duration-300 hover:bg-amber-300"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-stone-950" />
        ) : (
          <MessageCircle className="w-6 h-6 text-stone-950" />
        )}
        {/* Pulsing dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-stone-950 border border-amber-900/20 shadow-2xl flex flex-col max-h-[500px] transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-stone-900 border-b border-amber-900/20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-amber-50 text-sm font-light uppercase tracking-widest">
              Sparkle Assistant
            </span>
          </div>
          <span className="text-green-400 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 inline-block" />
            Online
          </span>
        </div>

        {/* Messages Area */}
        <div className="h-72 overflow-y-auto p-4 flex flex-col gap-3 bg-stone-950">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "bg-amber-400 text-stone-950"
                    : "bg-stone-800 text-stone-200"
                }`}
              >
                {message.content}
              </div>
              <span className="text-stone-500 text-xs mt-1">
                {formatTime(message.timestamp)}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex flex-col items-start">
              <div className="bg-stone-800 px-4 py-3 flex gap-1">
                <span
                  className="w-2 h-2 bg-stone-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 bg-stone-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 bg-stone-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-stone-900 border-t border-amber-900/20 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isDemoComplete || isTyping}
              placeholder="Type a message..."
              className="flex-1 bg-stone-950 border border-amber-900/30 text-amber-50 placeholder-stone-500 px-3 py-2 text-sm focus:outline-none focus:border-amber-400/40 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSend}
              disabled={isDemoComplete || isTyping || !input.trim()}
              className="bg-amber-400 text-stone-950 px-3 py-2 transition-colors duration-300 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-400"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          {isDemoComplete && (
            <p className="text-stone-500 text-xs text-center mt-2">
              Demo mode — responses are simulated
            </p>
          )}
        </div>
      </div>
    </>
  )
}
