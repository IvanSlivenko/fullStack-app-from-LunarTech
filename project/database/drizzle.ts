import config from "@/lib/config";
import { drizzle } from "drizzle-orm/neon-serverless"; // <-- важливо
import { neon } from "@neondatabase/serverless";

// створюємо серверлес-клієнт
const sql = neon(config.env.databaseUrl);

// передаємо його в drizzle
export const db = drizzle({ client: sql });

