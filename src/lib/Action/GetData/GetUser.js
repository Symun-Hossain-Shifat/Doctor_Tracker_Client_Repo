import { auth } from "@/lib/auth";
import { headers } from "next/headers";




export const GetUserInserver = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const User = session?.user;
    return User
}

