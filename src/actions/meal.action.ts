"use server"

import { mealService } from "@/app/services/meal.service"

export async function getAllMeal() {
    const data = await mealService.getAllMeal()
    return data
}