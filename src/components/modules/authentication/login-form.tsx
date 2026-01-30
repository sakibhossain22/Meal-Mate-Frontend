"use client"

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
import { redirect, RedirectType } from "next/navigation"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
  password: z.string().min(8, "Minimum lenth is 8"),
  email: z.email()
})
export function LoginForm(props: React.ComponentProps<typeof Card>) {
    const loginWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  }
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      const toastId = toast.loading("Login User....")
      try {
        const { data, error } = await authClient.signIn.email(value)
        console.log(data);

        if (error) {
          toast.error(error.message, { id: toastId })
        }
        toast.success("User Logged In Successfully", { id: toastId })
      
      } catch (error) {
        toast.error("Something Went Wrong", { id: toastId })
      }
    }
  })

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field name="email" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                  <Input type="email" id={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                  {
                    isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )
                  }
                </Field>
              )
            }} />
            <form.Field name="password" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input type="password" id={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                  {
                    isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )
                  }
                </Field>
              )
            }} />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button className="w-full" form="register-form" type="submit">
         Login
        </Button>
      </CardFooter>
      <Button onClick={() => loginWithGoogle()} variant="outline" type="button">
        Continue with Google
      </Button>
    </Card>
  )
}
