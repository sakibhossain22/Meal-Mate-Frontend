import { getDeliveryStats } from "@/actions/delivery.action";

export default async function  ManageUser() {
    const stats = await getDeliveryStats()
    return (
        <div>
            <h1>Stats</h1>
        </div>
    );
}