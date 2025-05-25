import { DataSource } from "typeorm";
import { Member } from "../entities/member.entity";
import { Registration } from "../entities/registration.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "members_db",
  synchronize: true,
  logging: false,
  entities: [Member, Registration],
  migrations: [],
  subscribers: [],
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