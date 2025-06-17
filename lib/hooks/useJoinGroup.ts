import { useMutation, useQueryClient } from "@tanstack/react-query";

interface JoinGroupParams {
    group_id: string;
}

interface ErrorResponse {
    message: string;
    error?: string;
}

export function useJoinGroup() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (params: JoinGroupParams) => {
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

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
        },
    });
} 