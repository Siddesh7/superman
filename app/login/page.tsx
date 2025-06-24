"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Chrome, Mail, Lock } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useWallet } from "@/lib/hooks/useWallet";
import { useUser } from "@/lib/hooks/useUser";
import { useCreateUser } from "@/lib/hooks/useCreateUser";
import { useRouter } from "next/navigation";

type OnboardingStep =
  | "loginProcess"
  | "checkingUser"
  | "creatingUser"
  | "completed";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [onboardingStep, setOnboardingStep] =
    useState<OnboardingStep>("loginProcess");

  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    data: walletData,
    isLoading: isWalletLoading,
    error: walletError,
    refetch: refetchWallet,
  } = useWallet(session?.user?.id);

  const {
    data: existingUser,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useUser(walletData?.account.address);

  const createUserMutation = useCreateUser();

  const onboardUser = async () => {
    try {
      console.log("Wallet data inside useEffect >>>", walletData);

      if (!session || !walletData?.account?.address || isUserLoading) {
        console.log("Missing required data:", {
          session,
          walletData,
          isUserLoading,
        });
        return;
      }

      setOnboardingStep("checkingUser");

      if (!existingUser) {
        setOnboardingStep("creatingUser");
        await createUserMutation.mutateAsync({
          userId: session.user.id,
          walletAddress: walletData.account.address,
          email: session.user?.email,
          name: session.user?.name,
        });
      }

      await refetchUser();
      setOnboardingStep("completed");
      router.push("/groups");
    } catch (error) {
      console.error("Error during onboarding:", error);
      setOnboardingStep("loginProcess");
    }
  };

  useEffect(() => {
    if (status === "authenticated" && !isWalletLoading && !isUserLoading) {
      onboardUser();
    }
  }, [
    status,
    session,
    walletData?.account?.address,
    isWalletLoading,
    isUserLoading,
  ]);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-10">
      <div className="w-full max-w-md">
        <div className="glass rounded-3xl p-8 animate-fade-in border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 animate-glow">
              <Chrome className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-white/70">Join the fitness community</p>
          </div>

          {onboardingStep === "loginProcess" && (
            <>
              <form className="space-y-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 glass border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10 glass border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3"
                  size="lg"
                  disabled
                >
                  Sign In
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/60">
                    Or continue with email
                  </span>
                </div>
              </div>
            </>
          )}

          <Button
            className={`w-full ${
              onboardingStep === "loginProcess"
                ? "bg-white hover:bg-gray-100 text-gray-900"
                : "bg-gray-400 cursor-not-allowed"
            } font-semibold py-3 mb-6 transition-all duration-300 ${
              onboardingStep === "loginProcess" ? "hover:scale-105" : ""
            }`}
            size="lg"
            onClick={() => signIn("google")}
            disabled={onboardingStep !== "loginProcess"}
          >
            <Chrome className="w-5 h-5 mr-3" />
            {onboardingStep === "loginProcess" && "Continue with Google"}
            {onboardingStep === "checkingUser" && "Checking user account..."}
            {onboardingStep === "creatingUser" && "Creating your account..."}
            {onboardingStep === "completed" && "Account created successfully!"}
          </Button>

          {walletError && (
            <div className="mt-4 text-center">
              <p className="text-red-400 text-sm">
                Error connecting wallet. Please try again.
              </p>
            </div>
          )}

          {createUserMutation.isError && (
            <div className="mt-4 text-center">
              <p className="text-red-400 text-sm">
                Error creating user account. Please try again.
              </p>
            </div>
          )}

          {onboardingStep !== "loginProcess" && (
            <div className="mt-8 text-center text-white">
              {onboardingStep === "checkingUser" && (
                <p className="text-lg animate-pulse flex items-center justify-center">
                  <span className="mr-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                  Checking if user exists...
                </p>
              )}
              {onboardingStep === "creatingUser" && (
                <p className="text-lg animate-pulse flex items-center justify-center">
                  <span className="mr-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                  Creating your user account...
                </p>
              )}
              {onboardingStep === "completed" && (
                <p className="text-lg text-green-400">Onboarding complete!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
