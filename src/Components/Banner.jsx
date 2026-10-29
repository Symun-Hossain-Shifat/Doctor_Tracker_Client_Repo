import Link from "next/link";
import {
    ArrowRight,
    ShieldCheck,
    Stethoscope,
    Users,
    BarChart3,
    CalendarCheck,
} from "lucide-react";

const HIGHLIGHTS = [
    { icon: Stethoscope, label: "Doctor Management" },
    { icon: Users, label: "Patient Records" },
    { icon: BarChart3, label: "Live Analytics" },
];

const STATS = [
    { value: "500+", label: "Patients tracked" },
    { value: "50+", label: "Doctors managed" },
    { value: "99.9%", label: "Uptime" },
];

export default function HeroBanner() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-500">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
                {/* Left: content */}
                <div className="text-white">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                        <ShieldCheck size={14} />
                        Secure admin portal
                    </span>

                    <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
                        Manage doctors and patients,{" "}
                        <span className="text-cyan-200">all in one place.</span>
                    </h1>

                    <p className="mt-4 max-w-lg text-base text-teal-50 sm:text-lg">
                        Doctor Tracker helps administrators organize doctors, track patients
                        and uncover insights with fast search, smart filters and clear analytics.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow-lg transition hover:bg-teal-50"
                        >
                            Get Started
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            View Dashboard
                        </Link>
                    </div>

                    <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                        {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                            <li key={label} className="flex items-center gap-2 text-sm text-teal-50">
                                <Icon size={18} className="text-cyan-200" />
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: dashboard preview card */}
                <div className="relative mx-auto w-full max-w-md">
                    <div className="rounded-3xl bg-white/15 p-5 shadow-2xl ring-1 ring-white/30 backdrop-blur-md">
                        <div className="rounded-2xl bg-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-500">This month</p>
                                    <p className="text-xl font-bold text-slate-900">Patient Overview</p>
                                </div>
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-600">
                                    <CalendarCheck size={20} />
                                </span>
                            </div>

                            {/* Mini bar chart (pure CSS) */}
                            <div className="mt-6 flex h-32 items-end gap-2">
                                {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
                                    <div
                                        key={i}
                                        style={{ height: `${h}%` }}
                                        className="flex-1 rounded-t-md bg-gradient-to-t from-teal-600 to-cyan-400"
                                    />
                                ))}
                            </div>

                            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4">
                                {STATS.map((s) => (
                                    <div key={s.label}>
                                        <p className="text-lg font-bold text-slate-900">{s.value}</p>
                                        <p className="text-[11px] leading-tight text-slate-500">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:flex">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                            <Users size={18} />
                        </span>
                        <div>
                            <p className="text-sm font-bold text-slate-900">+24 patients</p>
                            <p className="text-xs text-slate-500">added this week</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}