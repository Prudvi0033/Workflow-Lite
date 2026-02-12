import { model, models, Schema } from "mongoose";

export interface WorkflowInterface extends Document {
  userId: string,
  title: string,
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
  },
  { timestamps: true }
);

const Workflow =
  models.Workflow || model<WorkflowInterface>("Workflow", workflowSchema);

export default Workflow;
