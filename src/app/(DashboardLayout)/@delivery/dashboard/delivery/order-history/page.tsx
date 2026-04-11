import { getDeliveryHistory } from "@/actions/delivery.action";
import OrderHistory from "@/components/dashboard/DeliveryHistory";

export default async function  OrderHistorys() {
    const history = await getDeliveryHistory()
    // console.log("Delivery History:", history)

    return <OrderHistory history={history?.data} />
}