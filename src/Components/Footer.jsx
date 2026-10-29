
import Link from "next/link";
import {
    Activity,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import {
    FaGithub,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";

const QUICK_LINKS = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/doctors", label: "Doctors" },
    { href: "/patients", label: "Patients" },
];

const SUPPORT_LINKS = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/help", label: "Help Center" },
];

const CONTACTS = [
    { icon: Mail, text: "support@doctortracker.com" },
    { icon: Phone, text: "+880 1234 567890" },
    { icon: MapPin, text: "Dhaka, Bangladesh" },
];

const SOCIALS = [
    {
        icon: FaGithub,
        href: "https://github.com",
        label: "GitHub",
    },
    {
        icon: FaLinkedinIn,
        href: "https://linkedin.com",
        label: "LinkedIn",
    },
    {
        icon: FaXTwitter,
        href: "https://x.com",
        label: "X",
    },
];

export default function Footer() {
    const year = 2026;

    return (
        <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
                {/* Brand */}
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-600 text-white">
                            <Activity size={20} />
                        </span>

                        <span className="text-lg font-bold text-white">
                            Doctor
                            <span className="text-teal-400">Tracker</span>
                        </span>
                    </Link>

                    <p className="mt-4 text-sm leading-relaxed text-slate-400">
                        A secure platform to manage doctors, track patients, and
                        explore meaningful healthcare analytics.
                    </p>

                    <div className="mt-5 flex gap-3">
                        {SOCIALS.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                title={label}
                                className="grid h-9 w-9 place-items-center rounded-lg bg-slate-800 text-slate-300 transition-colors hover:bg-teal-600 hover:text-white"
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                        Quick Links
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm">
                        {QUICK_LINKS.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="transition-colors hover:text-teal-400"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                        Support
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm">
                        {SUPPORT_LINKS.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="transition-colors hover:text-teal-400"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                        Contact
                    </h3>

                    <ul className="mt-4 space-y-3 text-sm">
                        {CONTACTS.map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-start gap-3">
                                <Icon
                                    size={16}
                                    className="mt-0.5 shrink-0 text-teal-400"
                                />
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
                    <p>
                        © {year} Doctor Tracker. All rights reserved.
                    </p>

                    <p>Built with Next.js, MongoDB & Tailwind CSS</p>
                </div>
            </div>
        </footer>
    );
}