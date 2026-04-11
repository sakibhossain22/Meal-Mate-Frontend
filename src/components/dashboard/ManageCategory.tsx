"use client"

import { useState } from "react";
import { 
  Plus, Hash, Utensils, Pizza, Coffee, Beef, 
  IceCream, Sandwich, Soup, Salad, Cake 
} from "lucide-react";
import { createCategoryAction } from "@/actions/superadmin.action";
import { toast } from "sonner";

// ক্যাটাগরি নাম অনুযায়ী আইকন সিলেক্ট করার লজিক
const getCategoryIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("pizza")) return <Pizza size={48} />;
  if (lowerName.includes("burger") || lowerName.includes("sandwich")) return <Sandwich size={48} />;
  if (lowerName.includes("coffee") || lowerName.includes("drink")) return <Coffee size={48} />;
  if (lowerName.includes("meat") || lowerName.includes("beef") || lowerName.includes("chicken")) return <Beef size={48} />;
  if (lowerName.includes("ice cream") || lowerName.includes("dessert")) return <IceCream size={48} />;
  if (lowerName.includes("soup")) return <Soup size={48} />;
  if (lowerName.includes("salad")) return <Salad size={48} />;
  if (lowerName.includes("cake") || lowerName.includes("bakery")) return <Cake size={48} />;
  
  return <Utensils size={48} />; // Default Icon
};

export default function ManageCategories({ categories }: { categories: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async (formData: FormData) => {
    setLoading(true);
    const name = formData.get("categoryName") as string;
    try {
      await createCategoryAction(name);
      toast.success("Category created successfully!");
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#0a0a0a] text-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
            <Hash className="text-primary" size={32} /> Category Lab
          </h1>
          <p className="text-slate-400 mt-1">Manage global collections with precision.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-black font-bold px-8 py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
        >
          <Plus size={20} strokeWidth={3} />
          <span>New Collection</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center hover:border-primary/40 transition-all duration-500 overflow-hidden"
          >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl" />

            {/* Icon Container */}
            <div className="relative z-10 mb-6 p-6 rounded-3xl bg-white/[0.03] text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500">
              {getCategoryIcon(category.name)}
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <div className="mt-2 inline-block px-4 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-[10px] font-black text-secondary tracking-widest uppercase">
                {category.meals?.length || 0} Products
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Add Category Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative w-full max-w-md bg-[#0f0f0f] border border-white/10 p-10 rounded-[3rem] shadow-2xl">
            <h2 className="text-3xl font-black mb-2 tracking-tighter">Create Identity</h2>
            <p className="text-sm text-slate-500 mb-8">Define a new category for the marketplace.</p>

            <form action={handleAddCategory} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">
                  Name
                </label>
                <input
                  name="categoryName"
                  required
                  type="text"
                  placeholder="e.g. Italian Pizza"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-primary/50 transition-all cursor-text"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-5 rounded-2xl bg-white/5 hover:bg-white/10 font-bold transition-all text-xs uppercase tracking-widest cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex-1 px-6 py-5 rounded-2xl bg-primary hover:bg-orange-600 text-black font-black transition-all text-xs uppercase tracking-widest disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Creating..." : "Confirm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}