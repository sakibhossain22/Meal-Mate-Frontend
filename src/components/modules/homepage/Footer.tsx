import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* 1. Brand & Description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl font-extrabold tracking-tighter">
                MEAL<span className="text-[#f22e3e]">MATE</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Savor the flavors of perfection. We deliver fresh, handmade meals
              crafted with love and the finest ingredients right to your doorstep.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <Link key={i} href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#f22e3e] transition-colors duration-300">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-b-2 border-[#f22e3e] w-fit">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li>
                <Link href="/" className="hover:text-[#f22e3e] hover:pl-2 transition-all duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/providers" className="hover:text-[#f22e3e] hover:pl-2 transition-all duration-300">
                  Providers
                </Link>
              </li>
              <li>
                <Link href="/meals" className="hover:text-[#f22e3e] hover:pl-2 transition-all duration-300">
                  All Meals
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-b-2 border-[#f22e3e] w-fit">Contact Us</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#f22e3e] shrink-0" size={20} />
                <span>123 Foodie Street, Culinary District, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#f22e3e] shrink-0" size={20} />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#f22e3e] shrink-0" size={20} />
                <span>support@mealmate.com</span>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-b-2 border-[#f22e3e] w-fit">Newsletter</h4>
            <p className="text-slate-400 mb-6">Subscribe to get the latest offers and menu updates.</p>
            <form className="relative">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-slate-800 border border-slate-700 rounded-full py-3 px-6 focus:outline-none focus:border-[#f22e3e] transition-colors"
              />
              <button className="absolute right-1 top-1 h-10 w-10 bg-[#f22e3e] rounded-full flex items-center justify-center hover:bg-[#d82634] transition-colors">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:row items-center justify-between gap-4 text-slate-500 text-sm">
          <p>© 2026 Meal Mate. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}