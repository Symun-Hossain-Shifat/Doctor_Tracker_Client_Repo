import { Plus } from "lucide-react";

export default function DoctorByIdPage({ params }) {
    return (
        <div>
            <div>
                <h1>DoctorByIdPage</h1>
            </div>
            {/* Floating Add Doctor Button */}
            <div className="fixed bottom-20 right-6 z-50 sm:bottom-10 sm:right-5">
                <button
                    type="button"

                    className="flex items-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-white shadow-lg transition hover:scale-105 hover:bg-teal-700"
                >
                    <Plus size={22} />
                    <span className="text-sm font-semibold">Add patient</span>
                </button>
            </div>
        </div>
    );
}