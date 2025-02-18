import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

const AIChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response (Replace with actual AI API call)
    setTimeout(() => {
      const botResponse = { text: "I'm analyzing your request...", sender: "bot" };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md p-4 shadow-lg rounded-xl">
      <CardContent className="h-80 overflow-y-auto flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <motion.div 
            key={index} 
            className={`p-2 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {msg.text}
          </motion.div>
        ))}
      </CardContent>
      <div className="flex items-center gap-2 mt-4">
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type your message..." 
          className="flex-1"
        />
        <Button onClick={handleSend} className="bg-blue-600 text-white" size="icon">
          <Send size={18} />
        </Button>
      </div>
    </Card>
  );
};

export default AIChatBot;
