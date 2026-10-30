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