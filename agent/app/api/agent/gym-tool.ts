import { z } from "zod";

/**
 * Gym Tool for handling gym day pass creation
 *
 * Calls the Superman AI gym API to create day passes when users express intent to go to the gym
 */

interface UserApiResponse {
  user: {
    id: string;
    email: string;
    name: string;
    wallet_address: string;
    profile_pic_url: string | null;
    created_at: string;
  };
  createdGroups: Array<{
    id: string;
    name: string;
    target_amount: number;
    max_members: number;
    status: string;
    created_by: string;
    purchase_item: string;
    created_at: string;
    membership_id: string;
  }>;
  joinedGroups: Array<{
    id: string;
    name: string;
    status: string;
    created_at: string;
    created_by: string;
    max_members: number;
    membership_id: string;
    purchase_item: string;
    target_amount: number;
  }>;
}

interface GymDayPassRequest {
  userSessionId: string;
  membershipId: string;
  walletAddress: string;
}

interface GymDayPassResponse {
  success: boolean;
  data?: {
    paymentResponse: {
      success: boolean;
      transaction: string;
      network: string;
      payer: string;
    };
    dayPass: {
      passId: string;
      membershipId: string;
      walletAddress: string;
      qrCode: string;
      issuedDate: string;
      validUntil: string;
    };
  };
  error?: string;
}

/**
 * Creates a transaction explorer link based on network (currently unused)
 * @param transactionHash - The transaction hash
 * @param network - The network name
 * @returns Explorer URL for the transaction
 */
// function getTransactionExplorerLink(
//   transactionHash: string,
//   network: string
// ): string {
//   const explorers: { [key: string]: string } = {
//     "base-sepolia": "https://sepolia.basescan.org/tx/",
//     "base-mainnet": "https://basescan.org/tx/",
//     base: "https://basescan.org/tx/",
//     ethereum: "https://etherscan.io/tx/",
//     "ethereum-mainnet": "https://etherscan.io/tx/",
//     "ethereum-sepolia": "https://sepolia.etherscan.io/tx/",
//   };

//   const explorerUrl = explorers[network] || explorers["base-sepolia"];
//   return `${explorerUrl}${transactionHash}`;
// }

/**
 * Fetches user data from Superman AI API
 * @param walletAddress - The wallet address to lookup
 * @returns User data with groups and membership information
 */
async function fetchUserData(walletAddress: string): Promise<UserApiResponse> {
  console.log("fetching user data", walletAddress);
  const userApiUrl = `https://supermanai.vercel.app/api/user?wallet_address=${encodeURIComponent(
    walletAddress
  )}`;

  try {
    console.log("userApiUrl", userApiUrl);
    const response = await fetch(userApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response", response);
    if (!response.ok) {
      throw new Error(
        `User API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch user data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Finds the first available membership ID from user's groups
 * @param userData - User data from API
 * @returns Membership ID from created or joined groups
 */
function findMembershipId(userData: UserApiResponse): string {
  // Check created groups first
  if (userData.createdGroups && userData.createdGroups.length > 0) {
    for (const group of userData.createdGroups) {
      if (group.membership_id) {
        return group.membership_id;
      }
    }
  }

  // Check joined groups
  if (userData.joinedGroups && userData.joinedGroups.length > 0) {
    for (const group of userData.joinedGroups) {
      if (group.membership_id) {
        return group.membership_id;
      }
    }
  }

  throw new Error("No membership ID found in user's groups");
}

/**
 * Creates a gym day pass by calling the Superman AI API
 * @param params - The gym day pass parameters
 * @returns Response from the gym API
 */
async function createGymDayPass(
  params: GymDayPassRequest
): Promise<GymDayPassResponse> {
  const apiUrl = "https://supermanai.vercel.app/api/x402/gym/daypass/create";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(
        `Gym API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create gym day pass",
    };
  }
}

/**
 * Gym tool schema for Vercel AI SDK
 */
export const gymToolSchema = z.object({
  walletAddress: z
    .string()
    .describe("The wallet address to lookup user data and create gym day pass"),
});

/**
 * Gym tool definition for Vercel AI SDK
 */
export const gymTool = {
  description:
    "Create a gym day pass when user expresses intent to go to the gym (e.g., 'I wanna hit gym today', 'book gym', 'gym session')",
  parameters: gymToolSchema,
  execute: async ({ walletAddress }: z.infer<typeof gymToolSchema>) => {
    try {
      // Step 1: Fetch user data from Superman AI API
      const userData = await fetchUserData(walletAddress);

      // Step 2: Find membership ID from user's groups
      const membershipId = findMembershipId(userData);

      // Step 3: Create gym day pass using fetched data
      const result = await createGymDayPass({
        userSessionId: userData.user.id, // Use user ID as session ID
        membershipId: membershipId,
        walletAddress: walletAddress,
      });

      if (result.success && result.data) {
        const { dayPass } = result.data;

        // Format dates for better readability (not used in current message)
        // const issuedDate = new Date(dayPass.issuedDate).toLocaleString();
        // const validUntil = new Date(dayPass.validUntil).toLocaleString();

        // Create transaction explorer link (not used in current message)
        // const transactionLink = getTransactionExplorerLink(
        //   paymentResponse.transaction,
        //   paymentResponse.network
        // );

        return {
          success: true,
          data: result.data,
          qrCode: dayPass.qrCode,
          message: `yo ${userData.user.name} you got it, heres your day pass code

i paid $1 from your wallet and got your pass`,
        };
      } else {
        return {
          success: false,
          error: result.error || "Failed to create gym day pass",
        };
      }
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error occurred while booking gym",
      };
    }
  },
};
