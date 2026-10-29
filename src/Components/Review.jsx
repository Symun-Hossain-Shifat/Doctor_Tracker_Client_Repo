import { Star, Quote, BadgeCheck } from "lucide-react";

const REVIEWS = [
    {
        id: 1,
        name: "Ayesha Rahman",
        condition: "Cardiology patient",
        rating: 5,
        text: "Booking and follow-ups were effortless. My doctor had my full history ready every visit, so nothing had to be repeated.",
    },
    {
        id: 2,
        name: "Tanvir Hasan",
        condition: "Orthopedic patient",
        rating: 5,
        text: "The care team was always informed and responsive. I felt like a person, not a file number.",
    },
    {
        id: 3,
        name: "Nusrat Jahan",
        condition: "Dermatology patient",
        rating: 4,
        text: "Clear communication and quick scheduling. Waiting time has dropped noticeably since the clinic started using this system.",
    },
];

const BREAKDOWN = [
    { stars: 5, percent: 78 },
    { stars: 4, percent: 15 },
    { stars: 3, percent: 5 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 1 },
];

function Stars({ rating, size = 16 }) {
    return (
        <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((n) => (
                <Star
                    key={n}
                    size={size}
                    className={n <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                />
            ))}
        </div>
    );
}

function getInitials(name) {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function PatientReviews() {
    return (
        <section className="bg-slate-50 py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
                        Patient Reviews
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        What patients say about their care
                    </h2>
                    <p className="mt-3 text-slate-600">
                        Real feedback from patients helps us keep improving the experience for everyone.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-3">
                    {/* Rating summary */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-1">
                        <div className="flex items-end gap-3">
                            <p className="text-5xl font-extrabold text-slate-900">4.8</p>
                            <div className="pb-1">
                                <Stars rating={5} size={18} />
                                <p className="mt-1 text-xs text-slate-500">Based on 1,240 reviews</p>
                            </div>
                        </div>

                        <ul className="mt-6 space-y-3">
                            {BREAKDOWN.map(({ stars, percent }) => (
                                <li key={stars} className="flex items-center gap-3 text-sm">
                                    <span className="flex w-8 items-center gap-1 text-slate-600">
                                        {stars}
                                        <Star size={12} className="fill-amber-400 text-amber-400" />
                                    </span>
                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-teal-600 to-cyan-400"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                    <span className="w-9 text-right text-xs text-slate-500">{percent}%</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Review cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
                        {REVIEWS.map((r, i) => (
                            <article
                                key={r.id}
                                className={`relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md ${i === 0 ? "sm:col-span-2" : ""
                                    }`}
                            >
                                <Quote
                                    size={36}
                                    className="absolute right-5 top-5 text-teal-100"
                                    aria-hidden="true"
                                />
                                <Stars rating={r.rating} />
                                <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                                    “{r.text}”
                                </p>

                                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 text-sm font-bold text-white">
                                        {getInitials(r.name)}
                                    </span>
                                    <div>
                                        <p className="flex items-center gap-1 text-sm font-semibold text-slate-900">
                                            {r.name}
                                            <BadgeCheck size={14} className="text-teal-600" />
                                        </p>
                                        <p className="text-xs text-slate-500">{r.condition}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}