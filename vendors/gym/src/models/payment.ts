import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  paymentId: string;
  amount: string;
  network: string;
  recipient: string;
  facilitator?: string;
  signature?: string;
  timestamp: number;
  verified: boolean;
  createdAt: Date;
  requestIp?: string;
}

const PaymentSchema: Schema = new Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: String,
    required: true,
  },
  network: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  facilitator: {
    type: String,
  },
  signature: {
    type: String,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  requestIp: {
    type: String,
  },
});

// Add indexes for better query performance
PaymentSchema.index({ paymentId: 1 });
PaymentSchema.index({ createdAt: -1 });
PaymentSchema.index({ verified: 1 });
PaymentSchema.index({ recipient: 1 });

export const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
