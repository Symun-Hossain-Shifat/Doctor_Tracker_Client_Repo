import Getdoctors from "@/lib/Action/GetData/Getdoctor";
import Doctorpage from "./Homepage";



export default async function Homepage() {


    const doctors = await Getdoctors()

    return (
        <div>
            <Doctorpage doctors={doctors}></Doctorpage>
        </div>
    );
} 