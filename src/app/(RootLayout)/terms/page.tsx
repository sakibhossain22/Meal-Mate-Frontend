export default function TermsPage() {
  const sections = [
    { title: "1. Acceptance of Terms", content: "By accessing Meal Mate, you agree to comply with our delivery policies and provider guidelines." },
    { title: "2. User Roles", content: "Customers, Admins, and Providers have distinct responsibilities. Providers are responsible for food quality, while Customers must provide accurate delivery info." },
    { title: "3. Payments & Refunds", content: "Refunds are processed if an order is cancelled before the provider starts preparation or if hygiene standards are not met." },
  ];

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 p-12 md:p-20 rounded-[3rem] shadow-xl">
        <h1 className="text-5xl font-black text-zinc-900 dark:text-white mb-10 tracking-tighter italic underline decoration-[#fbb200]">
          Terms of <span className="text-[#f22e3e]">Service.</span>
        </h1>
        <div className="space-y-12">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-2xl font-black text-zinc-800 dark:text-zinc-200 mb-4">{s.title}</h2>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{s.content}</p>
            </section>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800 text-center text-zinc-400 text-xs font-bold uppercase tracking-widest">
          Last Updated: April 2026
        </div>
      </div>
    </main>
  );
}