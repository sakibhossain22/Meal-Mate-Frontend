"use client"

import * as React from 'react';
import Image from 'next/image';
import { Mail, Lock, LogIn, UserCheck, ShieldCheck, Fingerprint, Loader2 } from 'lucide-react';
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.string().email("Invalid email address")
})

const LoginPage = () => {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onChange: formSchema },
    onSubmit: async ({ value }) => {
      setIsPending(true);
      const toastId = toast.loading("Accessing account...")
      try {
        const { error } = await authClient.signIn.email(value)
        // console.log(error)
        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }
        toast.success("Welcome back!", { id: toastId })
        router.push('/dashboard')
      } catch (error) {
        console.log(error)
        toast.error("Something Went Wrong", { id: toastId })
      } finally {
        setIsPending(false);
      }
    }
  })

  // Quick Login Handler
  const handleQuickLogin = (email: string, pass: string) => {
    form.setFieldValue("email", email);
    form.setFieldValue("password", pass);
    toast.info(`Filled: ${email.split('@')[0]}`, { duration: 1500 });
  }

  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: window.location.origin,
    });
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/bg.jpg" alt="Night Stars Forest" fill className="object-cover scale-110 blur-[2px]" priority />
        <div className="absolute inset-0 bg-black/40" /> {/* Dark Overlay */}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[440px] mx-4"
      >


        {/* Main Glass Card */}
        <div className="bg-white/10 border-2 border-white/20 backdrop-blur-[25px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-[32px] p-10 text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-xl border border-white/30 shadow-inner">
              <Fingerprint size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">Login</h1>
            <p className="text-white/60 text-xs font-medium mt-1">Access your Meal Mate dashboard</p>
          </div>
          {/* --- Quick Login Section --- */}
          <div>
            <p className='texe-sm text-center mb-2 uppercase font-bold'>Quick Login</p>
            <div className="flex gap-3 mb-6 justify-center">
              <button
                onClick={() => handleQuickLogin("admin@admin.com", "admin1234")}
                className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white transition-all active:scale-95"
              >
                <ShieldCheck size={14} className="text-red-400 group-hover:scale-110 transition-transform" /> Admin
              </button>
              <button
                onClick={() => handleQuickLogin("customer@customer.com", "customer123")}
                className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white transition-all active:scale-95"
              >
                <UserCheck size={14} className="text-blue-400 group-hover:scale-110 transition-transform" /> Customer
              </button>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {/* Email Field */}
            <form.Field name="email">
              {(field) => (
                <div className="relative group">
                  <input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="email"
                    placeholder="Email Address"
                    className="w-full h-13 bg-white/5 border-2 border-white/10 rounded-2xl outline-none text-white px-5 pr-12 placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 transition-all font-medium"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white transition-colors" />
                  <AnimatePresence>
                    {field.state.meta.errors.length > 0 && (
                      <motion.em initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-300 ml-4 mt-1 block not-italic font-bold uppercase tracking-wider">
                        {String(field.state.meta.errors[0])}
                      </motion.em>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </form.Field>

            {/* Password Field */}
            <form.Field name="password">
              {(field) => (
                <div className="relative group">
                  <input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full h-13 bg-white/5 border-2 border-white/10 rounded-2xl outline-none text-white px-5 pr-12 placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 transition-all font-medium"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white transition-colors" />
                  <AnimatePresence>
                    {field.state.meta.errors.length > 0 && (
                      <motion.em initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-300 ml-4 mt-1 block not-italic font-bold uppercase tracking-wider">
                        {String(field.state.meta.errors[0])}
                      </motion.em>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </form.Field>

            {/* Login Button */}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit || isPending}
                  className="w-full h-13 bg-white text-gray-900 font-black uppercase text-xs tracking-[0.15em] rounded-2xl shadow-xl hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4 shadow-white/10"
                >
                  {isPending || isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><LogIn size={18} /> Login Now</>}
                </button>
              )}
            />

            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="text-[10px] font-black text-white/30 tracking-widest">OR</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Social Login */}
            <button
              type="button"
              onClick={loginWithGoogle}
              className="w-full h-13 bg-white/5 border-2 border-white/10 rounded-2xl hover:bg-white/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3 font-bold text-sm"
            >
              <Image src="https://www.svgrepo.com/show/475656/google-color.svg" width={22} height={22} alt="Google" className="drop-shadow-sm" />
              Continue with Google
            </button>

            <div className="text-center text-xs mt-8">
              <p className="text-white/50 font-medium">Don't have an account?{" "}
                <Link href="/register" className="text-white font-black hover:underline underline-offset-4 decoration-white/30 transition-all italic">Create One</Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;