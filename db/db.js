import { Client } from "pg";

const dbClient = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "19721892",
  database: "pressure_vessel_registry",
});

export default dbClient;
