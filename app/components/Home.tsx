"use client";

import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/workflow");
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      {!isSignedIn && (
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-black text-white rounded">
            Sign In
          </button>
        </SignInButton>
      )}
    </div>
  );
}
