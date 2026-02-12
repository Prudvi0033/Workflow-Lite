import { connectDb } from "@/app/lib/db";
import Step from "@/app/models/step.model";
import Workflow from "@/app/models/workflow.model";
import WorkflowRun from "@/app/models/workflowrun.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    await connectDb();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ data: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    //@ts-expect-error: unkown type error
    const workflow = await Workflow.findOne({ _id: id, userId })

    if (!workflow) {
      return NextResponse.json({ msg: "Workflow not found" }, { status: 404 });
    }

    return NextResponse.json({ data: workflow }, { status: 200 });
  } catch (error) {
    console.error("Get workflow error:", error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}


export async function DELETE(context: { params: { id: string } }){
  try {
    await connectDb()

    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ data: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
        
    //@ts-expect-error: unkown type error
    const workflow = await Workflow.findOne({ _id: id, userId })

    if (!workflow) {
      return NextResponse.json({ msg: "Workflow not found" }, { status: 404 });
    }

    await Step.deleteMany({ workflowId: workflow._id });

    await WorkflowRun.deleteMany({ workflowId: workflow._id });

    await Workflow.deleteOne({ _id: workflow._id });

    return NextResponse.json(
      { msg: "Workflow, steps, and runs deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Delete workflow error:", error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}