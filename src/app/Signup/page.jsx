'use client'

import Link from "next/link";
import { User, Mail, Lock, LucideIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";



function InputField({ label, id, icon: Icon, ...props }) {
    return (
        <div className="w-full space-y-1.5 text-left">
            <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                {label}
            </label>
            <div className="relative flex items-center">
                <div className="pointer-events-none absolute left-3.5 text-slate-400">
                    <Icon className="h-5 w-5" />
                </div>
                <input
                    id={id}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    {...props}
                />
            </div>
        </div>
    );
}

export default function Signup() {
    const router = useRouter()

    const HandleSignup = async (e) => {
        e.preventDefault()
        const Formdata = e.target
        const name = Formdata.name.value
        const email = Formdata.email.value
        const password = Formdata.password.value


        const { data, error } = await authClient.signUp.email({
            name: name,
            email: email,
            password: password,

            callbackURL: '/'
        });
        if (data) {
            alert('Registration Successfull')
            router.push('/')
        } else {
            alert(error.message)
        }


        console.log(error)

    }
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 border border-slate-100">

                {/* Header */}
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Get started with Doctor Tracker in a minute.
                    </p>
                </div>

                {/* Google OAuth Button */}
                <button
                    type="button"
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50/50 focus:outline-none focus:ring-4 focus:ring-slate-100 active:scale-[0.99]"
                >
                    <svg
                        viewBox="0 0 48 48"
                        className="h-5 w-5 shrink-0"
                        aria-hidden="true"
                    >
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                            transform="translate(0 4)"
                        />
                        <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.64 5.93c4.46-4.11 7.13-10.17 7.13-17.58Z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z"
                        />
                        <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.91-5.87l-7.64-5.93c-2.13 1.43-4.85 2.28-8.27 2.28-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                        />
                    </svg>
                    <span>Sign up with Google</span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-slate-400">
                    <span className="h-px flex-1 bg-slate-200" />
                    <span>or sign up with email</span>
                    <span className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={HandleSignup}>
                    <InputField
                        id="name"
                        name="name"
                        label="Full name"
                        placeholder="John Doe"
                        icon={User}
                        required
                    />

                    <InputField
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        icon={Mail}
                        required
                    />

                    <InputField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="At least 8 characters"
                        icon={Lock}
                        required
                    />



                    {/* Terms Checkbox */}
                    <label className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 cursor-pointer pt-1">
                        <input
                            type="checkbox"
                            required
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-teal-600 accent-teal-600 focus:ring-teal-500"
                        />
                        <span>
                            I agree to the{" "}
                            <Link href="#" className="font-medium text-teal-600 underline-offset-2 hover:underline hover:text-teal-700">
                                Terms
                            </Link>{" "}
                            and{" "}
                            <Link href="#" className="font-medium text-teal-600 underline-offset-2 hover:underline hover:text-teal-700">
                                Privacy Policy
                            </Link>
                        </span>
                    </label>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/20 active:scale-[0.99]"
                    >
                        Create account
                    </button>
                </form>

                {/* Footer Link */}
                <p className="text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link
                        href="/Signin"
                        className="font-semibold text-teal-600 underline-offset-2 hover:underline hover:text-teal-700"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}