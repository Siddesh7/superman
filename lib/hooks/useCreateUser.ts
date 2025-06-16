import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateUserParams {
    userId: string;
    name?: string;
    email?: string;
    walletAddress: string;
    profilePicUrl?: string;
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId, name, email, walletAddress, profilePicUrl }: CreateUserParams) => {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: userId,
                    name,
                    email,
                    wallet_address: walletAddress,
                    profile_pic_url: profilePicUrl,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            return response.json();
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
        },
    });
} 