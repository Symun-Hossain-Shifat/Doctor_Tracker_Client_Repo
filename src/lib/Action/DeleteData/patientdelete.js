export default async function Deletepatient(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Patiens/${id}`, {
        method: 'DELETE',

    })
    const result = await res.json();
    return result;
}