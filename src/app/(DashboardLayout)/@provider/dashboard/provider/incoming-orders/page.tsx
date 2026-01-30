"use client"

import React, { useState, useEffect } from "react";
import {
  BellRing, User, Clock, ShoppingBag,
  Loader2, Mail, RefreshCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { incomingOrder, updateOrderStatus } from "@/actions/order.action";

export default function IncomingOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  console.log(orders);
  // 1. Initial Data Load
  const loadOrders = async () => {
    try {
      const response = await incomingOrder();
      setOrders(response?.data || []);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // 2. Status Update Handler
  const handleUpdateStatus = async (e: React.FormEvent<HTMLFormElement>, orderItemId: string) => {
    e.preventDefault();
    console.log(orderItemId);

    // FormData dhorar sothik niyom
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newStatus = formData.get("status") as string;
    console.log(newStatus);
    // Loading start
    setUpdatingId(orderItemId);

    try {
      // Backend expects: (id: string, formData: FormData)
      // ID obosshoi 'item.id' hote hobe (OrderItem ID), item.order.id noy.
      const result = await updateOrderStatus(orderItemId, newStatus);

      if (result?.success || !result?.error) {
        toast.success(`Order status updated to ${newStatus}`);
        await loadOrders(); // List refresh koro
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setUpdatingId(null);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

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
            <p className="text-slate-500 mt-2 font-medium">Manage and process orders in real-time.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl">
            <p className="text-xl font-black text-white text-center">{orders.length}</p>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-6">
          {orders.length > 0 ? (
            orders.map((item: any) => (
              <div key={item.id} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-sm hover:border-slate-700 transition-all">

                {/* FORM STARTS HERE */}
                <form onSubmit={(e) => handleUpdateStatus(e, item?.order.id)} className="grid grid-cols-1 lg:grid-cols-3">

                  {/* 1. Meal & Order Info */}
                  <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-800">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
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
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Order ID</p>
                      <p className="text-xs font-mono text-slate-400 truncate bg-slate-950 p-2 rounded-lg border border-slate-800">
                        {item.orderId}
                      </p>
                    </div>
                  </div>

                  {/* 2. Customer Details */}
                  <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/20">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">Customer Info</p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="text-blue-500" size={18} />
                        <p className="font-bold text-slate-200">{item.order.customer.name}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="text-purple-500" size={18} />
                        <p className="text-sm text-slate-400 truncate">{item.order.customer.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-slate-400" size={18} />
                        <p className="text-xs text-slate-500">
                          {new Date(item.order.createdAt).toLocaleTimeString()}
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
                        name="status"
                        defaultValue={item.order.status}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-4 text-white font-bold focus:ring-2 focus:ring-orange-500/50 outline-none cursor-pointer appearance-none"
                      >
                        <option value="PENDING">Pending Approval</option>
                        <option value="COOKING">Cooking</option>
                        <option value="ON_THE_WAY">On The Way</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>

                    <Button
                      disabled={updatingId === item?.order.id}
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-500 text-white rounded-xl h-12 font-black transition-all"
                    >
                      {updatingId === item?.order.id ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin" size={18} /> Updating...
                        </span>
                      ) : (
                        "Update Status"
                      )}
                    </Button>
                  </div>

                </form>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-[3rem]">
              <RefreshCcw size={48} className="mx-auto text-slate-800 mb-4" />
              <h2 className="text-xl font-bold text-slate-500">No incoming orders right now</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}