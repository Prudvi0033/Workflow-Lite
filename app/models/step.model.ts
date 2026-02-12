import { model, models, Schema } from "mongoose";

const stepSchema = new Schema(
  {
    workflowId: {
      type: Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "clean_text",
        "summarize",
        "extract_key_points",
        "extract_action_items",
        "sentiment_analysis",
        "tag_category",
      ],
    },

    config: {
      tone: { type: String },
      language: { type: String },
    },

    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

stepSchema.index({ workflowId: 1, order: 1 });

const Step = models.Step || model("Step", stepSchema);

export default Step;
