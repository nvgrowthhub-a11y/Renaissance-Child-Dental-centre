import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageCircle,
  Phone,
  Sparkles,
  Bot,
  User,
  ArrowRight
} from "lucide-react";
import { Header } from "../components/common/Header";
import { CLINIC_CONFIG } from "../config/clinic";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! Welcome to SmileCare Care Concierge. How can we assist your smile today?",
      time: "Just now"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Book an appointment",
    "How much is teeth whitening?",
    "Do you handle emergency toothache?",
    "What insurance do you accept?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");

    // Simulated responsive AI bot response
    setTimeout(() => {
      let reply = "Our clinic care coordinator will follow up with you shortly. You can also reach our on-duty desk directly at 08470077778.";
      const lower = text.toLowerCase();

      if (lower.includes("book") || lower.includes("appointment") || lower.includes("slot")) {
        reply = "You can book instantly online through our Book Appointment page! We offer both In-Clinic and HD Video Consultations.";
      } else if (lower.includes("whitening") || lower.includes("price") || lower.includes("cost")) {
        reply = "Our professional Laser Teeth Whitening is currently $150 per complete session (takes 45-60 mins, results are up to 8 shades whiter!).";
      } else if (lower.includes("emergency") || lower.includes("pain") || lower.includes("ache")) {
        reply = "For severe toothache or dental trauma, call our 24/7 Emergency Line immediately at 1800 4123 0923 or our clinic at 08470077778.";
      } else if (lower.includes("insurance") || lower.includes("emi")) {
        reply = "We accept all major PPO insurance providers (Delta Dental, Cigna, MetLife, Guardian, Aetna) and provide 0% interest EMI installment plans.";
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header pageTitle="Care Concierge" />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-28 flex flex-col">
        {/* Top Header Card */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-sm flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary-mint to-primary-container text-white flex items-center justify-center shadow-md">
                <Bot className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-on-surface">SmileCare Assistant</h2>
              <span className="text-[11px] text-emerald-600 font-semibold">Online • Typically replies instantly</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={CLINIC_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a
              href={CLINIC_CONFIG.phoneLink}
              className="p-2 rounded-full bg-surface-container text-primary hover:bg-secondary-container transition-colors"
              title="Call Clinic"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 rounded-3xl p-4 sm:p-6 bg-white/80 backdrop-blur-xl border border-white shadow-sm flex flex-col justify-between overflow-hidden min-h-[420px]">
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 no-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 items-end ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center shrink-0 text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-primary-mint to-primary-container text-white rounded-br-xs shadow-md"
                      : "bg-surface-container-low text-on-surface rounded-bl-xs border border-surface-container/60 shadow-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      msg.sender === "user" ? "text-teal-100" : "text-tertiary"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Strip */}
          <div className="pt-3 pb-2 border-t border-surface-container/60">
            <span className="block text-[10px] font-bold text-tertiary uppercase tracking-wider mb-1.5">
              Suggested Questions:
            </span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1 rounded-full bg-surface-container hover:bg-secondary-container/40 text-primary text-xs font-semibold shrink-0 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 pt-1"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about treatments, pricing, or bookings..."
              className="flex-1 h-12 px-4 rounded-full bg-surface-container-low border border-surface-container text-xs sm:text-sm text-on-surface placeholder:text-tertiary focus:outline-none focus:border-primary-container focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white flex items-center justify-center shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
