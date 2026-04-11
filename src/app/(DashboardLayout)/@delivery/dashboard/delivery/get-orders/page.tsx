import { acceptOrder } from "@/actions/delivery.action";
import { adminAllOrders } from "@/actions/meal.action";
import GetOrderss from "@/components/dashboard/AcceptOder";
import { authClient } from "@/lib/auth-client";
import { getSession } from "better-auth/api";

export default async function  GetOrders() {
    const orders = await adminAllOrders();

    return <GetOrderss ordersData={orders?.data} />
}  