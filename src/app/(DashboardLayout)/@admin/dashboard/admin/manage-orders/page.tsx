import { adminAllOrders } from "@/actions/meal.action";
import { 
    ShoppingBag, 
    User, 
    Clock, 
    MapPin, 
    Phone, 
    Hash, 
    ExternalLink,
    Store,
    Receipt
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ManageOrders() {
    const response = await adminAllOrders();
    const { order, orderItem } = response?.data || { order: [], orderItem: [] };

    return (
        <div className="bg-slate-950 min-h-screen p-4 md:p-10 text-slate-200">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <ShoppingBag className="text-orange-500" />
                            Live Orders
                        </h1>
                        <p className="text-slate-500 mt-1">Monitor and process incoming meal requests.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl">
                        <span className="text-sm font-bold text-slate-400">Total Active:</span>
                        <span className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full">{order.length}</span>
                    </div>
                </header>

                {/* Orders List */}
                <div className="space-y-8">
                    {order.map((singleOrder: any) => {
                        // Filter items belonging to this specific order
                        const currentOrderItems = orderItem.filter(
                            (item: any) => item.orderId === singleOrder.id
                        );

                        return (
                            <div key={singleOrder.id} className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-sm transition-all hover:border-slate-700">
                                
                                {/* Order Main Info Bar */}
                                <div className="p-6 md:p-8 border-b border-slate-800 grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                            <Hash size={12} /> Order ID
                                        </p>
                                        <p className="text-sm font-mono text-orange-400 truncate">{singleOrder.id}</p>
                                    </div>

                                    <div className="flex items-center gap-4 border-l border-slate-800 pl-6">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-400">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{singleOrder.customer.name}</p>
                                            <p className="text-xs text-slate-500">{singleOrder.customer.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 border-l border-slate-800 pl-6">
                                        <div className="space-y-1">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                                                singleOrder.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500'
                                            }`}>
                                                {singleOrder.status}
                                            </span>
                                            <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                                                <Clock size={12} /> {new Date(singleOrder.createdAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Grand Total</p>
                                        <p className="text-3xl font-black text-white">${singleOrder.totalPrice}</p>
                                    </div>
                                </div>

                                {/* Order Items Details */}
                                <div className="p-6 md:p-8 bg-slate-950/30">
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                        <Receipt size={14} /> Ordered Meals ({currentOrderItems.length})
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {currentOrderItems.map((item: any) => (
                                            <div key={item.id} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col justify-between">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-orange-500">
                                                            <ShoppingBag size={24} />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-100">{item.meal.name}</h4>
                                                            <p className="text-xs text-slate-500 italic">Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-black text-white">${item.price}</p>
                                                </div>

                                                {/* Provider Info inside Item */}
                                                <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center justify-between text-[11px]">
                                                    <div className="flex items-center gap-2 text-slate-400">
                                                        <Store size={14} className="text-blue-400" />
                                                        <span className="font-bold">{item.meal.provider.businessName}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-500">
                                                        <MapPin size={12} />
                                                        <span>{item.meal.provider.address}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {order.length === 0 && (
                    <div className="text-center py-32 bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-800">
                        <ShoppingBag size={60} className="mx-auto text-slate-800 mb-4" />
                        <h2 className="text-xl font-bold text-slate-600">No Orders Found</h2>
                        <p className="text-slate-700">Orders will appear here once customers start purchasing.</p>
                    </div>
                )}
            </div>
        </div>
    );
}