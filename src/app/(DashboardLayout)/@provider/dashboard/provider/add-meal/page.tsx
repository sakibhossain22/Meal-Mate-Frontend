"use client"

import React, { useState } from 'react';
import {
  UtensilsCrossed,
  DollarSign,
  AlignLeft,
  Tag,
  CheckCircle2,
  PlusCircle,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { addMeal } from '@/actions/meal.action';
import { MealType } from '@/types/index.type';

export default function AddMeal() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    isAvailable: true,
    categoryId: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addMeal(formData as MealType)
      console.log(response);
      if (response.ok) {
        toast.success("Meal added successfully!");
        setFormData({ name: "", description: "", price: "", isAvailable: true, categoryId: "" });
      } else {
        toast.error("Failed to add meal");
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
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <PlusCircle className="text-orange-500" size={32} />
            Add New Meal
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Create a new dish for your customers.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Meal Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
              <UtensilsCrossed size={16} /> Meal Name
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Grilled Chicken Burger"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
              <AlignLeft size={16} /> Description
            </label>
            <textarea
              required
              rows={3}
              placeholder="Tell us about the ingredients and taste..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <DollarSign size={16} /> Price ($)
              </label>
              <input
                required
                type="number"
                step="0.01"
                placeholder="15.56"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <Tag size={16} /> Category
              </label>
              <select
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all appearance-none"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              >
                <option value="Pizza">Pizza</option>
                <option value="Burger">Burger</option>
                <option value="Pasta">Pasta</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center justify-between p-6 bg-slate-950/50 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <CheckCircle2 className={formData.isAvailable ? "text-emerald-500" : "text-slate-600"} />
              <div>
                <p className="text-sm font-bold text-white">Available for Orders</p>
                <p className="text-[10px] text-slate-500 uppercase font-black">Instantly visible on menu</p>
              </div>
            </div>
            <input
              type="checkbox"
              className="w-6 h-6 accent-orange-500 cursor-pointer"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 text-white h-16 rounded-[1.5rem] font-black text-lg transition-all shadow-xl shadow-orange-900/20 flex items-center justify-center gap-3"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Publish Meal to Menu"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}