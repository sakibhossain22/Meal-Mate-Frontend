import { redirect } from "next/navigation"

export default async function AdminDefault() {
    return redirect("/dashboard/admin/admin-profile")
    
}
