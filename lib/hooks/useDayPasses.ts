import { DayPass } from "@/types/dayPasses";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface DayPassesResponse {
    dayPasses: DayPass[];
}

interface UseDayPassesParams {
    membershipId: string;
    userSessionId: string;
}

export function useDayPasses(params: UseDayPassesParams) {
    const { data: session, status } = useSession();

    return useQuery<DayPassesResponse>({
        queryKey: ['dayPasses', params.membershipId, params.userSessionId],
        queryFn: async () => {
            const searchParams = new URLSearchParams({
                membershipId: params.membershipId,
                userSessionId: params.userSessionId,
            });

            const response = await fetch(`/api/x402/gym/daypass?${searchParams}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to fetch day passes");
            }

            const dayPasses = await response.json();
            console.log("Response from day pass", dayPasses);

            return dayPasses.dayPasses
        },
        enabled: !!params.membershipId && !!params.userSessionId && status === "authenticated" && !!session,
    });
} 