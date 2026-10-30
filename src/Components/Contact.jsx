'use client'
import { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle2,
    Loader2,
} from "lucide-react";

const CONTACT_INFO = [
    {
        icon: Mail,
        label: "Email us",
        value: "support@doctortracker.com",
        href: "mailto:support@doctortracker.com",
    },
    {
        icon: Phone,
        label: "Call us",
        value: "+880 1XXX-XXXXXX",
        href: "tel:+8801XXXXXXXXX",
    },
    {
        icon: MapPin,
        label: "Visit us",
        value: "Dhaka, Bangladesh",
    },
    {
        icon: Clock,
        label: "Support hours",
        value: "Sun - Thu, 9:00 AM - 6:00 PM",
    },
];

const TOPICS = [
    "General question",
    "Request a demo",
    "Technical support",
    "Feedback",
];

const INITIAL = { name: "", email: "", topic: TOPICS[0], message: "" };

function validate(values) {
    const errors = {};
    if (!values.name.trim()) errors.name = "Enter your full name.";
    if (!values.email.trim()) errors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
        errors.email = "Enter a valid email address.";
    if (!values.message.trim()) errors.message = "Write a short message.";
    else if (values.message.trim().length < 10)
        errors.message = "Message must be at least 10 characters.";
    return errors;
}

const inputClass = (hasError) =>
    `mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 ${hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
        : "border-slate-200 focus:border-teal-500 focus:ring-teal-200"
    }`;

export default function ContactSection() {
    const [values, setValues] = useState(INITIAL);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        setStatus("sending");
        try {
            // TODO: replace with your real endpoint, e.g. app/api/contact/route.js
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!res.ok) throw new Error("Request failed");
            setValues(INITIAL);
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="bg-slate-50 py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                        Questions about Doctor Tracker?
                    </h2>
                    <p className="mt-3 text-base text-slate-600 sm:text-lg">
                        Send us a message and our team will reply within one business day.
                    </p>
                </div>

                <div className="mt-10 grid overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200 lg:grid-cols-5">
                    {/* Left: contact details */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-500 p-8 text-white sm:p-10 lg:col-span-2">
                        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

                        <div className="relative">
                            <h3 className="text-xl font-bold">Contact details</h3>
                            <p className="mt-2 max-w-sm text-sm text-teal-50">
                                Reach the team directly, or use the form and we will get back to you.
                            </p>

                            <ul className="mt-8 space-y-6">
                                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                                    <li key={label} className="flex items-start gap-4">
                                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur-sm">
                                            <Icon size={20} className="text-cyan-100" />
                                        </span>
                                        <div>
                                            <p className="text-sm text-teal-100">{label}</p>
                                            {href ? (
                                                <a
                                                    href={href}
                                                    className="break-all font-semibold hover:underline focus-visible:underline"
                                                >
                                                    {value}
                                                </a>
                                            ) : (
                                                <p className="font-semibold">{value}</p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right: form */}
                    <div className="bg-white p-8 sm:p-10 lg:col-span-3">
                        {status === "sent" ? (
                            <div
                                role="status"
                                className="flex h-full min-h-[22rem] flex-col items-center justify-center text-center"
                            >
                                <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                                    <CheckCircle2 size={28} />
                                </span>
                                <h3 className="mt-4 text-xl font-bold text-slate-900">Message sent</h3>
                                <p className="mt-2 max-w-sm text-sm text-slate-600">
                                    Thanks for reaching out. We will reply to your email within one business day.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStatus("idle")}
                                    className="mt-6 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="text-sm font-medium text-slate-700">
                                            Full name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            placeholder="Dr. Ayesha Rahman"
                                            aria-invalid={!!errors.name}
                                            aria-describedby={errors.name ? "name-error" : undefined}
                                            className={inputClass(errors.name)}
                                        />
                                        {errors.name && (
                                            <p id="name-error" className="mt-1.5 text-xs text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                            Email address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            placeholder="you@hospital.com"
                                            aria-invalid={!!errors.email}
                                            aria-describedby={errors.email ? "email-error" : undefined}
                                            className={inputClass(errors.email)}
                                        />
                                        {errors.email && (
                                            <p id="email-error" className="mt-1.5 text-xs text-red-600">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="topic" className="text-sm font-medium text-slate-700">
                                        Topic
                                    </label>
                                    <select
                                        id="topic"
                                        name="topic"
                                        value={values.topic}
                                        onChange={handleChange}
                                        className={inputClass(false)}
                                    >
                                        {TOPICS.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="text-sm font-medium text-slate-700">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={values.message}
                                        onChange={handleChange}
                                        placeholder="Tell us how we can help."
                                        aria-invalid={!!errors.message}
                                        aria-describedby={errors.message ? "message-error" : undefined}
                                        className={`${inputClass(errors.message)} resize-y`}
                                    />
                                    {errors.message && (
                                        <p id="message-error" className="mt-1.5 text-xs text-red-600">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                {status === "error" && (
                                    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                                        Your message was not sent. Check your connection and try again.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                                >
                                    {status === "sending" ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Sending
                                        </>
                                    ) : (
                                        <>
                                            Send message
                                            <Send size={16} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}