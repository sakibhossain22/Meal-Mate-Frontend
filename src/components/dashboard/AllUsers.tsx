"use client"

import React, { useState, useTransition } from 'react'
import { 
  Users, 
  ShieldCheck, 
  UserMinus, 
  UserPlus, 
  Mail, 
  UserCog, 
  ShieldAlert,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { manageUserAction } from '@/actions/superadmin.action'

export default function ManageUsers({ allUsers }: { allUsers: any[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // রোল আপডেট হ্যান্ডলার
  const handleRoleUpdate = async (userId: string, newRole: string) => {
    console.log(userId, newRole)
    startTransition(async () => {
      try {
        const res = await manageUserAction(userId, newRole);
        console.log(res)
        if (res.success) {
          toast.success(`Role updated to ${newRole}`);
          router.refresh();
        }
      } catch (err) {
        toast.error("Failed to update role");
      }
    });
  };

  // স্ট্যাটাস (Active/Banned) আপডেট হ্যান্ডলার
  const handleStatusUpdate = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
    startTransition(async () => {
      try {
        const res = await manageUserAction(userId, newStatus);
        if (res.success) {
          toast.success(`User is now ${newStatus}`);
          router.refresh();
        }
      } catch (err) {
        toast.error("Failed to update status");
      }
    });
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
            <Users className="text-primary" size={36} /> USER ACCESS CONTROL
          </h1>
          <p className="text-slate-500 mt-1 font-medium tracking-wide">Manage permissions and status for all registered accounts.</p>
        </div>
        <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-2xl flex items-center gap-3">
           <span className="font-black text-xl">{allUsers.length}</span>
           <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Total Users</span>
        </div>
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {allUsers.map((user) => (
          <div 
            key={user.id}
            className={`relative group bg-white/[0.02] backdrop-blur-3xl border ${user.status === 'BANNED' ? 'border-rose-500/20' : 'border-white/5'} p-6 rounded-[2.5rem] hover:border-primary/30 transition-all duration-500`}
          >
            {/* Background Glow for Banned Users */}
            {user.status === 'BANNED' && (
              <div className="absolute inset-0 bg-rose-500/5 rounded-[2.5rem] pointer-events-none" />
            )}

            <div className="flex items-start gap-5 relative z-10">
              <div className="relative">
                <img 
                  src={user.image || `https://api.dicebear.com/7.x/micah/svg?seed=${user.name}`} 
                  className={`w-16 h-16 rounded-2xl object-cover border-2 ${user.status === 'BANNED' ? 'border-rose-500/50 grayscale' : 'border-white/10'} group-hover:border-primary transition-all`}
                  alt="User"
                />
                <div className={`absolute -bottom-1 -right-1 p-1 rounded-lg border-2 border-[#0a0a0a] ${user.status === 'ACTIVE' ? 'bg-secondary' : 'bg-rose-500'}`}>
                   {user.status === 'ACTIVE' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                <h3 className="text-lg font-bold truncate group-hover:transition-colors italic">{user.name}</h3>
                <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                  <Mail size={12} /> {user.email}
                </p>
                
                {/* Role Badge */}
                <div className="mt-3 inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                   <UserCog size={12} className="text-primary" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{user.role}</span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between gap-4 relative z-10">
              
              {/* Role Select */}
              <select 
                value={user.role}
                onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                disabled={isPending}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[10px] font-bold tracking-widest uppercase focus:outline-none focus:border-primary/50 cursor-pointer"
              >
                <option value="CUSTOMER">Customer</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPERADMIN">SuperAdmin</option>
              </select>

              {/* Status Toggle Button */}
              <button
                onClick={() => handleStatusUpdate(user.id, user.status)}
                disabled={isPending}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all cursor-pointer ${
                  user.status === 'ACTIVE' 
                  ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-500/20' 
                  : 'bg-secondary/10 text-secondary hover:bg-secondary hover:text-white border border-secondary/20'
                }`}
              >
                {user.status === 'ACTIVE' ? (
                  <><ShieldAlert size={14} /> Ban User</>
                ) : (
                  <><ShieldCheck size={14} /> Unban</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Overlay */}
      {isPending && (
        <div className="fixed bottom-10 right-10 bg-primary text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest animate-bounce z-50">
          Syncing Database...
        </div>
      )}
    </div>
  )
}