import { authHeader } from "./GetToken";

export default async function GetpatientbyDoctorId(id) {
    const headers = await authHeader();
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Patiens?doctorId=${id}`, {
        headers: headers
    })


    return await result.json()
}

export async function Getallpatient() {
    const headers = await authHeader();
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Patiens`, {
        headers: headers
    })


    return await result.json()
}