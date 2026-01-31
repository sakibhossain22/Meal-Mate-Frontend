import { profile } from "@/actions/customer.action";
import {
    User,
    Mail,
    Calendar,
    ShieldCheck,
    ShieldAlert,
    Settings,
    Clock,
    Camera,
    CreditCard,
    ShoppingBag,
    PhoneCallIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminProfile() {
    const { data } = await profile();
    console.log(data);
    const user = data;

    if (!user) return <div className="text-white p-10">User not found.</div>;

    return (
        <div className="bg-slate-950 min-h-screen p-4 md:p-8 text-slate-200">
            <div className="max-w-5xl mx-auto space-y-8">

                <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="relative group">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                                <div className="w-full h-full bg-slate-900 rounded-[1.8rem] flex items-center justify-center overflow-hidden">
                                    {user.image ? (
                                        <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={64} className="text-slate-700" />
                                    )}
                                </div>
                            </div>
                            <button className="absolute bottom-2 right-2 p-2 bg-slate-800 border border-slate-700 rounded-xl text-white hover:bg-slate-700 transition-colors shadow-lg">
                                <Camera size={18} />
                            </button>
                        </div>
                        <div className="text-center md:text-left space-y-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                                <h1 className="text-4xl font-black text-white tracking-tight">{user.name}</h1>
                                <span className="bg-blue-500/10 text-blue-400 text-[10px] px-3 py-1 rounded-full border border-blue-500/20 font-black uppercase">
                                    {user.role}
                                </span>
                            </div>
                            <div className="flex items-center gap-3  ">
                                <p className="text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2">
                                    <Mail size={16} className="text-slate-600" />
                                    {user.email}
                                </p>
                                <p className="text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2">
                                    <PhoneCallIcon size={16} className="text-slate-600" />
                                    {user.phone || "Add Your Phone"}
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                                <div className="flex items-center gap-2 text-xs bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                                    <Clock size={14} className="text-orange-400" />
                                    <span className="text-slate-500">Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                                </div>
                                {user.emailVerified ? (
                                    <div className="flex items-center gap-2 text-xs bg-emerald-500/5 px-4 py-2 rounded-xl border border-emerald-500/10 text-emerald-500">
                                        <ShieldCheck size={14} />
                                        <span>Verified Account</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-xs bg-rose-500/5 px-4 py-2 rounded-xl border border-rose-500/10 text-rose-500 font-bold">
                                        <ShieldAlert size={14} />
                                        <span>Verify Email</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:ml-auto">
                            <Link href={'/dashboard/admin/admin-profile/update-profile'}>
                                <Button className="bg-white text-black hover:bg-slate-200 font-bold px-6 py-6 rounded-2xl flex gap-2">
                                    <Settings size={20} />
                                    Edit Profile
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-white">Account Status</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">{user.status}</p>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
                                <ShoppingBag size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-white">Recent Orders</h3>
                        </div>
                        <p className="text-slate-500 text-sm">No recent activity found.</p>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
                                <CreditCard size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-white">Balance</h3>
                        </div>
                        <p className="text-2xl font-black text-white">$0.00</p>
                    </div>
                </div>

                <div className="text-center pb-10">
                    <p className="text-slate-700 text-[10px] uppercase font-bold tracking-[0.3em]">
                        Last updated: {new Date(user.updatedAt).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}