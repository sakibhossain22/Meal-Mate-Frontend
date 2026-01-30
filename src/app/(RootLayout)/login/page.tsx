import { LoginForm } from "@/components/modules/authentication/login-form"

export default function Page() {
  return (
    <div className="">
      <div className={`bg-cover h-[800px] bg-center bg-no-repeat bg-[url('/loginbg.png')]`}>
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
