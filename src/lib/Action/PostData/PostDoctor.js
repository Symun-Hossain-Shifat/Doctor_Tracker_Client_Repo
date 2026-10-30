export default async function PostDoctor(data) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Doctors`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',

        },
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result;



}