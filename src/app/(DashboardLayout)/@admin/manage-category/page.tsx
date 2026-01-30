import { adminAllCategory } from "@/actions/meal.action";
import { 
    Layers, 
    ChevronRight, 
    UtensilsCrossed, 
    Plus, 
    MoreHorizontal,
    Package,
    Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function ManageCategory() {
    const response = await adminAllCategory();
    const categories = response?.data || [];

    return (
        <div className="bg-slate-950 min-h-screen p-4 md:p-10 text-slate-200 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-orange-500 font-bold text-sm mb-2">
                            <Layers size={18} />
                            <span>INVENTORY MANAGEMENT</span>
                        </div>
                        <h1 className="text-4xl font-black text-white">Menu Categories</h1>
                        <p className="text-slate-500 mt-2 text-lg">Organize your meals and monitor category stock levels.</p>
                    </div>
                    <Button className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-6 rounded-2xl flex gap-2 shadow-lg shadow-orange-900/20 active:scale-95 transition-all">
                        <Plus size={20} />
                        ADD NEW CATEGORY
                    </Button>
                </header>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 gap-10">
                    {categories.map((category: any) => (
                        <div key={category.id} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
                            
                            {/* Category Banner/Header */}
                            <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 border border-orange-500/20">
                                        <Package size={28} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">{category.name}</h2>
                                        <p className="text-slate-500 text-sm font-medium">Total Items: {category.meals.length}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800 rounded-xl">Edit</Button>
                                    <Button variant="ghost" size="icon" className="text-slate-500"><MoreHorizontal /></Button>
                                </div>
                            </div>

                            {/* Meals List inside Category */}
                            <div className="p-6">
                                {category.meals.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {category.meals.map((meal: any) => (
                                            <div key={meal.id} className="bg-slate-950/50 border border-slate-800 p-5 rounded-3xl hover:border-slate-700 transition-all group relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${meal.isAvailable ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                                        {meal.isAvailable ? 'AVAILABLE' : 'OUT OF STOCK'}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-start gap-4">
                                                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
                                                        {meal.image ? (
                                                            <Image src={meal.image} alt={meal.name} width={64} height={64} className="object-cover" />
                                                        ) : (
                                                            <UtensilsCrossed className="text-slate-700" size={24} />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-slate-100 group-hover:text-orange-400 transition-colors">{meal.name}</h4>
                                                        <p className="text-slate-500 text-xs line-clamp-1 mt-1 mb-2">{meal.description}</p>
                                                        <div className="flex items-center justify-between mt-auto">
                                                            <span className="text-orange-400 font-black">${meal.price}</span>
                                                            <span className="text-[10px] text-slate-600 flex items-center gap-1">
                                                                <Calendar size={10} />
                                                                {new Date(meal.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-slate-600 border-2 border-dashed border-slate-800 rounded-3xl">
                                        <UtensilsCrossed size={40} className="mb-3 opacity-20" />
                                        <p className="italic">No meals listed in this category yet.</p>
                                        <Button variant="link" className="text-orange-500 text-sm mt-2">+ Add first meal</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}