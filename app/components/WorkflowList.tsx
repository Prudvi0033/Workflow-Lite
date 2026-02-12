"use client";

import React, { useEffect, useState } from "react";
import {Trash2, FileText } from "lucide-react";

type Workflow = {
  _id: string;
  title: string;
  createdAt: string;
};

const WorkflowList = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const res = await fetch("/api/workflow");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setWorkflows(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/workflow/${id}`, { method: "DELETE" });
      setWorkflows((prev) => prev.filter((wf) => wf._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Skeleton */}
      {/* Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center animate-pulse"
            >
              {/* Icon Placeholder */}
              <div className="w-14 h-14 rounded-xl bg-slate-200 mb-6" />

              {/* Title Placeholder */}
              <div className="h-4 w-24 bg-slate-200 rounded mb-3" />

              {/* Date Placeholder */}
              <div className="h-3 w-16 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Workflow Grid */}
      {!loading && workflows.length > 0 && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {workflows.slice(0, 3).map((item) => (
      <div
        key={item._id}
        className="group relative aspect-square bg-slate-100 border border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 hover:bg-slate-200 hover:shadow-sm"
      >
        {/* Icon */}
        <div className="w-18 h-18 rounded-2xl bg-slate-200 flex items-center justify-center mb-6 transition group-hover:bg-slate-300">
          <FileText className="w-8 h-8 text-slate-700" />
        </div>

        {/* Title */}
        <h3 className="text-base font-medium text-slate-900">
          {item.title}
        </h3>

        {/* Date */}
        <p className="text-xs text-slate-600 mt-2">
          {new Date(item.createdAt).toLocaleDateString()}
        </p>

        {/* Delete Button */}
        <button
          onClick={() => handleDelete(item._id)}
          className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-500 hover:text-slate-800"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ))}
  </div>
)}


      {/* Empty State */}
      {!loading && workflows.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50">
          <FileText className="w-10 h-10 text-slate-400 mb-4" />
          <h3 className="text-sm font-medium text-slate-800">
            No workflows yet
          </h3>
          <p className="text-xs text-slate-500 mt-2 max-w-xs">
            Create your first workflow to begin.
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkflowList;
