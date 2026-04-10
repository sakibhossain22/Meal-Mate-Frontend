"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowUpRight, Search, Hash, ChefHat, ShoppingBag, Heart } from 'lucide-react';

// --- Blog Data (12 Articles for Diversity) ---
const blogPosts = [
  { id: 1, title: "The Art of Preparing Perfect Healthy Home Meals", category: "Nutrition", author: "Chef Rahat", date: "12 Apr, 2026", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=500", desc: "Learn how to manage nutrients without losing the authentic home-made taste." },
  { id: 2, title: "How to Grow Your Food Business as a Provider", category: "Business", author: "Admin Sakib", date: "10 Apr, 2026", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=500", desc: "Top 5 strategies to increase your meal orders and build a loyal customer base." },
  { id: 3, title: "Sustainable Packaging for Food Delivery", category: "Environment", author: "Green Earth", date: "08 Apr, 2026", image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=800&auto=format&fit=crop", desc: "Why choosing eco-friendly packaging is the next big thing for Meal Mate." },
  { id: 4, title: "Secret Spices of Bangladesh: A Culinary Journey", category: "Recipes", author: "Mariam Begum", date: "05 Apr, 2026", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop", desc: "Discover the hidden spices that make our traditional meals unforgettable." },
  { id: 5, title: "Maintaining Hygiene in Your Professional Kitchen", category: "Safety", author: "Dr. Zaman", date: "01 Apr, 2026", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop", desc: "A complete checklist for providers to ensure 100% food safety compliance." },
  { id: 6, title: "The Rise of Meal Management Systems in 2026", category: "Tech", author: "Tech News", date: "28 Mar, 2026", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=500", desc: "How automation is making mess management easier for students and office goers." },
  { id: 7, title: "Best 5 Breakfast Items for Busy Mornings", category: "Nutrition", author: "Anika Raihan", date: "25 Mar, 2026", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop", desc: "Quick, healthy and delicious meal ideas that take less than 15 minutes." },
  { id: 8, title: "How Customer Feedback Shaped Meal Mate", category: "Success Stories", author: "Sakib Hossain", date: "20 Mar, 2026", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=500", desc: "A look back at how we improved our platform based on your valuable reviews." },
  { id: 9, title: "Maximizing Profits as a Meal Provider", category: "Business", author: "Profit Guru", date: "15 Mar, 2026", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=500", desc: "Budgeting and portion control tips for independent home-chefs." },
  { id: 10, title: "Traditional vs Modern Cooking: A Debate", category: "Recipes", author: "Chef Karim", date: "10 Mar, 2026", image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=500", desc: "Is air-frying better than deep-frying? Let's find out the truth." },
  { id: 11, title: "Join the Meal Mate Delivery Fleet", category: "Updates", author: "Admin", date: "05 Mar, 2026", image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=500", desc: "We are expanding! Learn how to register as a delivery hero in your city." },
  { id: 12, title: "The Impact of Organic Food on Long-term Health", category: "Nutrition", author: "Nutritionist Tania", date: "01 Mar, 2026", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500", desc: "Why organic ingredients are worth the extra cost for your family's safety." }
];

const categories = ["All Stories", "Nutrition", "Business", "Recipes", "Safety", "Tech", "Success Stories", "Updates"];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Stories");
  const [visibleCount, setVisibleCount] = useState(6);

  // --- Search & Filter Logic ---
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All Stories" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pt-28 pb-20 px-4">
      {/* 1. Hero & Interactive Search */}
      <section className="max-w-7xl mx-auto mb-16 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[#f22e3e] font-black uppercase tracking-[0.4em] text-xs mb-4 block">The Newsroom</span>
          <h1 className="text-6xl md:text-8xl font-black text-zinc-950 dark:text-white leading-[0.85] tracking-tighter mb-10">
            Freshly <span className="text-[#fbb200]">Baked</span> Ideas.
          </h1>
        </motion.div>

        <div className="max-w-2xl mx-auto relative group">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for articles, recipes, or tips..." 
            className="w-full bg-zinc-100 dark:bg-zinc-900 border-2 border-transparent focus:border-[#fbb200] px-14 py-6 rounded-[2rem] outline-none transition-all font-bold text-lg shadow-inner shadow-zinc-200 dark:shadow-none"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#f22e3e] transition-colors" size={24} />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400 font-bold hover:text-black dark:hover:text-white">Clear</button>
          )}
        </div>
      </section>

      {/* 2. Category Filter Chips */}
      <section className="max-w-7xl mx-auto mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
            className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-90 ${
              activeCategory === cat 
              ? "bg-[#f22e3e] text-white shadow-lg shadow-[#f22e3e]/30" 
              : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* 3. Dynamic Blog Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {displayedPosts.length > 0 ? (
            displayedPosts.map((post, i) => (
              <motion.div 
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-xl hover:-translate-y-3 transition-all duration-500"
              >
                <div className="h-60 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#fbb200] text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} className="text-[#f22e3e]" /> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={14} className="text-[#fbb200]" /> {post.author}</span>
                  </div>
                  <h3 className="text-2xl font-black text-zinc-950 dark:text-white leading-tight mb-4 group-hover:text-[#f22e3e] transition-colors">{post.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8 line-clamp-2 font-medium">{post.desc}</p>
                  
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 font-black text-[11px] uppercase tracking-widest text-zinc-950 dark:text-white group-hover:gap-4 transition-all">
                      Read Story <ArrowUpRight size={16} className="text-[#f22e3e]" />
                    </button>
                    <button className="p-3 rounded-full bg-zinc-50 dark:bg-zinc-800 text-zinc-400 hover:text-[#f22e3e] transition-colors">
                      <Heart size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <h3 className="text-3xl font-black text-zinc-300">No Articles Found Matching Your Search!</h3>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. Functional "Load More" */}
      {visibleCount < filteredPosts.length && (
        <div className="flex justify-center mt-20">
          <button 
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="group relative px-14 py-6 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest overflow-hidden transition-all active:scale-95 shadow-2xl"
          >
            <span className="relative z-10 flex items-center gap-2">Load More Articles <ChefHat size={20}/></span>
            <div className="absolute inset-0 bg-[#f22e3e] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      )}
    </main>
  );
}