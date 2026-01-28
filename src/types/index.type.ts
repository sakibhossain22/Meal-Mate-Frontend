

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