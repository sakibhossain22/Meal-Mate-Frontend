"use client"
import Image from "next/image";
import Link from "next/link";

export default function RegisterNow() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-16 px-6 md:px-12 lg:px-24   rounded-[40px] overflow-hidden">
            <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                    <h4 className="text-xl md:text-2xl font-bold text-[#f22e3e] uppercase tracking-wider">
                        Register Now
                    </h4>
                    <div className="hidden sm:block border-t-4 border-[#f22e3e] w-16 md:w-24 mt-1 rounded-full"></div>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold dark:text-slate-200 text-slate-900 leading-tight">
                    Order Your <br className="hidden md:block" />
                    First <span className="text-[#f22e3e]">Delicious</span> Meal
                </h2>

                <p className="mt-6 text-lg dark:text-slate-300 text-slate-600 max-w-xl leading-relaxed">
                    Join the Meal Mate family today! Sign up in seconds to unlock exclusive
                    discounts, track your orders in real-time, and enjoy the freshest
                    flavors delivered straight to your doorstep.
                </p>

                <div className="mt-8  space-y-3">
                    {['Extra 20% off on your first order', 'Fast & Reliable delivery', 'Exclusive member-only deals'].map((item, i) => (
                        <div key={i} className="flex items-center lg:justify-start gap-3 text-slate-700 font-semibold">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f22e3e] text-white text-[10px]">✔</span>
                            <p className="dark:text-slate-300">{item}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <Link href={'/register'}>
                        <button className="bg-[#fbb200] hover:bg-[#f22e3e] text-black hover:text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-[#f22e3e]/30 active:scale-95">
                            Create Account Now
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex-1 relative w-full max-w-[500px] lg:max-w-none">
                <div>
                    <Image
                        alt="fresh hot pizza"
                        width={900}
                        height={900}
                        src="/pizza3.png"
                        className="drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] object-contain"
                        priority
                    />
                </div>

            </div>

        </div>
    );
}