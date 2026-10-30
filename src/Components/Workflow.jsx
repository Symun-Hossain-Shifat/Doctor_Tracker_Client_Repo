'use client'
import Link from "next/link";
import {
    ArrowRight,
    LogIn,
    Stethoscope,
    UserPlus,
    CalendarCheck,
    Search,
    BarChart3,
    CheckCircle2,
    ShieldCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const STEPS = [
    {
        icon: LogIn,
        title: "Sign in to the admin portal",
        description:
            "Administrators sign in with a secure account. Every session is protected, so only authorized staff can see doctor and patient data.",
        points: ["Email and password login", "Protected dashboard routes"],
    },
    {
        icon: Stethoscope,
        title: "Add and organize doctors",
        description:
            "Create a profile for each doctor with their specialty, contact details and availability. Update or remove profiles at any time.",
        points: ["Specialty and department", "Contact and availability details"],
    },
    {
        icon: UserPlus,
        title: "Register patients",
        description:
            "Record each patient once and keep their details, history and assigned doctor together in a single record.",
        points: ["Personal and contact details", "Assigned doctor"],
    },
    {
        icon: CalendarCheck,
        title: "Assign doctors and track visits",
        description:
            "Link patients to the right doctor and keep an up-to-date record of every visit, so nothing gets missed.",
        points: ["Doctor and patient pairing", "Visit history per patient"],
    },
    {
        icon: Search,
        title: "Find records fast",
        description:
            "Search by name and narrow results with filters such as specialty, status or date added to reach any record in seconds.",
        points: ["Instant search", "Filters by specialty and status"],
    },
    {
        icon: BarChart3,
        title: "Review analytics",
        description:
            "See how many patients each doctor handles and how your numbers change over time, all from one dashboard.",
        points: ["Patients per doctor", "Monthly overview charts"],
    },
];

export default function WorkflowPage() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    return (
        <main className="bg-slate-50">
            {/* Page header */}
            <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-500">
                <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

                <div className="relative mx-auto max-w-4xl px-4 py-16 text-center text-white sm:px-6 md:py-24 lg:px-8">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                        <ShieldCheck size={14} />
                        How it works
                    </span>
                    <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
                        From sign-in to insights in six steps
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-teal-50 sm:text-lg">
                        Here is how administrators use Doctor Tracker to manage doctors, follow
                        patients and understand their data.
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
                <ol className="relative">
                    {/* Vertical line */}
                    <span
                        aria-hidden="true"
                        className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-teal-500 via-teal-300 to-cyan-200"
                    />

                    {STEPS.map(({ icon: Icon, title, description, points }, index) => (
                        <li key={title} className="relative pb-10 pl-20 last:pb-0">
                            {/* Step marker */}
                            <span className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-lg ring-4 ring-slate-50">
                                <Icon size={22} />
                            </span>

                            <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
                                <p className="text-sm font-semibold text-teal-600">Step {index + 1}</p>
                                <h2 className="mt-1 text-xl font-bold text-slate-900">{title}</h2>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                                    {description}
                                </p>
                                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                                    {points.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-center gap-2 text-sm text-slate-700"
                                        >
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Call to action */}
            <section className="px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
                <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-500 p-8 text-center text-white shadow-xl sm:p-12">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                    <div className="relative">
                        <h2 className="text-2xl font-extrabold sm:text-3xl">
                            Ready to organize your doctors and patients?
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-teal-50">
                            Sign in to start adding records, or contact us if you want a walkthrough first.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <Link
                                href={user ? "/Dashboard" : "/Signin"}
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow-lg transition hover:bg-teal-50"
                            >
                                {user ? "Open dashboard" : "Sign in to start"}
                                <ArrowRight size={16} />
                            </Link>
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                Contact us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}