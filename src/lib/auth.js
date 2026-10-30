
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "@/db";
import { jwt } from "better-auth/plugins";

export const auth = betterAuth({
    database: mongodbAdapter(client.db("DoctorTracker")),

    baseURL: process.env.BETTER_AUTH_URL,

    trustedOrigins: [
        "http://localhost:3000",
        "https://doctor-tracker-client-seven.vercel.app",
    ],

    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        jwt()
    ],
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 7 * 24 * 60 * 60
        }

    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "Admin",
                input: true,
            },
        },
    },
});
