import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { paymentMiddleware } from "x402-express";
import QRCode from "qrcode";
import { connectDB } from "./config/database";
import { Membership } from "./models/membership";
import { Payment } from "./models/payment";
import { DayPass } from "./models/day-pass";

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS to allow all origins and methods
app.use(
  cors({
    origin: true, // Allow all origins
    credentials: true, // Allow credentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"],
    allowedHeaders: ["*"],
    exposedHeaders: ["*"],
  })
);

app.use(express.json());

// Connect to MongoDB (handle serverless connection)
let isConnected = false;
const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  try {
    await connectDB();
    isConnected = true;
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

// Middleware to ensure database connection
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

interface BuyMembershipRequest {
  buyerAddresses: string[];
  startDate: string;
  endDate: string;
  purchasedBy: string;
}

interface GenerateDayPassRequest {
  membershipId: string;
  walletAddress: string;
}

interface X402PaymentPayload {
  paymentId: string;
  amount: string;
  network: string;
  recipient: string;
  facilitator: string;
  signature?: string;
  timestamp: number;
}

interface PaymentResponse {
  status: "success" | "error";
  message: string;
  paymentDetails?: {
    verified: boolean;
    amount: string;
    recipient: string;
    network: string;
  };
}

// Configure x402 middleware for protected endpoints
app.use(
  paymentMiddleware(
    (process.env.X402_RECIPIENT_ADDRESS ||
      "0x9bfeBd2E81725D7a3282cdB01cD1C3732178E954") as `0x${string}`,
    {
      "POST /buy-membership": {
        price: "$0.001",
        network: "base-sepolia",
      },
      "POST /generate-day-pass": {
        price: "$0.0031",
        network: "base-sepolia",
      },
    },
    {
      url: (process.env.X402_FACILITATOR_URL ||
        "https://x402.org/facilitator") as `${string}://${string}`,
    }
  )
);

// Generate unique membership ID
function generateMembershipId(): string {
  return `GYM-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;
}

// Generate unique day pass ID
function generateDayPassId(): string {
  return `PASS-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 6)
    .toUpperCase()}`;
}

// Calculate duration in days between two dates
function calculateDuration(startDate: Date, endDate: Date): number {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Serve the API tester HTML page
app.get("/test", (req: Request, res: Response) => {
  try {
    const htmlPath = path.join(__dirname, "../index.html");

    // Check if we're in development or production
    if (fs.existsSync(htmlPath)) {
      res.sendFile(htmlPath);
    } else {
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
  } catch (error) {
    console.error("Error serving test page:", error);
    res.status(500).json({ error: "Failed to serve test page" });
  }
});

app.post(
  "/buy-membership",
  async (req: Request<{}, {}, BuyMembershipRequest>, res: Response) => {
    try {
      console.log("🏋️ Buying membership...");
      console.log("🏋️ Request body:", req.body);
      const { buyerAddresses, startDate, endDate, purchasedBy } = req.body;
      const clientIp = req.ip || req.connection.remoteAddress;

      // Validate required fields
      console.log("🏋️ Buyer addresses:", buyerAddresses);
      if (
        !buyerAddresses ||
        !Array.isArray(buyerAddresses) ||
        buyerAddresses.length === 0
      ) {
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
      const membership = new Membership({
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
    } catch (error) {
      console.error("Error purchasing membership:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to purchase membership",
      });
    }
  }
);

app.post(
  "/generate-day-pass",
  async (req: Request<{}, {}, GenerateDayPassRequest>, res: Response) => {
    try {
      const { membershipId, walletAddress } = req.body;
      const clientIp = req.ip || req.connection.remoteAddress;

      // Validate required fields
      if (!membershipId || !walletAddress) {
        return res.status(400).json({
          status: "error",
          message: "Membership ID and wallet address are required",
        });
      }

      // Check if membership exists and is valid
      const membership = await Membership.findOne({ membershipId });

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

      // Validate that the wallet address is authorized for this membership
      if (!membership.isAuthorizedAddress(walletAddress)) {
        return res.status(403).json({
          status: "error",
          message: "Wallet address is not authorized for this membership",
        });
      }

      const passId = generateDayPassId();
      const validUntil = new Date();
      validUntil.setHours(23, 59, 59, 999); // Valid until end of day

      // Generate QR code data
      const qrData = JSON.stringify({
        passId,
        membershipId,
        walletAddress,
        validUntil: validUntil.toISOString(),
        type: "day-pass",
      });

      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      // Create day pass record
      const dayPass = new DayPass({
        passId,
        membershipId,
        walletAddress,
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
          walletAddress: dayPass.walletAddress,
          qrCode: dayPass.qrCode,
          issuedDate: dayPass.issuedDate,
          validUntil: dayPass.validUntil,
        },
      });
    } catch (error) {
      console.error("Error generating day pass:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to generate day pass",
      });
    }
  }
);

app.get(
  "/get-membership-details/:membershipId",
  async (req: Request, res: Response) => {
    try {
      const { membershipId } = req.params;

      if (!membershipId) {
        return res.status(400).json({
          status: "error",
          message: "Membership ID is required",
        });
      }

      const membership = await Membership.findOne({ membershipId });

      if (!membership) {
        return res.status(404).json({
          status: "error",
          message: "Membership not found",
        });
      }

      const now = new Date();
      const isCurrentlyValid =
        membership.isActive &&
        membership.paymentVerified &&
        now >= membership.startDate &&
        now <= membership.endDate;

      // Get day pass history for this membership
      const dayPasses = await DayPass.find({ membershipId })
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
    } catch (error) {
      console.error("Error getting membership details:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to get membership details",
      });
    }
  }
);

// Admin endpoints for history
app.get("/memberships/history", async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const memberships = await Membership.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select("-requestIp");

    const total = await Membership.countDocuments();
    const active = await Membership.countDocuments({ isActive: true });

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
  } catch (error) {
    console.error("Error fetching membership history:", error);
    res.status(500).json({ error: "Failed to fetch membership history" });
  }
});

app.get("/day-passes/history", async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const dayPasses = await DayPass.find()
      .sort({ issuedDate: -1 })
      .limit(limit)
      .skip(skip)
      .select("-requestIp -qrCode");

    // Manually join membership data
    const dayPassesWithMembership = await Promise.all(
      dayPasses.map(async (dayPass) => {
        const membership = await Membership.findOne({
          membershipId: dayPass.membershipId,
        }).select("membershipId purchasedBy");

        return {
          ...dayPass.toObject(),
          membership: membership
            ? {
                membershipId: membership.membershipId,
                purchasedBy: membership.purchasedBy,
              }
            : null,
        };
      })
    );

    const total = await DayPass.countDocuments();
    const used = await DayPass.countDocuments({ isUsed: true });

    res.json({
      dayPasses: dayPassesWithMembership,
      stats: {
        total,
        used,
        unused: total - used,
      },
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: dayPassesWithMembership.length,
      },
    });
  } catch (error) {
    console.error("Error fetching day pass history:", error);
    res.status(500).json({ error: "Failed to fetch day pass history" });
  }
});

// Get day passes for a specific membership
app.get(
  "/memberships/:membershipId/day-passes",
  async (req: Request, res: Response) => {
    try {
      const { membershipId } = req.params;
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 1;
      const skip = (page - 1) * limit;

      if (!membershipId) {
        return res.status(400).json({
          status: "error",
          message: "Membership ID is required",
        });
      }

      // Check if membership exists
      const membership = await Membership.findOne({ membershipId });
      if (!membership) {
        return res.status(404).json({
          status: "error",
          message: "Membership not found",
        });
      }

      // Get day passes for this membership
      const dayPasses = await DayPass.find({ membershipId })
        .sort({ issuedDate: -1 })
        .limit(limit)
        .skip(skip)
        .select("-requestIp"); // Exclude sensitive data

      const total = await DayPass.countDocuments({ membershipId });
      const used = await DayPass.countDocuments({ membershipId, isUsed: true });

      // Check if membership is currently valid
      const now = new Date();
      const isCurrentlyValid =
        membership.isActive &&
        membership.paymentVerified &&
        now >= membership.startDate &&
        now <= membership.endDate;

      res.json({
        status: "success",
        membership: {
          membershipId: membership.membershipId,
          purchasedBy: membership.purchasedBy,
          startDate: membership.startDate,
          endDate: membership.endDate,
          isActive: membership.isActive,
          isCurrentlyValid,
        },
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
    } catch (error) {
      console.error("Error fetching day passes for membership:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to fetch day passes for membership",
      });
    }
  }
);

// Get day passes for a specific membership and wallet address
app.get(
  "/memberships/:membershipId/wallet/:walletAddress/day-passes",
  async (req: Request, res: Response) => {
    try {
      const { membershipId, walletAddress } = req.params;
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 1;
      const skip = (page - 1) * limit;

      if (!membershipId || !walletAddress) {
        return res.status(400).json({
          status: "error",
          message: "Membership ID and wallet address are required",
        });
      }

      // Check if membership exists
      const membership = await Membership.findOne({ membershipId });
      if (!membership) {
        return res.status(404).json({
          status: "error",
          message: "Membership not found",
        });
      }

      // Validate that the wallet address is authorized for this membership
      if (!membership.isAuthorizedAddress(walletAddress)) {
        return res.status(403).json({
          status: "error",
          message: "Wallet address is not authorized for this membership",
        });
      }

      // Get day passes for this membership and wallet address
      const dayPasses = await DayPass.find({ membershipId, walletAddress })
        .sort({ issuedDate: -1 })
        .limit(limit)
        .skip(skip)
        .select("-requestIp"); // Exclude sensitive data

      const total = await DayPass.countDocuments({
        membershipId,
        walletAddress,
      });
      const used = await DayPass.countDocuments({
        membershipId,
        walletAddress,
        isUsed: true,
      });

      // Check if membership is currently valid
      const now = new Date();
      const isCurrentlyValid =
        membership.isActive &&
        membership.paymentVerified &&
        now >= membership.startDate &&
        now <= membership.endDate;

      res.json({
        status: "success",
        membership: {
          membershipId: membership.membershipId,
          purchasedBy: membership.purchasedBy,
          startDate: membership.startDate,
          endDate: membership.endDate,
          isActive: membership.isActive,
          isCurrentlyValid,
        },
        walletAddress,
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
    } catch (error) {
      console.error(
        "Error fetching day passes for membership and wallet:",
        error
      );
      res.status(500).json({
        status: "error",
        message: "Failed to fetch day passes for membership and wallet",
      });
    }
  }
);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Gym Membership System!",
    endpoints: {
      "GET /test": "API Testing Interface (Web UI)",
      "POST /buy-membership":
        "Purchase a gym membership (protected by x402 - $0.0123)",
      "POST /generate-day-pass":
        "Generate a day pass QR code (protected by x402 - $0.0050)",
      "GET /get-membership-details/:membershipId":
        "Get membership details and history",
      "GET /memberships/:membershipId/day-passes":
        "Get all day passes for a specific membership",
      "GET /memberships/:membershipId/wallet/:walletAddress/day-passes":
        "Get day passes for a specific membership and wallet address",
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
    console.log(
      `🏋️ Gym Membership Server is running on http://localhost:${port}`
    );
  });
}

// Export for Vercel
export default app;
