import { getDeliveryStats } from "@/actions/delivery.action";
import DeliveryStatsDashboard from "@/components/dashboard/DeliveryStats";

export default async function  ManageUser() {
    const stats = await getDeliveryStats()
    return <DeliveryStatsDashboard stats={stats} />
}