import { Client } from "https://deno.land/x/postgres/mod.ts";

// Create a new client
const config = "postgres://zjxjnswd:Wh7KJIyXiEy5QyhzXUMK38ykEtYH_9QZ@lallah.db.elephantsql.com:5432/zjxjnswd";
const client = new Client(config);

// Connect it
await client.connect();

export default client;
