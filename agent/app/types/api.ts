export type AgentRequest = { userMessage: string };

export type AgentResponse = {
  response?: string;
  error?: string;
  qrCode?: string; // Base64 encoded QR code data
};
