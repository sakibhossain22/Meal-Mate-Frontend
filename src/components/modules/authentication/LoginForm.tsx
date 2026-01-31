"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { Sparkles, ArrowRight, Github } from "lucide-react"

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.string().email()
})

export function LoginForm(props: React.ComponentProps<typeof Card>) {
  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  }

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: formSchema },
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
    <div className="w-full min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-zinc-950 p-6">
      <Card className="max-w-[450px] w-full border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[24px] overflow-hidden" {...props}>
        
        {/* Branding Header */}
        <div className="bg-primary p-8 text-primary-foreground flex flex-col items-center text-center space-y-2">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">System Login</CardTitle>
          <p className="text-primary-foreground/80 text-sm">Sign in to continue to your dashboard</p>
        </div>

        <CardContent className="p-8 pt-10">
            <form
              id="register-form"
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
            <FieldGroup className="space-y-5">
              <form.Field name="email">
                {(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Work Email
                    </FieldLabel>
                    <Input 
                      placeholder="alex@company.com" 
                      className="rounded-xl border-zinc-200 h-12 bg-zinc-50/50 dark:bg-zinc-900 focus:bg-white transition-all"
                      value={field.state.value} 
                      onChange={(e) => field.handleChange(e.target.value)} 
                    />
                    {field.state.meta.isTouched && <FieldError className="text-xs text-red-500" errors={field.state.meta.errors} />}
                  </Field>
                )}
              </form.Field>

              <form.Field name="password">
                {(field) => (
                  <Field className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                      <FieldLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Password
                      </FieldLabel>
                      <button type="button" className="text-xs font-medium text-primary hover:underline">
                        Forgot?
                      </button>
                    </div>
                    <Input 
                      type="password" 
                      placeholder="••••••••"
                      className="rounded-xl border-zinc-200 h-12 bg-zinc-50/50 dark:bg-zinc-900 focus:bg-white transition-all"
                      value={field.state.value} 
                      onChange={(e) => field.handleChange(e.target.value)} 
                    />
                    {field.state.meta.isTouched && <FieldError className="text-xs text-red-500" errors={field.state.meta.errors} />}
                  </Field>
                )}
              </form.Field>
            </FieldGroup>

            <Button className="w-full h-12 rounded-xl font-bold text-sm mt-4 group transition-all" type="submit">
              Sign In 
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-100 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-tighter">
              <span className="bg-white dark:bg-zinc-950 px-4 text-muted-foreground font-bold">
                Alternative access
              </span>
            </div>
          </div>

          <Button 
            onClick={loginWithGoogle} 
            variant="outline" 
            className="w-full h-12 rounded-xl border-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-semibold text-sm transition-all"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="p-8 pt-0 flex justify-center border-t border-zinc-50 dark:border-zinc-900 mt-2">
          <p className="text-xs text-muted-foreground font-medium pt-6">
            New here? <button className="text-primary font-bold hover:underline">Create an account</button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}