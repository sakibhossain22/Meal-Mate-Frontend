import { blogService } from "@/app/services/meal.service";
import { PostData } from "@/types/index.type";
import Image from "next/image";

export async function generateStaticParams() {
    const { data } = await blogService.getblogPost();
    const array = data.posts.map((post: PostData) => ({ id: post.id }))
    const spice = array.splice(0, 3)
    return spice
}


export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { post } = await blogService.getSinglePostById(id);

    return (
        <div>
            <h1>Blog Dynamic Page {id}</h1>
            <div className="flex items-center justify-center gap-5 ">
                <div key={post.id} className="w-1/3">
                    <Image className="w-full" src={post?.thumbnail || null} alt={"image not Found"}></Image>
                    <h2 className="text-xl">{post.title}</h2>
                    <p className="text-lg">{post.content}</p>

                </div>
            </div>
        </div>
    );
}