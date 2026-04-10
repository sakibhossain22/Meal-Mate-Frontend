"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, MapPin, Send, Loader2 } from 'lucide-react';
import { toast } from "sonner"; // npx shadcn-ui@latest add sonner

export default function HelpSupportPage() {
  const [isSending, setIsSending] = useState(false);

  const contactMethods = [
    { icon: <Mail className="text-[#f22e3e]" />, label: "Email Us", value: "support@mealmate.com", desc: "Response within 2 hours" },
    { icon: <Phone className="text-[#fbb200]" />, label: "Call Us", value: "+880 1234 567890", desc: "Available 10 AM - 10 PM" },
    { icon: <MessageSquare className="text-emerald-500" />, label: "Live Chat", value: "Start Chat", desc: "Instant support for orders" },
  ];

  // --- Send Message Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // 1 Second loading simulation
    setTimeout(() => {
      setIsSending(false);
      toast.success("Message Sent!", {
        description: "Your message has been delivered to the Meal Mate team.",
        className: "bg-[#f22e3e] text-white border-none rounded-2xl",
      });
      // Reset form logic ekhane add kora jabe
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black tracking-tighter text-zinc-900 dark:text-white mb-4">
            How can we <span className="text-[#f22e3e]">help?</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto">Our team is here to ensure your Meal Mate experience is seamless and delicious.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-center"
            >
              <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6">
                {method.icon}
              </div>
              <h3 className="font-black text-xl mb-1 dark:text-white">{method.label}</h3>
              <p className="text-[#f22e3e] font-bold mb-2">{method.value}</p>
              <p className="text-zinc-400 text-xs uppercase font-black tracking-widest">{method.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-zinc-950 dark:bg-white rounded-[3.5rem] p-12 md:p-20 text-white dark:text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-black mb-6 leading-tight">Send us a <br/><span className="text-[#fbb200]">Direct Message</span></h2>
              <p className="opacity-70 mb-8 font-medium">Having trouble with an order or your provider dashboard? Fill out the form and we'll get back to you.</p>
              <div className="flex items-center gap-4 text-sm font-bold bg-white/5 dark:bg-zinc-100 p-4 rounded-2xl w-fit">
                <MapPin className="text-[#fbb200]" /> Dhanmondi, Dhaka, Bangladesh
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Your Name" className="w-full bg-white/10 dark:bg-zinc-100 p-5 rounded-2xl outline-none border border-white/10 dark:border-zinc-200 focus:border-[#fbb200] text-sm font-bold" />
              <input required type="email" placeholder="Email Address" className="w-full bg-white/10 dark:bg-zinc-100 p-5 rounded-2xl outline-none border border-white/10 dark:border-zinc-200 focus:border-[#fbb200] text-sm font-bold" />
              <textarea required placeholder="Tell us about the issue..." rows={4} className="w-full bg-white/10 dark:bg-zinc-100 p-5 rounded-2xl outline-none border border-white/10 dark:border-zinc-200 focus:border-[#fbb200] text-sm font-bold"></textarea>
              
              <button 
                disabled={isSending}
                type="submit" 
                className="w-full bg-[#f22e3e] disabled:bg-zinc-700 py-5 rounded-2xl font-black uppercase tracking-widest text-white hover:bg-[#ff3b4b] transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                {isSending ? (
                  <>Sending <Loader2 size={20} className="animate-spin" /></>
                ) : (
                  <>Send Message <Send size={18}/></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}