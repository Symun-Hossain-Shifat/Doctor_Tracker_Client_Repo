"use client"; // Needed in Next.js: this file uses state and event handlers

import { useEffect, useMemo, useState } from "react";
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    FileText,
    Mail,
    MapPin,
    Pencil,
    Phone,
    RotateCcw,
    Search,
    Trash2,
    X,
} from "lucide-react";
import Deletepatient from "@/lib/Action/DeleteData/patientdelete";
import { useRouter } from "next/navigation";
import editpatient from "@/lib/Action/EditData/editpatient";

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

const PAGE_SIZE_OPTIONS = [6, 9, 12, 24];

const INITIAL_FILTERS = {
    search: "",
    condition: "all",
    gender: "all",
    minAge: "",
    maxAge: "",
    admittedFrom: "",
    admittedTo: "",
    sort: "newest",
};

function getInitials(name) {
    return (name || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

function capitalize(text = "") {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Works with "2026-11-07", full ISO strings like "2026-10-30T06:05:06.586Z",
// and Date objects. Returns null when the value is missing or invalid.
function toDate(value) {
    if (!value) return null;

    const date =
        typeof value === "string" && value.length === 10
            ? new Date(`${value}T00:00:00`)
            : new Date(value);

    return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value) {
    const date = toDate(value);
    if (!date) return "-";

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

const normalize = (text) => String(text ?? "").trim().toLowerCase();

// Builds the page list, e.g. [1, "...", 4, 5, 6, "...", 12]
function getPageNumbers(current, total) {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = new Set([1, total, current - 1, current, current + 1]);
    const sorted = [...pages]
        .filter((page) => page >= 1 && page <= total)
        .sort((a, b) => a - b);

    const result = [];
    sorted.forEach((page, index) => {
        if (index > 0 && page - sorted[index - 1] > 1) result.push("...");
        result.push(page);
    });

    return result;
}

function applyFilters(patients, filters) {
    const query = normalize(filters.search);
    const minAge = filters.minAge === "" ? null : Number(filters.minAge);
    const maxAge = filters.maxAge === "" ? null : Number(filters.maxAge);
    const from = filters.admittedFrom
        ? new Date(`${filters.admittedFrom}T00:00:00`)
        : null;
    const to = filters.admittedTo
        ? new Date(`${filters.admittedTo}T23:59:59.999`)
        : null;

    const filtered = patients.filter((patient) => {
        // Search: name, condition, phone, email, address
        if (query) {
            const haystack = [
                patient.name,
                patient.condition,
                patient.phone,
                patient.email,
                patient.address,
            ]
                .map(normalize)
                .join(" ");
            if (!haystack.includes(query)) return false;
        }

        // Condition
        if (
            filters.condition !== "all" &&
            normalize(patient.condition) !== filters.condition
        ) {
            return false;
        }

        // Gender
        if (
            filters.gender !== "all" &&
            normalize(patient.gender) !== filters.gender
        ) {
            return false;
        }

        // Age range
        const age = Number(patient.age);
        if (minAge !== null && !(age >= minAge)) return false;
        if (maxAge !== null && !(age <= maxAge)) return false;

        // Admission date range
        if (from || to) {
            const admitted = toDate(patient.admissionDate);
            if (!admitted) return false;
            if (from && admitted < from) return false;
            if (to && admitted > to) return false;
        }

        return true;
    });

    const time = (value) => toDate(value)?.getTime() ?? 0;

    const sorters = {
        newest: (a, b) => time(b.admissionDate) - time(a.admissionDate),
        oldest: (a, b) => time(a.admissionDate) - time(b.admissionDate),
        nameAsc: (a, b) => normalize(a.name).localeCompare(normalize(b.name)),
        nameDesc: (a, b) => normalize(b.name).localeCompare(normalize(a.name)),
        ageAsc: (a, b) => Number(a.age) - Number(b.age),
        ageDesc: (a, b) => Number(b.age) - Number(a.age),
    };

    return filtered.sort(sorters[filters.sort] ?? sorters.newest);
}

/* -------------------------------------------------------------------------- */
/*                                 Patient card                               */
/* -------------------------------------------------------------------------- */
function PatientCard({ patient, onEdit, onDelete }) {
    const inputClass =
        "mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20";
    const {
        _id,
        name,
        age,
        gender,
        condition,
        phone,
        email,
        address,
        admissionDate,
        createdAt,
    } = patient;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const closeModal = () => setIsModalOpen(false);

    // Close on Escape and lock background scroll while the modal is open
    useEffect(() => {
        if (!isModalOpen) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") setIsModalOpen(false);
        };

        window.addEventListener("keydown", onKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isModalOpen]);

    const handleDelete = async (id) => {
        const result = await Deletepatient(id);
        console.log(result);
        if (result.deletedCount === 1) {
            alert("Delete Patient Successfull");
            router.refresh("/");
        } else {
            alert("Delete Patient Failed");
        }
    };



    const handleUpdate = async (e) => {
        e.preventDefault();

        const Formdata = e.target;

        const Data = {
            email: Formdata.email.value,
            name: Formdata.name.value,
            gender: Formdata.gender.value,
            age: Number(Formdata.age.value),
            phone: Formdata.phone.value,
            address: Formdata.address.value,
            condition: Formdata.condition.value,
            admissionDate: Formdata.admissionDate.value,
        };

        try {
            const result = await editpatient(patient._id, Data);

            console.log(result);

            if (result.success) {
                alert("Patient Updated Successfully!");

                closeModal();
                router.refresh();
            } else {
                alert("Patient Update Failed!");
            }

        } catch (error) {
            console.error("Update error:", error);
            alert(error.message || "Patient Update Failed!");
        }
    };


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
                        {age ? `${age} years` : "Age not set"}
                        {gender ? ` · ${capitalize(gender)}` : ""}
                    </p>
                </div>
            </div>

            {/* Condition */}
            {condition && (
                <div className="mt-5 rounded-xl bg-teal-50 p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-teal-800">
                        <FileText size={16} aria-hidden="true" />
                        Condition
                    </p>

                    <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                        {condition}
                    </p>
                </div>
            )}

            {/* Contact details */}
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {phone && (
                    <li className="flex items-start gap-3">
                        <Phone size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-teal-600" />
                        <a href={`tel:${phone}`} className="hover:underline">
                            {phone}
                        </a>
                    </li>
                )}

                {email && (
                    <li className="flex items-start gap-3">
                        <Mail size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-teal-600" />
                        <a href={`mailto:${email}`} className="break-all hover:underline">
                            {email}
                        </a>
                    </li>
                )}

                {address && (
                    <li className="flex items-start gap-3">
                        <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-teal-600" />
                        <span>{address}</span>
                    </li>
                )}
            </ul>

            {/* Dates */}
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm">
                <p className="flex items-center gap-2 font-medium text-slate-800">
                    <CalendarDays size={16} aria-hidden="true" className="text-teal-600" />
                    Admitted {formatDate(admissionDate)}
                </p>

                <p className="text-xs text-slate-400">Added {formatDate(createdAt)}</p>
            </div>

            {/* Actions */}
            <div className="mt-5 flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                    <Pencil size={16} aria-hidden="true" />
                    Edit patient
                </button>

                <button
                    type="button"
                    onClick={() => handleDelete(_id)}
                    className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500"
                >
                    <Trash2 size={16} aria-hidden="true" />
                    Delete patient
                </button>
            </div>

            {/* Edit modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/60 p-4"
                    onClick={closeModal}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={`edit-title-${_id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
                    >
                        {/* Modal header */}
                        <div className="flex items-center justify-between">
                            <h2
                                id={`edit-title-${_id}`}
                                className="text-xl font-bold text-slate-900"
                            >
                                Edit patient
                            </h2>

                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Close"
                                className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
                            >
                                <X size={20} aria-hidden="true" />
                            </button>
                        </div>

                        {/* Edit form */}
                        <form onSubmit={handleUpdate} className="mt-5 space-y-4">
                            {/* Patient name */}
                            <div>
                                <label htmlFor={`edit-name-${_id}`} className="text-sm font-medium text-slate-700">
                                    Patient name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id={`edit-name-${_id}`}
                                    name="name"
                                    type="text"
                                    required
                                    defaultValue={name || ""}
                                    placeholder="Karim Uddin"
                                    className={inputClass}
                                />
                            </div>

                            {/* Age and gender */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor={`edit-age-${_id}`} className="text-sm font-medium text-slate-700">
                                        Age <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id={`edit-age-${_id}`}
                                        name="age"
                                        type="number"
                                        min="0"
                                        max="130"
                                        required
                                        defaultValue={age ?? ""}
                                        placeholder="35"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label htmlFor={`edit-gender-${_id}`} className="text-sm font-medium text-slate-700">
                                        Gender
                                    </label>
                                    <select
                                        id={`edit-gender-${_id}`}
                                        name="gender"
                                        defaultValue={gender?.toLowerCase() || ""}
                                        className={inputClass}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Phone and email */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor={`edit-phone-${_id}`} className="text-sm font-medium text-slate-700">
                                        Phone
                                    </label>
                                    <input
                                        id={`edit-phone-${_id}`}
                                        name="phone"
                                        type="tel"
                                        defaultValue={phone || ""}
                                        placeholder="+880 1711-000000"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label htmlFor={`edit-email-${_id}`} className="text-sm font-medium text-slate-700">
                                        Email
                                    </label>
                                    <input
                                        id={`edit-email-${_id}`}
                                        name="email"
                                        type="email"
                                        defaultValue={email || ""}
                                        placeholder="patient@example.com"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label htmlFor={`edit-address-${_id}`} className="text-sm font-medium text-slate-700">
                                    Address
                                </label>
                                <input
                                    id={`edit-address-${_id}`}
                                    name="address"
                                    type="text"
                                    defaultValue={address || ""}
                                    placeholder="House 12, Road 5, Mirpur, Dhaka"
                                    className={inputClass}
                                />
                            </div>

                            {/* Patient condition */}
                            <div>
                                <label htmlFor={`edit-condition-${_id}`} className="text-sm font-medium text-slate-700">
                                    Patient condition
                                </label>
                                <textarea
                                    id={`edit-condition-${_id}`}
                                    name="condition"
                                    rows={3}
                                    defaultValue={condition || ""}
                                    placeholder="Describe the patient's current condition"
                                    className={`${inputClass} resize-y`}
                                />
                            </div>

                            {/* Admission date */}
                            <div>
                                <label htmlFor={`edit-admissionDate-${_id}`} className="text-sm font-medium text-slate-700">
                                    Admission date
                                </label>
                                <input
                                    id={`edit-admissionDate-${_id}`}
                                    name="admissionDate"
                                    type="date"
                                    defaultValue={admissionDate ? String(admissionDate).slice(0, 10) : ""}
                                    className={inputClass}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"

                                    className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                                >
                                    Update patient
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </article>
    );
}

/* -------------------------------------------------------------------------- */
/*                               Small form pieces                            */
/* -------------------------------------------------------------------------- */

const fieldClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100";

function Field({ label, htmlFor, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label
                htmlFor={htmlFor}
                className="text-xs font-semibold text-slate-600"
            >
                {label}
            </label>
            {children}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function Patientpage({ patients = [], onEdit, onDelete }) {
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

    // Update one filter and jump back to page 1
    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const resetFilters = () => {
        setFilters(INITIAL_FILTERS);
        setPage(1);
    };

    // Unique conditions for the dropdown (case-insensitive)
    const conditionOptions = useMemo(() => {
        const map = new Map();
        patients.forEach((patient) => {
            const key = normalize(patient.condition);
            if (key && !map.has(key)) map.set(key, patient.condition.trim());
        });
        return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    }, [patients]);

    const genderOptions = useMemo(() => {
        const set = new Set();
        patients.forEach((patient) => {
            const key = normalize(patient.gender);
            if (key) set.add(key);
        });
        return [...set].sort();
    }, [patients]);

    const filteredPatients = useMemo(
        () => applyFilters(patients, filters),
        [patients, filters]
    );

    // Pagination (current page is clamped in case the list shrinks)
    const totalPages = Math.max(1, Math.ceil(filteredPatients.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const visiblePatients = filteredPatients.slice(
        startIndex,
        startIndex + pageSize
    );

    const activeFilterCount = Object.keys(INITIAL_FILTERS).filter(
        (key) => key !== "sort" && filters[key] !== INITIAL_FILTERS[key]
    ).length;

    const goToPage = (target) => {
        setPage(Math.min(Math.max(target, 1), totalPages));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!patients.length) {
        return (
            <p className="rounded-2xl bg-white p-10 text-center text-sm text-slate-500 ring-1 ring-slate-200">
                No patients yet. Add your first patient to see them here.
            </p>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Patients</h1>
            {/* Search & filters */}
            <section
                aria-label="Search and filter patients"
                className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-200"
            >
                {/* Search */}
                <div className="relative">
                    <Search
                        size={18}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="search"
                        value={filters.search}
                        onChange={(e) => updateFilter("search", e.target.value)}
                        placeholder="Search by name, condition, phone, email or address"
                        aria-label="Search patients"
                        className={`${fieldClass} py-2.5 pl-10 pr-10`}
                    />
                    {filters.search && (
                        <button
                            type="button"
                            onClick={() => updateFilter("search", "")}
                            aria-label="Clear search"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        >
                            <X size={16} aria-hidden="true" />
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Field label="Condition" htmlFor="filter-condition">
                        <select
                            id="filter-condition"
                            value={filters.condition}
                            onChange={(e) =>
                                updateFilter("condition", e.target.value)
                            }
                            className={fieldClass}
                        >
                            <option value="all">All conditions</option>
                            {conditionOptions.map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Gender" htmlFor="filter-gender">
                        <select
                            id="filter-gender"
                            value={filters.gender}
                            onChange={(e) =>
                                updateFilter("gender", e.target.value)
                            }
                            className={fieldClass}
                        >
                            <option value="all">All genders</option>
                            {genderOptions.map((value) => (
                                <option key={value} value={value}>
                                    {capitalize(value)}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Min age" htmlFor="filter-min-age">
                        <input
                            id="filter-min-age"
                            type="number"
                            min="0"
                            inputMode="numeric"
                            value={filters.minAge}
                            onChange={(e) =>
                                updateFilter("minAge", e.target.value)
                            }
                            placeholder="0"
                            className={fieldClass}
                        />
                    </Field>

                    <Field label="Max age" htmlFor="filter-max-age">
                        <input
                            id="filter-max-age"
                            type="number"
                            min="0"
                            inputMode="numeric"
                            value={filters.maxAge}
                            onChange={(e) =>
                                updateFilter("maxAge", e.target.value)
                            }
                            placeholder="120"
                            className={fieldClass}
                        />
                    </Field>

                    <Field label="Admitted from" htmlFor="filter-from">
                        <input
                            id="filter-from"
                            type="date"
                            value={filters.admittedFrom}
                            max={filters.admittedTo || undefined}
                            onChange={(e) =>
                                updateFilter("admittedFrom", e.target.value)
                            }
                            className={fieldClass}
                        />
                    </Field>

                    <Field label="Admitted to" htmlFor="filter-to">
                        <input
                            id="filter-to"
                            type="date"
                            value={filters.admittedTo}
                            min={filters.admittedFrom || undefined}
                            onChange={(e) =>
                                updateFilter("admittedTo", e.target.value)
                            }
                            className={fieldClass}
                        />
                    </Field>

                    <Field label="Sort by" htmlFor="filter-sort">
                        <select
                            id="filter-sort"
                            value={filters.sort}
                            onChange={(e) =>
                                updateFilter("sort", e.target.value)
                            }
                            className={fieldClass}
                        >
                            <option value="newest">Newest admission</option>
                            <option value="oldest">Oldest admission</option>
                            <option value="nameAsc">Name (A to Z)</option>
                            <option value="nameDesc">Name (Z to A)</option>
                            <option value="ageAsc">Age (low to high)</option>
                            <option value="ageDesc">Age (high to low)</option>
                        </select>
                    </Field>

                    <Field label="Patients per page" htmlFor="filter-page-size">
                        <select
                            id="filter-page-size"
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setPage(1);
                            }}
                            className={fieldClass}
                        >
                            {PAGE_SIZE_OPTIONS.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </Field>
                </div>

                {/* Summary + reset */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <p className="text-sm text-slate-600" aria-live="polite">
                        {filteredPatients.length === 0 ? (
                            "No patients found"
                        ) : (
                            <>
                                Showing{" "}
                                <span className="font-semibold text-slate-900">
                                    {startIndex + 1}-
                                    {startIndex + visiblePatients.length}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-slate-900">
                                    {filteredPatients.length}
                                </span>{" "}
                                {filteredPatients.length === patients.length
                                    ? "patients"
                                    : `matching patients (${patients.length} total)`}
                            </>
                        )}
                    </p>

                    {activeFilterCount > 0 && (
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-500"
                        >
                            <RotateCcw size={16} aria-hidden="true" />
                            Reset filters ({activeFilterCount})
                        </button>
                    )}
                </div>
            </section>

            {/* Results */}
            {filteredPatients.length === 0 ? (
                <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-slate-200">
                    <p className="text-sm font-semibold text-slate-800">
                        No patients match your search or filters.
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                        Try a different keyword or reset the filters.
                    </p>
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
                    >
                        <RotateCcw size={16} aria-hidden="true" />
                        Reset filters
                    </button>
                </div>
            ) : (
                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {visiblePatients.map((patient, index) => (
                        <PatientCard
                            key={patient._id ?? patient.id ?? `${startIndex}-${index}`}
                            patient={patient}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </section>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <nav
                    aria-label="Pagination"
                    className="flex flex-wrap items-center justify-center gap-2"
                >
                    <button
                        type="button"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronLeft size={16} aria-hidden="true" />
                        Previous
                    </button>

                    {getPageNumbers(currentPage, totalPages).map((item, index) =>
                        item === "..." ? (
                            <span
                                key={`gap-${index}`}
                                aria-hidden="true"
                                className="px-1 text-slate-400"
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={item}
                                type="button"
                                onClick={() => goToPage(item)}
                                aria-label={`Page ${item}`}
                                aria-current={item === currentPage ? "page" : undefined}
                                className={`min-w-10 rounded-lg px-3 py-2 text-sm font-semibold transition ${item === currentPage
                                    ? "bg-teal-600 text-white"
                                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                                    }`}
                            >
                                {item}
                            </button>
                        )
                    )}

                    <button
                        type="button"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Next
                        <ChevronRight size={16} aria-hidden="true" />
                    </button>
                </nav>
            )}
        </div>
    );
}