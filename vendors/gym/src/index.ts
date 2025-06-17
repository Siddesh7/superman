import express, { Request, Response } from "express";
import { paymentMiddleware } from "x402-express";
import QRCode from "qrcode";
import { connectDB } from "./config/database";
import { Membership } from "./models/membership";
import { Payment } from "./models/payment";
import { DayPass } from "./models/day-pass";

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use((req, res, next) => {
  // Allow all origins including file:// protocol
  const origin = req.headers.origin;
  res.header("Access-Control-Allow-Origin", origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH"
  );
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Expose-Headers", "*");

  // Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
});

app.use(express.json());

// Connect to MongoDB
connectDB();

interface BuyMembershipRequest {
  buyerAddresses: string[];
  startDate: string;
  endDate: string;
  purchasedBy: string;
}

interface GenerateDayPassRequest {
  membershipId: string;
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
    "0x9bfeBd2E81725D7a3282cdB01cD1C3732178E954",
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
      url: "https://x402.org/facilitator",
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
      const { membershipId } = req.body;
      const clientIp = req.ip || req.connection.remoteAddress;

      if (!membershipId) {
        return res.status(400).json({
          status: "error",
          message: "Membership ID is required",
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

      // Check if membership is valid (active, payment verified, within date range)
      const now = new Date();
      const isValid =
        membership.isActive &&
        membership.paymentVerified &&
        now >= membership.startDate &&
        now <= membership.endDate;

      if (!isValid) {
        return res.status(400).json({
          status: "error",
          message: "Membership is not valid or has expired",
          membershipDetails: {
            isActive: membership.isActive,
            paymentVerified: membership.paymentVerified,
            startDate: membership.startDate,
            endDate: membership.endDate,
            currentDate: now,
          },
        });
      }

      const passId = generateDayPassId();
      const validUntil = new Date();
      validUntil.setHours(23, 59, 59, 999); // Valid until end of day

      // Generate QR code data
      const qrData = JSON.stringify({
        passId,
        membershipId,
        issuedDate: now.toISOString(),
        validUntil: validUntil.toISOString(),
        gym: "GYM-MEMBERSHIP-SYSTEM",
      });

      // Generate QR code as base64 string
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
      .select("-requestIp -qrCode")
      .populate("membershipId", "membershipId purchasedBy");

    const total = await DayPass.countDocuments();
    const used = await DayPass.countDocuments({ isUsed: true });

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
  } catch (error) {
    console.error("Error fetching day pass history:", error);
    res.status(500).json({ error: "Failed to fetch day pass history" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Gym Membership System!",
    endpoints: {
      "POST /buy-membership":
        "Purchase a gym membership (protected by x402 - $0.0123)",
      "POST /generate-day-pass":
        "Generate a day pass QR code (protected by x402 - $0.0050)",
      "GET /get-membership-details/:membershipId":
        "Get membership details and history",
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

app.listen(port, () => {
  console.log(
    `🏋️ Gym Membership Server is running on http://localhost:${port}`
  );
});
