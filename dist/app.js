"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./config/server");
const data_source_1 = require("./config/data-source");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5130;
const startServer = async () => {
    await (0, data_source_1.initializeDatabase)();
    const app = (0, server_1.createServer)();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
startServer().catch(error => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
