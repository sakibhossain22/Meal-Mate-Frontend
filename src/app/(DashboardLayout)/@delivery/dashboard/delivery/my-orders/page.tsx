import { getMyOrders } from "@/actions/delivery.action";
import MyOrder from "@/components/dashboard/MyOrders";

export default async function  MyOrders() {
    const myOrders = await getMyOrders()
    return <MyOrder orders={myOrders?.data} />
}