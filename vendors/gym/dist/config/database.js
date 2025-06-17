"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gym-membership";
// Configure mongoose for serverless
mongoose_1.default.set("bufferCommands", false);
const connectDB = async () => {
    try {
        // Check if already connected
        if (mongoose_1.default.connection.readyState === 1) {
            console.log("✅ MongoDB already connected");
            return;
        }
        // If connecting, wait for it
        if (mongoose_1.default.connection.readyState === 2) {
            console.log("⏳ MongoDB connection in progress...");
            return;
        }
        await mongoose_1.default.connect(MONGODB_URI, {
            // Optimize for serverless
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            bufferCommands: false,
        });
        console.log("✅ MongoDB connected successfully");
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        // Don't exit in serverless environment, just throw
        throw error;
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    try {
        if (mongoose_1.default.connection.readyState !== 0) {
            await mongoose_1.default.disconnect();
            console.log("✅ MongoDB disconnected successfully");
        }
    }
    catch (error) {
        console.error("❌ MongoDB disconnection error:", error);
    }
};
exports.disconnectDB = disconnectDB;
// Handle connection events
mongoose_1.default.connection.on("connected", () => {
    console.log("🔗 Mongoose connected to MongoDB");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error("❌ Mongoose connection error:", err);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("🔌 Mongoose disconnected");
});
// Handle serverless cleanup
process.on("SIGINT", async () => {
    await (0, exports.disconnectDB)();
    process.exit(0);
});
process.on("SIGTERM", async () => {
    await (0, exports.disconnectDB)();
    process.exit(0);
});
