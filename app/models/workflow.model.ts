import { model, models, Schema } from "mongoose";

const workflowSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
  models.Workflow || model("Workflow", workflowSchema);

export default Workflow;
