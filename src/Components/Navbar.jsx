"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Stethoscope, Users, LogOut, Menu, X, Activity, LogIn } from "lucide-react";

const NAV_LINKS = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/doctors", label: "Doctors", icon: Stethoscope },
    { href: "/patients", label: "Patients", icon: Users },
];

function Navbar({ user, onLogout }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

    const linkClass = (href) =>
        `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive(href)
            ? "bg-teal-50 text-teal-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`;

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-600 text-white">
                        <Activity size={20} />
                    </span>
                    <span className="text-lg font-bold text-slate-900">
                        Doctor<span className="text-teal-600">Tracker</span>
                    </span>
                </Link>

                {/* Desktop links */}
                <ul className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                        <li key={href}>
                            <Link href={href} className={linkClass(href)} aria-current={isActive(href) ? "page" : undefined}>
                                <Icon size={18} />
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop user area */}
                <div className="hidden items-center gap-3 md:flex">
                    <div className="text-right leading-tight">
                        <p className="text-sm font-semibold text-slate-800">{user?.name || "Admin"}</p>
                        <p className="text-xs text-slate-500">{user?.email || "admin@doctortracker.com"}</p>
                    </div>
                    {/* {isLoggedIn ? ( */}
                    {/* <button
                            onClick={onLogout}
                            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    ) : ( */}
                    <Link
                        href="/Signin"
                        className="flex items-center gap-2 rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
                    >
                        <LogIn size={16} />
                        Login
                    </Link>
                    {/* )} */}
                </div>

                {/* Mobile toggle */}
                <button
                    className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile menu */}
            {open && (
                <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden">
                    <ul className="space-y-1">
                        {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                            <li key={href}>
                                <Link href={href} onClick={() => setOpen(false)} className={linkClass(href)}>
                                    <Icon size={18} />
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={onLogout}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
}

export default memo(Navbar);