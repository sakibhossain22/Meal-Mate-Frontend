import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { cookies } from "next/headers";

export default function CreateBlogPage() {
    const API_URL = env.API_URL
    const postBlog = async (formData: FormData) => {
        "use server"
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const tags = formData.get("tags") as string;
        console.log({ title, content, tags });
        const blogData = {
            title,
            content,
            tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0)
        }
        const cookieStore = await cookies()
        const res = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(blogData)
        })
        console.log(res);
    }
    return (
        <div className="mx-auto w-full items-center justify-center">
            <CardHeader>
                <CardTitle>Create Blog Page</CardTitle>
                <CardDescription>Create a new blog post</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="blog-form" action={postBlog} className="flex w-1/2 flex-col gap-4">
                    {/* Form fields for blog creation will go here */}
                    <Field>
                        <FieldLabel>Blog Title</FieldLabel>
                        <Input type="text" name="title" />
                    </Field>
                    <Field>
                        <FieldLabel>Blog Content</FieldLabel>
                        <Input type="text" name="content" />
                    </Field>
                    <Field>
                        <FieldLabel>Blog tags</FieldLabel>
                        <Input type="text" name="tags" />
                    </Field>
                </form>
            </CardContent>
            <CardFooter>
                <Button form="blog-form" className="w-1/2" type="submit">Create Blog</Button>
            </CardFooter>
        </div>
    )
}