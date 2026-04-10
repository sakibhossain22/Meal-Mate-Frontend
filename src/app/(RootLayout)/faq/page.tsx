"use client";
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "How do I start as a Provider?", a: "Register your account, go to 'Become a Provider', upload your kitchen photos and menu." },
    { q: "Is there a delivery fee?", a: "Delivery fees are calculated based on your distance from the kitchen. Look for 'Free Delivery' offers!" },
    { q: "How can I track my meal?", a: "Once your order is accepted, you can see real-time status updates in your dashboard." },
    { q: "What if I receive the wrong order?", a: "Contact 'Help & Support' immediately with a photo of the received meal for a full refund." }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-7xl font-black text-center mb-16 tracking-tighter">
          Got <span className="text-[#fbb200]">Questions?</span>
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-zinc-100 dark:border-zinc-800">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className={`text-2xl font-black transition-colors ${openIndex === i ? 'text-[#f22e3e]' : 'text-zinc-800 dark:text-zinc-200 group-hover:text-[#f22e3e]'}`}>
                  {faq.q}
                </span>
                {openIndex === i ? <Minus className="text-[#fbb200]" /> : <Plus className="text-zinc-400" />}
              </button>
              {openIndex === i && (
                <div className="pb-8 text-zinc-500 font-medium text-lg leading-relaxed animate-in fade-in slide-in-from-top-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}