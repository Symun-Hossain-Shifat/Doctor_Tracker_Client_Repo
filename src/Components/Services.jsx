import Link from "next/link";
import {
    Stethoscope,
    Users,
    Search,
    BarChart3,
    ShieldCheck,
    Zap,
    ArrowRight,
} from "lucide-react";

const SERVICES = [
    {
        icon: Stethoscope,
        title: "Doctor Management",
        description:
            "Add doctors with their specialization, hospital and contact details, and keep every profile organized in one list.",
        tag: "Core",
    },
    {
        icon: Users,
        title: "Patient Management",
        description:
            "Add, edit and remove patients under any doctor, and see each doctor's full patient list at a glance.",
        tag: "Core",
    },
    {
        icon: Search,
        title: "Smart Search & Filters",
        description:
            "Find records fast with search, date-wise and condition-based filters, and clean paginated results.",
        tag: "Productivity",
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description:
            "Track total doctors, total patients, patients per doctor and date-based trends with clear charts.",
        tag: "Insights",
    },
    {
        icon: ShieldCheck,
        title: "Secure Access",
        description:
            "Protected routes and authenticated sessions make sure only authorized admins can reach your data.",
        tag: "Security",
    },
    {
        icon: Zap,
        title: "Fast & Scalable",
        description:
            "Indexed MongoDB queries and server-side pagination keep the app quick, even as your records grow.",
        tag: "Performance",
    },
];

export default function ServicesSection() {
    return (
        <section id="services" className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
                        Our Services
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Everything you need to run your clinic network
                    </h2>
                    <p className="mt-3 text-slate-600">
                        From doctor profiles to patient records and analytics, Doctor Tracker
                        keeps your administration simple and organized.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map(({ icon: Icon, title, description, tag }) => (
                        <article
                            key={title}
                            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-teal-200"
                        >
                            {/* Hover glow */}
                            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-100/60 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-md shadow-teal-600/20">
                                        <Icon size={22} />
                                    </span>
                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                                        {tag}
                                    </span>
                                </div>

                                <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA strip */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-500 p-6 text-white sm:flex-row sm:p-8">
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold">Ready to get organized?</h3>
                        <p className="mt-1 text-sm text-teal-50">
                            Sign in to start managing your doctors and patients today.
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow-lg transition hover:bg-teal-50"
                    >
                        Get Started
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}