import { Client } from "https://deno.land/x/postgres/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

// Create a new client
const uri = config().POSTGRES_URI;
const client = new Client(uri);

// Connect it
await client.connect();

export default client;
