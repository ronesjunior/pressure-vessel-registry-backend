import { Client } from "pg";

const dbClient = new Client({
  host: process.env.DB_HOST, // IP público da instância Cloud SQL
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: false,
});

export default dbClient;
