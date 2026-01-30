"use client";
export default function AboutError({error, reset}: {error: Error; reset: () => void}) {

    return (
        <div className='flex items-center justify-center h-screen '>
            <div>
                <h2 className='text-4xl font-bold'>Something went wrong!</h2>
                <p className='text-2xl my-2'>Please try again later.</p>
            </div>
        </div>
    )
}