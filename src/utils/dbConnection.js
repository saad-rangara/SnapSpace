import pg from "pg";

export default function connect() {
  const dbConnectionString = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const db = new pg.Pool({
    connectionString: dbConnectionString,
  });
  return db;
}

export const db = connect();
