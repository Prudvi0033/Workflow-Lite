"use client";
import { SignUpButton, useAuth } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/nextjs";
import { Workflow } from "lucide-react";
import { Instrument_Serif, Jost } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const serif = Instrument_Serif({ subsets: ["latin"], weight: ["400"] });
const jost = Jost({ subsets: ["latin"] });

const HeroSection = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/workflow");
    }
  }, [isSignedIn, router]);
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/WorkflowBg5.jpeg"
          alt="bg"
          fill
          className="object-cover select-none"
          priority
        />
      </div>
      <div className="relative  bg-white/5 h-full w-full flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div
          className="z-10 text-[2.8rem] md:text-5xl lg:text-5xl xl:text-[5.5rem] leading-[0.9] text-center max-w-6xl"
          style={{
            color: "oklch(0.985 0 0)",
            textShadow: "0 4px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div className="absolute w-125 h-125 bg-blue-100/10 blur-[180px] rounded-full -z-10" />
          <h1
            style={{
              textShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
            className={`${serif.className} text-gray-900`}
          >
            <span className="block">Transform Your Text</span>
            <span className="flex flex-wrap justify-center gap-x-2 sm:gap-x-4 mt-2">
              <span>effortlessly with</span>
              <span
                style={{
                  color: "white",
                }}
              >
                Workflow Lite
              </span>
            </span>
          </h1>
          <div
            className={`text-[12px] md:text-lg lg:text-xl mt-6 sm:mt-8 ${jost.className} text-gray-700 px-4`}
          >
            <p>Build mini pipelines to process your content.</p>
            <p>Chain transformations and automate your workflow.</p>
          </div>
          {isSignedIn ? (
            <SignUpButton mode="modal">
              <button
                className={`px-5 py-2.5 sm:px-7 sm:py-3 mt-6 sm:mt-8 ${jost.className} rounded-xl text-base sm:text-lg bg-linear-to-r from-cyan-500 to-cyan-400 text-white cursor-pointer border border-cyan-400 hover:-translate-y-1 transition-transform shadow-[inset_0px_2px_6px_-2px_rgba(255,255,255,0.8)]`}
              >
                <span className="flex gap-2 items-center justify-center">
                  <Workflow size={20} />
                  Create Workflow
                </span>
              </button>
            </SignUpButton>
          ) : (
            <SignInButton mode="modal">
              <button
                className={`px-5 py-2.5 sm:px-7 sm:py-3 mt-6 sm:mt-8 ${jost.className} rounded-xl text-base sm:text-lg bg-linear-to-r from-cyan-500 to-cyan-400 text-white cursor-pointer border border-cyan-400 hover:-translate-y-1 transition-transform shadow-[inset_0px_2px_6px_-2px_rgba(255,255,255,0.8)]`}
              >
                <span className="flex gap-2 items-center justify-center">
                  <Workflow size={20} />
                  Create Workflow
                </span>
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
