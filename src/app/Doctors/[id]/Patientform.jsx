'use client'
import PostPatient from "@/lib/Action/PostData/PostPatient";
import { Loader2, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Today's date in the user's local time, formatted for <input type="date">
const today = () => new Date().toLocaleDateString("en-CA");

const getEmptyForm = () => ({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    condition: "",
    admissionDate: today(),
});

const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200";

function AddPatientModal({ doctorId, onClose }) {
    const router = useRouter();
    const [form, setForm] = useState(getEmptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Close with the Escape key
    useEffect(() => {
        const onKeyDown = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onClose]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const result = await PostPatient({
                ...form,
                age: Number(form.age),
                doctorId,
            });

            if (!result) throw new Error("Request failed");

            onClose();
            router.refresh();
        } catch {
            setError("The patient could not be added. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/60 p-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-patient-title"
                onClick={(e) => e.stopPropagation()}
                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            >
                <div className="flex items-center justify-between">
                    <h2 id="add-patient-title" className="text-xl font-bold text-slate-900">
                        Add new patient
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
                            Patient name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Karim Uddin"
                            className={inputClass}
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="age" className="text-sm font-medium text-slate-700">
                                Age <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                required
                                min="0"
                                max="130"
                                value={form.age}
                                onChange={handleChange}
                                placeholder="35"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label htmlFor="gender" className="text-sm font-medium text-slate-700">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                                Phone
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
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
                                value={form.email}
                                onChange={handleChange}
                                placeholder="patient@example.com"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="address" className="text-sm font-medium text-slate-700">
                            Address
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="House 12, Road 5, Mirpur, Dhaka"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="condition" className="text-sm font-medium text-slate-700">
                            Patient condition
                        </label>
                        <textarea
                            id="condition"
                            name="condition"
                            rows={3}
                            value={form.condition}
                            onChange={handleChange}
                            placeholder="Describe the patient's current condition"
                            className={`${inputClass} resize-y`}
                        />
                    </div>

                    <div>
                        <label htmlFor="admissionDate" className="text-sm font-medium text-slate-700">
                            Admission date
                        </label>
                        <input
                            id="admissionDate"
                            name="admissionDate"
                            type="date"
                            value={form.admissionDate}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    {error && (
                        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {submitting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Adding patient
                            </>
                        ) : (
                            "Add patient"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function AddPatientButton({ doctorId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Floating Add Patient Button */}
            <div className="fixed bottom-20 right-6 z-50 sm:bottom-10 sm:right-5">
                <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-white shadow-lg transition hover:scale-105 hover:bg-teal-700"
                >
                    <Plus size={22} />
                    <span className="text-sm font-semibold">Add patient</span>
                </button>
            </div>

            {showModal && (
                <AddPatientModal doctorId={doctorId} onClose={() => setShowModal(false)} />
            )}
        </>
    );
}