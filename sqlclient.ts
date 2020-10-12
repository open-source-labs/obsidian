import { Client } from "https://deno.land/x/postgres/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

// Create a new client
const config = Deno.env.get('POSTGRES_URI');
const client = new Client(config);

// Connect it
await client.connect();

export default client;
