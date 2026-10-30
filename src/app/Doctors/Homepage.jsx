'use client'
import PostDoctor from "@/lib/Action/PostData/PostDoctor";
import { ChevronLeft, ChevronRight, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const PAGE_SIZE = 6;

const emptyForm = {
    name: "",
    specialization: "",
    hospital: "",
    phone: "",
    email: "",
};

const emptyFilters = {
    search: "",
    specialization: "",
    hospital: "",
    from: "",
    to: "",
    sort: "newest",
};

// Uses createdAt if the doctor has it. Otherwise reads the creation time
// that MongoDB stores inside every _id.
function getCreatedDate(doctor) {
    if (doctor.createdAt) return new Date(doctor.createdAt);
    if (doctor._id) return new Date(parseInt(String(doctor._id).substring(0, 8), 16) * 1000);
    return null;
}

function formatDate(date) {
    return date
        ? date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        : "-";
}

function getPageNumbers(current, total) {
    const start = Math.max(1, Math.min(current - 2, total - 4));
    const end = Math.min(total, start + 4);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
}

function DoctorCard({ doctor }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
            <h2 className="text-lg font-bold text-slate-900">{doctor.name}</h2>
            <p className="text-sm font-medium text-teal-600">{doctor.specialization}</p>

            <div className="mt-4 space-y-1 text-sm text-slate-600">
                <p>Hospital: {doctor.hospital}</p>
                <p>Phone: {doctor.phone}</p>
                <p className="break-all">Email: {doctor.email}</p>
                <p className="text-xs text-slate-400">Added: {formatDate(getCreatedDate(doctor))}</p>
            </div>
            <Link
                href={`/Doctors/${doctor._id}`}
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
                View Patients
            </Link>

        </div>
    );
}

function AddDoctorModal({ onClose, onAdd }) {
    const [form, setForm] = useState(emptyForm);
    const router = useRouter();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onAdd(form);
        const result = await PostDoctor(form);
        if (result) {
            alert("Doctor Added Successfull");
            router.refresh("/");
        }
    };

    const inputClass =
        "mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200";

    return (
        <div
            className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/60 p-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-doctor-title"
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
                <div className="flex items-center justify-between">
                    <h2 id="add-doctor-title" className="text-xl font-bold text-slate-900">
                        Add new doctor
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-slate-700">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Dr. Ayesha Rahman"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="specialization" className="text-sm font-medium text-slate-700">
                            Specialization
                        </label>
                        <input
                            id="specialization"
                            name="specialization"
                            type="text"
                            required
                            value={form.specialization}
                            onChange={handleChange}
                            placeholder="Cardiologist"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="hospital" className="text-sm font-medium text-slate-700">
                            Hospital
                        </label>
                        <input
                            id="hospital"
                            name="hospital"
                            type="text"
                            required
                            value={form.hospital}
                            onChange={handleChange}
                            placeholder="Square Hospital, Dhaka"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                            Phone
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+880 1711-000000"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="doctor@example.com"
                            className={inputClass}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                    >
                        Add doctor
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function Doctorpage({ doctors = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [filters, setFilters] = useState(emptyFilters);
    const [page, setPage] = useState(1);

    const handleAddDoctor = () => {
        setShowModal(false);
    };

    // Change a filter and go back to the first page
    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const clearFilters = () => {
        setFilters(emptyFilters);
        setPage(1);
    };

    // Dropdown options come from the real data
    const specializations = useMemo(
        () => [...new Set(doctors.map((d) => d.specialization).filter(Boolean))].sort(),
        [doctors]
    );
    const hospitals = useMemo(
        () => [...new Set(doctors.map((d) => d.hospital).filter(Boolean))].sort(),
        [doctors]
    );

    // Search + filters + sorting
    const filtered = useMemo(() => {
        const query = filters.search.trim().toLowerCase();
        const fromDate = filters.from ? new Date(`${filters.from}T00:00:00`) : null;
        const toDate = filters.to ? new Date(`${filters.to}T23:59:59.999`) : null;

        const result = doctors.filter((d) => {
            if (query) {
                const text = [d.name, d.specialization, d.hospital, d.phone, d.email]
                    .join(" ")
                    .toLowerCase();
                if (!text.includes(query)) return false;
            }
            if (filters.specialization && d.specialization !== filters.specialization) return false;
            if (filters.hospital && d.hospital !== filters.hospital) return false;

            if (fromDate || toDate) {
                const created = getCreatedDate(d);
                if (!created) return false;
                if (fromDate && created < fromDate) return false;
                if (toDate && created > toDate) return false;
            }
            return true;
        });

        result.sort((a, b) => {
            if (filters.sort === "name") return a.name.localeCompare(b.name);
            const diff = (getCreatedDate(a) || 0) - (getCreatedDate(b) || 0);
            return filters.sort === "oldest" ? diff : -diff;
        });

        return result;
    }, [doctors, filters]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const visibleDoctors = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    const hasActiveFilters = Object.keys(emptyFilters).some(
        (key) => filters[key] !== emptyFilters[key]
    );

    const fieldClass =
        "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200";

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-extrabold text-slate-900">Doctors</h1>

                {/* Search and filters */}
                <div className="mt-6 rounded-2xl bg-white p-4 shadow-md ring-1 ring-slate-200 sm:p-5">
                    <div className="relative">
                        <Search
                            size={18}
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="search"
                            value={filters.search}
                            onChange={(e) => updateFilter("search", e.target.value)}
                            placeholder="Search by name, specialization, hospital, phone or email"
                            aria-label="Search doctors"
                            className={`${fieldClass} pl-10`}
                        />
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        <div>
                            <label htmlFor="f-specialization" className="text-xs font-medium text-slate-500">
                                Specialization
                            </label>
                            <select
                                id="f-specialization"
                                value={filters.specialization}
                                onChange={(e) => updateFilter("specialization", e.target.value)}
                                className={`${fieldClass} mt-1`}
                            >
                                <option value="">All specializations</option>
                                {specializations.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="f-hospital" className="text-xs font-medium text-slate-500">
                                Hospital
                            </label>
                            <select
                                id="f-hospital"
                                value={filters.hospital}
                                onChange={(e) => updateFilter("hospital", e.target.value)}
                                className={`${fieldClass} mt-1`}
                            >
                                <option value="">All hospitals</option>
                                {hospitals.map((h) => (
                                    <option key={h} value={h}>
                                        {h}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="f-from" className="text-xs font-medium text-slate-500">
                                Added from
                            </label>
                            <input
                                id="f-from"
                                type="date"
                                value={filters.from}
                                max={filters.to || undefined}
                                onChange={(e) => updateFilter("from", e.target.value)}
                                className={`${fieldClass} mt-1`}
                            />
                        </div>

                        <div>
                            <label htmlFor="f-to" className="text-xs font-medium text-slate-500">
                                Added to
                            </label>
                            <input
                                id="f-to"
                                type="date"
                                value={filters.to}
                                min={filters.from || undefined}
                                onChange={(e) => updateFilter("to", e.target.value)}
                                className={`${fieldClass} mt-1`}
                            />
                        </div>

                        <div>
                            <label htmlFor="f-sort" className="text-xs font-medium text-slate-500">
                                Sort by
                            </label>
                            <select
                                id="f-sort"
                                value={filters.sort}
                                onChange={(e) => updateFilter("sort", e.target.value)}
                                className={`${fieldClass} mt-1`}
                            >
                                <option value="newest">Newest first</option>
                                <option value="oldest">Oldest first</option>
                                <option value="name">Name (A-Z)</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-slate-600" aria-live="polite">
                            {filtered.length === 0
                                ? "No doctors found"
                                : `Showing ${startIndex + 1}-${startIndex + visibleDoctors.length} of ${filtered.length} doctors`}
                        </p>
                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="text-sm font-semibold text-teal-700 hover:underline"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Doctor cards */}
                {visibleDoctors.length > 0 ? (
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleDoctors.map((doctor) => (
                            <DoctorCard key={doctor._id} doctor={doctor} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-md ring-1 ring-slate-200">
                        <p className="font-semibold text-slate-900">No doctors match your search</p>
                        <p className="mt-1 text-sm text-slate-600">
                            Try a different keyword or clear the filters.
                        </p>
                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-4 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => setPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ChevronLeft size={16} />
                            Previous
                        </button>

                        {getPageNumbers(currentPage, totalPages).map((n) => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => setPage(n)}
                                aria-current={n === currentPage ? "page" : undefined}
                                className={`h-10 w-10 rounded-xl text-sm font-semibold transition ${n === currentPage
                                    ? "bg-teal-600 text-white"
                                    : "border border-slate-200 bg-white text-slate-700 hover:bg-teal-50"
                                    }`}
                            >
                                {n}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={() => setPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                            <ChevronRight size={16} />
                        </button>
                    </nav>
                )}
            </div>

            {/* Floating Add Doctor Button */}
            <div className="fixed bottom-20 right-6 z-50 sm:bottom-10 sm:right-5">
                <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-white shadow-lg transition hover:scale-105 hover:bg-teal-700"
                >
                    <Plus size={22} />
                    <span className="text-sm font-semibold">Add Doctor</span>
                </button>
            </div>

            {showModal && (
                <AddDoctorModal
                    onClose={() => setShowModal(false)}
                    onAdd={handleAddDoctor}
                />
            )}
        </main>
    );
}