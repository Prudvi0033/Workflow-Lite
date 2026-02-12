"use client";

import { SignOutButton, useAuth, useUser } from "@clerk/nextjs";
import React from "react";
import { LogOut, Plus } from "lucide-react";
import WorkflowList from "./WorkflowList";

const WorkflowPage = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

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

  return (
  <div className="min-h-screen bg-slate-50 flex justify-center px-4 sm:px-6 py-8 sm:py-10">
    <div className="w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      
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
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 border border-slate-900 text-sm font-medium text-white rounded-xl hover:bg-slate-800 active:scale-95 transition-colors shadow-sm w-full sm:w-auto">
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
    </div>
  </div>
);

};

export default WorkflowPage;
