import { useQuery } from "@tanstack/react-query";
import { Group } from "@/types/groups";

export function useGroups() {
    return useQuery<Group[]>({
        queryKey: ['groups'],
        queryFn: async () => {
            const response = await fetch("/api/group/all");
            if (!response.ok) {
                throw new Error("Failed to fetch groups");
            }
            return response.json();
        },
    });
} 