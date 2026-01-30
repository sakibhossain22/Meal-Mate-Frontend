import { adminAllUser } from "@/actions/meal.action";
import { 
    User, 
    Mail, 
    ShieldCheck, 
    ShieldAlert, 
    UserCog, 
    Calendar,
    Search,
    MoreVertical,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ManageUser() {
    const response = await adminAllUser();
    const users = response?.data || [];

    return (
        <div className="bg-slate-950 min-h-screen p-4 md:p-10 text-slate-200">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">User Management</h1>
                        <p className="text-slate-500 mt-1">Manage, verify, and monitor all platform users.</p>
                    </div>
                    
                    {/* Search Bar Placeholder */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by email or name..." 
                            className="bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] overflow-hidden backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900 border-b border-slate-800">
                                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400">User</th>
                                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400">Role</th>
                                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400">Verified</th>
                                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {users.map((user: any) => (
                                    <tr key={user.id} className="hover:bg-slate-800/30 transition-colors group">
                                        {/* User Info */}
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 shadow-inner group-hover:scale-110 transition-transform">
                                                    <User size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-sm md:text-base">{user.name}</p>
                                                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                                        <Mail size={12} />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Role Badge */}
                                        <td className="p-5">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-tighter ${
                                                user.role === 'PROVIDER' 
                                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                            }`}>
                                                <UserCog size={12} />
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <span className={`h-2 w-2 rounded-full animate-pulse ${user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
                                                <span className="text-sm font-medium text-slate-300">{user.status}</span>
                                            </div>
                                        </td>

                                        {/* Email Verified */}
                                        <td className="p-5">
                                            {user.emailVerified ? (
                                                <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/5 w-fit px-2.5 py-1 rounded-lg border border-emerald-500/10">
                                                    <CheckCircle2 size={14} />
                                                    <span className="text-xs font-bold">Verified</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-rose-400 bg-rose-500/5 w-fit px-2.5 py-1 rounded-lg border border-rose-500/10">
                                                    <ShieldAlert size={14} />
                                                    <span className="text-xs font-bold">Pending</span>
                                                </div>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="p-5 text-right">
                                            <Button variant="ghost" size="icon" className="hover:bg-slate-800 text-slate-400 rounded-xl">
                                                <MoreVertical size={18} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Empty State */}
                    {users.length === 0 && (
                        <div className="p-20 text-center">
                            <User className="mx-auto text-slate-700 mb-4" size={48} />
                            <p className="text-slate-500 italic">No users found in the database.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}