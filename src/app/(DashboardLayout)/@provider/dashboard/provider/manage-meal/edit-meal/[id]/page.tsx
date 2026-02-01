"use client"

import React, { useEffect, useState } from 'react';
import { UtensilsCrossed, DollarSign, AlignLeft, Tag, CheckCircle2, Edit3, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from 'next/navigation';
import { getCategory, getSingleMeal, updateMeal } from '@/actions/meal.action';

export default function EditMeal() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory()
        setCategories(data.data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };

    fetchCategories();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image: "",
    isAvailable: true
  });

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const res = await getSingleMeal(id as string);
        if (res?.data) {
          const meal = res.data;
          setFormData({
            name: meal.name,
            description: meal.description,
            price: meal.price.toString(),
            categoryId: meal.categoryId,
            image: meal.image || "",
            isAvailable: meal.isAvailable
          });
        }
      } catch (error) {
        toast.error("Failed to load meal data");
      } finally {
        setFetching(false);
      }
    };
    fetchMealData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("categoryId", formData.categoryId);
      data.append("image", formData.image);
      data.append("isAvailable", formData.isAvailable ? "true" : "false");

      const result = await updateMeal(id as string, data);

      if (result?.success || result?.ok || !result?.error) {
        toast.success("Meal updated successfully!");
        router.push("/dashboard/provider/manage-meal");
        router.refresh();
      } else {
        toast.error(result?.message || "Update failed");
      }
    } catch (error) {
      toast.error("An error occurred during update");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm shadow-2xl">

        <div className="mb-10">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Edit3 className="text-orange-500" size={32} />
            Update Meal
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Edit your meal details below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
              <UtensilsCrossed size={16} /> Meal Name
            </label>
            <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
              <ImageIcon size={16} /> Image URL
            </label>
            <input type="text" placeholder="https://example.com/image.jpg" className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
              <AlignLeft size={16} /> Description
            </label>
            <textarea required rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <DollarSign size={16} /> Price ($)
              </label>
              <input required type="number" step="0.01" className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <Tag size={16} /> Category
              </label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all appearance-none" value={formData.categoryId} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}>
                {
                  categories?.map((category: { id: string, name: string }) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-slate-950/50 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <CheckCircle2 className={formData.isAvailable ? "text-emerald-500" : "text-slate-600"} />
              <p className="text-sm font-bold text-white">Available for Orders</p>
            </div>
            <input
              type="checkbox"
              className="w-6 h-6 accent-orange-500 cursor-pointer"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
            />
          </div>

          <button disabled={loading} type="submit" className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 text-white h-16 rounded-[1.5rem] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-900/20">
            {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}