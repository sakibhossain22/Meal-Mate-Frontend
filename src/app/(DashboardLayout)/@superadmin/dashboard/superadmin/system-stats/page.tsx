
import { getSystemStats } from "@/actions/superadmin.action";
import { DollarSign, ShoppingBag, Users, Layers3, Zap, AlertTriangle, Clock3, Star } from "lucide-react";

export default async function SuperAdminDashboard() {
  const statsData = await getSystemStats(); // এই ফাংশনটি তোমার সার্ভার থেকে ডেটা নিয়ে আসবে
  const { overview, today, userSegments, recentActivity, alerts } = statsData?.data;

  // Overview Cards Configuration
  const overviewCards = [
    { label: "Total Revenue", value: `$${overview.totalRevenue}`, icon: DollarSign, color: "text-primary" },
    { label: "Total Orders", value: overview.totalOrders, icon: ShoppingBag, color: "text-secondary" },
    { label: "Avg Order Value", value: `$${overview.averageOrderValue}`, icon: Zap, color: "text-amber-400" },
    { label: "Food Categories", value: overview.totalCategories, icon: Layers3, color: "text-sky-400" },
  ];

  // User Segments Map to get color and icons
  const roleMap: any = {
    SUPERADMIN: { color: "text-rose-400", bg: "bg-rose-500/10" },
    ADMIN: { color: "text-purple-400", bg: "bg-purple-500/10" },
    PROVIDER: { color: "text-primary", bg: "bg-primary/10" },
    DELIVERY: { color: "text-secondary", bg: "bg-secondary/10" },
    CUSTOMER: { color: "text-blue-400", bg: "bg-blue-500/10" },
  };

  return (
    <div className="p-6 md:p-10 space-y-10 bg-dark min-h-screen text-white">
      
      {/* Header with Alerts */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter">System Intelligence</h1>
          <p className="text-slate-400 mt-1">Real-time overview of MealMate platform.</p>
        </div>
        
        {/* Extreme Cool Alert Card */}
        {alerts.pendingProviderApprovals > 0 && (
          <div className="glass-card p-4 px-6 flex items-center gap-4 border-rose-500/20 bg-rose-500/5 animate-pulse">
            <div className="p-3 rounded-full bg-rose-500/10 text-rose-400">
              <AlertTriangle size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-rose-400">{alerts.pendingProviderApprovals}</div>
              <div className="text-xs text-rose-300/80 uppercase font-medium tracking-wider">Pending Approvals</div>
            </div>
          </div>
        )}
      </div>

      {/* 1. Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, i) => (
          <div key={i} className="glass-card glass-card-hover p-8 flex flex-col justify-between group">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">{card.label}</span>
              <card.icon className={`${card.color} opacity-80`} size={20} />
            </div>
            <h3 className="text-4xl font-extrabold mt-4 tracking-tight group-hover:scale-105 transition-transform origin-left">{card.value}</h3>
            {/* Today's Stats Indicator */}
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-500 flex justify-between">
              <span>Today:</span>
              <span className={i === 0 || i === 1 ? "text-slate-300 font-bold" : ""}>
                {i === 0 ? `$${today.revenue}` : i === 1 ? today.orders : "N/A"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Middle Section: Users & Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* User Segmentation (Pie Chart Style but with numbers) */}
        <div className="xl:col-span-2 glass-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3"><Users className="text-secondary" /> User Demographics</h2>
            <button className="text-xs text-primary bg-primary/10 px-4 py-2 rounded-full font-bold hover:bg-primary/20 transition-all">Manage Users</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {userSegments.map((seg: any, i: any) => {
              const roleInfo = roleMap[seg.role] || { color: "text-slate-400", bg: "bg-white/5" };
              return (
                <div key={i} className={`p-6 rounded-2xl ${roleInfo.bg} border border-white/5 text-center flex flex-col items-center group hover:border-white/10 transition-all`}>
                  <div className={`text-5xl font-extrabold ${roleInfo.color} tracking-tighter group-hover:scale-110 transition-transform`}>{seg._count.id}</div>
                  <div className={`mt-2 text-xs font-bold uppercase tracking-widest ${roleInfo.color} opacity-80`}>{seg.role}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Sales Target (Visual) */}
        <div className="glass-card p-8 flex flex-col justify-between border-primary/10 bg-gradient-to-br from-primary/5 to-transparent">
            <h2 className="text-xl font-bold text-white/90">Today's Goal</h2>
            <div className="text-center py-6">
                <div className="text-sm text-slate-400">Revenue</div>
                <div className="text-5xl font-extrabold text-primary tracking-tighter">$0</div>
                <div className="text-xs text-secondary mt-1 font-medium">0 Orders</div>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="w-1/12 h-full bg-primary animate-pulse rounded-full"></div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-2">Start strong, Sakib!</p>
        </div>
      </div>

      {/* 3. Recent Activity Feed */}
      <div className="glass-card p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3"><Clock3 className="text-sky-400" /> Live Activity Feed</h2>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity: any) => (
            <div key={activity.id} className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-4">
                <img src={activity.customer.image} alt={activity.customer.name} className="w-12 h-12 rounded-full border-2 border-white/10" />
                <div>
                  <p className="text-white font-bold group-hover:text-primary transition-colors">{activity.customer.name}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Star size={12} className="text-amber-400 fill-amber-400" /> 
                    New Order placed (ID: ...{activity.id.slice(-5)})
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white group-hover:text-secondary transition-colors">${activity.totalPrice}</div>
                <div className="text-xs text-emerald-400 font-medium px-3 py-1 bg-emerald-500/10 rounded-full mt-1">{activity.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}