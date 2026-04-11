import { acceptOrder } from "@/actions/delivery.action";
import { adminAllOrders } from "@/actions/meal.action";
import { getProfile } from "@/actions/profile.action";
import GetOrderss from "@/components/dashboard/AcceptOder";
import { authClient } from "@/lib/auth-client";
import { getSession } from "better-auth/api";

export default async function  GetOrders() {
    const orders = await adminAllOrders();
    const profile = await getProfile()
    console.log(profile)
    return <GetOrderss profile={profile} ordersData={orders?.data} />
}  