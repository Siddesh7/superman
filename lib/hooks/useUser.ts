import { useQuery } from "@tanstack/react-query";

interface User {
    id: string;
    name: string;
    email: string;
    wallet_address: string;
    profile_pic_url: string;
}

export function useUser(userId?: string) {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            if (!userId) return null;
            const response = await fetch(`/api/user?id=${userId}`);
            if (!response.ok) return null;
            return response.json() as Promise<User>;
        },
        enabled: !!userId,
    });
} 