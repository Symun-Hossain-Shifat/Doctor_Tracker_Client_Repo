
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "@/db";

export const auth = betterAuth({
    database: mongodbAdapter(client.db("DoctorTracker")),

    emailAndPassword: {
        enabled: true,
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