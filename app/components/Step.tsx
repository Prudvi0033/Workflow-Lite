import axios from "axios";
import { Pencil } from "lucide-react";
import React, { useState } from "react";

export type StepType =
  "ping" 
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
}

const Step = ({
  order,
  workflowId,
  initialTitle = `Node ${order}`,
  initialType = "no_action",
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
      const res = await axios.post(`/api/workflow/${workflowId}/steps`, {
        title,
        type,
        order,
      });

      
      setTitle(title);
      setType(type);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 flex items-center justify-center bg-linear-to-bl from-gray-400 to-gray-600 border-2 text-3xl font-bold text-neutral-200 border-neutral-200/80 rounded-xl shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.4),2px_-2px_12px_rgba(0,0,0,0.2)]">
          {order}
        </div>
        <h1 className="text-[12px] text-neutral-500 font-semibold">{title}</h1>
        <button
          className="bg-black/10 hover:bg-white border border-gray-300 text-gray-600 hover:text-gray-700 p-1.5 rounded-md shadow-sm hover:shadow transition-all"
          onClick={() => setIsModalOpen(true)}
        >
          <Pencil size={14} />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <form
            onSubmit={handleSave}
            className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 animate-fadeIn flex flex-col gap-4"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              Edit Node {order}
            </h2>

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
    </div>
  );
};

export default Step;
