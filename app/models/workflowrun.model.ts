import { model, models, Schema } from "mongoose";

const stepOutputSchema = new Schema(
  {
    stepId: {
      type: Schema.Types.ObjectId,
      ref: "Step",
      required: true,
    },

    stepType: {
      type: String,
      required: true,
    },

    output: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const workflowRunSchema = new Schema(
  {
    workflowId: {
      type: Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    input: {
      type: String,
      required: true,
    },

    stepOutputs: [stepOutputSchema],

    finalOutput: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

workflowRunSchema.index({ workflowId: 1 });
workflowRunSchema.index({ userId: 1 });
workflowRunSchema.index({ createdAt: -1 });

const WorkflowRun =
  models.WorkflowRun || model("WorkflowRun", workflowRunSchema);

export default WorkflowRun;
