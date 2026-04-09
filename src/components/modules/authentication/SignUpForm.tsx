"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(1, "This Field is Required"),
  password: z.string().min(6, "Minimum length is 6"),
  email: z.string().email(),
  phone: z.string().min(10, "Minimum length is 10"),
  role: z.enum(["Customer", "Provider"], { message: "Role is required" }),
})

export function SignupForm(props: React.ComponentProps<typeof Card>) {
  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    })
  }

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "Customer",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating User....")
      const registerData = {
        name : value.name,
        email : value.email,
        password : value.password,
        phone : value.phone,
        role : value.role.toUpperCase(),
        status : "ACTIVE"
      }
      console.log(registerData);
      try {
        const { data, error } = await authClient.signUp.email(registerData)
        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }
        toast.success("User Created Successfully", { id: toastId })
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId })
      }
    },
  })

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
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
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
            <form.Field
              name="phone"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
            <form.Field
              name="role"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value: "Customer" | "Provider") => field.handleChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Customer">Customer</SelectItem>
                        <SelectItem value="Provider">Provider</SelectItem>
                      </SelectContent>
                    </Select>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" form="register-form" type="submit">
          Register
        </Button>
        <Button
          onClick={() => loginWithGoogle()}
          variant="outline"
          type="button"
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
