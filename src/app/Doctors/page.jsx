import Getdoctors from "@/lib/Action/GetData/Getdoctor";
import Doctorpage from "./Homepage";
import { requireAuth } from "@/lib/require-auth";
import { authHeader } from "@/lib/Action/GetData/GetToken";



export default async function Homepage() {
    await requireAuth()
    console.log(await authHeader())
    const doctors = await Getdoctors()

    return (
        <div>
            <Doctorpage doctors={doctors}></Doctorpage>
        </div>
    );
} 