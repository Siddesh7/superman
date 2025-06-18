import { useMutation, useQueryClient } from "@tanstack/react-query";

interface JoinGroupParams {
    group_id: string;
    recipientWallet: string;
    amount: string;
}

interface GroupMember {
    id: string;
    group_id: string;
    user_id: string;
    payment_amount: string;
    has_paid: boolean;
    created_at: string;
}

interface JoinGroupResponse {
    message: string;
    groupMember: GroupMember;
}

interface ErrorResponse {
    message: string;
    error?: string;
}

export function useJoinGroup(onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (params: JoinGroupParams): Promise<JoinGroupResponse> => {
            const response = await fetch("/api/group/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorData = data as ErrorResponse;
                throw new Error(errorData.message || errorData.error || "Failed to join group");
            }

            return data as JoinGroupResponse;
        },
        onSuccess: (data, variables) => {
            // Invalidate the groups list
            queryClient.invalidateQueries({ queryKey: ['groups'] });

            // Invalidate the specific group query
            queryClient.invalidateQueries({ queryKey: ['group', variables.group_id] });

            // Call the optional callback
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        },
    });
} 