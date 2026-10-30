import PatientCard from "@/Components/Patientshow";
import AddPatientButton from "./Patientform";
import GetpatientbyDoctorId from "@/lib/Action/GetData/Getpatient";
import { UserPlus } from "lucide-react";

export default async function DoctorByIdPage({ params }) {
    const { id } = await params;
    const Data = await GetpatientbyDoctorId(id);
    const patients = Data ?? [];

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-extrabold text-slate-900">Patients</h1>
                <p className="mt-2 text-slate-600">
                    {patients.length === 0
                        ? "No patients assigned to this doctor yet."
                        : `${patients.length} ${patients.length === 1 ? "patient" : "patients"} assigned to this doctor.`}
                </p>

                {patients.length > 0 ? (
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {patients.map((patient) => (
                            <PatientCard key={patient._id} patient={patient} />
                        ))}
                    </div>
                ) : (
                    /* Empty state: shown when the doctor has 0 patients */
                    <div className="mt-8 rounded-3xl border-2 border-dashed border-teal-200 bg-white px-6 py-16 text-center shadow-sm">
                        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-lg">
                            <UserPlus size={30} />
                        </span>
                        <h2 className="mt-6 text-xl font-bold text-slate-900">No patients yet</h2>
                        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
                            This doctor has no patients so far. Select the{" "}
                            <span className="font-semibold text-teal-700">Add patient</span> button
                            at the bottom right to add the first one.
                        </p>
                    </div>
                )}
            </div>

            {/* Opens the Add patient modal form */}
            <AddPatientButton doctorId={id} />
        </main>
    );
}