import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["multiple_choice", "true_false", "fill_blank", "essay"],
    required: true,
  },
  options: [
    {
      type: String,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 1,
  },
});

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Technical", "Logical", "Verbal", "Numerical", "General"],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // minutes
      required: true,
    },
    maxParticipants: {
      type: Number,
      required: true,
    },
    currentParticipants: {
      type: Number,
      default: 0,
    },
    questions: [questionSchema],
    image: {
      type: String,
      required:true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming User collection for admins
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
