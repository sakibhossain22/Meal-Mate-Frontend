import { incomingOrder } from "@/actions/order.action";
import { 
  BellRing, 
  User, 
  Clock, 
  ShoppingBag, 
  CheckCircle2, 
  XCircle,
  RefreshCcw,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function IncomingOrders() {
  const response = await incomingOrder();
  const orders = response?.data || [];

  return (
    <div className="bg-slate-950 min-h-screen p-4 md:p-10 text-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-white flex items-center gap-3">
              <BellRing className="text-orange-500 animate-pulse" size={36} />
              Incoming Requests
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Manage and process your meal orders from customers.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Active Orders</p>
            <p className="text-xl font-black text-white text-center">{orders.length}</p>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-6">
          {orders.length > 0 ? (
            orders.map((item: any) => (
              <div key={item.id} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-sm hover:border-slate-700 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  
                  {/* 1. Meal & Order Info */}
                  <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-800">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 overflow-hidden">
                        {item.meal.image ? (
                          <img src={item.meal.image} alt={item.meal.name} className="w-full h-full object-cover" />
                        ) : (
                          <ShoppingBag size={28} className="text-slate-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white">{item.meal.name}</h3>
                        <p className="text-sm text-slate-500 font-medium">Qty: {item.quantity} × ${item.price}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Order ID</p>
                      <p className="text-xs font-mono text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800 break-all">
                        {item.orderId}
                      </p>
                    </div>
                  </div>

                  {/* 2. Customer Details */}
                  <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/20">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">Customer Info</p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                          <User size={18} />
                        </div>
                        <p className="font-bold text-slate-200">{item.order.customer.name}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-xl text-purple-500">
                          <Mail size={18} />
                        </div>
                        <p className="text-sm text-slate-400 truncate">{item.order.customer.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-800 rounded-xl text-slate-400">
                          <Clock size={18} />
                        </div>
                        <p className="text-xs text-slate-500">
                          Ordered: {new Date(item.order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 3. Status Update Area */}
                  <div className="p-8 flex flex-col justify-center gap-6">
                    <div>
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">
                        Order Status
                      </label>
                      <select 
                        defaultValue={item.order.status}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-4 text-white font-bold focus:ring-2 focus:ring-orange-500/50 appearance-none cursor-pointer"
                      >
                        <option value="PENDING">Pending Approval</option>
                        <option value="PREPARING">Preparing Food</option>
                        <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-500 text-white rounded-xl h-12 font-black">
                        Update Status
                      </Button>
                      <Button variant="outline" className="border-slate-800 text-slate-400 hover:bg-slate-800 rounded-xl h-12">
                        Details
                      </Button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-[3rem]">
              <RefreshCcw size={48} className="mx-auto text-slate-800 mb-4" />
              <h2 className="text-xl font-bold text-slate-500">No incoming orders right now</h2>
              <p className="text-slate-600 text-sm mt-1">Orders from customers will appear here in real-time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}