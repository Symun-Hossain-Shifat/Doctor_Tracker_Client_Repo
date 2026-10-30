import { CalendarDays, FileText, Mail, MapPin, Phone, Trash2 } from "lucide-react";

function getInitials(name = "") {
    return name
        .trim()
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

function capitalize(text = "") {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Works with both "2026-11-07" and full ISO strings like "2026-10-30T06:05:06.586Z"
function formatDate(value) {
    if (!value) return "-";
    const date = value.length === 10 ? new Date(`${value}T00:00:00`) : new Date(value);
    if (isNaN(date)) return "-";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function PatientCard({ patient }) {
    const { name, age, gender, phone, email, address, condition, admissionDate, createdAt } =
        patient;

    return (
        <article className="flex flex-col rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">

            {/* Header */}
            <div className="flex items-center gap-4">
                <span
                    aria-hidden="true"
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-500 text-lg font-bold text-white"
                >
                    {getInitials(name)}
                </span>

                <div className="min-w-0">
                    <h2 className="truncate text-lg font-bold capitalize text-slate-900">
                        {name}
                    </h2>

                    <p className="mt-0.5 text-sm text-slate-500">
                        {age} years
                        {gender ? ` · ${capitalize(gender)}` : ""}
                    </p>
                </div>
            </div>

            {/* Condition */}
            {condition && (
                <div className="mt-5 rounded-xl bg-teal-50 p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-teal-800">
                        <FileText size={16} />
                        Condition
                    </p>

                    <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                        {condition}
                    </p>
                </div>
            )}

            {/* Contact Details */}
            <ul className="mt-5 space-y-3 text-sm text-slate-600">

                {phone && (
                    <li className="flex items-start gap-3">
                        <Phone
                            size={16}
                            className="mt-0.5 shrink-0 text-teal-600"
                        />

                        <a
                            href={`tel:${phone}`}
                            className="hover:underline"
                        >
                            {phone}
                        </a>
                    </li>
                )}

                {email && (
                    <li className="flex items-start gap-3">
                        <Mail
                            size={16}
                            className="mt-0.5 shrink-0 text-teal-600"
                        />

                        <a
                            href={`mailto:${email}`}
                            className="break-all hover:underline"
                        >
                            {email}
                        </a>
                    </li>
                )}

                {address && (
                    <li className="flex items-start gap-3">
                        <MapPin
                            size={16}
                            className="mt-0.5 shrink-0 text-teal-600"
                        />

                        <span>{address}</span>
                    </li>
                )}
            </ul>

            {/* Dates */}
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm">

                <p className="flex items-center gap-2 font-medium text-slate-800">
                    <CalendarDays
                        size={16}
                        className="text-teal-600"
                    />

                    Admitted {formatDate(admissionDate)}
                </p>

                <p className="text-xs text-slate-400">
                    Added {formatDate(createdAt)}
                </p>
            </div>

            {/* Delete Button */}
            <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">

                <button


                    className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                >

                    <>
                        <Trash2 size={16} />
                        Delete Patient
                    </>

                </button>

            </div>

        </article>
    );
}