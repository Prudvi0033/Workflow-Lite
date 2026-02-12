import { connectDb } from "@/app/lib/db";
import WorkflowRun from "@/app/models/workflowrun.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { msg: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    //@ts-expect-error: unknown type error
    const workflowRuns = await WorkflowRun.find({workflowId: id,  userId})
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return NextResponse.json(
      {
        msg: "Last 5 workflow runs fetched successfully",
        data: workflowRuns,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get recent runs error:", error);
    return NextResponse.json(
      { msg: "Something went wrong" },
      { status: 500 }
    );
  }
}
