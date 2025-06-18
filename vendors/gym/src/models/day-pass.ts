import mongoose, { Schema, Document } from "mongoose";

export interface IDayPass extends Document {
  passId: string;
  membershipId: string;
  walletAddress: string;
  qrCode: string;
  issuedDate: Date;
  validUntil: Date;
  isUsed: boolean;
  usedAt?: Date;
  createdAt: Date;
  requestIp?: string;
}

const DayPassSchema: Schema = new Schema(
  {
    passId: {
      type: String,
      required: true,
      unique: true,
    },
    membershipId: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String,
      required: true,
    },
    issuedDate: {
      type: Date,
      default: Date.now,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    usedAt: {
      type: Date,
    },
    requestIp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
DayPassSchema.index({ passId: 1 });
DayPassSchema.index({ membershipId: 1 });
DayPassSchema.index({ walletAddress: 1 });
DayPassSchema.index({ membershipId: 1, walletAddress: 1 });
DayPassSchema.index({ issuedDate: -1 });
DayPassSchema.index({ validUntil: 1 });
DayPassSchema.index({ isUsed: 1 });

export const DayPass = mongoose.model<IDayPass>("DayPass", DayPassSchema);
