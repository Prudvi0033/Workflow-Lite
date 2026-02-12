import { model, models, Schema } from "mongoose";

export interface WorkflowInterface extends Document {
  userId: string,
  title: string,
  steps: Schema.Types.ObjectId[]
}

const workflowSchema = new Schema<WorkflowInterface>(
  {
    userId: {
      type: String,
      required: true,
      index: true
    },

    title: {
      type: String,
      required: true,
    },

    steps: [
      {
        type: Schema.Types.ObjectId,
        ref: "Step",
      },
    ],
  },
  { timestamps: true }
);

const Workflow =
  models.Workflow || model<WorkflowInterface>("Workflow", workflowSchema);

export default Workflow;
