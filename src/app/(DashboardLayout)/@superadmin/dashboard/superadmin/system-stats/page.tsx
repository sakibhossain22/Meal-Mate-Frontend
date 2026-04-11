import { getSystemStats } from "@/actions/superadmin.action";
import { DollarSign, ShoppingBag, Users, Layers3, Zap, AlertTriangle, Clock3, Star } from "lucide-react";
import Image from "next/image";

export default async function SuperAdminDashboard() {
  const statsData = await getSystemStats();
  const { overview, today, userSegments, recentActivity, alerts } = statsData?.data;

  // Overview Cards Configuration - Solid White colors with fixed background
  const overviewCards = [
    { label: "Total Revenue", value: `$${overview.totalRevenue}`, icon: DollarSign, opacity: "opacity-100" },
    { label: "Total Orders", value: overview.totalOrders, icon: ShoppingBag, opacity: "opacity-80" },
    { label: "Avg Order Value", value: `$${overview.averageOrderValue}`, icon: Zap, opacity: "opacity-60" },
    { label: "Food Categories", value: overview.totalCategories, icon: Layers3, opacity: "opacity-40" },
  ];

  return (
    <div className="p-6 md:p-10 space-y-10 bg-black min-h-screen text-white selection:bg-white selection:text-black font-sans">

      {/* Header with Alerts */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">System Intelligence</h1>
          <p className="text-white/40 mt-1 font-bold text-[10px] uppercase tracking-[0.2em]">Real-time overview of BhojonBari platform</p>
        </div>

        {/* Extreme Cool Alert Card - Solid White Alert */}
        {alerts.pendingProviderApprovals > 0 && (
          <div className="bg-white/5 border border-white/20 p-4 px-6 flex items-center gap-4 rounded-[2rem] animate-pulse">
            <div className="p-3 rounded-full bg-white text-black">
              <AlertTriangle size={20} />
            </div>
            <div>
              <div className="text-2xl font-black tracking-tighter">{alerts.pendingProviderApprovals}</div>
              <div className="text-[8px] text-white/50 uppercase font-black tracking-widest">Pending Approvals</div>
            </div>
          </div>
        )}
      </div>

      {/* 1. Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between group hover:bg-white/[0.05] transition-all duration-500">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">{card.label}</span>
              <card.icon className="text-white opacity-40 group-hover:opacity-100 transition-opacity" size={20} />
            </div>
            <h3 className="text-4xl font-black mt-4 tracking-tighter group-hover:scale-105 transition-transform origin-left italic">{card.value}</h3>

            <div className="mt-6 pt-4 border-t border-white/5 text-[9px] font-black uppercase tracking-widest text-white/20 flex justify-between">
              <span>Cycle Today:</span>
              <span className="text-white/60 font-black">
                {i === 0 ? `$${today.revenue}` : i === 1 ? today.orders : "SECURED"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Middle Section: Users & Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* User Segmentation */}
        <div className="xl:col-span-2 bg-white/[0.02] border border-white/5 p-8 rounded-[3rem]">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-black flex items-center gap-3 italic uppercase tracking-tighter">
              <Users className="text-white/40" /> User Demographics
            </h2>
            <button className="text-[9px] border border-white/20 px-6 py-2 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Command Center</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {userSegments.map((seg: any, i: any) => (
              <div key={i} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 text-center flex flex-col items-center group hover:border-white/20 transition-all">
                <div className="text-4xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform italic">{seg._count.id}</div>
                <div className="mt-2 text-[8px] font-black uppercase tracking-[0.3em] text-white/30">{seg.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Goal (Visual) */}
        <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[3rem] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Zap size={120} className="text-white" />
          </div>
          <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">Daily Target</h2>
          <div className="text-center py-6">
            <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-1">Inflow</div>
            <div className="text-5xl font-black tracking-tighter italic">${today.revenue}</div>
            <div className="text-[10px] text-white/50 mt-2 font-black uppercase tracking-widest">{today.orders} Operations</div>
          </div>
          <div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
              <div className="w-1/3 h-full bg-white animate-pulse"></div>
            </div>
            <p className="text-center text-[8px] font-black text-white/20 uppercase tracking-[0.6em]">Core Synchronization: Active</p>
          </div>
        </div>
      </div>

      {/* 3. Recent Activity Feed */}
      <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[3rem]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black flex items-center gap-3 italic uppercase tracking-tighter"><Clock3 className="text-white/40" /> Live Telemetry Feed</h2>
          <div className="flex items-center gap-3">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40">Real-time Stream</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          </div>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity: any) => (
            <div key={activity.id} className="flex items-center justify-between gap-4 p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group">
              <div className="flex items-center gap-5">
                {activity.customer.image ? (
                  <Image
                    height={150}
                    width={150}
                    src={activity.customer.image}
                    alt={activity.customer.name}
                    className="w-12 h-12 rounded-2xl border border-white/10 grayscale group-hover:grayscale-0 transition-all object-cover"
                  />
                ) : (
                  /* ইমেজ না থাকলে এই ডিভটি রেন্ডার হবে */
                  <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <span className="text-sm font-black uppercase italic">
                      {activity.customer.name?.charAt(0) || "U"}
                    </span>
                  </div>
                )}

                <div>
                  <p className="text-white font-black italic uppercase tracking-tighter group-hover:text-white transition-colors">
                    {activity.customer.name}
                  </p>
                  <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mt-1 flex items-center gap-2">
                    <Star size={10} className="text-white/40 fill-white/40" />
                    Transaction: #{activity.id.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-white italic tracking-tighter">${activity.totalPrice}</div>
                <div className="text-[8px] text-black font-black px-4 py-1 bg-white rounded-full mt-2 uppercase tracking-tighter">{activity.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}