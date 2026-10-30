export default async function Getdoctors() {
    const res = await (fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Doctors`))
    const Data = await res.json()
    return Data;
}