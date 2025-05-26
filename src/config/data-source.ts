//config/data-source.ts
import { DataSource } from "typeorm";
import { Member } from "../entities/member.entity";
import { Registration } from "../entities/registration.entity";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

console.log("📦 Loaded Environment Variables:");
console.table({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD ? '***' : undefined,
  DB_NAME: process.env.DB_NAME,
});

// Read the CA certificate file
const caCert = fs.readFileSync("ca-certificate.crt"); // Adjust the path to your CA certificate file



export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 25060),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "defaultdb",
  ssl: caCert
    ? {
        rejectUnauthorized: true,
        ca: caCert,
      }
    : undefined,
    entities: [ Member, Registration ],
    migrations: [
      "dist/migrations/**/*.js", // Point to compiled JavaScript migrations
    ],
  synchronize: true,
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};