import { authHeader } from "../GetData/GetToken";

export default async function PostPatient(data) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Patiens`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            ...await authHeader()

        },
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result;



}