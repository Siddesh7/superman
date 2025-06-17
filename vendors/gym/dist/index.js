"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const x402_express_1 = require("x402-express");
const qrcode_1 = __importDefault(require("qrcode"));
const database_1 = require("./config/database");
const membership_1 = require("./models/membership");
const day_pass_1 = require("./models/day-pass");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Enable CORS for all routes
app.use((req, res, next) => {
    // Allow all origins including file:// protocol
    const origin = req.headers.origin;
    res.header("Access-Control-Allow-Origin", origin || "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "*");
    // Handle preflight OPTIONS requests
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    next();
});
app.use(express_1.default.json());
// Connect to MongoDB (handle serverless connection)
let isConnected = false;
const connectToDatabase = async () => {
    if (isConnected) {
        return;
    }
    try {
        await (0, database_1.connectDB)();
        isConnected = true;
    }
    catch (error) {
        console.error("Database connection error:", error);
    }
};
// Middleware to ensure database connection
app.use(async (req, res, next) => {
    await connectToDatabase();
    next();
});
// Configure x402 middleware for protected endpoints
app.use((0, x402_express_1.paymentMiddleware)((process.env.X402_RECIPIENT_ADDRESS ||
    "0x9bfeBd2E81725D7a3282cdB01cD1C3732178E954"), {
    "POST /buy-membership": {
        price: "$0.001",
        network: "base-sepolia",
    },
    "POST /generate-day-pass": {
        price: "$0.0031",
        network: "base-sepolia",
    },
}, {
    url: (process.env.X402_FACILITATOR_URL ||
        "https://x402.org/facilitator"),
}));
// Generate unique membership ID
function generateMembershipId() {
    return `GYM-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;
}
// Generate unique day pass ID
function generateDayPassId() {
    return `PASS-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 6)
        .toUpperCase()}`;
}
// Calculate duration in days between two dates
function calculateDuration(startDate, endDate) {
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}
// Serve the API tester HTML page
app.get("/test", (req, res) => {
    try {
        const htmlPath = path_1.default.join(__dirname, "../index.html");
        // Check if we're in development or production
        if (fs_1.default.existsSync(htmlPath)) {
            res.sendFile(htmlPath);
        }
        else {
            // For production, serve the HTML content directly
            res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API Tester - Unavailable</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                .container { max-width: 600px; margin: 0 auto; }
                .error { background: #f8d7da; color: #721c24; padding: 20px; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>API Tester Unavailable</h1>
                <div class="error">
                    <p>The API testing interface is not available in this environment.</p>
                    <p>Please access the API endpoints directly using curl or your preferred HTTP client.</p>
                </div>
                <h2>Available Endpoints:</h2>
                <ul style="text-align: left;">
                    <li>GET / - Welcome message</li>
                    <li>POST /buy-membership - Purchase membership (Protected)</li>
                    <li>POST /generate-day-pass - Generate day pass (Protected)</li>
                    <li>GET /get-membership-details/:id - Get membership info</li>
                    <li>GET /memberships/history - Admin: membership history</li>
                    <li>GET /day-passes/history - Admin: day pass history</li>
                </ul>
            </div>
        </body>
        </html>
      `);
        }
    }
    catch (error) {
        console.error("Error serving test page:", error);
        res.status(500).json({ error: "Failed to serve test page" });
    }
});
app.post("/buy-membership", async (req, res) => {
    try {
        console.log("🏋️ Buying membership...");
        console.log("🏋️ Request body:", req.body);
        const { buyerAddresses, startDate, endDate, purchasedBy } = req.body;
        const clientIp = req.ip || req.connection.remoteAddress;
        // Validate required fields
        console.log("🏋️ Buyer addresses:", buyerAddresses);
        if (!buyerAddresses ||
            !Array.isArray(buyerAddresses) ||
            buyerAddresses.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "Buyer addresses array is required and cannot be empty",
            });
        }
        if (!startDate || !endDate || !purchasedBy) {
            return res.status(400).json({
                status: "error",
                message: "Start date, end date, and purchasedBy are required",
            });
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        // Validate dates
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({
                status: "error",
                message: "Invalid date format",
            });
        }
        if (end <= start) {
            return res.status(400).json({
                status: "error",
                message: "End date must be after start date",
            });
        }
        const membershipId = generateMembershipId();
        const duration = calculateDuration(start, end);
        // Create membership record
        const membership = new membership_1.Membership({
            membershipId,
            buyerAddresses,
            startDate: start,
            endDate: end,
            duration,
            purchasedBy,
            paymentVerified: true, // Assume payment is verified via x402 middleware
            requestIp: clientIp,
        });
        await membership.save();
        res.status(201).json({
            status: "success",
            message: "Membership purchased successfully",
            membership: {
                membershipId: membership.membershipId,
                buyerAddresses: membership.buyerAddresses,
                startDate: membership.startDate,
                endDate: membership.endDate,
                duration: membership.duration,
                purchasedBy: membership.purchasedBy,
                isActive: membership.isActive,
            },
        });
    }
    catch (error) {
        console.error("Error purchasing membership:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to purchase membership",
        });
    }
});
app.post("/generate-day-pass", async (req, res) => {
    try {
        const { membershipId } = req.body;
        const clientIp = req.ip || req.connection.remoteAddress;
        // Validate membership ID
        if (!membershipId) {
            return res.status(400).json({
                status: "error",
                message: "Membership ID is required",
            });
        }
        // Check if membership exists and is valid
        const membership = await membership_1.Membership.findOne({ membershipId });
        if (!membership) {
            return res.status(404).json({
                status: "error",
                message: "Membership not found",
            });
        }
        if (!membership.isActive || !membership.paymentVerified) {
            return res.status(400).json({
                status: "error",
                message: "Membership is not active or payment not verified",
            });
        }
        // Check if membership is currently valid (within date range)
        const now = new Date();
        if (now < membership.startDate || now > membership.endDate) {
            return res.status(400).json({
                status: "error",
                message: "Membership is not currently valid",
            });
        }
        const passId = generateDayPassId();
        const validUntil = new Date();
        validUntil.setHours(23, 59, 59, 999); // Valid until end of day
        // Generate QR code data
        const qrData = JSON.stringify({
            passId,
            membershipId,
            validUntil: validUntil.toISOString(),
            type: "day-pass",
        });
        const qrCodeDataUrl = await qrcode_1.default.toDataURL(qrData, {
            width: 256,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#FFFFFF",
            },
        });
        // Create day pass record
        const dayPass = new day_pass_1.DayPass({
            passId,
            membershipId,
            qrCode: qrCodeDataUrl,
            validUntil,
            requestIp: clientIp,
        });
        await dayPass.save();
        res.json({
            status: "success",
            message: "Day pass generated successfully",
            dayPass: {
                passId: dayPass.passId,
                membershipId: dayPass.membershipId,
                qrCode: dayPass.qrCode,
                issuedDate: dayPass.issuedDate,
                validUntil: dayPass.validUntil,
            },
        });
    }
    catch (error) {
        console.error("Error generating day pass:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to generate day pass",
        });
    }
});
app.get("/get-membership-details/:membershipId", async (req, res) => {
    try {
        const { membershipId } = req.params;
        if (!membershipId) {
            return res.status(400).json({
                status: "error",
                message: "Membership ID is required",
            });
        }
        const membership = await membership_1.Membership.findOne({ membershipId });
        if (!membership) {
            return res.status(404).json({
                status: "error",
                message: "Membership not found",
            });
        }
        const now = new Date();
        const isCurrentlyValid = membership.isActive &&
            membership.paymentVerified &&
            now >= membership.startDate &&
            now <= membership.endDate;
        // Get day pass history for this membership
        const dayPasses = await day_pass_1.DayPass.find({ membershipId })
            .sort({ issuedDate: -1 })
            .limit(10)
            .select("-qrCode"); // Don't include QR codes in history
        res.json({
            status: "success",
            membership: {
                membershipId: membership.membershipId,
                buyerAddresses: membership.buyerAddresses,
                startDate: membership.startDate,
                endDate: membership.endDate,
                duration: membership.duration,
                purchasedBy: membership.purchasedBy,
                isActive: membership.isActive,
                paymentVerified: membership.paymentVerified,
                isCurrentlyValid,
                createdAt: membership.createdAt,
                updatedAt: membership.updatedAt,
            },
            dayPassHistory: dayPasses,
        });
    }
    catch (error) {
        console.error("Error getting membership details:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to get membership details",
        });
    }
});
// Admin endpoints for history
app.get("/memberships/history", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const memberships = await membership_1.Membership.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .select("-requestIp");
        const total = await membership_1.Membership.countDocuments();
        const active = await membership_1.Membership.countDocuments({ isActive: true });
        res.json({
            memberships,
            stats: {
                total,
                active,
                inactive: total - active,
            },
            pagination: {
                current: page,
                total: Math.ceil(total / limit),
                count: memberships.length,
            },
        });
    }
    catch (error) {
        console.error("Error fetching membership history:", error);
        res.status(500).json({ error: "Failed to fetch membership history" });
    }
});
app.get("/day-passes/history", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const dayPasses = await day_pass_1.DayPass.find()
            .sort({ issuedDate: -1 })
            .limit(limit)
            .skip(skip)
            .select("-requestIp -qrCode")
            .populate("membershipId", "membershipId purchasedBy");
        const total = await day_pass_1.DayPass.countDocuments();
        const used = await day_pass_1.DayPass.countDocuments({ isUsed: true });
        res.json({
            dayPasses,
            stats: {
                total,
                used,
                unused: total - used,
            },
            pagination: {
                current: page,
                total: Math.ceil(total / limit),
                count: dayPasses.length,
            },
        });
    }
    catch (error) {
        console.error("Error fetching day pass history:", error);
        res.status(500).json({ error: "Failed to fetch day pass history" });
    }
});
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Gym Membership System!",
        endpoints: {
            "GET /test": "API Testing Interface (Web UI)",
            "POST /buy-membership": "Purchase a gym membership (protected by x402 - $0.0123)",
            "POST /generate-day-pass": "Generate a day pass QR code (protected by x402 - $0.0050)",
            "GET /get-membership-details/:membershipId": "Get membership details and history",
            "POST /verify-payment": "Verify x402 payment",
            "GET /memberships/history": "Get membership history (admin)",
            "GET /day-passes/history": "Get day pass history (admin)",
        },
        pricing: {
            membership: "$100 USDC/mo on Base Sepolia",
            dayPass: "$3 USDC on Base Sepolia",
        },
    });
});
// For local development
if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
        console.log(`🏋️ Gym Membership Server is running on http://localhost:${port}`);
    });
}
// Export for Vercel
exports.default = app;
