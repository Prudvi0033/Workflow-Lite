"use client";

import { SignOutButton, useAuth, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { LogOut, Plus, X } from "lucide-react";
import WorkflowList from "./WorkflowList";
import axios from "axios";
import { useRouter } from "next/navigation";

const WorkflowPage = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const getInitial = () => {
    if (user?.firstName) return user.firstName.charAt(0).toUpperCase();
    if (user?.username) return user.username.charAt(0).toUpperCase();
    return user?.emailAddresses[0]?.emailAddress.charAt(0).toUpperCase() || "U";
  };

  const getUserName = () => {
    if (user?.firstName && user?.lastName)
      return `${user.firstName} ${user.lastName}`;
    return user?.firstName || user?.username || "User";
  };

  const getUserEmail = () => user?.emailAddresses[0]?.emailAddress || "";

  const showSkeleton = !isLoaded || !userLoaded;

  const handleCreateWorkflow = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/workflow", {
        title: title.trim(),
      });

      const id = res.data?.data?._id;

      setIsModalOpen(false);
      setTitle("");

      router.push(`/workflow/${id}`);
    } catch (err) {
      // If backend returned a message, use it
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center px-4 sm:px-6 py-8 sm:py-2">
      <div className="w-full h-screen max-w-3xl rounded-2xl  p-6 sm:p-6">
        {/* Header */}
        <div className="mb-8">
          {showSkeleton && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-slate-200" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-32 bg-slate-200 rounded" />
                  <div className="h-3 w-40 bg-slate-200 rounded" />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-28 bg-slate-200 rounded-lg" />
                <div className="h-8 w-8 bg-slate-200 rounded-lg" />
              </div>
            </div>
          )}

          {!showSkeleton && isSignedIn && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-medium text-base">
                  {getInitial()}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">
                    {getUserName()}
                  </span>
                  <span className="text-xs text-slate-500">
                    {getUserEmail()}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 border border-slate-900 text-sm font-medium text-white rounded-xl hover:bg-slate-800 active:scale-95 transition-colors shadow-sm w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4" />
                  Create Workflow
                </button>

                <SignOutButton redirectUrl="/">
                  <button className="flex items-center justify-center p-2 text-slate-500 hover:text-slate-800 transition w-full sm:w-auto">
                    <LogOut className="w-5 h-5" />
                  </button>
                </SignOutButton>
              </div>
            </div>
          )}
        </div>

        <div className="h-px w-full bg-slate-200 mb-8" />

        <WorkflowList />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            <form
              onSubmit={handleCreateWorkflow}
              className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-fadeIn"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Create Workflow
                </h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-xl"
                >
                  <X />
                </button>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="text-sm font-medium text-slate-700">
                  Title <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter workflow title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (error) setError("");
                  }}
                  className={`w-full px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    error
                      ? "border-red-400 focus:ring-red-200"
                      : "border-slate-300 focus:ring-slate-200"
                  }`}
                />

                {error && <span className="text-xs text-red-500">{error}</span>}
              </div>

              <div className="flex w-full items-center justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-fit flex items-end justify-end px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 active:scale-95 transition disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowPage;
