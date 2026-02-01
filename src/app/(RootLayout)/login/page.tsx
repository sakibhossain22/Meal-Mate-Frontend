"use client"
import Image from 'next/image';
import { Mail, Lock, LogIn } from 'lucide-react'; // প্রাসঙ্গিক আইকন
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import Link from 'next/link';

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.string().email("Invalid email address")
})

const LoginPage = () => {
  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  }

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onChange: formSchema
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Accessing account...")
      try {
        const { error } = await authClient.signIn.email(value)
        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }
        toast.success("Welcome back!", { id: toastId })
      } catch (error) {
        toast.error("Something Went Wrong", { id: toastId })
      }
    }
  })

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Section */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.jpg"
          alt="Night Stars Forest"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-[420px] mx-4 bg-white/10 border-2 border-white/20 backdrop-blur-[20px] shadow-2xl rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold text-center mb-8">Login</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-6"
        >
          {/* Email Input Field */}
          <form.Field
            name="email"
            children={(field) => (
              <div className="relative w-full">
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="email"
                  placeholder="Email Address"
                  className="w-full h-12 bg-transparent border-2 border-white/20 rounded-full outline-none text-white px-5 pr-12 placeholder:text-white/70 focus:border-white transition-all"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                {field.state.meta.errors ? (
                  <em className="text-xs text-red-400 ml-4 mt-1 block">{field.state.meta.errors.join(', ')}</em>
                ) : null}
              </div>
            )}
          />
          <form.Field
            name="password"
            children={(field) =>  (
              <div className="relative w-full">
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="w-full h-12 bg-transparent border-2 border-white/20 rounded-full outline-none text-white px-5 pr-12 placeholder:text-white/70 focus:border-white transition-all"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                {field.state.meta.errors ? (
                  <em className="text-xs text-red-400 ml-4 mt-1 block">{field.state.meta.errors.join(', ')}</em>
                ) : null}
              </div>
            )}
          />


          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full h-12 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : <><LogIn size={20} /> Login</>}
              </button>
            )}
          />

          <div className="relative flex items-center gap-4 my-4">
            <div className="flex-grow border-t border-white/20"></div>
            <span className="text-xs text-white/50">OR</span>
            <div className="flex-grow border-t border-white/20"></div>
          </div>

          <button
            type="submit"
            onClick={loginWithGoogle}
            className="w-full cursor-pointer h-12 bg-transparent border-2 border-white/20 rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Image src="https://www.svgrepo.com/show/475656/google-color.svg" width={20} height={20} alt="Google" />
            Continue with Google
          </button>

          <div className="text-center text-sm mt-6">
            <p>
              Don't have an account?{" "}
              <Link href="/register" className="font-bold hover:text-purple-300 transition-colors">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;