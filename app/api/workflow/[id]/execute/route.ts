import { gemini } from "@/app/lib/ai";
import { connectDb } from "@/app/lib/db";
import Step from "@/app/models/step.model";
import Workflow from "@/app/models/workflow.model";
import WorkflowRun from "@/app/models/workflowrun.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const { input } = await req.json();
    const { id } = await context.params;

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { msg: "Valid input is required" },
        { status: 400 },
      );
    }

    //@ts-expect-error: unknown type issue
    const workflow = await Workflow.findById(id).lean();
    
    if (!workflow || workflow.userId !== userId) {
      return NextResponse.json({ msg: "Workflow not found" }, { status: 404 });
    }
    
    //@ts-expect-error: unknown type issue
    const steps = await Step.find({ workflowId: id }).sort({ order: 1 }).lean();

    if (!steps.length) {
      return NextResponse.json(
        { msg: "No steps found for this workflow" },
        { status: 400 },
      );
    }

    let currentOutput = input;

    const stepResults: {
      stepId: string;
      stepType: string;
      output: string;
      status: "success" | "skipped" | "failed";
    }[] = [];

    for (const step of steps) {
      if (step.type === "no_action") {
        stepResults.push({
          stepId: step._id.toString(),
          stepType: step.type,
          output: currentOutput,
          status: "skipped",
        });
        continue;
      }

      try {
        const result = await gemini(step.type, currentOutput);

        if (!result || result.trim() === "") {
          stepResults.push({
            stepId: step._id.toString(),
            stepType: step.type,
            output: currentOutput,
            status: "success",
          });
          continue;
        }

        currentOutput = result;

        stepResults.push({
          stepId: step._id.toString(),
          stepType: step.type,
          output: result,
          status: "success",
        });
      } catch (error) {
        console.error("Step execution failed:", error);

        stepResults.push({
          stepId: step._id.toString(),
          stepType: step.type,
          output: currentOutput,
          status: "failed",
        });
      }
    }

    const run = await WorkflowRun.create({
      workflowId: id,
      userId,
      input,
      finalOutput: currentOutput,
      stepOutputs: stepResults,
      executedAt: new Date(),
    });

    return NextResponse.json(
      {
        msg: "Workflow executed successfully",
        data: run,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Execute workflow error:", error);

    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
