import DashboardCharts from "@/Components/dashboardchats"
import Getdoctors from "@/lib/Action/GetData/Getdoctor"
import { Getallpatient } from "@/lib/Action/GetData/Getpatient"

import { buildDailySeries, buildPatientsPerDoctor, sumLast } from "@/lib/analytics"
import { requireAuth } from "@/lib/require-auth"

const toArray = (res) => (Array.isArray(res) ? res : res?.data ?? [])

function StatCard({ label, value, color, hint }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
            {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
        </div>
    )
}

export default async function AdminDashboard() {
    await requireAuth()
    const [doctorRes, patientRes] = await Promise.all([Getdoctors(), Getallpatient()])
    const doctors = toArray(doctorRes)
    const patients = toArray(patientRes)

    const daily = buildDailySeries(doctors, patients, 30)
    const perDoctor = buildPatientsPerDoctor(doctors, patients)

    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <header>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-sm text-gray-500">Overview of doctors and patients</p>
                </header>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard label="Total Doctors" value={doctors.length} color="text-blue-600" />
                    <StatCard label="Total Patients" value={patients.length} color="text-green-600" />
                    <StatCard
                        label="Patients per Doctor"
                        value={doctors.length ? (patients.length / doctors.length).toFixed(1) : 0}
                        color="text-purple-600"
                    />
                    <StatCard
                        label="New Patients"
                        value={sumLast(daily, "patients", 7)}
                        color="text-orange-600"
                        hint="Last 7 days"
                    />
                </div>

                <DashboardCharts daily={daily} perDoctor={perDoctor} />
            </div>
        </main>
    )
}