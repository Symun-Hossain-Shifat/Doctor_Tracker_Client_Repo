import Patientpage from "@/Components/AllpatientShow"

import { Getallpatient } from "@/lib/Action/GetData/Getpatient"

export default async function PatientPage() {
    const patients = await Getallpatient()

    return (

        <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <Patientpage patients={patients}></Patientpage>


        </main>
    )
}

