'use client'

import Link from "next/link";
import { Mail, Lock, LucideIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";




function InputField({ label, id, icon: Icon, rightLabel, ...props }) {
    return (
        <div className="w-full space-y-1.5 text-left">
            <div className="flex items-center justify-between">
                <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    {label}
                </label>
                {rightLabel}
            </div>
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

export default function Signin() {
    const router = useRouter()
    const Handlesignin = async (e) => {
        e.preventDefault();
        const Formdata = e.target
        const email = Formdata.email.value
        const password = Formdata.password.value
        const { data, error } = await authClient.signIn.email({
            email: email,
            password: password,
            rememberMe: true,
            callbackURL: "/",
        });
        if (data) {
            alert('Login Successfull')
            router.push('/')
        } else {
            alert(error.message)
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 border border-slate-100">

                {/* Header */}
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Please enter your details to sign in to Doctor Tracker.
                    </p>
                </div>



                {/* Form */}
                <form className="space-y-4" onSubmit={Handlesignin}>
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
                        placeholder="••••••••"
                        icon={Lock}
                        required

                    />

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 shrink-0 rounded border-slate-300 text-teal-600 accent-teal-600 focus:ring-teal-500"
                            />
                            <span>Remember me for 30 days</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/20 active:scale-[0.99]"
                    >
                        Sign in
                    </button>
                </form>

                {/* Footer Link */}
                <p className="text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link
                        href="/Signup"
                        className="font-semibold text-teal-600 underline-offset-2 hover:underline hover:text-teal-700"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}