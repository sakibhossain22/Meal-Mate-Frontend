import { createCategory } from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import { LayoutGrid, PlusCircle, TextQuote, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AddCategory() {
    return (
        <div className="bg-slate-950 min-h-screen p-6 md:p-12 text-slate-200">
            <div className="max-w-3xl mx-auto">

                {/* Back Button & Header */}
                <Link
                    href="/dashboard/admin/categories"
                    className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-6 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back to List</span>
                </Link>

                <header className="mb-10 flex items-center gap-5">
                    <div className="p-4 bg-blue-500/10 rounded-3xl text-blue-500 ring-1 ring-blue-500/20">
                        <LayoutGrid size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tight">Add New Category</h1>
                        <p className="text-slate-500 font-medium mt-1">Create a new classification for your meals.</p>
                    </div>
                </header>

                <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl">
                    <form action={createCategory} className="space-y-8">

                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                                Category Name
                            </label>
                            <div className="relative group">
                                <PlusCircle className="absolute left-4 top-4 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="e.g. Italian Delights"
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-white font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                                Description (Optional)
                            </label>
                            <div className="relative group">
                                <TextQuote className="absolute left-4 top-4 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                                <textarea
                                    name="description"
                                    rows={4}
                                    placeholder="Describe what kind of meals belong here..."
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-white font-medium resize-none"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-900/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
                        >
                            PUBLISH CATEGORY
                        </Button>
                    </form>
                </div>

                {/* Info Note */}
                <p className="mt-8 text-center text-slate-600 text-xs font-bold uppercase tracking-widest leading-loose">
                    Categories help users filter meals <br /> and find what they crave faster.
                </p>
            </div>
        </div>
    );
}