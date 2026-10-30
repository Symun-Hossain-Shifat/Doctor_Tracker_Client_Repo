import Link from "next/link"

export const metadata = {
    title: "Unauthorized",
}

export default function UnauthorizedPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-8 w-8 text-red-600"
                        aria-hidden="true"
                    >
                        <rect x="4" y="11" width="16" height="9" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                </div>

                <p className="mt-6 text-6xl font-bold text-red-600">401</p>
                <h1 className="mt-2 text-xl font-semibold text-gray-900">
                    Unauthorized access
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    You don&apos;t have permission to view this page. Please sign in
                    with an authorized account and try again.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/Signin"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/"
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </main>
    )
}