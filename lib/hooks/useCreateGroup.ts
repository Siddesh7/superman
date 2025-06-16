import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateGroupParams {
    name: string;
    target_amount: number;
    max_members: number;
    created_by: string;
    purchase_item: string;
}

export function useCreateGroup() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (params: CreateGroupParams) => {
            const response = await fetch("/api/group/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error("Failed to create group");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
        },
    });
} 