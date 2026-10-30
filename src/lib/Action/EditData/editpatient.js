
export default async function editpatient(id, Data) {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/Patiens/${id}`;

    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Patient update failed");
    }

    return result;
}
