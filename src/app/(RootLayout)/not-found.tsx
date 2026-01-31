import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex items-center justify-center h-screen '>
            <div>
                <h2 className='text-4xl font-bold'>Not Found</h2>
                <p className='text-2xl my-2'>Could not find requested resource</p>
                <Link className='bg-red-800 font-bold text-white px-2 py-1 rounded text-xl' href="/">Return Home</Link>
            </div>
        </div>
    )
}