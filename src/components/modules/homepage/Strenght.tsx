import Image from "next/image";
import { Utensils, Leaf, Star, Truck } from "lucide-react";

export default function Strenght() {
    const features = [
        {
            title: "All Kinds of Foods",
            description: "From cheesy pizzas to sizzling burgers, we bring you an extensive menu of global favorites for every palate.",
            icon: <Utensils className="w-8 h-8 text-[#f22e3e]" />,
            bgColor: "bg-orange-50",
        },
        {
            title: "Fresh Foods",
            description: "We source only the finest, hand-picked seasonal produce and premium meats to ensure wholesome nutrition.",
            icon: <Leaf className="w-8 h-8 text-[#05a660]" />,
            bgColor: "bg-green-50",
        },
        {
            title: "Best Taste",
            description: "Our secret lies in heritage recipes and master chefs, creating a flavor profile that keeps you coming back.",
            icon: <Star className="w-8 h-8 text-[#fbb200]" />,
            bgColor: "bg-yellow-50",
        },
        {
            title: "On Time Delivery",
            description: "Hunger doesn't wait. Our dedicated fleet ensures your food arrives piping hot, exactly when you need it.",
            icon: <Truck className="w-8 h-8 text-[#f22e3e]" />,
            bgColor: "bg-red-50",
        },
    ];
    return (
        <div>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-[40px] border border-slate-100 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-center"
                            >
                                {/* Icon Container */}
                                <div className={`w-20 h-20 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>

                                {/* Text Content */}
                                <h3 className="text-xl font-extrabold text-slate-800 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}