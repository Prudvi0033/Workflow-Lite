import Workflow from "@/app/models/workflow.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/app/lib/db";

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

    const workflowCount = await Workflow.countDocuments({userId})

    if(workflowCount >= 2){
        return NextResponse.json(
        { msg: "You can only create 3 workflows. Delete one to create a new." },
        { status: 400 }
      ); 
    }

    const newWorkflow = await Workflow.create({
      title,
      userId,
    });

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
    const workflows = await Workflow.find({ userId })
      .sort({ createdAt: -1 });

    return NextResponse.json({ data: workflows }, { status: 200 });
  } catch (error) {
    console.error("Get workflow error:", error);

    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
