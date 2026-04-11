"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Loader2, ExternalLink, Utensils, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // পপ-আপ মেসেজের জন্য স্টেট
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // পেজ লোড হওয়ার ২ সেকেন্ড পর শুধু মেসেজ পপ-আপ দেখাবে
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPopup(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // চ্যাট ওপেন করার ফাংশন
  const handleOpenChat = () => {
    setIsOpen(true);
    setShowPopup(false);
    if (messages.length === 0) {
      setMessages([{ role: 'model', text: "Hello! 👋 I'm your MealMate Assistant. How can I help you find the perfect meal today?" }]);
    }
  };

  const renderMessageWithLinks = (text: string) => {
    const combinedRegex = /(https?:\/\/[^\s]+|\/meals\/[^\s\n\r`"']+)/g;
    const textParts = text.split(combinedRegex);
    const links = text.match(combinedRegex);

    return (
      <div className="flex flex-col gap-3">
        <div className="leading-relaxed">
          {textParts.map((part, index) =>
            part.match(combinedRegex) ? null : <span key={index}>{part}</span>
          )}
        </div>
        {links && (
          <div className="flex flex-wrap gap-2 mt-1">
            {links.map((link, index) => {
              const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
              const fullLink = link.startsWith('/') ? `${baseUrl}${link}` : link;
              const slug = link.split('/').pop()?.split('?')[0] || "Details";
              const displayName = slug.length > 15 ? "Meal Item" : slug.replace(/-/g, ' ');

              return (
                <Link
                  key={index}
                  href={fullLink}
                  target="_blank"
                  className="flex items-center gap-2 bg-pink-50 dark:bg-pink-500/10 hover:bg-pink-100 dark:hover:bg-pink-500/20 border border-pink-200 dark:border-pink-500/40 px-3 py-2 rounded-xl text-[11px] font-bold text-[#f22e3e] transition-all shadow-sm group"
                >
                  <span className="capitalize">Order: {displayName}</span>
                  <ExternalLink size={12} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(msg => ({
            role: msg.role === 'model' ? 'assistant' : 'user',
            content: msg.text
          }))
        }),
      });

      const result = await res.json();
      if (result.success && result.data) {
        setMessages((prev) => [...prev, { role: 'model', text: result.data }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'model', text: "Connection failed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      
      {/* --- পপ-আপ মেসেজ (শুধু চ্যাট বন্ধ থাকলেই দেখাবে) --- */}
      {showPopup && !isOpen && (
        <div 
          onClick={handleOpenChat}
          className="mb-4 mr-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-4 py-3 rounded-2xl rounded-br-none shadow-2xl border border-slate-100 dark:border-slate-700 cursor-pointer animate-bounce relative group"
        >
            <p className="text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                May I assist you? 🍲
            </p>
            {/* Close small popup */}
            <button 
                onClick={(e) => { e.stopPropagation(); setShowPopup(false); }}
                className="absolute -top-2 -left-2 bg-slate-200 dark:bg-slate-700 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <X size={10} />
            </button>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="bg-[#f22e3e] hover:bg-[#d12837] text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 group"
        >
          <Utensils size={28} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Main Chat Interface */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 w-80 sm:w-[420px] h-[580px] rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#f22e3e] p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center font-black italic text-xl">M</div>
              <div>
                <h3 className="font-bold text-sm tracking-widest uppercase">MealMate AI</h3>
                <p className="text-[10px] opacity-70 font-medium">BhojonBari Concierge</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-2 rounded-xl transition-colors">
              <X size={22} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/40">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] p-4 rounded-2xl text-[13px] shadow-sm ${
                  msg.role === 'user' ? 'bg-[#f22e3e] text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                }`}>
                  {msg.role === 'model' ? renderMessageWithLinks(msg.text) : msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <Loader2 size={18} className="animate-spin text-[#f22e3e]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What are you craving?"
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-none focus:ring-2 focus:ring-[#f22e3e] rounded-2xl px-5 py-3"
            />
            <button type="submit" className="bg-[#f22e3e] text-white p-3 rounded-2xl"><Send size={20} /></button>
          </form>
        </div>
      )}
    </div>
  );
}