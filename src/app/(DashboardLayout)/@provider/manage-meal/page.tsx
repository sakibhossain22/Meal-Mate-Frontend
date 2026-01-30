import { providerMeal } from "@/actions/meal.action";
import {
  Edit,
  Trash2,
  Plus,
  Utensils,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ManageMeal() {
  const meals = await providerMeal() || []
  console.log(meals);
  return (
    <div className="bg-slate-950 min-h-screen p-4 md:p-10 text-slate-200">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <Utensils className="text-orange-500" size={32} />
              Manage Menu
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Add, edit, or remove items from your kitchen.</p>
          </div>
          <Link href="/dashboard/provider/add-meal">
            <Button className="bg-orange-600 hover:bg-orange-500 text-white rounded-2xl h-12 px-6 font-bold flex gap-2">
              <Plus size={20} /> Add New Meal
            </Button>
          </Link>
        </div>

        {/* Meal List Table */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60">
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Meal Details</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Price</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Rating</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {meals.length > 0 ? meals.map((meal: any) => (
                  <tr key={meal.id} className="group hover:bg-slate-800/30 transition-colors">
                    {/* Meal Name & Image */}
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {meal.image ? (
                            <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                          ) : (
                            <Utensils size={20} className="text-slate-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white group-hover:text-orange-400 transition-colors">{meal.name}</p>
                          <p className="text-xs text-slate-500 truncate max-w-[150px]">{meal.description}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-6">
                      <span className="text-xs font-bold bg-slate-800 px-3 py-1 rounded-full text-slate-400">
                        {meal.categoryId}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-6 font-black text-white">
                      ${meal.price}
                    </td>

                    {/* Status Toggle */}
                    <td className="p-6">
                      {meal.isAvailable ? (
                        <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold">
                          <CheckCircle2 size={14} /> Available
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                          <XCircle size={14} /> Hidden
                        </div>
                      )}
                    </td>

                    {/* Rating Calculation */}
                    <td className="p-6">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold">{meal.reviews?.length || 0} Reviews</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-blue-500/10 hover:text-blue-500">
                          <Edit size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-rose-500/10 hover:text-rose-500">
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="p-20 text-center">
                      <p className="text-slate-600 font-bold">No meals found in your kitchen.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}