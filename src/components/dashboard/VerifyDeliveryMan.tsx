"use client"

import React, { useState } from 'react'
import { 
    ShieldCheck, 
    Truck, 
    MapPin, 
    Star, 
    Calendar, 
    Mail, 
    ShieldAlert 
} from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation' // ডেটা রিফ্রেশ করার জন্য
import { verifyDeliveryManAction, verifyProviderAction } from '@/actions/superadmin.action';

export default function VerifyDeliveryMan({ deliveryMenProfiles, title }: { deliveryMenProfiles: any[], title?: string }) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const router = useRouter();

    // হ্যান্ডলার: ২টা ইউজ কেস (Delivery ও Provider) হ্যান্ডেল করা হয়েছে
    const handleAction = async (id: string) => {
        setLoadingId(id);
        
        try {
            let result;

            if (title === 'Delivery') {
                result = await verifyDeliveryManAction(id);
            } else {
                // টাইটেল Delivery না হলে এটি Provider হিসেবে গণ্য হবে
                result = await verifyProviderAction(id);
            }

            if (result?.success) {
                toast.success(`${title || 'Profile'} Verified successfully!`);
                router.refresh(); // সার্ভার থেকে নতুন ডেটা আনার জন্য
            } else {
                toast.error(result?.message || "Verification failed");
            }
        } catch (error: any) {
            toast.error(error.message || "Action failed. Try again.");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="p-6 md:p-10 min-h-screen bg-[#0a0a0a] text-white">
            {/* Header Section */}
            <div className="mb-12">
                <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3 italic">
                    <Truck className="text-white" size={40} /> {`VERIFY ${title?.toUpperCase() || "PERSONNEL"}`}
                </h1>
                <p className="text-slate-500 mt-1 font-medium tracking-wide">
                    Strict verification protocol for {title?.toLowerCase() || 'service providers'} in Sherpur region.
                </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {deliveryMenProfiles.map((profile) => (
                    <div
                        key={profile.id}
                        className="group relative bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/20 transition-all duration-500"
                    >
                        {/* Status Bar */}
                        <div className={`h-2 w-full ${profile.isVerified ? 'bg-secondary' : 'bg-rose-500'} opacity-50`} />

                        <div className="p-8">
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex gap-5">
                                    <div className="relative">
                                        <img
                                            src={profile.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`}
                                            className="w-20 h-20 rounded-3xl object-cover border-2 border-white/10 group-hover:border-primary transition-all shadow-2xl"
                                            alt="Profile"
                                        />
                                        {profile.isVerified && (
                                            <div className="absolute -bottom-2 -right-2 bg-secondary p-1.5 rounded-xl border-4 border-[#0a0a0a]">
                                                <ShieldCheck size={16} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black tracking-tight group-hover:transition-colors">
                                            {profile.user?.name || "Unknown User"}
                                        </h3>
                                        <p className="text-xs text-slate-500 font-bold flex items-center gap-1.5 mt-1 uppercase tracking-wider">
                                            <Mail size={12} className="text-primary" /> {profile.user?.email || "No Email"}
                                        </p>
                                        <div className="flex items-center gap-1 mt-3">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Star key={i} size={12} className={`${i <= 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
                                            ))}
                                            <span className="text-[10px] font-black ml-2 text-slate-400">4.0 RATING</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                                        <MapPin size={10} /> Region
                                    </div>
                                    <div className="text-sm font-bold text-slate-200">{profile.city || "Sherpur"}</div>
                                </div>
                                <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                                        <Calendar size={10} /> Joined
                                    </div>
                                    <div className="text-sm font-bold text-slate-200">
                                        {new Date(profile.createdAt || Date.now()).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {!profile.isVerified ? (
                                    <button
                                        onClick={() => handleAction(profile.id)}
                                        disabled={loadingId === profile.id}
                                        className="flex-1 flex items-center justify-center gap-2 bg-white/40 hover:bg-green-700 text-white font-black py-4 rounded-2xl transition-all active:scale-95 cursor-pointer text-xs uppercase tracking-widest disabled:opacity-50"
                                    >
                                        <ShieldCheck size={18} /> {loadingId === profile.id ? "Processing..." : `Verify ${title || 'User'}`}
                                    </button>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center gap-2 bg-white/5 text-secondary font-black py-4 rounded-2xl border border-secondary/20 text-xs uppercase tracking-widest">
                                        <ShieldCheck size={18} /> Approved Profile
                                    </div>
                                )}
                            </div>
                        </div>

                        {profile.isBlocked && (
                            <div className="absolute inset-0 bg-rose-900/10 backdrop-blur-[2px] flex items-center justify-center z-10">
                                <div className="bg-rose-500 text-white px-4 py-2 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2">
                                    <ShieldAlert size={16} /> Restricted
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {deliveryMenProfiles.length === 0 && (
                <div className="text-center py-20 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
                    <Truck size={64} className="mx-auto text-slate-800 mb-4 opacity-20" />
                    <h3 className="text-xl font-bold text-slate-600 uppercase tracking-widest">No profiles to verify</h3>
                </div>
            )}
        </div>
    )
}