"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import React from "react";
import Step from "./Step";

const StepChart = () => {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-50 to-slate-100 flex justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-300 shadow-sm hover:shadow-md hover:border-slate-400 transition-all duration-200"
          >
            <ArrowLeft size={18} className="text-slate-700" />
            <span className="text-sm font-medium text-slate-700">Back</span>
          </button>

          <button
            onClick={() => router.push(`/workflow/${id}/runs`)}
            className="flex cursor-pointer items-center justify-center gap-2 px-4 py-2 bg-slate-900 border border-slate-900 text-sm font-medium text-white rounded-xl hover:bg-slate-800 active:scale-95 transition-colors shadow-sm w-full sm:w-auto"
          >
            View Runs
          </button>
        </div>

        {/* Main Canvas Area */}
        <div className="relative bg-white rounded-2xl h-[82vh] shadow-lg border border-slate-200 overflow-hidden">
          {/* Dot Grid Background */}
          <div
            className="absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgb(148 163 184) 1.5px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Content Container */}
          <div className="relative z-10 h-full flex items-center justify-center p-8">
            <Step order={1} workflowId={id as string}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepChart;
