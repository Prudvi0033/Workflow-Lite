"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import Step, { StepType } from "./Step";
import axios from "axios";
import { toast } from "react-toastify";

interface StepDataInterface {
  _id: string;
  workflowId: string;
  title: string;
  type: StepType;
  order: number;
}

const StepChart = () => {
  const { id } = useParams();
  const router = useRouter();

  const [stepsLoading, setStepsLoading] = useState(false);
  const [stepData, setStepData] = useState<StepDataInterface[]>([]);
  const [inputText, setInputText] = useState("");
  const [executing, setExecuting] = useState(false);

  useEffect(() => {
    const fetchSteps = async () => {
      setStepsLoading(true);
      try {
        const res = await axios.get(`/api/workflow/${id}/steps`);
        setStepData(res.data.steps);
      } catch (error) {
        console.log("Error in loading steps", error);
        toast.error("Failed to load steps");
      } finally {
        setStepsLoading(false);
      }
    };

    if (id) fetchSteps();
  }, [id]);

  const handleExecute = async () => {
    // ✅ Validation
    if (!inputText.trim()) {
      toast.error("Please enter input text before executing");
      return;
    }

    try {
      setExecuting(true);

      await axios.post(`/api/workflow/${id}/execute`, {
        input: inputText,
      });

      toast.success("Workflow executed successfully");

      // optional: clear textarea
      setInputText("");

      // optional: redirect to runs page
      // router.push(`/workflow/${id}/runs`);
    } catch (error) {
      console.error("Execution error:", error);
      toast.error(error?.response?.data?.message || "Execution failed");
    } finally {
      setExecuting(false);
    }
  };

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
          {/* Background */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgb(148 163 184) 1.5px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col items-center py-14 gap-10">
            {/* Textarea Box */}
            <div className="h-35 w-85 p-1 gap-1 rounded-xl bg-gray-400 flex flex-col">
              <textarea
                placeholder="Enter text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-white p-2 w-full h-full rounded-lg resize-none outline-none"
              />

              <button
                onClick={handleExecute}
                disabled={executing}
                className="h-20 w-full flex items-center justify-center gap-2 rounded-xl text-base sm:text-lg bg-linear-to-r from-cyan-500 to-cyan-400 text-white cursor-pointer border border-cyan-400 transition-transform shadow-[inset_0px_2px_6px_-2px_rgba(255,255,255,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCcw
                  size={16}
                  className={executing ? "animate-spin" : ""}
                />
                {executing ? "Executing..." : "Execute"}
              </button>
            </div>

            {/* Steps */}
            <div className="flex items-center ml-18">
              {stepsLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <React.Fragment key={index}>
                      {/* Skeleton Step */}
                      <div className="flex flex-col items-center w-24">
                        {/* Top Number Box */}
                        <div className="w-20 h-20 rounded-2xl bg-slate-300 animate-pulse shadow-md" />

                        {/* Title */}
                        <div className="mt-4 h-4 w-32 bg-slate-300 rounded animate-pulse" />

                        {/* Action */}
                        <div className="mt-2 h-3 w-24 bg-slate-200 rounded animate-pulse" />

                        {/* Edit */}
                        <div className="mt-3 h-3 w-12 bg-slate-200 rounded animate-pulse" />
                      </div>

                      {/* Arrow (except last) */}
                      {index !== 3 && (
                        <div className="mx-6">
                          <div className="w-10 h-1 bg-slate-300 rounded animate-pulse" />
                        </div>
                      )}
                    </React.Fragment>
                  ))
                : stepData.map((step, index) => (
                    <Step
                      key={step._id}
                      order={step.order}
                      workflowId={id as string}
                      initialTitle={step.title}
                      initialType={step.type}
                      isLast={index === stepData.length - 1}
                    />
                  ))}
            </div>

            <div className="relative z-10 flex flex-col items-center gap-10">
              output
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepChart;
