"use client"

import { getBlogPosts } from "@/actions/meal.action";
import { useEffect, useState } from "react"

export default function AboutPage() {
    const [data, setData] = useState()
    console.log(data);
    useEffect(() => {
        (async function () {
            const data = await getBlogPosts()
            setData(data.data.posts)
        })();
    }, [])
    return (
        <div className='flex items-center justify-center h-screen '>
            <div>
                <h2 className='text-4xl font-bold'>About</h2>
                <p className='text-2xl my-2'>This is the About page</p>
            </div>
        </div>
    )
}