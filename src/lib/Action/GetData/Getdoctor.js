import { authHeader } from "./GetToken";


export default async function Getdoctors() {
    const headers = await authHeader();
    const res = await (fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Doctors`, {
        headers: headers
    }))
    const Data = await res.json()
    return Data;
}