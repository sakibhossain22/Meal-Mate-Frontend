import Link from 'next/link'
import { Home, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 dark:bg-slate-950">
      {/* Background decoration */}
      <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-[100px]" />
      <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-red-500/10 blur-[100px]" />

      <div className="relative z-10 text-center">
        {/* Animated 404 Text */}
        <h1 className="animate-bounce text-9xl font-black text-slate-500 dark:text-slate-600">
          404
        </h1>
        
        <div className="mt-[-40px] space-y-4">
          <div className="flex items-center justify-center gap-2 text-orange-500">
            <AlertCircle size={32} />
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              Page Not Found
            </h2>
          </div>
          
          <p className="mx-auto max-w-md text-lg text-slate-500 dark:text-slate-400">
            Oops! The meal you're looking for isn't on our menu today. It might have been moved or deleted.
          </p>

          <div className="pt-8">
            <Link 
              href="/" 
              className="group inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/20 active:scale-95"
            >
              <Home className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}