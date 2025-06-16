import { useMutation, useQueryClient } from "@tanstack/react-query";

interface JoinGroupParams {
    group_id: string;
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

            if (!response.ok) {
                throw new Error("Failed to join group");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
        },
    });
} 