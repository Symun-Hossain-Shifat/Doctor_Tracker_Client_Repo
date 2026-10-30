"use client";

import { X } from "lucide-react";

const inputClass =
    "mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20";

export default function EditPatientModal({ onClose }) {
    return (
        <div
            className="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">Edit Patient</h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form className="mt-5 space-y-4">
                    {/* Patient Name */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">Patient Name</label>
                        <input type="text" placeholder="Enter patient name" className={inputClass} />
                    </div>

                    {/* Age & Gender */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Age</label>
                            <input type="number" placeholder="Enter age" className={inputClass} />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Gender</label>
                            <select className={inputClass} defaultValue="">
                                <option value="" disabled>Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Phone & Email */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Phone</label>
                            <input type="tel" placeholder="Enter phone number" className={inputClass} />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Email</label>
                            <input type="email" placeholder="Enter email" className={inputClass} />
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">Address</label>
                        <input type="text" placeholder="Enter address" className={inputClass} />
                    </div>

                    {/* Condition */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">Patient Condition</label>
                        <textarea
                            rows={3}
                            placeholder="Describe patient's condition"
                            className={`${inputClass} resize-y`}
                        />
                    </div>

                    {/* Admission Date */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">Admission Date</label>
                        <input type="date" className={inputClass} />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
                        >
                            Update Patient
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}