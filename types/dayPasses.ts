export type DayPass = {
    passId: string;
    membershipId: string;
    qrCode: string;
    issuedDate: string;
    validUntil: string;
    isUsed: boolean;
    usedAt?: string;
    createdAt: string;
    requestIp?: string;
}