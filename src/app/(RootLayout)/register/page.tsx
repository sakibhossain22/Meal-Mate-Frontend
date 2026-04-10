"use client"

import * as React from 'react'
import Image from 'next/image'
import { FieldGroup } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { User, Mail, Lock, Phone, UserPlus, Building2, MapPin, FileText, Loader2, Bike } from "lucide-react"
import Link from 'next/link'

// ১. Zod Schema
const formSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  password: z.string().min(6, "Minimum 6 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Minimum 10 digits"),
  role: z.enum(["Customer", "Provider", "Delivery"]),
  // এখানে default বা optional না দিয়ে সরাসরি string রাখুন
  businessName: z.string(),
  address: z.string(),
  description: z.string(),
  vehicleType: z.string(),
}).superRefine((data, ctx) => {
  // রোল অনুযায়ী ম্যানুয়ালি চেক করা হচ্ছে
  if (data.role === "Provider") {
    if (!data.businessName.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["businessName"] });
    }
    if (!data.address.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["address"] });
    }
  }
  if (data.role === "Delivery") {
    if (!data.vehicleType.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["vehicleType"] });
    }
  }
});

// টাইপ এক্সট্রাক্ট করা
type SignupFormData = z.infer<typeof formSchema>;

export default function SignupPage() {
  const [isPending, setIsPending] = React.useState(false);

  // useForm হুকে জেনেরিক আর্গুমেন্ট বাদ দিয়ে সরাসরি টাইপ ইনফার করা হয়েছে
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "Customer" as SignupFormData['role'], // এখানে কাস্টিং এরর ফিক্স করবে
      businessName: "",
      address: "",
      description: "",
      vehicleType: "",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      setIsPending(true);
      const toastId = toast.loading("Creating your specialized account...")
      try {
        const { data, error } = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
          // @ts-ignore
          phone: value.phone,
          role: value.role.toUpperCase(),
          status: "ACTIVE"
        })
        console.log("normal User Reg ", data)
        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }

        // Profile Logic
        if ((value.role === "Provider" || value.role === "Delivery") && data?.user) {
          const endpoint = value.role === "Provider" ? "/provider/create" : "/delivery/create";
          const profileBody = value.role === "Provider" 
          ? { userId: data?.user?.id, businessName: value?.businessName, address: value?.address, contactNumber: value?.phone, description: value?.description }
          : { userId: data?.user?.id, vehicleType: value?.vehicleType };
          
          console.log("Profile Body: ", profileBody);

         const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileBody),
          });
          console.log("Profile Creation Response: ", res)
        }
        toast.success("Welcome to Meal Mate!", { id: toastId })
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId })
      } finally {
        setIsPending(false);
      }
    },
  })

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-12 px-4 text-white">
      <div className="absolute inset-0 z-0">
        <Image src="/bg.jpg" alt="BG" fill className="object-cover scale-105" priority />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[550px] bg-white/10 border border-white/20 backdrop-blur-[25px] shadow-2xl rounded-[40px] p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-white/20 rounded-3xl backdrop-blur-3xl mb-4 border border-white/30">
            <UserPlus size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter italic">Join Meal Mate</h1>
          <p className="text-white/60 text-sm mt-2">Start your journey as a Customer, Provider or Delivery Mate</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }} className="space-y-4">
          <FieldGroup className="space-y-4">
            
            <form.Field name="name">
              {(field) => (
                <div className="relative">
                  <input placeholder="Full Name" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl outline-none px-5 pr-12 placeholder:text-white/40 focus:border-white/40 transition-all font-bold" />
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                </div>
              )}
            </form.Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field name="phone">
                {(field) => (
                  <div className="relative">
                    <input placeholder="Phone Number" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl outline-none px-5 text-sm font-bold" />
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  </div>
                )}
              </form.Field>
              <form.Field name="email">
                {(field) => (
                  <div className="relative">
                    <input type="email" placeholder="Email Address" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl outline-none px-5 text-sm font-bold" />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  </div>
                )}
              </form.Field>
            </div>

            <form.Field name="password">
              {(field) => (
                <div className="relative">
                  <input type="password" placeholder="Password" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl outline-none px-5 text-sm font-bold" />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                </div>
              )}
            </form.Field>

            <form.Field name="role">
              {(field) => (
                <Select value={field.state.value} onValueChange={(value: any) => field.handleChange(value)}>
                  <SelectTrigger className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl font-bold">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white rounded-2xl">
                    <SelectItem value="Customer">I am a Customer</SelectItem>
                    <SelectItem value="Provider">I am a Food Provider</SelectItem>
                    <SelectItem value="Delivery">I am a Delivery Mate</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </form.Field>

            <form.Subscribe selector={(state) => state.values.role}>
              {(role) => (
                <AnimatePresence mode="wait">
                  {role === "Provider" && (
                    <motion.div key="provider" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4 pt-2">
                      <form.Field name="businessName">
                        {(field) => (
                          <div className="relative">
                            <input placeholder="Business Name" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl outline-none px-5 font-bold" />
                            <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                          </div>
                        )}
                      </form.Field>
                      <form.Field name="address">
                        {(field) => (
                          <div className="relative">
                            <input placeholder="Address" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl outline-none px-5 font-bold" />
                            <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                          </div>
                        )}
                      </form.Field>
                    </motion.div>
                  )}

                  {role === "Delivery" && (
                    <motion.div key="delivery" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-2">
                      <form.Field name="vehicleType">
                        {(field) => (
                          <Select value={field.state.value} onValueChange={(v) => field.handleChange(v)}>
                            <SelectTrigger className="w-full h-12 bg-white/10 border-white/20 rounded-2xl font-bold">
                              <SelectValue placeholder="Vehicle Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                              <SelectItem value="bicycle">Bicycle</SelectItem>
                              <SelectItem value="motorcycle">Motorcycle</SelectItem>
                              <SelectItem value="scooter">E-Scooter</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </form.Field>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </form.Subscribe>
          </FieldGroup>

          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <button 
                type="submit" 
                disabled={!canSubmit || isPending}
                className="w-full h-14 bg-white text-zinc-900 font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl hover:bg-zinc-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer"
              >
                {isPending ? <Loader2 className="animate-spin" /> : <><UserPlus size={18} /> Register Now</>}
              </button>
            )}
          </form.Subscribe>
          
          <div className="text-center mt-6">
            <p className="text-xs text-white/50 font-bold uppercase">
              Already a Mate? <Link href="/login" className="text-white hover:underline italic">Login Here</Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  )
}