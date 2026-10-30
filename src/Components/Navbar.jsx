
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Stethoscope,
    Users,
    LogOut,
    Menu,
    X,
    Activity,
    LogIn,
    Home,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const NAV_LINKS = [
    {
        loginPath: "/",
        originalPath: "/",
        label: "Home",
        icon: Home,
    },
    {
        loginPath: "/Signin",
        originalPath: "/Dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
    },

    {
        loginPath: "/Signin",
        originalPath: "/Doctors",
        label: "Doctors",
        icon: Stethoscope,
    },
    {
        loginPath: "/Signin",
        originalPath: "/Patient",
        label: "Patients",
        icon: Users,
    },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // Check current active route
    const isActive = (href) => {
        if (!href) return false;

        return (
            pathname === href ||
            pathname.startsWith(`${href}/`)
        );
    };

    // Active and inactive link styles
    const linkClass = (active) =>
        `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active
            ? "bg-teal-50 text-teal-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`;

    // Logout handler
    const onLogout = async () => {
        if (loggingOut) return;

        setLoggingOut(true);

        try {
            const result = await authClient.signOut();

            if (result?.error) {
                throw new Error(
                    result.error.message || "Logout failed"
                );
            }

            setOpen(false);
            router.replace("/Signin");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        } finally {
            setLoggingOut(false);
        }
    };

    // Navigation links
    const renderNavLinks = () =>
        NAV_LINKS.map(
            ({ loginPath, originalPath, label, icon: Icon }) => {
                const href = user ? originalPath : loginPath;

                const active =
                    Boolean(user) && isActive(originalPath);

                return (
                    <li key={originalPath}>
                        <Link
                            href={href}
                            onClick={() => setOpen(false)}
                            className={linkClass(active)}
                            aria-current={active ? "page" : undefined}
                        >
                            <Icon size={18} />
                            {label}
                        </Link>
                    </li>
                );
            }
        );

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href={user ? "/Dashboard" : "/Signin"}
                    className="flex items-center gap-2"
                >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-600 text-white">
                        <Activity size={20} />
                    </span>

                    <span className="text-lg font-bold text-slate-900">
                        Doctor
                        <span className="text-teal-600">
                            Tracker
                        </span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden items-center gap-1 md:flex">
                    {renderNavLinks()}
                </ul>

                {/* Desktop User Area */}
                <div className="hidden items-center gap-3 md:flex">
                    {!isPending && user && (
                        <div className="text-right leading-tight">
                            <p className="text-sm font-semibold text-slate-800">
                                {user.name}
                            </p>

                            <p className="text-xs text-slate-500">
                                {user.email}
                            </p>
                        </div>
                    )}

                    {!isPending &&
                        (user ? (
                            <button
                                type="button"
                                onClick={onLogout}
                                disabled={loggingOut}
                                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <LogOut size={16} />
                                {loggingOut
                                    ? "Logging out..."
                                    : "Logout"}
                            </button>
                        ) : (
                            <Link
                                href="/Signin"
                                className="flex items-center gap-2 rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
                            >
                                <LogIn size={16} />
                                Login
                            </Link>
                        ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    type="button"
                    className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
                    onClick={() =>
                        setOpen((value) => !value)
                    }
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    aria-controls="mobile-navigation"
                >
                    {open ? (
                        <X size={22} />
                    ) : (
                        <Menu size={22} />
                    )}
                </button>
            </nav>

            {/* Mobile Navigation */}
            {open && (
                <div
                    id="mobile-navigation"
                    className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden"
                >
                    <ul className="space-y-1">
                        {renderNavLinks()}
                    </ul>

                    {!isPending && (
                        <div className="mt-3 border-t border-slate-200 pt-3">
                            {user ? (
                                <>
                                    <div className="mb-3 px-3">
                                        <p className="text-sm font-semibold text-slate-800">
                                            {user.name}
                                        </p>

                                        <p className="break-all text-xs text-slate-500">
                                            {user.email}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={onLogout}
                                        disabled={loggingOut}
                                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                                    >
                                        <LogOut size={16} />
                                        {loggingOut
                                            ? "Logging out..."
                                            : "Logout"}
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/Signin"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white hover:bg-teal-700"
                                >
                                    <LogIn size={16} />
                                    Login
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
