import { adminAllUser } from "@/actions/meal.action";
import {
    User,
    Mail,
    ShieldAlert,
    UserCog,
    CheckCircle2,
    Ban,
    UserCheck,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateUserStatus } from "@/actions/admin.action";

export default async function ManageUser() {
    const response = await adminAllUser();
    const users = response?.data || [];

    // Helper function for status styling
    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'bg-emerald-500 text-emerald-500';
            case 'INACTIVE': return 'bg-amber-500 text-amber-500';
            case 'BANNED': return 'bg-rose-500 text-rose-500';
            default: return 'bg-slate-500 text-slate-500';
        }
    };

    return (
        <div className="bg-slate-950 min-h-screen p-4 md:p-10 text-slate-200">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-4xl font-black text-white tracking-tight">User Control Panel</h1>
                    <p className="text-slate-500 mt-2 font-medium">Monitoring {users.length} active platform members.</p>
                </header>

                <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900/60 border-b border-slate-800/50">
                                    <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Member</th>
                                    <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Access Level</th>
                                    <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Current Status</th>
                                    <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Email</th>
                                    <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/30">
                                {users.map((user: any) => (
                                    <tr key={user.id} className="hover:bg-slate-800/20 transition-all duration-300 group">
                                        {/* User Info */}
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 group-hover:border-blue-500/50 transition-colors">
                                                    <User size={22} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white tracking-tight">{user.name}</p>
                                                    <p className="text-slate-500 text-xs mt-0.5">{user.id.slice(0, 8)}...</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="p-6">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase border ${
                                                user.role === 'PROVIDER' ? 'bg-purple-500/5 text-purple-400 border-purple-500/20' : 'bg-blue-500/5 text-blue-400 border-blue-500/20'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* Status with Enum Support */}
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-2.5 w-2.5 rounded-full ${getStatusStyles(user.status).split(' ')[0]} shadow-[0_0_10px_currentColor]`}></div>
                                                <span className={`text-sm font-black tracking-wide ${getStatusStyles(user.status).split(' ')[1]}`}>
                                                    {user.status}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Verified Status */}
                                        <td className="p-6">
                                            {user.emailVerified ? (
                                                <CheckCircle2 size={18} className="text-emerald-500/50" />
                                            ) : (
                                                <Clock size={18} className="text-slate-600" />
                                            )}
                                        </td>

                                        {/* Action Button */}
                                        <td className="p-6 text-right">
                                            <form action={updateUserStatus.bind(null, user?.id, {status : user?.status})}>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    className={`h-10 px-5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
                                                        user.status === 'ACTIVE' 
                                                        ? 'border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white shadow-lg shadow-rose-500/10' 
                                                        : 'border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white shadow-lg shadow-emerald-500/10'
                                                    }`}
                                                >
                                                    {user.status === 'ACTIVE' ? (
                                                        <><Ban size={14} className="mr-2" /> Revoke Access</>
                                                    ) : (
                                                        <><UserCheck size={14} className="mr-2" /> Grant Access</>
                                                    )}
                                                </Button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}