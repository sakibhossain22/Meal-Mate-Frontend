"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <div className="max-w-md w-full text-center p-8 bg-white rounded-2xl shadow-xl">
                <div className="mb-6 flex justify-center">
                    <div className="bg-red-100 p-4 rounded-full">
                        <svg
                            className="w-12 h-12 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Something went wrong
                </h1>

                <p className="text-gray-600 mb-8">
                    We encountered an unexpected error. Don't worry, it's not you, it's us.
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => reset()}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02]"
                    >
                        Try again
                    </button>

                    <a
                        href="/"
                        className="text-sm text-gray-500 hover:text-gray-700 font-medium transition duration-200"
                    >
                        Return to Home
                    </a>
                </div>

                {error.digest && (
                    <p className="mt-8 text-xs text-gray-400 font-mono">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}