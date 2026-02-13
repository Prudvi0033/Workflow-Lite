import axios from "axios";
import { ChevronRight, Pencil } from "lucide-react";
import React, { useState } from "react";

export type StepType =
  | "ping"
  | "no_action"
  | "clean_text"
  | "summarize"
  | "extract_key_points"
  | "extract_action_items"
  | "sentiment_analysis"
  | "tag_category";

interface StepInterface {
  order: number;
  workflowId: string;
  initialTitle?: string;
  initialType?: StepType;
  isLast?: boolean;
}

const Step = ({
  order,
  workflowId,
  initialTitle = `Node ${order}`,
  initialType = "no_action",
  isLast = false,
}: StepInterface) => {
  const [title, setTitle] = useState(initialTitle);
  const [type, setType] = useState<StepType>(initialType);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !type) return;

    setLoading(true);
    try {
      await axios.post(`/api/workflow/${workflowId}/steps`, {
        title,
        type,
        order,
      });

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Horizontal Node */}
      <div className="flex flex-col items-center relative w-44">
        {/* Top Row: Box + Connector */}
        <div className="flex flex-col sm:flex-row items-center w-full">
          {/* Box */}
          <div className="flex flex-col items-center mb-4 sm:mb-0">
            <div className="w-16 h-16 flex items-center justify-center bg-linear-to-bl from-gray-500 to-gray-700 border text-2xl font-bold text-white rounded-xl shadow-md">
              {order}
            </div>
            {/* Content Below */}
            <div className="flex flex-col items-center text-center mt-3">
              <h2 className="text-sm font-semibold text-gray-800 truncate w-24">
                {title}
              </h2>

              <p className="text-xs text-gray-500 mt-1">Action: {type}</p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-3 flex items-center gap-1 text-xs text-gray-600 hover:text-black transition"
              >
                <Pencil size={12} />
                Edit
              </button>
            </div>
          </div>

          {/* Connector (hidden on mobile) */}
          {order <= 3 && (
            <div className="hidden sm:flex -space-x-4 text-gray-300 items-center flex-1 mb-18">
              <div className="h-0.5 bg-gray-300 flex-1" />
              <ChevronRight size={32} />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <form
            onSubmit={handleSave}
            className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              Edit Node {order}
            </h2>

            {/* Title */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 text-sm"
              />
            </div>

            {/* Type */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as StepType)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 text-sm"
              >
                <option value="no_action">no_action</option>
                <option value="clean_text">clean_text</option>
                <option value="summarize">summarize</option>
                <option value="extract_key_points">extract_key_points</option>
                <option value="extract_action_items">
                  extract_action_items
                </option>
                <option value="sentiment_analysis">sentiment_analysis</option>
                <option value="tag_category">tag_category</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-2 rounded-xl text-sm font-medium hover:bg-slate-800 active:scale-95 transition disabled:opacity-70"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                "Save"
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Step;
