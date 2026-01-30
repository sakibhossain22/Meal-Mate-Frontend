import { providerStats } from "@/actions/order.action";

export default async function ProviderStats() {
    const data = await providerStats()
    return (
        <div>
        </div>
    );
}