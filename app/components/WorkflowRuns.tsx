"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface StepOutput {
  stepId: string;
  stepType: string;
  output: string;
}

interface WorkflowRun {
  _id: string;
  workflowId: string;
  userId: string;
  input: string;
  stepOutputs: StepOutput[];
  finalOutput: string;
  createdAt: string;
  updatedAt: string;
}

const WorkflowRuns = () => {
  const { id } = useParams();
  const [runs, setRuns] = useState<WorkflowRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/workflow/${id}/runs`);
        setRuns(response.data.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch workflow runs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRuns();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatStepType = (stepType: string) => {
    return stepType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (runs.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6">
        <h2
          onClick={() => router.back()}
          className="text-2xl cursor-pointer flex items-center gap-2 font-bold mb-6"
        >
          <ArrowLeft /> Recent Workflow Runs
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center text-gray-500">
          No workflow runs yet. Run your workflow to see results here.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2
        onClick={() => router.back()}
        className="text-2xl cursor-pointer flex items-center gap-2 font-bold mb-6"
      >
        <ArrowLeft /> Recent Workflow Runs
      </h2>

      <div className="space-y-6">
        {runs.map((run, index) => (
          <div
            key={run._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-cyan-100 text-cyan-700 text-xs font-semibold px-2.5 py-1 rounded">
                    Run #{runs.length - index}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(run.createdAt)}
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {run._id.slice(-8)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Input */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  Input
                </h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border border-gray-200">
                  {run.input}
                </p>
              </div>

              {/* Steps */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  Processing Steps ({run.stepOutputs.length})
                </h3>
                <div className="space-y-2">
                  {run.stepOutputs.map((step, stepIndex) => (
                    <div
                      key={step.stepId}
                      className="flex items-start gap-3 text-sm"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 font-semibold text-xs flex-shrink-0 mt-0.5">
                        {stepIndex + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-700">
                            {formatStepType(step.stepType)}
                          </span>
                        </div>
                        <div className="text-gray-600 bg-gray-50 p-2 rounded border border-gray-100 text-xs break-words">
                          {step.output}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Output */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  Final Output
                </h3>
                <div className="text-sm text-gray-900 bg-emerald-100 p-3 rounded border border-green-500 font-medium">
                  {run.finalOutput}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowRuns;
