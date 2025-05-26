"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const member_entity_1 = require("../entities/member.entity");
const registration_entity_1 = require("../entities/registration.entity");
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
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
exports.AppDataSource = new typeorm_1.DataSource({
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
    entities: [member_entity_1.Member, registration_entity_1.Registration],
    migrations: [
        "dist/migrations/**/*.js", // Point to compiled JavaScript migrations
    ],
    synchronize: true,
});
const initializeDatabase = async () => {
    try {
        await exports.AppDataSource.initialize();
        console.log("Database connection established");
    }
    catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};
exports.initializeDatabase = initializeDatabase;
