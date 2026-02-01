import { getCart } from "@/actions/meal.action";
import {
  ShoppingBasket,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  CreditCard,
  Utensils,
  ShieldCheck,
  LocateIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteCartItem } from "@/actions/cart.action";
import { createOrderAction } from "@/actions/order.action";
import Link from "next/link";

export default async function Cart() {

  const response = await getCart();
  const carts = response?.data || [];

  const allItems = carts.flatMap((cart: any) => cart.items);
  const subTotal = allItems.reduce((acc: any, item: any) => acc + (item.price * item.quantity), 0);
  const deliveryFee = allItems.length > 0 ? 5.00 : 0;
  const total = subTotal + deliveryFee;

  return (
    <div className="bg-slate-950 min-h-screen p-4 md:p-10 text-slate-200">
      <div className="max-w-6xl mx-auto">

        <header className="mb-10 flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
            <ShoppingBasket size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Your Basket</h1>
            <p className="text-slate-500 text-sm">You have {allItems.length} items in your cart</p>
          </div>
        </header>

        {allItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            <div className="lg:col-span-2 space-y-4">
              {allItems.map((item: any) => (
                <div key={item.id} className="bg-slate-900/40 border border-slate-800 p-5 rounded-[2rem] flex items-center gap-4 md:gap-6 group hover:border-slate-700 transition-all">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-800 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-700">
                    {item.meal.image ? (
                      <img src={item.meal.image} alt={item.meal.name} className="w-full h-full object-cover" />
                    ) : (
                      <Utensils size={32} className="text-slate-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white truncate">{item.meal.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mb-2">{item.meal.description}</p>
                    <p className="text-orange-400 font-black">${item.price}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-3 bg-slate-950 p-2 rounded-2xl border border-slate-800">
                    <button className="p-1 hover:text-orange-500 transition-colors"><Minus size={16} /></button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button className="p-1 hover:text-orange-500 transition-colors"><Plus size={16} /></button>
                  </div>
                  <form action={deleteCartItem.bind(null, item.id)}>
                    <button className="p-3 text-slate-600 hover:text-rose-500 hover:bg-rose-500/5 rounded-xl transition-all">
                      <Trash2 size={20} />
                    </button>
                  </form>
                </div>
              ))}
            </div>
            <aside className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 sticky top-24 shadow-2xl">
              <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-blue-500" />
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Delivery Fee</span>
                  <span className="text-white font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-slate-800 my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="text-slate-400 font-bold">Total Amount</span>
                  <span className="text-3xl font-black text-white">${total.toFixed(2)}</span>
                </div>
              </div>

              <form id="checkoutForm" action={createOrderAction.bind(null, allItems, total)}>
                <div className="space-y-2 my-4">
                  <label form="checkoutForm" className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                    <LocateIcon size={14} /> Devlivery Address
                  </label>
                  <input
                    required
                    type="url"
                    placeholder="Add Your Image Direct Link"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-12 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"

                  />
                </div>
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white h-14 rounded-2xl font-black text-lg shadow-lg shadow-orange-950/20 group">
                  CHECKOUT NOW
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                <ShieldCheck size={14} className="text-emerald-500" />
                Secure Checkout Powered by Stripe
              </div>
            </aside>

          </div>
        ) : (
          <div className="text-center py-24 bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-[3rem]">
            <ShoppingBasket size={64} className="mx-auto text-slate-800 mb-6" />
            <h2 className="text-2xl font-bold text-slate-500 mb-2">Your cart is empty</h2>
            <p className="text-slate-600 mb-8">Looks like you haven't added any meals yet.</p>
            <Link href={'/meals'}>
              <Button className="bg-blue-600 hover:bg-blue-500 px-8 py-6 rounded-2xl font-bold">
                Return to Menu
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}