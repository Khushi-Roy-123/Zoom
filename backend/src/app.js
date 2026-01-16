import express from "express";
import { createServer } from "node:http";
import { connectToSocket } from "./controllers/socketManager.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

const start = async () => {
    // Start server first
    server.listen(app.get("port"), () => {
        console.log("✅ Server listening on PORT 8000");
    });

    // Then try to connect to MongoDB
    try {
        const connectionDb = await mongoose.connect(process.env.MONGO_URL);
        console.log(`✅ MONGO Connected DB Host: ${connectionDb.connection.host}`);
    } catch (error) {
        console.log("⚠️  MongoDB connection failed:", error.message);
        console.log("📹 Video calls will still work via Socket.io!");
    }
};

start();