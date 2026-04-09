

export interface Route {
    title: string;
    items:
    {
        title: string;
        url: string;
    }[];

}

export interface PostData {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    isFeatured: boolean;
    status: string;
    tags: string[];
    views: number;
    authorid: string;
    createdAt: string;
    updatedAt: string;
    _count: {
        comment: number
    }
}
export interface mealType {

}
export interface ReviewType {
    id: string,
    rating: number,
    comment: string,
    customerId: string,
    mealId: string,
    customer: {
        email: string,
        name: string,
        image: string | null
    }
}
export interface MealType {
    name: string;
    description: string;
    price: string;
    isAvailable: boolean;
    categoryId: string;

}

