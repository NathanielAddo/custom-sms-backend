//app.ts
import { createServer } from "./config/server";
import { initializeDatabase } from "./config/data-source";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5130;

const startServer = async () => {
  await initializeDatabase();
  
  const app = createServer();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch(error => {
  console.error("Failed to start server:", error);
  process.exit(1);
});