"use client"

import React, { useState } from 'react';
import {
  UtensilsCrossed,
  DollarSign,
  AlignLeft,
  Tag,
  CheckCircle2,
  PlusCircle,
  Loader2,
  Link2,
  Image as ImageIcon,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import { addMeal } from '@/actions/meal.action';

export default function AddMeal() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    isAvailable: true,
    categoryId: "Burger",
    image: "" 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image.startsWith('http')) {
      toast.error("Please provide a valid image URL");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price)
      };

      const response = await addMeal(payload as any);
      
      if (response.success || response.ok) {
        toast.success("Meal added successfully!");
        // Form reset logic
        setFormData({ 
          name: "", 
          description: "", 
          price: "", 
          isAvailable: true, 
          categoryId: "Burger", 
          image: "" 
        });
      } else {
        toast.error(response.message || "Failed to add meal");
      }
    } catch (error) {
      toast.error("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm shadow-2xl">

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black text-white flex items-center justify-center md:justify-start gap-3">
            <PlusCircle className="text-orange-500" size={32} /> Add New Meal
          </h1>
          <p className="text-slate-500 mt-2 font-medium">List a new dish with image and details.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
            <div className="">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <Link2 size={16} /> Meal Image URL
              </label>
              <input
                required
                type="url"
                placeholder="FooD image LInk"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono text-xs"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

          </div>

          {/* 2. Meal Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
              <UtensilsCrossed size={16} /> Meal Name
            </label>
            <input
              required
              type="text"
              placeholder="Smoky BBQ Grilled Chicken"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* 3. Description Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
              <FileText size={16} /> Description
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe the taste, ingredients, and special portions..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 4. Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <DollarSign size={16} /> Price ($)
              </label>
              <input
                required
                type="number"
                step="0.01"
                placeholder="14.99"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            {/* 5. Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <Tag size={16} /> Category
              </label>
              <select
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all appearance-none cursor-pointer"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              >
                <option value="Pizza">Pizza</option>
                <option value="Burger">Burger</option>
                <option value="Pasta">Pasta</option>
                <option value="Dessert">Dessert</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>
          </div>

          {/* 6. Availability */}
          <div className="flex items-center justify-between p-6 bg-slate-950 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className={formData.isAvailable ? "text-orange-500" : "text-slate-700"} />
              <p className="text-sm font-bold text-white">Visible on Menu</p>
            </div>
            <input
              type="checkbox"
              className="w-6 h-6 accent-orange-500 cursor-pointer"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 text-white h-16 rounded-[1.5rem] font-black text-lg transition-all shadow-xl shadow-orange-900/20 flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Publish Meal"}
          </button>
        </form>
      </div>
    </div>
  );
}