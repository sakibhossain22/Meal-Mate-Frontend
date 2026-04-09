"use client"

import Image from 'next/image'
import { FieldGroup } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { User, Mail, Lock, Phone, UserPlus, Building2, MapPin, FileText } from "lucide-react"

// Updated Zod Schema with superRefine
const formSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  password: z.string().min(6, "Minimum 6 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Minimum 10 digits"),
  role: z.enum(["Customer", "Provider"]),
  businessName: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.role === "Provider") {
    if (!data.businessName || data.businessName.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Business name is required",
        path: ["businessName"],
      });
    }
    if (!data.address || data.address.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Address is required",
        path: ["address"],
      });
    }
    if (!data.description || data.description.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Description is required",
        path: ["description"],
      });
    }
  }
});

export default function SignupPage() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "Customer" as "Customer" | "Provider",
      businessName: "",
      address: "",
      description: "",
    },
    validators: {
      // @ts-ignore
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your account...")
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

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }

        if (value.role === "Provider" && data?.user) {
          const profileRes = await fetch("http://localhost:5000/provider/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: data.user.id,
              businessName: value.businessName,
              address: value.address,
              contactNumber: value.phone,
              description: value.description,
            }),
          });

          if (!profileRes.ok) {
            toast.error("User created but Provider Profile failed.", { id: toastId });
            return;
          }
        }

        toast.success("Registration Successful!", { id: toastId })
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId })
      }
    },
  })

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-10">
      <div className="absolute inset-0 z-0">
        <Image src="/bg.jpg" alt="BG" fill className="object-cover" priority />
      </div>

      <div className="relative z-10 w-full max-w-[500px] mx-4 bg-white/10 border-2 border-white/20 backdrop-blur-[20px] shadow-2xl rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold text-center mb-8">Register</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-5"
        >
          <FieldGroup className="space-y-4">
            {/* Name Field */}
            <form.Field name="name">
              {(field) => (
                <div className="relative w-full">
                  <input placeholder="Full Name" value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} className="w-full h-11 bg-transparent border-2 border-white/20 rounded-full outline-none text-white px-5 pr-12 placeholder:text-white/70 focus:border-white transition-all text-sm" />
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                </div>
              )}
            </form.Field>

            {/* Email Field */}
            <form.Field name="email">
              {(field) => (
                <div className="relative w-full">
                  <input type="email" placeholder="Email Address" value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} className="w-full h-11 bg-transparent border-2 border-white/20 rounded-full outline-none text-white px-5 pr-12 placeholder:text-white/70 focus:border-white transition-all text-sm" />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                </div>
              )}
            </form.Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field name="phone">
                {(field) => (
                  <div className="relative w-full">
                    <input placeholder="Phone Number" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full h-11 bg-transparent border-2 border-white/20 rounded-full outline-none text-white px-5 pr-12 placeholder:text-white/70 focus:border-white transition-all text-sm" />
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                  </div>
                )}
              </form.Field>
              <form.Field name="password">
                {(field) => (
                  <div className="relative w-full">
                    <input type="password" placeholder="Password" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full h-11 bg-transparent border-2 border-white/20 rounded-full outline-none text-white px-5 pr-12 placeholder:text-white/70 focus:border-white transition-all text-sm" />
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                  </div>
                )}
              </form.Field>
            </div>

            {/* Role Field */}
            <form.Field name="role">
              {(field) => (
                <Select value={field.state.value} onValueChange={(value: any) => field.handleChange(value)}>
                  <SelectTrigger className="w-full h-11 bg-transparent border-2 border-white/20 rounded-full text-white px-5 focus:ring-0 focus:border-white transition-all text-sm">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Provider">Provider</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </form.Field>

            {/* Provider Specific Fields */}
            <form.Subscribe
              selector={(state) => state.values.role}
              children={(role) => role === "Provider" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <form.Field name="businessName">
                    {(field) => (
                      <div className="relative w-full">
                        <input placeholder="Business Name" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full h-11 bg-transparent border-2 border-white/20 rounded-full outline-none text-white px-5 pr-12 placeholder:text-white/70 focus:border-white transition-all text-sm" />
                        <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="description">
                    {(field) => (
                      <div className="relative w-full">
                        <textarea
                          placeholder="Tell us about your business..."
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full h-24 bg-transparent border-2 border-white/20 rounded-2xl outline-none text-white p-4 pr-12 placeholder:text-white/70 focus:border-white transition-all text-sm resize-none"
                        />
                        <FileText className="absolute right-4 top-4 w-4 h-4 text-white/70" />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="address">
                    {(field) => (
                      <div className="relative w-full">
                        <input placeholder="Address" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full h-11 bg-transparent border-2 border-white/20 rounded-full outline-none text-white px-5 pr-12 placeholder:text-white/70 focus:border-white transition-all text-sm" />
                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                      </div>
                    )}
                  </form.Field>
                </div>
              )}
            />
          </FieldGroup>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full h-12 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4 cursor-pointer"
              >
                {isSubmitting ? "Creating..." : <><UserPlus size={20} /> Register</>}
              </button>
            )}
          />
        </form>
      </div>
    </div>
  )
}