import Workflow from "@/app/models/workflow.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/app/lib/db";
import Step from "@/app/models/step.model";
import mongoose from "mongoose";
import { StepType } from "@/app/components/Step";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ data: "Unauthorized" }, { status: 401 });
    }

    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ data: "Title is required" }, { status: 400 });
    }

    const workflowCount = await Workflow.countDocuments({ userId });

    if (workflowCount >= 2) {
      return NextResponse.json(
        { msg: "You can only create 3 workflows. Delete one to create a new." },
        { status: 400 },
      );
    }

    const newWorkflow = await Workflow.create({
      title,
      userId,
    });

    const now = new Date();
    const defaultSteps: {
      title: string;
      type: StepType;
      order: number;
      workflowId: mongoose.Types.ObjectId;
      createdAt: Date;
      updatedAt: Date;
    }[] = [
      {
        title: "Step 1",
        type: "no_action",
        order: 1,
        workflowId: newWorkflow._id,
        createdAt: now,
        updatedAt: now,
      },
      {
        title: "Step 2",
        type: "no_action",
        order: 2,
        workflowId: newWorkflow._id,
        createdAt: now,
        updatedAt: now,
      },
      {
        title: "Step 3",
        type: "no_action",
        order: 3,
        workflowId: newWorkflow._id,
        createdAt: now,
        updatedAt: now,
      },
      {
        title: "Step 4",
        type: "no_action",
        order: 4,
        workflowId: newWorkflow._id,
        createdAt: now,
        updatedAt: now,
      },
    ];

    // insert them
    await Step.insertMany(defaultSteps);

    return NextResponse.json(
      {
        msg: "Workflow created successfully",
        data: newWorkflow,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create workflow error:", error);

    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDb();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ data: "Unauthorized" }, { status: 401 });
    }
    //@ts-expect-error: unknown error
    const workflows = await Workflow.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ data: workflows }, { status: 200 });
  } catch (error) {
    console.error("Get workflow error:", error);

    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
