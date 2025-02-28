"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useAgent } from "@/app/hooks/useAgent";

interface Message {
  text: string;
  timestamp: string;
  isUser: boolean;
}

export function ChatInterface() {
  //   const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isInitial, setIsInitial] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isThinking } = useAgent();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const onSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    await sendMessage(userMsg);

    //   const responseMessage = await messageAgent(input);

    //  const newMessage: Message = {
    //    text: inputValue,
    //    timestamp: new Date().toLocaleTimeString([], {
    //      hour: "2-digit",
    //      minute: "2-digit",
    //    }),
    //    isUser: true,
    //  };

    //  setMessages([...messages, newMessage]);
    setInputValue("");
    setIsInitial(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] binary-pattern">
      {isInitial ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-mono mb-8 text-center terminal-text">How may I assist?</h1>
          <div className="w-full max-w-2xl">
            <form onSubmit={onSendMessage} className="relative">
              <Input
                type="text"
                placeholder="$ query system"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full h-14 pl-6 pr-16 text-lg font-mono bg-muted/50 border-primary/20 focus:border-primary/50"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-2 h-10 w-10 rounded-sm bg-primary hover:bg-primary/90"
              >
                <Send className="h-5 w-5" />
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
                    className={`max-w-[80%] rounded-sm px-4 py-2 font-mono ${
                      message.isUser
                        ? "bg-primary/20 border border-primary/30 text-primary-foreground"
                        : "bg-muted/50 border border-muted text-foreground"
                    }`}
                  >
                    <p className="terminal-text">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isUser ? "text-primary/70" : "text-muted-foreground"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="border-t border-border/50 p-4">
            <form onSubmit={onSendMessage} className="max-w-2xl mx-auto relative">
              <Input
                type="text"
                placeholder="$ send message"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full h-12 pl-6 pr-16 font-mono bg-muted/50 border-primary/20 focus:border-primary/50"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1 h-10 w-10 rounded-sm bg-primary hover:bg-primary/90"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
