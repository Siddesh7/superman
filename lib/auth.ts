import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
    }
}

export const authOptions: NextAuthOptions = {
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub!;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
