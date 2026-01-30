

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
<<<<<<< HEAD
}
export interface MealType {
    name: string;
    description: string;
    price: string;
    isAvailable: boolean;
    categoryId: string;

}
=======
}
>>>>>>> 1a4a69fe07f0e65f0ecebcfb2f6b9ca1fa9ca1a9
