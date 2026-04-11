import { adminAllCategory } from "@/actions/meal.action"
import ManageCategories from "@/components/dashboard/ManageCategory"

export default async function ManageCategory() {
  const categories = await adminAllCategory()
  // console.log(categories)
  return <ManageCategories categories={categories?.data} />
}

