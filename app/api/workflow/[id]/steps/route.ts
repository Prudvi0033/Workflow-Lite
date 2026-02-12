import { connectDb } from "@/app/lib/db";
import Step from "@/app/models/step.model";
import Workflow from "@/app/models/workflow.model";
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
      return NextResponse.json(
        {
          data: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { id } = await context.params;
    const { title, type, config, order } = await req.json();

    //@ts-expect-error : unknown type issue
    const workflow = await Workflow.findOne({ _id: id, userId });

    if (!workflow)
      return NextResponse.json({ msg: "Workflow not found" }, { status: 404 });

    if (!title || !type || order === undefined) {
      return NextResponse.json(
        { msg: "Missing required fields" },
        { status: 400 },
      );
    }

    const step = await Step.create({
      workflowId: workflow._id,
      title,
      type,
      config,
      order,
    });

    return NextResponse.json(
      { msg: "Step created successfully", data: step },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create step error:", error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();

    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ data: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;

    //@ts-expect-error : unknown type issue
    const workflow = await Workflow.findOne({ _id: id, userId });
    if (!workflow)
      return NextResponse.json({ msg: "Workflow not found" }, { status: 404 });

    //@ts-expect-error : unknown type issue
    const steps = await Step.find({ workflowId: workflow._id }).sort({ order: 1 });

    return NextResponse.json({ workflow, steps }, { status: 200 });
  } catch (error) {
    console.error("Get workflow error:", error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
