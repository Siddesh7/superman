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
exports.DayPass = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const DayPassSchema = new mongoose_1.Schema({
    passId: {
        type: String,
        required: true,
        unique: true,
    },
    membershipId: {
        type: String,
        required: true,
        ref: "Membership",
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
}, {
    timestamps: true,
});
// Add indexes for better query performance
DayPassSchema.index({ passId: 1 });
DayPassSchema.index({ membershipId: 1 });
DayPassSchema.index({ issuedDate: -1 });
DayPassSchema.index({ validUntil: 1 });
DayPassSchema.index({ isUsed: 1 });
exports.DayPass = mongoose_1.default.model("DayPass", DayPassSchema);
