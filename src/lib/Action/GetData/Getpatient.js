export default async function GetpatientbyDoctorId(id) {
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Patiens?doctorId=${id}`)


    return await result.json()
}

export async function Getallpatient() {
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Patiens`)


    return await result.json()
}