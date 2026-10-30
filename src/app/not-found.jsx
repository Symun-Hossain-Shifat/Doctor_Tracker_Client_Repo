import Link from "next/link"

export const metadata = {
    title: "Page Not Found",
}

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-8 w-8 text-blue-600"
                        aria-hidden="true"
                    >
                        <path d="M3 12h4l2-6 4 12 2-6h6" />
                    </svg>
                </div>

                <p className="mt-6 text-6xl font-bold text-blue-600">404</p>
                <h1 className="mt-2 text-xl font-semibold text-gray-900">
                    Page not found
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    We couldn&apos;t find the page you&apos;re looking for. It may have
                    been moved, deleted, or the link might be incorrect.
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Go to Home
                    </Link>
                    <Link
                        href="/Dashboard"
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Open Dashboard
                    </Link>
                </div>
            </div>
        </main>
    )
}