"use client"

import { useState } from "react";
import { User, Phone, Save, Loader2, Image } from "lucide-react";
import { toast } from "sonner";
import { updateProviderProfile } from "@/actions/profile.action";
import { redirect } from "next/navigation";

export default function UpdateProfile() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        image: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await updateProviderProfile(formData);

        if (result) {
            redirect('/dashboard/admin/admin-profile')
        }
        if (result.success || result.ok) {
            toast.success("Profile updated successfully!");
        } else {
            toast.error(result.message || "Something went wrong");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-sm shadow-2xl">

                <div className="mb-8">
                    <h1 className="text-2xl font-black text-white">Update Profile</h1>
                    <p className="text-slate-500 text-sm mt-1">Change your name and contact phone and image.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                            <User size={14} /> Full Name
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Shakib Hossain"
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-12 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                            <Phone size={14} /> Phone Number
                        </label>
                        <input
                            required
                            type="tel"
                            placeholder="01XXXXXXXX"
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-12 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                            <Image size={14} /> Profile Image
                        </label>
                        <input
                            required
                            type="url"
                            placeholder="Add Your Image Direct Link"
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-12 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white h-14 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}