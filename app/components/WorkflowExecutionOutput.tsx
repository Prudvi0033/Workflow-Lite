"use client";
import mongoose from "mongoose";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface StepOutput {
  stepId: string;
  stepType: string;
  output: string;
}

interface WorkflowOutputStreamProps {
  stepOutputs: StepOutput[];
  finalOutput: string;
  workflowId: string;
}

const WorkflowExecutionOutput = ({
  stepOutputs,
  finalOutput,
  workflowId,
}: WorkflowOutputStreamProps) => {
  const [visibleSteps, setVisiblesteps] = useState<StepOutput[]>([]);
  const [showFinal, setShowoutFinal] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!stepOutputs?.length) return;

    setVisiblesteps([]);
    setShowoutFinal(false);

    let current = 0;

    const interval = setInterval(() => {
      current++;

      setVisiblesteps(stepOutputs.slice(0, current));

      if (current >= stepOutputs.length) {
        clearInterval(interval);

        setTimeout(() => {
          setShowoutFinal(true);
        }, 700);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [stepOutputs]);

  return (
    <div className="w-full mt-10 space-y-6 p-6">
      <h2 className="text-xl mx-6 w-full text-start font-semibold text-slate-900 mb-4">
        Step Outputs
      </h2>
      {visibleSteps.map((step) => (
        <div
          key={step.stepId}
          className="px-6 py-3 rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-500 animate-fadeIn"
        >
          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
            {step.stepType}
          </p>
          <p className="text-neutral-800 leading-relaxed">{step.output}</p>
        </div>
      ))}

      {showFinal && (
        <>
          <div
            onClick={() => router.push(`/workflow/${workflowId}/runs`)}
            className="p-5 cursor-pointer rounded-xl border border-neutral-300 bg-gray-700 shadow-sm transition-all duration-500"
          >
            <p className="text-xs uppercase tracking-widest text-white mb-3">
              Final Output
            </p>
            <p className="text-base font-medium text-neutral-200 leading-relaxed">
              {finalOutput}
            </p>

            <p className="text-[10px] mt-2 text-neutral-200">
              Note: Click on this to view runs
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkflowExecutionOutput;
