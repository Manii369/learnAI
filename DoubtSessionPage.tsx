import DashboardLayout from "@/components/DashboardLayout";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: number;
  sender: "student" | "ai";
  text: string;
}

const initialMessages: Message[] = [
  { id: 1, sender: "ai", text: "Hello! I'm your AI tutor. Ask me anything about your courses. What topic are you struggling with?" },
];

export default function DoubtSessionPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), sender: "student", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "That's a great question! Let me help you understand this concept. The key idea is to break it down into smaller parts and practice each one. Would you like me to recommend some resources?",
        },
      ]);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold font-display text-foreground">Doubt Session</h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto bg-card rounded-xl border border-border p-4 space-y-4 mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "student" ? "flex-row-reverse" : ""} animate-fade-in`}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className={msg.sender === "ai" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}>
                  {msg.sender === "ai" ? "AI" : "Me"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`max-w-[70%] p-3 rounded-xl text-sm ${
                  msg.sender === "student"
                    ? "gradient-primary text-primary-foreground rounded-tr-sm"
                    : "bg-secondary text-secondary-foreground rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask your doubt..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} className="gradient-primary text-primary-foreground">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
