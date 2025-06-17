import mongoose, { Schema, Document } from "mongoose";

export interface IMembership extends Document {
  membershipId: string;
  buyerAddresses: string[];
  startDate: Date;
  endDate: Date;
  duration: number; // in days
  isActive: boolean;
  paymentVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  purchasedBy: string; // main buyer address
  requestIp?: string;
}

const MembershipSchema: Schema = new Schema(
  {
    membershipId: {
      type: String,
      required: true,
      unique: true,
    },
    buyerAddresses: [
      {
        type: String,
        required: true,
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    paymentVerified: {
      type: Boolean,
      default: false,
    },
    purchasedBy: {
      type: String,
      required: true,
    },
    requestIp: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Add indexes for better query performance
MembershipSchema.index({ membershipId: 1 });
MembershipSchema.index({ buyerAddresses: 1 });
MembershipSchema.index({ purchasedBy: 1 });
MembershipSchema.index({ startDate: 1, endDate: 1 });
MembershipSchema.index({ isActive: 1 });
MembershipSchema.index({ createdAt: -1 });

// Virtual field to check if membership is currently valid
MembershipSchema.virtual("isValid").get(function (this: IMembership) {
  const now = new Date();
  return (
    this.isActive &&
    this.paymentVerified &&
    now >= this.startDate &&
    now <= this.endDate
  );
});

// Method to check if an address is authorized for this membership
MembershipSchema.methods.isAuthorizedAddress = function (
  this: IMembership,
  address: string
): boolean {
  return this.buyerAddresses.includes(address) || this.purchasedBy === address;
};

export const Membership = mongoose.model<IMembership>(
  "Membership",
  MembershipSchema
);
