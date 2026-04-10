import { HelpCircle, ChevronRight } from 'lucide-react';

export default function FAQSection() {
  const faqs = [
    { q: "Is the food prepared in a certified kitchen?", a: "Yes, all our providers go through a physical kitchen inspection and hygiene certification." },
    { q: "How long does delivery usually take?", a: "Depending on your distance, it takes 30-45 minutes to deliver fresh hot meals." },
    { q: "Do you have weekly meal subscriptions?", a: "Absolutely! You can subscribe to daily lunch or dinner plans from the provider's profile." }
  ];

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <div className="sticky top-20">
            <div className="w-16 h-1 bg-[#f22e3e] mb-8" />
            <h2 className="text-6xl font-black text-zinc-950 dark:text-white leading-[0.9] mb-6">
              You Ask, <br /> We <span className="text-zinc-400">Answer.</span>
            </h2>
            <p className="text-zinc-500 text-lg mb-10">Confused about how Meal Mate works? We’ve curated the most common questions here just for you.</p>
            <div className="p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center gap-6">
              <div className="bg-[#fbb200] p-4 rounded-2xl shadow-lg shadow-[#fbb200]/30"><HelpCircle color="black"/></div>
              <div>
                <p className="font-bold dark:text-white">Still have questions?</p>
                <p className="text-[#f22e3e] font-black cursor-pointer hover:underline">Chat with our Support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group overflow-hidden transition-all duration-300">
              <summary className="flex items-center justify-between p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] cursor-pointer list-none hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <span className="text-xl font-bold dark:text-zinc-200">{faq.q}</span>
                <ChevronRight className="group-open:rotate-90 transition-transform text-[#f22e3e]" />
              </summary>
              <div className="p-8 pt-0 bg-zinc-50 dark:bg-zinc-900 rounded-b-[2rem] text-zinc-500 dark:text-zinc-400 leading-relaxed text-md">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}