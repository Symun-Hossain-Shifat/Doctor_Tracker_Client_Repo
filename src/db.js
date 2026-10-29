
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;

if (!uri) {
    throw new Error("Please add MONGODB_URL to your environment variables");
}

const client = new MongoClient(uri);

export { client };