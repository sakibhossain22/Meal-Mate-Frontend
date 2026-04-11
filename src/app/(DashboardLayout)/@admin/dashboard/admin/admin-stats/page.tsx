
import { Users, Utensils, ShoppingBag, DollarSign, Activity, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { adminStat } from "@/actions/meal.action";
import AdminStat from "@/components/dashboard/AdminStats";



export default async function AdminStats() {
    const response = await adminStat();
    return <AdminStat response={response} />;
}